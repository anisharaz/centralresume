import { ResumeStore } from '@/database/resume';
import { Session } from '@/database/session';
import { ResumeInterface } from '@/resume/resume';
import mongoose from 'mongoose';
import { ConfigManager } from '../config';
import { PrismaClient } from '@prisma/client';

const resumeSchema = new mongoose.Schema({
  userId: String,
  resume: Object,
});
const ResumeModel = mongoose.model('Resume', resumeSchema);

export class Datastore implements ResumeStore, Session {
  private static instance: Datastore;
  private prisma: PrismaClient | undefined = undefined;
  private constructor() { }
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
  ): Promise<void> {
    const resumeData = new ResumeModel({
      userId,
      resume,
    });
    await resumeData.save();
  }

  async getResume<T extends ResumeInterface>(
    userId: string,
  ): Promise<T | undefined> {
    const resume = await ResumeModel.findOne({ userId });
    return resume as T;
  }

  async isValidToken(userId: string): Promise<boolean> {
    const result = await this.prisma?.session.findFirst({ where: { userId } });
    return !!result;
  }
}
