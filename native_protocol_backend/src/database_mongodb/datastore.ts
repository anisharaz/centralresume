import { ResumeStore } from '@/database/resume';
import { Session } from '@/database/session';
import { ResumeInterface } from '@/resume/resume';

export class Datastore implements ResumeStore, Session {
  private static instance: Datastore;
  private constructor() { }
  static getInstance(): Datastore {
    if (!Datastore.instance) {
      Datastore.instance = new Datastore();
    }
    return Datastore.instance;
  }

  storeResume<T extends ResumeInterface>(userId: string, resume: T): void { }
  getResume<T extends ResumeInterface>(userId: string): T | undefined {
    return {} as T;
  }

  isValidToken(userId: string): boolean {
    return false;
  }
}
