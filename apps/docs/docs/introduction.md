---
title: Introduction
sidebar_position: 1
---

_Central#resume is not yet another resume builder. It can build resumes but the main purpose of central#resume is to make resume easy to share among people and easy to comprehendible by AI. Let me explain._

Read the problem so you can better understand the need and purpose of central#resume.

## The Pain points

1. You want to maintain multiple version of your resume for different job applications but don't want to deal with juggling with multiple files and links.

2. Every time you don't want to replace the origin resume file and recreate your resume every time you update some details on it.

3. You want to apply to jobs on multiple platforms but don't want to fill the same details again and again on each platform.

4. You may want to change your resume format but don't want to recreate your resume from scratch.

## What if we have a standard for storing and sharing resumes?

![what if](/img/shrug.png)

And this question made us think in a complete different direction. Instead of storing resume as a file, what if we store it as structured data ( json | yaml ) in a central place and share it as and when needed. This way you can maintain a single source of truth for your resume and share it with multiple people or platforms without worrying about updating multiple files.

Let me explain, what central#resume does and how it benefits us significantly.

## What does central#resume do?

It does a lot of things but let me divide everything into three parts for your better understanding.

### 1. Store resume data in json.

Instead of files, we store resume details in standard structure. The data is in json but the schema is standardized. For example.

```json
{
  "personal_details": {
    "name": "Jane Doe",
    "tag_line": [{ "text": "Open-source enthusiast" }],
    "summary": [
      { "text": "Passionate about developer experience and performance." }
    ],
    "email": "jane.doe@example.com",
    "phone": "+1-555-123-4567",
    "date_of_birth": "1990-04-15",
    "address": {
      "address_line": "123 Main St, Apt 4B",
      "city": "San Francisco",
      "country": "USA"
    },
    "social_links": [
      { "name": "Twitter", "url": "https://twitter.com/janedoe" }
    ]
  }
}
```

### 2. And the most important part is TAGs.

Every detail in the resume json has a tag associated with it. just like example image below. Now based on the tags we filter the data and that will create a version of your resume.

You may be confused about what i just said. Lets take an example. For instance, if you’re applying for a software developer position, you might want a version of your resume that only includes details relevant to that role. Similarly, you might create another version tailored for a DevOps position.

This can be done by assigning tags to each detail on your resume—when you generate a resume using a specific tag, only the tagged details for that role will appear.

```
work_experience: {
  company: string;
  tags: {
    // highlight-next-line
    tag: string;
  }[];
  position: {
    text: string;
    tags: {
      // highlight-next-line
      tag: string;
    }[];
  }[];
```

### 3. Sharing made easy.

We use oAuth to share resume. The best example here is _login with google_. Similar to login with google, you can share your resume to job platforms using login with central#resume (if they support it).

![oauth](/img/login-button.svg)

## These approach brings us multiple outcomes 🎁

Outcomes deserve as dedicated section, so continue reading
[here...](/docs/outcomes)
