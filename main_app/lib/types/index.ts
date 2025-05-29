export type AllowOauthAccessToGeneralTagParams = {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  code_challenge: string;
  code_challenge_method: string;
  scope: string;
};

type TAGS = string[];

interface RESUME_INTERFACE {
  version: string; // eg . "1" , "2"
  personal_details: {
    name: string;
    tag_line: {
      text: string;
      tags: TAGS;
    }[];
    summary: {
      text: string;
      tags: TAGS;
    }[];
    email: string;
    phone?: string;
    date_of_birth?: string;
    address?: {
      address_line: string;
      city: string;
      country: string;
    };
    social_links: {
      name: string;
      url: string;
      tags: TAGS;
    }[];
  };

  work_experience: {
    company: string;
    tags: TAGS;
    position: {
      text: string;
      tags: TAGS;
    }[];
    website?: string;
    start_date: Date;
    end_date?: Date;
    summary: {
      text: string;
      tags: TAGS;
    }[];
    highlights: {
      text: string[];
      tags: TAGS;
    }[];
  }[];

  skills: {
    soft: {
      name: string;
      level?: string; // eg. "beginner", "intermediate", "advanced"
      tags: string[];
    }[];
    technical: {
      name: string;
      level?: string;
      tags: string[];
    }[];
  };

  achievements: {
    title: string;
    tags: string[];
    date: Date;
    awarded_by?: string; // eg. "Google", "Microsoft", Dev.to
    summary: {
      text: string;
      tags: string[];
    }[];
  }[];

  education: {
    institution: string;
    tags: string[];
    field: {
      // eg. "Computer Science", "Software Engineering"
      text: string;
      tags: string[];
    }[];
    degree_level: {
      // eg. "Bachelor", "Master", "PhD"
      text: string;
      tags: string[];
    }[];
    startDate: Date;
    endDate: Date;
    score: string; // eg. "3.5/4.0", "80%"
  }[];

  publications: {
    //eg "Research Papers", "Books", "Articles"
    name: string;
    tags: string[];
    publisher: string;
    releaseDate: Date;
    url: string;
    summary: {
      text: string;
      tags: string[];
    }[];
  }[];

  otherLists: {
    // eg. "Projects", "Courses", "Certifications"
    tags: string[];
    heading: {
      text: string;
      tags: string[];
    }[];
    summary: {
      text: string;
      tags: string[];
    }[];
  }[];
}

export type ResumeDataType = {
  personal_details: {
    name: string;
    tag_line: {
      text: string;
    }[];
    summary: {
      text: string;
    }[];
    email: string;
    phone?: string;
    date_of_birth?: string;
    address?: {
      address_line: string;
      city: string;
      country: string;
    };
    social_links: {
      name: string;
      url: string;
    }[];
  };
  work_experience: {
    company: string;
    position: {
      text: string;
    }[];
    website?: string;
    start_date: Date;
    end_date?: Date;
    summary: {
      text: string;
    }[];
    highlights: {
      text: string[];
    }[];
  }[];
  skills: {
    soft: {
      name: string;
      level?: string; // eg. "beginner", "intermediate", "advanced"
    }[];
    technical: {
      name: string;
      level?: string;
    }[];
  };
  achievements: {
    title: string;
    date: Date;
    awarded_by?: string; // eg. "Google", "Microsoft", Dev.to
    summary: {
      text: string;
    }[];
  }[];
  education: {
    institution: string;
    field: {
      // eg. "Computer Science", "Software Engineering"
      text: string;
    }[];
    degree_level: {
      // eg. "Bachelor", "Master", "PhD"
      text: string;
    }[];
    startDate: Date;
    endDate: Date;
    score: string; // eg. "3.5/4.0", "80%"
  }[];
  publications: {
    //eg "Research Papers", "Books", "Articles"
    name: string;
    publisher: string;
    releaseDate: Date;
    url: string;
    summary: {
      text: string;
    }[];
  }[];
  otherLists: {
    heading: {
      text: string;
    }[];
    summary: {
      text: string;
    }[];
  }[];
};
