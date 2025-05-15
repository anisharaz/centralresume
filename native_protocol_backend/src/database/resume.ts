import { ResumeInterface } from '@/resume/resume';

export interface ResumeStore<T extends ResumeInterface, UserId> {
  storeResume(userId: UserId, resume: T): void;
  getResume(userId: UserId): T | undefined;
}
