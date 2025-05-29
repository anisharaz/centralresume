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

export const ACHIEVEMENTS_DUMMY_DATA = [
  {
    title: "Best Innovation Award 2023",
    date: new Date("2023-12-15"),
    awarded_by: "TechCorp Inc.",
    summary: [
      {
        text: "Recognized for developing an AI-powered automation tool that reduced manual processing time by 75%.",
      },
      {
        text: "Led a cross-functional team of 8 members to deliver the project ahead of schedule.",
      },
    ],
  },
  {
    title: "Employee of the Year",
    date: new Date("2022-11-20"),
    awarded_by: "Innovatech Solutions",
    summary: [
      {
        text: "Awarded for exceptional performance and leadership in driving team productivity.",
      },
      {
        text: "Mentored 5 junior developers and improved overall team code quality by 40%.",
      },
    ],
  },
  {
    title: "Hackathon Winner - FinTech Challenge",
    date: new Date("2022-06-10"),
    awarded_by: "Dev Community",
    summary: [
      {
        text: "First place winner among 200+ participants for building a blockchain-based payment solution.",
      },
      {
        text: "Completed the entire application in 48 hours with real-time transaction processing.",
      },
    ],
  },
  {
    title: "AWS Certified Solutions Architect",
    date: new Date("2021-09-05"),
    awarded_by: "Amazon Web Services",
    summary: [
      {
        text: "Professional certification demonstrating expertise in designing distributed systems on AWS.",
      },
    ],
  },
  {
    title: "Open Source Contributor Recognition",
    date: new Date("2021-03-22"),
    awarded_by: "GitHub",
    summary: [
      {
        text: "Recognized for significant contributions to popular open-source projects with over 500 commits.",
      },
    ],
  },
];

export const EDUCATION_DUMMY_DATA = [
  {
    institution: "Stanford University",
    field: [{ text: "Computer Science" }, { text: "Software Engineering" }],
    degree_level: [{ text: "Master of Science" }],
    startDate: new Date("2018-09-01"),
    endDate: new Date("2020-06-15"),
    score: "3.8/4.0",
  },
  {
    institution: "University of California, Berkeley",
    field: [{ text: "Computer Science" }],
    degree_level: [{ text: "Bachelor of Science" }],
    startDate: new Date("2014-08-25"),
    endDate: new Date("2018-05-20"),
    score: "3.6/4.0",
  },
  {
    institution: "Community College of San Francisco",
    field: [{ text: "General Studies" }],
    degree_level: [{ text: "Associate Degree" }],
    startDate: new Date("2012-09-01"),
    endDate: new Date("2014-06-10"),
    score: "3.9/4.0",
  },
];

export const PUBLICATIONS_DUMMY_DATA = [
  {
    name: "Machine Learning in Modern Web Development: A Comprehensive Guide",
    publisher: "Tech Publications Inc.",
    releaseDate: new Date("2023-11-15"),
    url: "https://techpublications.com/ml-web-dev-guide",
    summary: [
      {
        text: "A comprehensive guide covering the integration of machine learning models into web applications using modern frameworks.",
      },
      {
        text: "Includes practical examples, best practices, and performance optimization techniques for ML-powered web apps.",
      },
    ],
  },
  {
    name: "Optimizing React Performance: Advanced Techniques and Patterns",
    publisher: "Medium",
    releaseDate: new Date("2023-08-22"),
    url: "https://medium.com/@johndoe/react-performance-optimization",
    summary: [
      {
        text: "An in-depth article exploring advanced React optimization techniques including memoization, code splitting, and virtual DOM optimizations.",
      },
      {
        text: "Featured article with over 10,000 reads and positive feedback from the developer community.",
      },
    ],
  },
];

export const OTHER_LISTS_DUMMY_DATA = [
  {
    heading: [{ text: "Open Source Projects" }],
    summary: [
      {
        text: "Maintainer of a popular TypeScript utility library with over 2,000 stars on GitHub.",
      },
      {
        text: "Contributor to React ecosystem packages with cumulative downloads exceeding 100K monthly.",
      },
      {
        text: "Created developer tools that improved workflow efficiency for teams across multiple organizations.",
      },
    ],
  },
  {
    heading: [{ text: "Professional Certifications" }],
    summary: [
      {
        text: "AWS Certified Solutions Architect – Associate (Valid until 2026)",
      },
      { text: "Google Cloud Professional Developer Certificate" },
      { text: "Microsoft Azure Fundamentals (AZ-900)" },
      { text: "Kubernetes Application Developer (CKAD)" },
    ],
  },
  {
    heading: [{ text: "Notable Projects" }],
    summary: [
      {
        text: "E-commerce Platform: Built a full-stack e-commerce solution serving 10,000+ users with real-time inventory management.",
      },
      {
        text: "AI Content Generator: Developed a machine learning-powered content creation tool that increased team productivity by 60%.",
      },
      {
        text: "Mobile Banking App: Led development of a secure banking application with biometric authentication and real-time transactions.",
      },
    ],
  },
  {
    heading: [{ text: "Professional Development" }],
    summary: [
      {
        text: "Advanced React Patterns and Performance Optimization (2023)",
      },
      { text: "Microservices Architecture Design Workshop (2022)" },
      { text: "Leadership in Tech: Managing Engineering Teams (2022)" },
      { text: "Machine Learning for Web Developers Bootcamp (2021)" },
    ],
  },
];
