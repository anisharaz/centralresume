import { ResumeInterface } from '@/resume/resume';

export interface ResumeStore {
  storeResume<T extends ResumeInterface>(
    userId: string,
    resume: T,
  ): Promise<string>;
  getResume<T extends ResumeInterface>(
    userId: string,
  ): Promise<{ resume: T } | undefined>;
}
