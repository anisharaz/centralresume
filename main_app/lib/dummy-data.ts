import { ENGINEERING_RESUME } from "./types";

export const dummyResumeData: ENGINEERING_RESUME = {
  version: "1",
  personal_details: {
    name: "John Doe",
    tag_line: [
      {
        text: "Full Stack Engineer passionate about clean code.",
        tags: ["#devops"],
      },
    ],
    summary: [
      {
        text: "Experienced developer with a focus on backend scalability and reliability.",
        tags: ["#devops"],
      },
    ],
    email: "johndoe@example.com",
    phone: "+1234567890",
    date_of_birth: "1990-01-01",
    address: {
      address_line: "123 Developer Lane",
      city: "San Francisco",
      country: "USA",
    },
    social_links: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/johndoe",
        tags: ["#devops"],
      },
      { name: "GitHub", url: "https://github.com/johndoe", tags: ["#devops"] },
    ],
  },

  work_experience: [
    {
      company: "TechCorp Inc.",
      tags: ["#devops"],
      position: [{ text: "Site Reliability Engineer", tags: ["#devops"] }],
      website: "https://techcorp.com",
      start_date: new Date("2019-06-01"),
      end_date: new Date("2022-12-01"),
      summary: [
        {
          text: "Maintained and scaled distributed systems across multiple regions.",
          tags: ["#devops"],
        },
      ],
      highlights: [
        {
          text: ["Built monitoring dashboards", "Reduced downtime by 30%"],
          tags: ["#devops"],
        },
      ],
    },
    {
      company: "DevSolutions",
      tags: ["#devops"],
      position: [{ text: "DevOps Engineer", tags: ["#devops"] }],
      website: "https://devsolutions.com",
      start_date: new Date("2016-01-01"),
      end_date: new Date("2019-05-31"),
      summary: [
        {
          text: "Implemented CI/CD pipelines and automated infrastructure provisioning.",
          tags: ["#devops"],
        },
      ],
      highlights: [
        {
          text: [
            "Deployed Jenkins for CI/CD",
            "Dockerized legacy applications",
          ],
          tags: ["#devops"],
        },
      ],
    },
  ],

  skills: {
    soft: [
      { name: "Communication", level: "advanced", tags: ["#devops"] },
      { name: "Teamwork", level: "intermediate", tags: ["#devops"] },
    ],
    technical: [
      { name: "TypeScript", level: "advanced", tags: ["#devops"] },
      { name: "Kubernetes", level: "advanced", tags: ["#devops"] },
      { name: "Terraform", level: "intermediate", tags: ["#devops"] },
    ],
  },

  achievements: [
    {
      title: "Top Open Source Contributor",
      tags: ["#devops"],
      date: new Date("2021-10-01"),
      awarded_by: "GitHub",
      summary: [
        {
          text: "Recognized for contributions to popular JS libraries.",
          tags: ["#devops"],
        },
      ],
    },
    {
      title: "AWS Certified DevOps Engineer",
      tags: ["#devops"],
      date: new Date("2020-08-15"),
      awarded_by: "Amazon Web Services",
      summary: [
        {
          text: "Certification in DevOps tools and practices on AWS.",
          tags: ["#devops"],
        },
      ],
    },
  ],

  education: [
    {
      institution: "MIT",
      tags: ["#devops"],
      field: [{ text: "Computer Science", tags: ["#devops"] }],
      degree_level: [{ text: "Bachelor", tags: ["#devops"] }],
      startDate: new Date("2010-08-01"),
      endDate: new Date("2014-05-31"),
      score: "3.9/4.0",
    },
  ],

  publications: [
    {
      name: "Distributed Systems in Practice",
      tags: ["#devops"],
      publisher: "O'Reilly Media",
      releaseDate: new Date("2023-03-01"),
      url: "https://example.com/distributed-systems",
      summary: [
        {
          text: "Guide to building resilient systems at scale.",
          tags: ["#devops"],
        },
      ],
    },
  ],

  otherLists: [
    {
      tags: ["#devops"],
      heading: [{ text: "Certifications", tags: ["#devops"] }],
      summary: [
        { text: "Docker Mastery, Kubernetes in Production", tags: ["#devops"] },
      ],
    },
    {
      tags: ["#devops"],
      heading: [{ text: "Projects", tags: ["#devops"] }],
      summary: [
        {
          text: "Built a full-stack blogging platform with Next.js and PostgreSQL.",
          tags: ["#devops"],
        },
      ],
    },
  ],
};
