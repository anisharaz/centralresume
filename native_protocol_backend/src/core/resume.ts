import { ResumeInterface } from '@/resume/resume';
import { ResumeStore } from '@/database/resume';
import { Resume, DeepOmitTags } from '@/resume/resume';
import { PartialDeep } from 'type-fest';

export function createOrUpdateResume<
  T extends ResumeInterface,
  UserId,
  Store extends ResumeStore<T, UserId>,
>(
  userId: UserId,
  tag: string,
  resume: PartialDeep<DeepOmitTags<T>>,
  datastore: Store,
) {
  let storedResume = datastore.getResume(userId);
  if (storedResume) {
    let resumeData = new Resume(storedResume);
    resumeData.updateResume(tag, resume);
    const newResume = resumeData.getAll();
    datastore.storeResume(userId, newResume);
  }
}

export function getResume<
  T extends ResumeInterface,
  UserId,
  Store extends ResumeStore<T, UserId>,
>(userId: UserId, tag: string, datastore: Store): T {
  let storedResume = datastore.getResume(userId);
  if (storedResume) {
    let resumeData = new Resume(storedResume);
    return resumeData.makeResume(tag);
  } else {
    throw new Error('Resume not found');
  }
}
