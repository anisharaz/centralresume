import { ResumeInterface } from '@/resume/resume';
import { ResumeStore } from '@/database/resume';
import { Resume, DeepOmitTags } from '@/resume/resume';
import { PartialDeep } from 'type-fest';

export function createOrUpdateResume<
  T extends ResumeInterface,
  Store extends ResumeStore,
>(
  userId: string,
  tag: string,
  resume: PartialDeep<DeepOmitTags<T>>,
  datastore: Store,
) {
  const storedResume = datastore.getResume<T>(userId);
  if (storedResume) {
    const resumeData = new Resume(storedResume);
    resumeData.updateResume(tag, resume);
    const newResume = resumeData.getAll();
    datastore.storeResume<T>(userId, newResume);
  }
}

export function getResume<T extends ResumeInterface, Store extends ResumeStore>(
  userId: string,
  tag: string,
  datastore: Store,
): T {
  const storedResume = datastore.getResume<T>(userId);
  if (storedResume) {
    const resumeData = new Resume(storedResume);
    return resumeData.makeResume(tag);
  } else {
    throw new Error('Resume not found');
  }
}
