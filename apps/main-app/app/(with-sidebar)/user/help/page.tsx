"use client";

import { ContactForm } from "@/components/landing-page/contact-us-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HelpCircle,
  Book,
  User,
  FileText,
  Download,
  Shield,
  LifeBuoy,
  Share,
} from "lucide-react";

const helpTopics = [
  {
    title: "Understanding Tags",
    icon: <HelpCircle className="w-5 h-5" />,
    content: (
      <div className="text-muted-foreground">
        Tags are labels you assign to specific details on your resume. When you
        share your resume by creating a link, you can choose the tag. The shared
        resume will then only display the details associated with the selected
        tags. In this way you can create multiple versions of your resume using
        tags.
      </div>
    ),
  },
  {
    title: "Getting Started",
    icon: <Book className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-muted-foreground">
        <div>
          After signing up you will have a tag called #common and you will be
          redirected to profile page. After that you can continue to fill all
          your profile/resume details. By default the #common tag will
          automatically apply on every new detail you continue to add.
        </div>
        <div>
          Now, To create a new version of your resume, go to Tags management and
          click create new tag. Select the #common in the dropdown and enter a
          new tag name in the below input field. Doing this will add a new tag
          to every details you have added in your profile/resume.
        </div>
        <div>
          Congratulation 💫, You just created a new resume version from the
          #common tag. At this point the details on #the_new_tag_you_created tag
          will be same as #common. When you edit the details you will see the
          new tag is added to all the details, from here onwards you can decide
          which details to show on which tag and accordingly add or remove tags
          from the details.
        </div>
      </div>
    ),
  },

  {
    title: "Sharing Your Resume",
    icon: <Share className="w-5 h-5" />,
    content: (
      <div className="text-muted-foreground">
        You can share your resume in 2 different ways.
        <br />
        <br />
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Resume PDF link:</strong> Go to Sharing section and create a
            new resume pdf link. you will be asked to select the tag. Remember,
            the pdf will only have the details based on which tag you select
            when creating the link. You can create as many link and and tags as
            you required without worrying about editing the pdf.
          </li>
          <li>
            <strong>Resume Profile link:</strong> The profile link is similar to
            resume pdf link but it will show the profile UI as you see in the
            profile page. Consider it similar to how you share your LinkedIn
            profile link.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Download & Export",
    icon: <Download className="w-5 h-5" />,
    content: (
      <div className="text-muted-foreground">
        The resume pdf link has a download button on the top which will download
        the PDF of the resume.
      </div>
    ),
  },
  {
    title: "Resume Templates",
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="text-muted-foreground">
        We use a simple, clean, and ATS-friendly resume template. We plan to add
        options for selecting templates in the future.
      </div>
    ),
  },
  {
    title: "Privacy & Security",
    icon: <Shield className="w-5 h-5" />,
    content: (
      <div className="text-muted-foreground">
        Your data is secure with us. We never share your profile/resume data.
      </div>
    ),
  },
];

function HelpPage() {
  return (
    <div className="container mx-auto max-w-6xl p-4 space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Help & Support</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team
          for personalized assistance.
        </p>
      </div>

      {/* Help Topics */}
      <div className="grid gap-6">
        {helpTopics.map((topic, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {topic.icon}
                {topic.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{topic.content}</CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <LifeBuoy className="w-6 h-6" />
          Contact Support
        </h2>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Send us a message and we&apos;ll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>
            Explore more ways to get help and improve your resume building
            experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg space-y-2">
              <h4 className="font-medium">Video Tutorials</h4>
              <p className="text-sm text-muted-foreground">
                Watch step-by-step guides to master our platform features.
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <h4 className="font-medium">Resume Tips Blog</h4>
              <p className="text-sm text-muted-foreground">
                Expert advice on writing effective resumes and cover letters.
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <h4 className="font-medium">Community Forum</h4>
              <p className="text-sm text-muted-foreground">
                Connect with other users and share tips and experiences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}

export default HelpPage;
