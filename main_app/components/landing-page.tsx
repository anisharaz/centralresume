"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Footer from "./footer";
import { CheckCircle, Zap, Shield, Smartphone } from "lucide-react";

function SubscribeNow() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
      <Input
        placeholder="Enter your email address"
        type="email"
        className="max-w-md"
      />
      <Button className="whitespace-nowrap">Get Early Access</Button>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full min-h-screen relative bg-[radial-gradient(circle_at_bottom,_#d97706,_transparent,_transparent)]">
        <div className="flex flex-col items-center text-center container md:gap-6 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            #resume : create once use everywhere
          </h1>
          <p className="text-muted-foreground text-sm md:text-md mb-8 max-w-3xl">
            Central resume is a platform for resume where you can create, manage
            and share your resume with people, recruiter or job platforms from
            one place. Read exiting features below or Get started with button
            below.
          </p>

          <SubscribeNow />
        </div>

        <div className="absolute bottom-0 max-lg:h-[18rem] lg:h-[23rem] max-sm:h-[15rem] pt-25 w-full flex flex-col items-center overflow-hidden">
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

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Solution:{" "}
              <span className="underline decoration-blue-300 decoration-4 underline-offset-8">
                Central
                <span className="text-amber-300">#resume </span>
              </span>{" "}
              Management
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              CentralResume solves these challenges with innovative features
              designed for modern job seekers.
            </p>
          </div>

          {/* Feature 1: Smart Tagging */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Smart Tagging System
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                  Tag every detail on your resume with job-specific labels like
                  &quot;frontend_dev&quot;, &quot;backend_dev&quot;, or
                  &quot;marketing&quot;. Our intelligent system automatically
                  generates tailored resume versions based on your tags, saving
                  you hours of manual work.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Create unlimited resume variations
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Automatic content filtering by tags
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Job-specific skill highlighting
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-2xl">
                  <Image
                    src="/1.svg"
                    alt="Smart Tagging System"
                    width={500}
                    height={400}
                    className="scale-125"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Persistent Links */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-blue-500 to-teal-600 p-8 rounded-2xl">
                  <Image
                    src="/2.svg"
                    alt="Persistent Resume Links"
                    width={500}
                    height={400}
                    className="scale-150"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Persistent Resume Links
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                  Share one permanent link that automatically updates whenever
                  you modify your resume. No more sending new links or uploading
                  files repeatedly. Your shared resume stays current
                  automatically.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      One link, always up-to-date
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Instant PDF downloads
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Share across all platforms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Universal Login */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Universal Job Platform Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                  Our &quot;Login with CentralResume&quot; API allows job
                  platforms to integrate one-click resume sharing. Apply to jobs
                  as easily as signing in with Google, eliminating the need to
                  recreate profiles everywhere.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      One-click job applications
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Create once, use everywhere
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Platform-agnostic solution
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl">
                  <Image
                    src="/3.svg"
                    alt="Universal Integration"
                    width={500}
                    height={400}
                    className="scale-125"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Standardized Format */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                  <Image
                    src="/4.svg"
                    alt="Standardized Resume Format"
                    width={750}
                    height={600}
                    className="scale-110 overflow-clip"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  AI-Optimized Standard Format
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                  Our standardized resume structure enables superior AI parsing
                  and matching. Generate professional PDFs in multiple styles
                  while maintaining data consistency and improving your
                  visibility to automated systems.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Enhanced AI compatibility
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Multiple PDF templates
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Better job matching
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            Trusted by Job Seekers Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                95%
              </div>
              <div className="text-gray-600 dark:text-gray-300">Time Saved</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                on resume management
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Active Users
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                and growing
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Platform Integrations
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                coming soon
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <SubscribeNow />
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
