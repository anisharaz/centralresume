"use client";

import Image from "next/image";
import Footer from "../footer";
import { CheckCircle, FileStack, Key, Star, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import WaitlistForm from "./waitlist-form";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contactus-form";
import { benefitsData } from "./benefits-section-data";
import { NavBar } from "../navbar";
import FAQSection from "./faq-section";
import { faqData } from "./faq-data";
import { Noto_Sans } from "next/font/google";

const notoSansFont = Noto_Sans({
  subsets: ["latin-ext"],
  weight: "500",
});

export default function LandingPage({
  activeUsers,
  resumeCreated,
}: {
  activeUsers: string;
  resumeCreated: string;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 50); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

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
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-wider mb-4 leading-16 ${notoSansFont.className}`}
          >
            Resume :{" "}
            <span className="underline decoration-blue-300 decoration-2 underline-offset-8">
              {" "}
              Sharing
            </span>{" "}
            and{" "}
            <span className="underline decoration-blue-300 decoration-2 underline-offset-8">
              {" "}
              management
            </span>{" "}
            made effortless
          </h1>
          <p className="text-sm md:text-xl mb-8 text-white/80 text-center">
            Create and share your resume effortlessly from a single platform —
            whether it&apos;s with recruiters, individuals, or job portals.
            Enjoy features like a
            <span className="font-bold underline decoration-2 underline-offset-4 decoration-amber-600">
              {" "}
              live-updating resume link{" "}
            </span>{" "}
            and{" "}
            <span className="font-bold underline decoration-2 underline-offset-4 decoration-amber-600">
              {" "}
              one-click resume sharing with job platforms{" "}
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

      {/* Features Section */}
      <section className="py-10 md:py-20 px-4 bg-gradient-to-br from-gray-900/50 via-slate-900 to-black relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white relative">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              A big leap in{" "}
            </span>{" "}
            <span className="relative">
              Resume
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse"></div>
            </span>
          </h2>

          {/* Horizontal Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-center">
            <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-105">
                <FileStack className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white leading-tight">
                Effortless Resume version
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                We help you create different resume versions for each job
                application super easily and quick.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white leading-tight">
                We all hate re sharing resume link when we update our resume.
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Keep your resume up-to-date with real-time updates. No more
                sending outdated versions to recruiters.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
                <Key className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white leading-tight">
                You can save your time from repetitive profile creation on every
                job website.
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                No need to manually fill out job applications. Just log in with
                CentralResume and share your resume with a single click.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white leading-tight">
                AI friendly resume.
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Pdf resume and text parsing often confuse AI systems and it
                makes mistakes. Our platform uses well structured data layout
                that&apos;s easy for AI to read, analyze, and rank effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Join the Central<span className="text-amber-300">#Resume</span>{" "}
            Community
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the job seekers who have streamlined their resume process
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {activeUsers}
              </div>
              <div className="text-sm text-gray-300">Active Users</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {resumeCreated}
              </div>
              <div className="text-sm text-gray-300">Resumes Created</div>
            </div>
          </div>
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

      {/* FAQ section */}
      <FAQSection
        faqs={faqData}
        className="bg-[radial-gradient(ellipse_at_center,_#1e293b,_transparent,_#0f172a)]"
      />

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
                  We typically respond to all inquiries. For urgent matters,
                  mail us at{" "}
                  <span className="text-amber-300">
                    contact@centralresume.me
                  </span>
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
      className={cn([
        "flex flex-col  items-center justify-center w-full xl:min-h-screen max-lg:min-h-[80vh] max-sm:min-h-screen gap-4 p-10 ",
        side === "left" ? "md:flex-row" : "md:flex-row-reverse",
        background,
      ])}
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
