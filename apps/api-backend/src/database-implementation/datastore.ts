import { ResumeStore } from '@/database-interface/resume';
import { Session } from '@/database-interface/session';
import { ResumeInterface } from '@/resume/resume';
import mongoose from 'mongoose';
import { ConfigManager } from '../config';
import { PrismaClient } from '@centralresume/database/prisma';
const resumeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    resume: Object,
  },
  { strict: false },
);
const ResumeModel = mongoose.model('Resume', resumeSchema);

export class Datastore implements ResumeStore, Session {
  private static instance: Datastore;
  private prisma: PrismaClient | undefined = undefined;
  private constructor() {}
  static async getInstance(): Promise<Datastore> {
    if (!Datastore.instance) {
      Datastore.instance = new Datastore();
      Datastore.instance.prisma = new PrismaClient();
      await Datastore.instance.connect();
    }
    return Datastore.instance;
  }

  private async connect() {
    return await mongoose.connect(
      ConfigManager.getInstance().getConfig().mongodb,
    );
  }

  async storeResume<T extends ResumeInterface>(
    userId: string,
    resume: T,
  ): Promise<string> {
    const fetchedResumeData = await ResumeModel.findOne({ userId });

    if (fetchedResumeData) {
      const result = await ResumeModel.updateOne(
        { userId },
        { $set: { resume: resume } },
      );
      if (!result.acknowledged) throw new Error('Failed to update resume');
      return fetchedResumeData._id?.toString() || '';
    } else {
      // Create new document
      const resumeData = new ResumeModel({
        _id: new mongoose.Types.ObjectId(),
        userId,
        resume,
      });
      const result = await resumeData.save();
      if (!result) throw new Error('Failed to save resume');
      return result._id?.toString() || '';
    }
  }

  async getResume<T extends ResumeInterface>(
    userId: string,
  ): Promise<{ resume: T } | undefined> {
    const resume = await ResumeModel.findOne({ userId });
    if (!resume) return undefined;
    return sanitizeResult(resume?.toObject()) as { resume: T };
  }

  async isValidToken(accessToken: string): Promise<boolean> {
    const result = await this.prisma?.oauthAccessToken.findFirst({
      where: { accessToken },
    });
    return !!result;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function sanitizeResult(data: any): object {
  const update = (chunk: any): any => {
    if (chunk !== null && typeof chunk === 'object') {
      if (
        !Object.keys(chunk)
          .map((key) => Number(key))
          .includes(NaN)
      )
        return Object.values(chunk).map((value) => update(value));

      const result: any = {};
      for (const [key, value] of Object.entries(chunk)) {
        result[key] = update(value);
      }
      return result;
    } else return chunk;
  };
  return update(data) as object;
}
