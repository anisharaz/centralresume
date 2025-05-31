"use client";

import Image from "next/image";
import Footer from "./footer";
import { CheckCircle, Zap, Shield, Smartphone } from "lucide-react";
import WaitlistForm from "./waitlist-form";

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

          <WaitlistForm />
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            The Resume Management Challenge
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Job seekers face multiple challenges when managing their
            professional profiles across different platforms and opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">
                Multiple Versions
              </h3>
              <p className="text-sm text-muted-foreground">
                Creating different resume versions for each job application is
                time-consuming
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">
                Broken Links
              </h3>
              <p className="text-sm text-muted-foreground">
                Resume links become outdated every time you make updates
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">
                Platform Silos
              </h3>
              <p className="text-sm text-muted-foreground">
                Recreating profiles on every job platform wastes valuable time
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">
                Format Issues
              </h3>
              <p className="text-sm text-muted-foreground">
                Inconsistent formatting makes it hard for AI to parse resumes
                effectively
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Our Solution: Smart Resume Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CentralResume solves these challenges with innovative features
              designed for modern job seekers.
            </p>
          </div>
        </div>

        {/* Feature 1: Smart Tagging */}
        <section className="h-screen flex items-center bg-[radial-gradient(circle_at_left,_#4c0d2e,_transparent,_transparent)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Smart Tagging System
                </h3>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Tag every detail on your resume with job-specific labels like
                  &quot;frontend_dev&quot;, &quot;backend_dev&quot;, or
                  &quot;marketing&quot;. Our intelligent system automatically
                  generates tailored resume versions based on your tags, saving
                  you hours of manual work.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Create unlimited resume variations
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Automatic content filtering by tags
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Job-specific skill highlighting
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-accent to-primary p-8 rounded-full">
                  <Image
                    src="/1.svg"
                    alt="Smart Tagging System"
                    width={500}
                    height={400}
                    className="w-full scale-[1.15] h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Persistent Links */}
        <section className="h-screen flex items-center bg-[radial-gradient(circle_at_bottom_right,_#082f49,_transparent,_transparent)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-full">
                  <Image
                    src="/2.svg"
                    alt="Persistent Resume Links"
                    width={500}
                    height={400}
                    className="w-full scale-[1.15] h-auto rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Persistent Resume Links
                </h3>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Share one permanent link that automatically updates whenever
                  you modify your resume. No more sending new links or uploading
                  files repeatedly. Your shared resume stays current
                  automatically.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      One link, always up-to-date
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Instant PDF downloads
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Share across all platforms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Universal Login */}
        <section className="h-screen flex items-center bg-[radial-gradient(ellipse_at_top_right,_#3b82f6,_transparent,_#db2777)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Universal Job Platform Integration
                </h3>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Our &quot;Login with CentralResume&quot; API allows job
                  platforms to integrate one-click resume sharing. Apply to jobs
                  as easily as signing in with Google, eliminating the need to
                  recreate profiles everywhere.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      One-click job applications
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Create once, use everywhere
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Platform-agnostic solution
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-secondary to-accent p-8 rounded-full">
                  <Image
                    src="/3.svg"
                    alt="Universal Integration"
                    width={500}
                    height={400}
                    className="w-full scale-[1.1] h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: Standardized Format */}
        <section className="h-screen flex items-center bg-[radial-gradient(ellipse_at_bottom,_#0e7490,_transparent,_transparent)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="bg-gradient-to-br from-accent to-primary p-8 rounded-full">
                  <Image
                    src="/4.svg"
                    alt="Standardized Resume Format"
                    width={500}
                    height={400}
                    className="w-full scale-[1.15] h-auto rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  AI-Optimized Standard Format
                </h3>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Our standardized resume structure enables superior AI parsing
                  and matching. Generate professional PDFs in multiple styles
                  while maintaining data consistency and improving your
                  visibility to automated systems.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Enhanced AI compatibility
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Multiple PDF templates
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Better job matching
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Trusted by Job Seekers Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-md border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                95%
              </div>
              <div className="text-card-foreground">Time Saved</div>
              <div className="text-sm text-muted-foreground mt-1">
                on resume management
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md border">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                10K+
              </div>
              <div className="text-card-foreground">Active Users</div>
              <div className="text-sm text-muted-foreground mt-1">
                and growing
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md border">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                50+
              </div>
              <div className="text-card-foreground">Platform Integrations</div>
              <div className="text-sm text-muted-foreground mt-1">
                coming soon
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform your resume management?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of professionals who have streamlined their resume
            management with CentralResume. Start your journey to more efficient
            job applications today.
          </p>
          <div className="rounded-2xl py-6 max-w-md mx-auto ">
            <WaitlistForm />
            <p className="text-base text-primary-foreground/70 mt-4">
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
