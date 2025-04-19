interface resume {
  version: string;

  basics: {
    name: string;
    label?: {
      text: string;
      tags: string[];
    }[];
    summary?: {
      text: string;
      tags: string[];
    }[];
    email: string;
    phone?: string;
    dateOfBirth?: string;
    location?: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles?: {
      network: string;
      username: string;
      url: string;
      tags: string[];
    }[];
  };

  work: {
    company: string;
    position: {
      text: string;
      tags: string[];
    }[];
    website: {
      text: string;
      tags: string[];
    }[];
    startDate: Date;
    endDate: Date;
    summary: {
      text: string;
      tags: string[];
    }[];
    highlights: {
      text: string[];
      tags: string[];
    }[];
    tags: string[];
  }[];

  volunteer: {
    organization: string;
    position: {
      text: string;
      tags: string[];
    }[];
    website: {
      text: string;
      tags: string[];
    }[];
    startDate: Date;
    endDate: Date;
    summary: {
      text: string;
      tags: string[];
    }[];
    highlights: {
      text: string[];
      tags: string[];
    }[]
    tags: string[];
  }[];

  education: {
    institution: string;
    area: {
      text: string;
      tags: string[];
    }[];
    studyType: {
      text: string;
      tags: string[];
    }[];
    startDate: Date;
    endDate: Date;
    gpa: string;
    courses: {
      text: string[];
      tags: string[];
    }[];
    tags: string[];
  }[];

  awards: {
    title: string;
    date: Date;
    awarder: string;
    summary: {
      text: string;
      tags: string[];
    }[];
    tags: string[];
  }[];

  publications: {
    name: string;
    publisher: string;
    releaseDate: Date;
    website: string;
    summary: {
      text: string;
      tags: string[];
    }[];
    tags: string[];
  }[];

  skills: {
    name: string;
    level: string;
    categories: string;
    tags: string[];
  }[];

  otherLists: {
    heading: {
      text: string;
      tags: string[];
    }[];
    items: {
      name: {
        text: string;
        tags: string[];
      }[];
      summary: {
        text: string;
        tags: string[];
      }[];
    }[];
    tags: string[];
  }[];
}
