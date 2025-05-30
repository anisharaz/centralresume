"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Footer from "./footer";

const benefits = [
  {
    title: "Different jobs need tailored resume versions",
    subtitle:
      "You may require different version of resume for different job application with specific details on the resume for that particular job",
    description:
      "Central#resume makes it very easy to create multiple version of your resume with very little effort. You give tag to every detail on your resume and according to tag we generate your resume. Tag can be name of the job profiles you are applying. For e.g. frontend_dev, backend_dev, marketing, product_manager etc. ",
    image: "/1.jpg",
  },
  {
    title: "Resume links break with every update",
    subtitle:
      "Traditionally you share your resume either by link or pdf file. This approach is hard to manage because if you update your resume you need to upload new resume and share a new link again and again. And having multiple resume makes this process a pain",
    description:
      "central#resume make this process very easy by just having one link of your resume and the resume detail will auto update when you make changes to your resume on our platform. And if your require a pdf file, you can always download from that link.",
    image: "/2.jpg",
  },
  {
    title: "What is login with central#resume?",
    description:
      "We have created API which the job platforms like wellfound or any other can use to integrate a button called LOGIN WITH CENTRAL#RESUME on their platform. This button allows you to share your resume with the job portal as easily as you do with login with google. This removed the pain of needing to create a resume profile on every job platform that you use. #Create once use everywhere.",
    image: "/3.jpg",
  },
  {
    title: "Now the best part this whole platform.",
    description:
      "We developed a standard structure of representing the details on the resume. Having a standard structure unlocks a lot of benefits. Since the data is highly structured, AI can now make better use of it and perform activity like resume matching much more efficiently. Using standard format bring uniformity in the resume world where it becomes very easy to share and represent resume. Now, the resume pdf can be generated in different styles with same data with very less effort only because it is in standard format.",
    image: "/4.jpg",
  },
];

function BenefitCard({
  title,
  description,
  image,
}: {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col gap-4 items-center max-w-sm rounded-3xl border-solid border-1 border-[#363b3d] relative hover:shadow-xl hover:top-[-2] transition-shadow duration-300">
      <div className="relative top-0 left-0 aspect-square w-full flex items-center justify-center rounded-t-3xl overflow-hidden">
        <Image src={image} alt={title} fill={true} />
      </div>
      <div className="p-10 pt-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}

function SubscribeNow() {
  return (
    <div className="w-2/3 flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
      <Input placeholder="Email" type="email" />
      <Button>Subscribe Now</Button>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full min-h-screen relative bg-[radial-gradient(circle_at_bottom,_#d97706,_transparent,_transparent)]">
        <div className="flex flex-col items-center text-center max-w-xl md:max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold  mb-4">
            #resume : create once use everywhere
          </h1>
          <p className="text-sm md:text-md mb-8">
            Central resume is a platform for resume where you can create, manage
            and share your resume with people, recruiter or job platforms from
            one place. Read exiting features below or Get started with button
            below.
          </p>

          <SubscribeNow />
        </div>

        <div className="absolute bottom-0 max-lg:h-[18rem] lg:h-[23rem] pt-25 w-full flex flex-col items-center overflow-hidden">
          <Image
            src="/resume.png"
            alt=""
            width={1000}
            height={1000}
            className="w-4/5 max-w-[50rem] rounded-2xl shadow-sm hover:shadow-[-1px_-15px_64px_9px_rgba(0,0,0,0.75)] transition-shadow duration-300"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="flex flex-col items-center justify-center w-full  p-8">
        <h1 className="text-4xl md:text-5xl  pt-10 pb-5">
          Why do i use Central#resume ?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              subtitle={benefit.subtitle}
              description={benefit.description}
              image={benefit.image}
            />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center w-full p-8">
        <div className="w-3/4 flex flex-col items-center justify-center gap-4 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl  pt-10 pb-5">
            Ready to transform your resume experience?
          </h1>
          <p className="text-sm md:text-md mb-8 text-center max-w-2xl">
            Join thousands of professionals who have simplified their resume
            management with CentralResume
          </p>
          <SubscribeNow />
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
