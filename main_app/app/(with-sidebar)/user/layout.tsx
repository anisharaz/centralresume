import { auth } from "@/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";

async function UserRouteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = await prisma.user.findUnique({
    where: { id: session?.session.userId },
  });

  if (user?.completedSignup === "false") {
    permanentRedirect("/getting-started");
  }

  return children;
}

export default UserRouteLayout;
