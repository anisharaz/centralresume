"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { authClient } from "@/auth";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setShowNavbar(window.scrollY > heroHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      title: "Centralized Resume Management",
      description:
        "Reduces the effort to create and maintain resume for different profiles (e.g., Developer, CA, marketing, lawyer, etc.)",
      icon: CheckCircle,
    },
    {
      title: "Easy Sharing",
      description:
        "Easy to share resume using resume link. No need to download and maintain different resume PDF files. Updating the resume is easy and in a central place. Imagine you can update your resume even after sharing it with others in case you need a correction.",
      icon: CheckCircle,
    },
    {
      title: "Real-time Updates",
      description:
        "You can add more skills to your resume, and it will automatically reflect to whoever you shared the resume link with. No need to download the resume and reshare it again.",
      icon: CheckCircle,
    },
    {
      title: "Standardized Format",
      description:
        "A standard protocol for resume management. It makes resume sharing and maintaining easy. Along with this, it also helps us use better search and filter to find the best one because of the standard format of the resume.",
      icon: CheckCircle,
    },
    {
      title: "Universal Login",
      description:
        'Providing your resume to a job portal becomes as easy as "login with Google." You no longer need to enter data and create your profile on every job portal you use. Just create one and use "login with central resume." Even if you need to update your resume, you can through our website, and every other job website will reflect the new changes. It saved you a lot of time.',
      icon: CheckCircle,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar show={showNavbar} />

      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-r from-purple-400 to-pink-500"
      >
        <div className="absolute inset-0 bg-[url('/hero_bg.svg?height=1080&width=1920')] bg-cover bg-center opacity-70 z-10"></div>
        <div className="container px-4 md:px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
            >
              <span className="text-yellow-300 ">#resume</span> : create once
              use everywhere
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[800px] text-lg md:text-xl text-white/90"
            >
              Login With Google but for{" "}
              <span className="underline underline-offset-8 bg-gradient-to-r from-amber-200 to-amber-400 p-1 rounded-xl text-black">
                #resume
              </span>
              . Basically, central resume is oAuth for resume. You can create,
              manage, and share your resume across all platforms from one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={() => {
                  if (session) router.push("/user/profile");
                  router.push("/auth/login");
                }}
                size="lg"
                className="bg-green-400 hover:bg-green-500 cursor-pointer text-black font-bold px-8 py-6 text-lg rounded-full"
              >
                {session ? "Dashboard" : "Get started"}{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-20 left-1/2 transform z-20 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ArrowRight className="h-10 w-10 text-black transform rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-100 border-t border-b border-gray-200">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose <span className="text-cyan-600">Central</span>
            <span className="text-blue-600">Resume</span>?
          </h2>

          <div className="grid gap-12 md:gap-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-xl shadow-lg p-6 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 relative">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <img
                      src={`/placeholder.svg?height=400&width=600&text=Benefit+${
                        index + 1
                      }`}
                      alt={`Benefit ${index + 1} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <benefit.icon className="h-8 w-8 text-cyan-500" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-400 to-pink-500 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to transform your resume experience?
            </h2>
            <p className="max-w-[600px] text-lg text-white/90">
              Join thousands of professionals who have simplified their resume
              management with CentralResume
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-full"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
