---
title: The Protocol
sidebar_position: 3
slug: the-protocol
---

The goal here is to standardize the sharing and storage of resume data. We want a simple yet powerful way of representing resumes that can be easily shared across platforms and services.

## How do we store resume?

Data Structure

### structure of _TAGS_

```
TAGS = [
    {tag: string}
    {tag: string}
    ...
]
```

### Schema of Personal Details

```ts
{
  name: string;
  tag_line: {
    text: string;
    tags: TAGS;
  }[];
  summary?: {
    text: string;
    tags: TAGS;
  }[];
  email: string;
  phone?: string;
  date_of_birth?: string;
  address?: {
    address_line?: string;
    city?: string;
    country?: string;
  };
  social_links?: {
    name: string;
    url: string;
    tags: TAGS;
  }[];
}
```

### Schema of Work Experience

```ts
[
  {
    company: string;
    tags: TAGS;
    position: {
      text: string;
      tags: TAGS;
    }[];
    website?: string;
    start_date: string;
    end_date?: string;
    summary: {
      text: string;
      tags: TAGS;
    }[];
    highlights: {
      text: string[];
      tags: TAGS;
    }[];
  }
]
```

### Schema of Skills

```ts
{
  soft: {
    name: string;
    level?: string;
    tags: TAGS;
  }[];
  technical: {
    name: string;
    level?: string;
    tags: TAGS;
  }[];
}
```

### Schema of Projects

```ts
[
  {
    title: string;
    tags: TAGS;
    startDate?: string;
    endDate?: string;
    summary: string;
    url?: string;
  }
]
```

### Schema of Education

```ts
[
  {
    institution: string;
    tags: TAGS;
    field: {
      text: string;
      tags: TAGS;
    }[];
    degree_level: {
      text: string;
      tags: TAGS;
    }[];
    startDate: string;
    endDate: string;
    score?: string;
  }
]
```

### Schema of Achievements

```ts
[
  {
    title: string;
    tags: TAGS;
    date: string;
    awarded_by?: string;
    summary: {
      text: string;
      tags: TAGS;
    }[];
  }
]
```

### Schema of Publications

```ts
[
  {
    name: string;
    tags: TAGS;
    publisher: string;
    releaseDate: string;
    url?: string;
    summary: {
      text: string;
      tags: TAGS;
    }[];
  }
]
```

### Schema of Other Lists

```ts
[
  {
    tags: TAGS;
    heading: {
      text: string;
      tags: TAGS;
    }[];
    summary: {
      text: string;
      tags: TAGS;
    }[];
  }
]
```

## How do we share resume?

We use Oauth2 flow to allow users to share their resume data with third-party applications securely. Users can authorize these applications to access their resume data. While being able to select which tag to share. [Learn more about OAuth2](https://oauth.net/2/).
