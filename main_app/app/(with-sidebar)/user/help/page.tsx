"use client";

import { ContactForm } from "@/components/landing-page/contactus-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HelpCircle,
  MessageSquare,
  Book,
  Settings,
  User,
  FileText,
  Download,
  Shield,
} from "lucide-react";

const helpTopics = [
  {
    title: "Getting Started",
    icon: <Book className="w-5 h-5" />,
    content:
      "Welcome to CentralResume! Start by creating your first resume through the Resume section. Use our step-by-step wizard to add your personal information, work experience, education, and skills. You can preview and download your resume at any time.",
  },
  {
    title: "Resume Templates",
    icon: <FileText className="w-5 h-5" />,
    content:
      "Choose from our variety of professional resume templates including Modern, Classic, Creative, and ATS-friendly formats. Each template is designed to highlight your skills effectively, and you can switch between templates without losing your data.",
  },
  {
    title: "Account Management",
    icon: <Settings className="w-5 h-5" />,
    content:
      "Manage your account settings from the Profile section. Update your personal information, change your password, or manage your account preferences. All changes will automatically sync across your resumes.",
  },
  {
    title: "Download & Export",
    icon: <Download className="w-5 h-5" />,
    content:
      "Download your resume in multiple formats including PDF, Word (.docx), and plain text. PDF format is recommended for most job applications as it preserves formatting across different devices and systems.",
  },
  {
    title: "Privacy & Security",
    icon: <Shield className="w-5 h-5" />,
    content:
      "Your data is secure with us. We use industry-standard encryption and security measures to protect your personal information. You have full control over your data and can export or delete your account at any time.",
  },
];

function HelpPage() {
  return (
    <div className="container mx-auto max-w-6xl p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team
          for personalized assistance.
        </p>
      </div>

      {/* Help Topics */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <Book className="w-6 h-6" />
          Help Topics
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {topic.icon}
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {topic.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div>
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
      <Card>
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
      </Card>
    </div>
  );
}

export default HelpPage;
