"use client";

import Image from "next/image";
import Footer from "./footer";
import { CheckCircle, Zap, Shield, Smartphone, Menu, X } from "lucide-react";
import React, { Ref, RefObject, useEffect, useRef } from "react";
import WaitlistForm from "./waitlist-form";
import { Button } from "./ui/button";
const benefits = [
  {
    title: "Smart Tagging System",
    description: {
      caption:
        'Tag every detail on your resume with job - specific labels like "frontend_dev", "backend_dev", or "marketing".Our intelligent system automatically generates tailored resume versions based on your tags, saving you hours of manual work.',
      points: [
        "Create unlimited resume variations",
        "Automatic content filtering by tags",
        "Job-specific skill highlighting",
      ],
    },
    image: {
      url: "/1.svg",
      scale: "scale-[1]",
      background:
        "bg-[radial-gradient(ellipse_at_bottom,_#ef4444,_transparent,_#fed7aa)]",
    },
    background:
      "bg-[radial-gradient(circle_at_left,_#4c0d2e,_transparent,_transparent)]",
  },
  {
    title: "Persistent Resume Links",
    description: {
      caption:
        "Share one permanent link that automatically updates whenever you modify your resume. No more sending new links or uploading files repeatedly. Your shared resume stays current automatically.",
      points: [
        "One link, always up-to-date",
        "Instant PDF downloads",
        "Share across all platforms",
      ],
    },
    image: {
      url: "/2.svg",
      scale: "scale-[1.05]",
      background:
        "bg-[radial-gradient(ellipse_at_top_left,_#14b8a6,_transparent,_#84cc16))]",
    },
    background:
      "bg-[radial-gradient(circle_at_bottom_right,_#082f49,_transparent,_transparent)]",
  },
  {
    title: "Universal Job Platform Integration",
    description: {
      caption:
        'Our "Login with CentralResume" API allows job platforms to integrate one-click resume sharing. Apply to jobs as easily as signing in with Google, eliminating the need to recreate profiles everywhere.',
      points: [
        "Create unlimited resume variations",
        "Automatic content filtering by tags",
        "Job-specific skill highlighting",
      ],
    },
    image: {
      url: "/3.svg",
      scale: "scale-[0.9]",
      background:
        "bg-[radial-gradient(ellipse_at_bottom_left,_#fcd34d,_transparent,_#f43f5e)]",
    },
    background:
      "bg-[radial-gradient(circle_at_top_right,_#3b82f6,_transparent,_#db2777)]",
  },
  {
    title: "AI-Optimized Standard Format",
    description: {
      caption:
        "Our standardized resume structure enables superior AI parsing and matching. Generate professional PDFs in multiple styles while maintaining data consistency and improving your visibility to automated systems.",
      points: [
        "Enhanced AI compatibility",
        "Multiple PDF templates",
        "Better job matching",
      ],
    },
    image: {
      url: "/4.svg",
      scale: "scale-[1]",
      background:
        "bg-[radial-gradient(ellipse_at_bottom_right,_#b45309,_transparent,_#831843)]",
    },
    background:
      "bg-[radial-gradient(circle_at_bottom,_#0e7490,_transparent,_transparent)]",
  },
];

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
      <div className=" w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className={"p-1 rounded-full " + image.background}>
          <Image
            src={image.url}
            alt=""
            width={1000}
            height={1000}
            className={
              "h-auto rounded-2xl transition-shadow duration-300 " + image.scale
            }
          />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="p-10  max-sm:p-2 pt-4 flex flex-col items-center">
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

function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [blend, setBlend] = React.useState(true);

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setBlend(false);
        } else {
          setBlend(true);
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return (
    <div className="fixed z-[9999] w-full flex justify-center items-center">
      <nav
        className={`m-1 p-2 w-full max-w-[1400px] flex items-center justify-start max-md:flex-col max-md:items-start max-md:gap-2 transition-all duration-300 ease-in-out  rounded-lg ${(!blend || (isOpen && blend)) && "bg-[color-mix(in_oklab,_var(--input)_30%,_transparent)] backdrop-blur-2xl border"}`}
      >
        {/* Logo and Hamburger Menu */}
        <div className="flex justify-between w-fit max-md:w-full px-2 max-md:py-2">
          <div className="font-bold flex justify-center items-center">
            Central#Resume
          </div>
          <div className="hidden max-md:flex justify-center items-center">
            <button
              className="focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? <Menu /> : <X />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex items-center justify-between px-2 w-full  ${isOpen ? "flex-col" : "max-md:hidden"}`}
        >
          <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:w-full max-md:pb-4 max-md:items-stretch">
            {/*<div className="bg-pink-500">Home</div>
          <div>Features</div>*/}
          </div>
          <div className="flex items-center justify-between max-md:w-full max-md:items-start gap-4">
            <Button
              variant="outline"
              className=" px-4 py-2 rounded-fulltransition-colors"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function LandingPage() {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 50); // Adjust the delay as needed

    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`flex flex-col min-h-screen overflow-x-hidden transition-all duration-200 ease-in-out ${loaded ? "blur-none" : "blur-sm"}`}
    >
      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full min-h-screen relative bg-[radial-gradient(circle_at_bottom,_#d97706,_transparent,_transparent)]">
        <div className="flex flex-col items-center text-center max-w-xl md:max-w-4xl z-10 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
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
            made easy
          </h1>
          <p className="text-sm md:text-xl mb-8">
            Create, manage and share your resume with people, recruiter or job
            platforms from one place with amazing features like{" "}
            <span className="text-amber-300"> &quot;LoginWithResume&quot;</span>{" "}
            and more listed below.
          </p>
          <WaitlistForm />
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
      <section className="flex flex-col items-center justify-center w-full p-20">
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
      {benefits.map((benefit, index) => (
        <BenefitSection
          key={index}
          title={benefit.title}
          description={benefit.description}
          image={benefit.image}
          background={benefit.background}
          side={index % 2 === 0 ? "left" : "right"}
        />
      ))}

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who have streamlined their resume
            management with CentralResume. Start your journey to more efficient
            job applications today.
          </p>
          <div className="p-8 max-w-lg mx-auto">
            <WaitlistForm />
            <p className="text-sm text-blue-100 mt-4">
              Get notified when we launch. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
