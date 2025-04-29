"use client";
import { authClient } from "@/auth";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  if (!session && !isPending) {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
  return JSON.stringify(session);
}
