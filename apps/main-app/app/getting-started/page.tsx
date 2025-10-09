import { auth } from "@/lib/auth";
import GettingStartedForm from "@/components/getting-started-page";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";

async function GettingStarted() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    permanentRedirect("/auth/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (user?.completedSignup === "true") permanentRedirect("/user/profile");
  return (
    <GettingStartedForm
      defaultData={{
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        email: user?.email as string,
      }}
    />
  );
}

export default GettingStarted;
