"use client";

import Image from "next/image";
import Footer from "../footer";
import { CheckCircle, Zap, Shield, Smartphone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import WaitlistForm from "./waitlist-form";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contactus-form";
import { benefitsData } from "./benefits-section-data";
import { NavBar } from "../navbar";

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 50); // Adjust the delay as needed

    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`flex flex-col min-h-screen overflow-x-hidden transition-all duration-200 ease-in-out ${
        loaded ? "blur-none" : "blur-sm"
      }`}
    >
      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full min-h-screen relative bg-[radial-gradient(circle_at_bottom,_#d97706,_transparent,_transparent)]">
        <div className="flex flex-col items-center text-center max-w-xl md:max-w-4xl z-10 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4 leading-16">
            #resume :{" "}
            <span className="underline decoration-blue-300 decoration-4 underline-offset-8">
              {" "}
              Sharing{" "}
            </span>
            and{" "}
            <span className="underline decoration-blue-300 decoration-4 underline-offset-8">
              {" "}
              management
            </span>{" "}
            made effortless
          </h1>
          <p className="text-sm md:text-xl mb-8 text-white/80 text-center">
            Create and share your resume effortlessly from a single platform —
            whether it&apos;s with recruiters, individuals, or job portals.
            Enjoy features like a
            <span className="font-bold"> live-updating resume link </span> and{" "}
            <span className="font-bold">
              one-click resume sharing with job platforms
            </span>{" "}
            and much more outlined below.
          </p>
          {/* <WaitlistForm /> */}
        </div>

        <div className="absolute bottom-0 max-lg:h-[40vh] lg:h-[40vh] max-sm:h-[32vh] pt-25 w-full flex flex-col items-center overflow-hidden">
          <Image
            src="/resume.png"
            alt=""
            width={1000}
            height={1000}
            className="w-4/5 max-w-[50rem] rounded-2xl shadow-sm hover:shadow-[-1px_-15px_64px_9px_rgba(0,0,0,0.75)] hover:relative hover:top-[-10] transition-shadow duration-300"
          />
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-28 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            The Resume Management Challenge
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Job seekers face multiple challenges when managing their
            professional profiles across different platforms and opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Multiple Versions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Creating different resume versions for each job application is
                time-consuming
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Broken Links
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Resume links become outdated every time you make updates
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Platform Silos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recreating profiles on every job platform wastes valuable time
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Format Issues
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Inconsistent formatting makes it hard for AI to parse resumes
                effectively
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="flex flex-col items-center justify-center w-full p-20 bg-[radial-gradient(circle_at_right,_#0e7490,_transparent,_transparent)]">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white pb-5">
            Our Solution:{" "}
            <span className="underline decoration-blue-300 decoration-4 underline-offset-8">
              Central
              <span className="text-amber-300">#resume </span>
            </span>{" "}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            CentralResume solves these challenges with innovative features
            designed for modern job seekers.
          </p>
        </div>
      </section>
      {benefitsData.map((benefit, index) => (
        <BenefitSection
          key={index}
          title={benefit.title}
          description={benefit.description}
          image={benefit.image}
          background={benefit.background}
          side={index % 2 === 0 ? "left" : "right"}
        />
      ))}
      {/* contact and feedback section */}
      <section
        className="py-20 px-4 bg-[radial-gradient(ellipse_at_top,_#1e293b,_transparent,_#0f172a)]"
        id="contact"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions about CentralResume? Want to share feedback or
              discuss a partnership? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Why Contact Us?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">
                        Product Feedback
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Share your thoughts on features and improvements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">
                        Partnership Opportunities
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Explore integration possibilities for job platforms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">
                        General Support
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Get help with any questions or issues
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">
                        Feature Requests
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Suggest new features for future releases
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h4 className="font-medium text-white mb-2">Quick Response</h4>
                <p className="text-gray-300 text-sm">
                  We typically respond to all inquiries within 24 hours. For
                  urgent matters, we&apos;ll get back to you even sooner.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 p-8 rounded-lg border border-white/10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 text-white bg-[radial-gradient(ellipse_at_bottom_right,_#082f49,_transparent,_transparent)]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay up to date with CentralResume.
          </h2>
          <p className="text-base md:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
            Be the first to know new updates.{" "}
            <span className="text-sm"> (no spam, promise) </span>
          </p>
          <div className="p-4 max-w-lg mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

function BenefitSection({
  title,
  description,
  image,
  background,
  side,
}: {
  title: string | React.ReactNode;
  description: {
    caption: string | React.ReactNode;
    points?: string[] | React.ReactNode[];
  };
  image: { url: string; scale: string; background: string };
  background: string;
  side: "left" | "right";
}) {
  return (
    <section
      className={
        "flex flex-col  items-center justify-center w-full xl:min-h-screen max-lg:min-h-[80vh] max-sm:min-h-screen p-10 " +
        (side === "left" ? "md:flex-row " : "md:flex-row-reverse ") +
        background
      }
    >
      <div className="w-full max-w-2xl md:w-1/2 flex flex-col items-center justify-center">
        <div className={cn([" p-1 rounded-full", image.background])}>
          <Image
            src={image.url}
            alt=""
            width={1000}
            height={1000}
            className={cn([
              "h-auto w-full rounded-2xl transition-shadow duration-300",
              image.scale,
            ])}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="p-10 max-sm:p-2 pt-4 flex flex-col items-center">
          <h2 className="text-4xl font-semibold mb-2">{title}</h2>
          <p className="text-base py-5 text-gray-700 dark:text-gray-300">
            {description.caption}
          </p>
          {description.points &&
            description.points.map((point, index) => (
              <div key={index} className="mb-2 flex justify-start w-full">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                {point}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
