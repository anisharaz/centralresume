import { ResumeInterface } from '@/resume/resume';
import { ResumeStore } from '@/database-interface/resume';
import { Resume, DeepOmitTags } from '@/resume/resume';
import { PartialDeep } from 'type-fest';

export async function createResume<
  T extends ResumeInterface,
  Store extends ResumeStore,
>(userId: string, resume: T, datastore: Store) {
  const resumeData = new Resume(resume);
  const newResume = resumeData.getAll();
  datastore.storeResume<T>(userId, newResume);
}

export async function updateResume<
  T extends ResumeInterface,
  Store extends ResumeStore,
>(
  userId: string,
  tag: string,
  resume: PartialDeep<DeepOmitTags<T>>,
  datastore: Store,
) {
  const storedResume = await datastore.getResume<T>(userId);
  const resumeData = new Resume(
    storedResume?.resume ? storedResume.resume : ({} as T),
  );
  resumeData.updateResume(tag, resume);
  const newResume = resumeData.getAll();
  datastore.storeResume<T>(userId, newResume);
}

export async function getResume<
  T extends ResumeInterface,
  Store extends ResumeStore,
>(userId: string, tag: string, datastore: Store): Promise<T> {
  const storedResume = await datastore.getResume<T>(userId);
  if (storedResume) {
    const resumeData = new Resume(storedResume.resume);
    return resumeData.makeResume(tag);
  } else {
    throw new Error('Resume not found');
  }
}
