import { sampleResume, developerTagFilterdResume } from './sample_resume';
import { Resume } from '../resume';
import { ENGINEERING_RESUME } from '@/meta/ResumeInterface';

test('make resume', async () => {
  const resume = new Resume<ENGINEERING_RESUME>(sampleResume);
  const developerResume = resume.makeResume('developer');
  expect(JSON.stringify(developerResume)).toEqual(
    JSON.stringify(developerTagFilterdResume),
  );
});

test('update resume', async () => {
  const resume = new Resume<ENGINEERING_RESUME>(sampleResume);

  const updatedResume = resume.updateResume('developer', {
    personal_details: {
      name: 'Alice Johnson',
    },
  });
  expect(updatedResume).toBeDefined();
  expect(updatedResume.personal_details.name).toBe('Alice Johnson');
});

test('get all resume', async () => {
  const resume = new Resume<ENGINEERING_RESUME>(sampleResume);
  const allResume = resume.getAll();
  expect(allResume).toBeDefined();
});
