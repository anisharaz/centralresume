import { RESUME } from '@/meta/ResumeInterface';

export const sampleResume: RESUME = {
  version: '1',
  personal_details: {
    name: 'Alice Johnson',
    tag_line: [
      {
        text: 'Full-Stack Developer specializing in React and Node.js',
        tags: ['developer', 'full-stack', 'react', 'nodejs'],
      },
    ],
    summary: [
      {
        text: 'Experienced software engineer with 5+ years in designing scalable web applications and cloud systems.',
        tags: ['developer', 'cloud', 'experience', 'javascript', 'typescript'],
      },
    ],
    email: 'alice.johnson@example.com',
    phone: '+1 555-123-4567',
    date_of_birth: '1990-05-15',
    address: {
      address_line: '123 Tech Lane',
      city: 'San Francisco',
      country: 'USA',
    },
    social_links: [
      {
        name: 'GitHub',
        url: 'https://github.com/alicejohnson',
        tags: ['developer', 'portfolio'],
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/alicejohnson',
        tags: ['professional', 'network'],
      },
    ],
  },

  work_experience: [
    {
      company: 'TechNova Inc.',
      tags: ['developer', 'development', 'team-lead'],
      position: [
        {
          text: 'Senior Full-Stack Developer',
          tags: ['developer', 'react', 'nodejs', 'typescript'],
        },
      ],
      website: 'https://technova.com',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2023-12-31'),
      summary: [
        {
          text: 'Led a team of 6 engineers to build microservice-based architectures.',
          tags: ['developer', 'microservices', 'agile'],
        },
      ],
      highlights: [
        {
          text: [
            'Reduced page load times by 40% through frontend optimization.',
            'Migrated legacy systems to modern React/TypeScript stack.',
          ],
          tags: ['developer', 'migration', 'react'],
        },
      ],
    },
  ],

  skills: {
    soft: [
      {
        name: 'Communication',
        level: 'advanced',
        tags: ['developer', 'presentation', 'documentation'],
      },
      {
        name: 'Leadership',
        level: 'intermediate',
        tags: ['developer', 'project-management'],
      },
    ],
    technical: [
      {
        name: 'JavaScript',
        level: 'advanced',
        tags: ['developer', 'backend', 'web'],
      },
      {
        name: 'React',
        level: 'advanced',
        tags: ['frontend', 'spa'],
      },
      {
        name: 'Node.js',
        level: 'advanced',
        tags: ['backend', 'api'],
      },
      {
        name: 'Docker',
        level: 'intermediate',
        tags: ['devops', 'containers'],
      },
    ],
  },

  achievements: [
    {
      title: 'Top 10% Developer in Hackathon 2023',
      tags: ['hackathon', 'award', 'innovation'],
      date: new Date('2023-08-10'),
      awarded_by: 'DevPost',
      summary: [
        {
          text: 'Built a blockchain-based voting system with real-time analytics.',
          tags: ['developer', 'blockchain', 'analytics', 'real-time'],
        },
      ],
    },
  ],

  education: [
    {
      institution: 'University of Technology',
      tags: ['university', 'cs'],
      field: [
        {
          text: 'Computer Science',
          tags: ['developer', 'software'],
        },
      ],
      degree_level: [
        {
          text: 'Bachelor',
          tags: ['undergraduate', 'bachelor'],
        },
      ],
      startDate: new Date('2012-09-01'),
      endDate: new Date('2016-06-30'),
      score: '3.8/4.0',
    },
  ],

  publications: [
    {
      name: 'Optimizing React Performance for Enterprise Apps',
      tags: ['react', 'performance', 'article'],
      publisher: 'Medium',
      releaseDate: new Date('2022-05-15'),
      url: 'https://medium.com/@alicejohnson/react-performance',
      summary: [
        {
          text: 'An in-depth guide on profiling and improving React app speed.',
          tags: ['developer', 'optimization'],
        },
      ],
    },
  ],

  otherLists: [
    {
      tags: ['developer', 'opensource'],
      heading: [
        {
          text: 'Open Source Projects',
          tags: ['developer'],
        },
      ],
      summary: [
        {
          text: 'Maintainer of a popular TypeScript utility library with over 2K stars.',
          tags: ['developer', 'typescript', 'library'],
        },
      ],
    },
    {
      tags: ['certification'],
      heading: [
        {
          text: 'Certifications',
          tags: ['certified'],
        },
      ],
      summary: [
        {
          text: 'AWS Certified Solutions Architect – Associate',
          tags: ['aws', 'cloud', 'certified'],
        },
      ],
    },
  ],
};

export const developerTagFilterdResume: RESUME = {
  version: '1',
  personal_details: {
    name: 'Alice Johnson',
    tag_line: [
      {
        text: 'Full-Stack Developer specializing in React and Node.js',
        tags: ['developer', 'full-stack', 'react', 'nodejs'],
      },
    ],
    summary: [
      {
        text: 'Experienced software engineer with 5+ years in designing scalable web applications and cloud systems.',
        tags: ['developer', 'cloud', 'experience', 'javascript', 'typescript'],
      },
    ],
    email: 'alice.johnson@example.com',
    phone: '+1 555-123-4567',
    date_of_birth: '1990-05-15',
    address: {
      address_line: '123 Tech Lane',
      city: 'San Francisco',
      country: 'USA',
    },
    social_links: [
      {
        name: 'GitHub',
        url: 'https://github.com/alicejohnson',
        tags: ['developer', 'portfolio'],
      },
    ],
  },
  work_experience: [
    {
      company: 'TechNova Inc.',
      tags: ['developer', 'development', 'team-lead'],
      position: [
        {
          text: 'Senior Full-Stack Developer',
          tags: ['developer', 'react', 'nodejs', 'typescript'],
        },
      ],
      website: 'https://technova.com',
      start_date: new Date('2020-01-01T00:00:00.000Z'),
      end_date: new Date('2023-12-31T00:00:00.000Z'),
      summary: [
        {
          text: 'Led a team of 6 engineers to build microservice-based architectures.',
          tags: ['developer', 'microservices', 'agile'],
        },
      ],
      highlights: [
        {
          text: [
            'Reduced page load times by 40% through frontend optimization.',
            'Migrated legacy systems to modern React/TypeScript stack.',
          ],
          tags: ['developer', 'migration', 'react'],
        },
      ],
    },
  ],
  skills: {
    soft: [
      {
        name: 'Communication',
        level: 'advanced',
        tags: ['developer', 'presentation', 'documentation'],
      },
      {
        name: 'Leadership',
        level: 'intermediate',
        tags: ['developer', 'project-management'],
      },
    ],
    technical: [
      {
        name: 'JavaScript',
        level: 'advanced',
        tags: ['developer', 'backend', 'web'],
      },
    ],
  },
  achievements: [],
  education: [],
  publications: [],
  otherLists: [
    {
      tags: ['developer', 'opensource'],
      heading: [
        {
          text: 'Open Source Projects',
          tags: ['developer'],
        },
      ],
      summary: [
        {
          text: 'Maintainer of a popular TypeScript utility library with over 2K stars.',
          tags: ['developer', 'typescript', 'library'],
        },
      ],
    },
  ],
};
