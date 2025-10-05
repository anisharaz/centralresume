import LandingPage from "@/components/landing-page";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";
async function HomePage() {
  const users = await prisma.user.count();
  const resumes = await prisma.resumeTags.count();
  return (
    <LandingPage
      activeUsers={users.toString()}
      resumeCreated={resumes.toString()}
    />
  );
}

export default HomePage;
