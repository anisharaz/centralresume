import { ResumeInterface } from '@/resume/resume';
import { ResumeStore } from '@/database/resume';

export function createOrUpdateResume<
  T extends ResumeInterface,
  UserId,
  Store extends ResumeStore<T, UserId>,
>(userId: UserId, tag: string, resume: T, datastore: Store) {}
