import React from "react";
import { FAQItem } from "./faq-section";

export const faqData: FAQItem[] = [
  {
    id: "item-1",
    question: (
      <>
        What is <span>centralresume</span>?
      </>
    ),
    answer: (
      <p>
        CentralResume is a platform designed to simplify the process of
        creating, managing, and sharing resumes. It allows users to build a
        central profile that can be used to generate multiple resume versions
        tailored for different job applications. With features like
        live-updating resume links, one-click sharing with job platforms, and
        AI-friendly structured data format, CentralResume streamlines the entire
        resume management process for both job seekers and employers.
      </p>
    ),
  },
  {
    id: "item-2",
    question: (
      <>
        What benefits do I get by using <span>CentralResume</span>?
      </>
    ),
    answer: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-pink-400 mb-3">For Job Seekers:</h4>
          <p className="leading-relaxed mb-3">
            CentralResume makes it super easy to create multiple resume versions
            tailored for different job applications.
          </p>
          <ul className="text-gray-300 space-y-2 ml-4 list-disc">
            <li>Create targeted resume versions with tags</li>
            <li>
              Share live-updating resume links. yes we understand the pain of
              maintaining multiple resume PDFs and links.
            </li>
            <li>
              Skip repetitive profile creation on job sites (if they have
              integrated our system.)
            </li>
            <li>
              Share your profession profile with much better Ui. Similar to how
              you share your social media profile.
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-emerald-500 mb-3">
            For Companies & Recruiters:
          </h4>
          <p className="leading-relaxed mb-3">
            CentralResume provides companies with a standardized way to receive
            and process candidate information for close to perfect matching.
          </p>
          <ul className="text-gray-300 space-y-2 ml-4 list-disc">
            <li>
              Better search and filter features to find perfect candidate.
            </li>
            <li>
              Receive consistently formatted candidate data, Trouble of resume
              parsing is gone.
            </li>
            <li>
              Receive candidates resume in pure structured text and process
              however you want with great efficiency.
            </li>
            <li>Always access up-to-date candidate information</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "item-3",
    question: (
      <>
        How is centralresume <span>different</span> from other job or resume
        creation platforms?
      </>
    ),
    answer: (
      <p>
        We&apos;ve created a new method for storing and accessing resumes by
        using a standardized data format instead of traditional PDFs or document
        files. Think of it like how all debit and credit cards follow a standard
        structure—card number, expiry date, CVV. In the same way, we&apos;ve
        defined a consistent format for resume data. This approach brings
        several advantages: significantly better AI-driven resume matching,
        easier sharing since resumes are now stored as structured strings rather
        than bulky files, and more flexibility in how resumes are used and
        displayed.
      </p>
    ),
  },
  {
    id: "item-4",
    question: (
      <>
        What are <span>tags</span>?
      </>
    ),
    answer: (
      <p>
        Tags are keyword labels you assign to different sections of your resume.
        For example, if you have four work experiences listed but only want to
        showcase two that are relevant to a specific job, you can tag those two
        with a label like &quot;job1.&quot; Then, you can generate a resume link
        or download a PDF that includes only the tagged experiences. This allows
        you to quickly tailor your resume for different job applications without
        having to create separate versions each time.
      </p>
    ),
  },
  {
    id: "item-5",
    question: (
      <>
        What is <span>LoginWithCentralResume</span>?
      </>
    ),
    answer: (
      <p>
        LoginWithCentralResume is a feature that allows you to log in to job
        platforms using your CentralResume profile. This means you can skip the
        tedious process of filling out your profile information on each job
        site. Instead, you can simply log in with your CentralResume account,
        and it will automatically populate your profile with the relevant
        information from your CentralResume profile data.
      </p>
    ),
  },
];
