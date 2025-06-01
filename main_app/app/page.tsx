import { auth } from "@/auth";
import LandingPage from "@/components/landing-page";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";

async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    permanentRedirect("/user/profile");
  }

  return <LandingPage />;
}

export default Home;
