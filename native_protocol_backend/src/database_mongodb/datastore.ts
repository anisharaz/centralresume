import { ResumeStore } from '@/database/resume';
import { ResumeInterface } from '@/resume/resume';

export class Datastore<T extends ResumeInterface, UserId>
  implements ResumeStore<T, UserId>
{
  storeResume(userId: UserId, resume: T): void {}

  getResume(userId: UserId): T | undefined {
    return {} as T;
  }
}
