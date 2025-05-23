"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WaitlistForm from "./waitlist-form";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth";

export default function LandingPage() {
  const router = useRouter();
  const { data } = authClient.useSession();

  const [showNavbar, setShowNavbar] = useState(false);
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
      title:
        "You may require different version of resume for different job application with specific details on the resume for that particular job.",
      description:
        "Central#resume makes it very easy to create multiple version of your resume with very little effort. You give tag to every detail on your resume and according to tag we generate your resume. Tag can be name of the job profiles you are applying. For e.g. frontend_dev, backend_dev, marketing, product_manager etc. ",
      icon: CheckCircle,
      image: "/1.png",
    },
    {
      title:
        "Traditionally you share your resume either by link or pdf file. This approach is hard to manage because if you update your resume you need to upload new resume and share a new link again and again. And having multiple resume makes this process a pain.",
      description:
        "central#resume make this process very easy by just having one link of your resume and the resume detail will auto update when you make changes to your resume on our platform. And if your require a pdf file, you can always download from that link.",
      icon: CheckCircle,
      image: "/2.png",
    },
    {
      title: "What is LOGIN WITH CENTRAL#RESUME?",
      description:
        "We have created API which the job platforms like wellfound or any other can use to integrate a button called LOGIN WITH CENTRAL#RESUME on their platform. This button allows you to share your resume with the job portal as easily as you do with login with google. This removed the pain of needing to create a resume profile on every job platform that you use. #Create once use everywhere.",
      icon: CheckCircle,
      image: "/3.png",
    },
    {
      title: "Now the best part this whole platform.",
      description:
        "We developed a standard structure of representing the details on the resume. Having a standard structure unlocks a lot of benefits. Since the data is highly structured, AI can now make better use of it and perform activity like resume matching much more efficiently. Using standard format bring uniformity in the resume world where it becomes very easy to share and represent resume. Now, the resume pdf can be generated in different styles with same data with very less effort only because it is in standard format.",
      icon: CheckCircle,
      image: "/4.png",
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
              className="max-w-[1000px] text-lg md:text-2xl text-white/90"
            >
              Central resume is a platform for resume where you can create,
              manage and share your resume with people, recruiter or job
              platforms from one place. Read exiting features below or Get
              started with button below.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* <Button
                onClick={() => {
                  if (data) {
                    router.push("/user/profile");
                    return;
                  }
                  router.push("/auth/login");
                }}
                size="lg"
                className="bg-green-400 hover:bg-green-500 cursor-pointer text-black font-bold px-8 py-6 text-lg rounded-full"
              >
                {data ? "Dashboard" : "Get started"}{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button> */}
              <WaitlistForm />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-20 left-1/2 transform z-20 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ArrowRight className="h-10 w-10 text-white transform rotate-90" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-400 to-pink-500  border-gray-200">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
            Why do i use <span className="text-cyan-400">Central</span>
            <span className="text-yellow-300">#resume</span> ?
          </h2>

          <div className="grid bg-gradient-to-r from-purple-400 rounded-2xl to-pink-600 gap-12 md:gap-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 1 ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-start border-b-4 border-white/50 md:items-center  gap-6 rounded-xl text-white p-6 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 relative">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Image
                      src={benefit.image}
                      alt={`Benefit ${index + 1} illustration`}
                      className="w-full h-full object-cover"
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4 ">
                  <div className="flex items-center space-x-4">
                    <benefit.icon className="h-8 min-w-8 text-yellow-300" />
                    <h3 className="text-xl font-semibold underline underline-offset-4">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-lg">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
