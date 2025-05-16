import { sampleResume, developerTagFilterdResume } from './sample_resume';
import { Resume } from '../resume';
import { ENGINEERING_RESUME } from '@/meta/ResumeInterface';
import isEqual from 'lodash.isequal';

test('make resume', async () => {
  const resume = new Resume<ENGINEERING_RESUME>(sampleResume);
  const developerResume = resume.makeResume('developer');
  expect(JSON.stringify(developerResume)).toEqual(
    JSON.stringify(developerTagFilterdResume),
  );
});

test('update resume', async () => {
  const resume = new Resume<ENGINEERING_RESUME>(sampleResume);

  const updatedResume = resume.updateResume('jadoo', {
    otherLists: [
      {
        heading: [
          {
            text: 'Open Source Projects',
          },
        ],
        summary: [
          {
            text: 'Maintainer of a popular TypeScript utility library with over 2K stars.',
          },
        ],
      },
    ],
  });
  expect(updatedResume?.otherLists).toBeDefined();
  if (updatedResume?.otherLists) {
    const tags = ['developer', 'opensource', 'jadoo'];
    expect(isEqual(updatedResume?.otherLists[0]?.tags, tags)).toEqual(true);
  }
});

test('get all resume', async () => {
  const resume = new Resume<ENGINEERING_RESUME>(sampleResume);
  const allResume = resume.getAll();
  expect(allResume).toBeDefined();
});
