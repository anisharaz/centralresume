"use client";
import { authClient } from "@/auth";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  if (!session && !isPending) {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
  return (
    <>
      <Link
        href="/oauth/v1/auth?scope=%23general%20%23devops"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        OAuth
      </Link>
      <div>{JSON.stringify(session)}</div>
    </>
  );
}
