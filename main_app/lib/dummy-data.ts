export const PROFILE_DETAIL_DUMMY_DATA = {
  name: "John Doe",
  tag_line: [
    { text: "Full Stack Developer" },
    { text: "React Enthusiast" },
    { text: "Open Source Contributor" },
  ],
  summary: [
    {
      text: "Passionate software developer with 5+ years of experience building modern web applications. I love creating intuitive user experiences and solving complex technical challenges.",
    },
    {
      text: "Specialized in React, TypeScript, and Node.js with a focus on creating user-friendly and scalable solutions. Currently exploring AI integration and serverless architectures.",
    },
  ],
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  date_of_birth: "1995-06-15",
  address: {
    address_line: "123 Tech Street, Apt 4B",
    city: "San Francisco",
    country: "United States",
  },
  social_links: [
    { name: "GitHub", url: "https://github.com/johndoe" },
    { name: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
    { name: "Twitter", url: "https://twitter.com/johndoe" },
    { name: "Portfolio", url: "https://johndoe.dev" },
    { name: "Blog", url: "https://blog.johndoe.dev" },
    { name: "YouTube", url: "https://youtube.com/@johndoe" },
  ],
};

export const WORK_EXPERIENCE_DUMMY_DATA = [
  {
    company: "TechCorp Inc.",
    position: [{ text: "Software Engineer" }, { text: "Team Lead" }],
    website: "https://techcorp.com",
    start_date: new Date("2020-01-15"),
    end_date: new Date("2023-05-28"),
    summary: [
      {
        text: "Developed scalable web applications using React and Node.js.",
      },
      {
        text: "Led a team of 5 engineers to deliver high-quality software solutions.",
      },
    ],
    highlights: [
      {
        text: [
          "Implemented CI/CD pipelines to improve deployment efficiency.",
          "Optimized database queries, reducing response time by 30%.",
        ],
      },
    ],
  },
  {
    company: "Innovatech Solutions",
    position: [{ text: "Junior Developer" }],
    website: "https://innovatech.com",
    start_date: new Date("2018-06-01"),
    end_date: new Date("2019-12-31"),
    summary: [
      {
        text: "Assisted in the development of internal tools and dashboards.",
      },
      {
        text: "Collaborated with cross-functional teams to gather requirements.",
      },
    ],
    highlights: [
      {
        text: [
          "Contributed to open-source projects, enhancing company visibility.",
          "Automated repetitive tasks, saving 10+ hours weekly.",
        ],
      },
    ],
  },
];

export const SKILLS_DUMMY_DATA = {
  soft: [
    { name: "Communication", level: "advanced" },
    { name: "Leadership", level: "intermediate" },
    { name: "Problem Solving", level: "advanced" },
    { name: "Team Collaboration", level: "advanced" },
    { name: "Time Management", level: "intermediate" },
    { name: "Adaptability", level: "advanced" },
  ],
  technical: [
    { name: "JavaScript", level: "advanced" },
    { name: "TypeScript", level: "advanced" },
    { name: "React", level: "advanced" },
    { name: "Node.js", level: "intermediate" },
    { name: "Python", level: "intermediate" },
    { name: "Docker", level: "beginner" },
    { name: "AWS", level: "intermediate" },
    { name: "PostgreSQL", level: "intermediate" },
    { name: "MongoDB", level: "beginner" },
    { name: "Git", level: "advanced" },
  ],
};
