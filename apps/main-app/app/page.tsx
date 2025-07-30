import { auth } from "@/lib/auth";
import LandingPage from "@/components/landing-page";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import prisma from "@/lib/db";

async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    permanentRedirect("/user/profile");
  }
  const users = await prisma.user.count();
  const resumes = await prisma.resumeTags.count();
  return (
    <LandingPage
      activeUsers={users.toString()}
      resumeCreated={resumes.toString()}
    />
  );
}

export default Home;
