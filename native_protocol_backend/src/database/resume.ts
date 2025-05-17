import { ResumeInterface } from '@/resume/resume';

export interface ResumeStore {
  storeResume<T extends ResumeInterface>(userId: string, resume: T): void;
  getResume<T extends ResumeInterface>(userId: string): T | undefined;
}
