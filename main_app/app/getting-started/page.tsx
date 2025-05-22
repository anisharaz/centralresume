import { auth } from "@/auth";
import { ResumeForm } from "@/components/getting-started-form/resume-form";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";

async function GettingStarted() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (user?.completedSignup === "true") permanentRedirect("/user/profile");
  return <ResumeForm />;
}

export default GettingStarted;
