"use client";
import { authClient } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  // if (!session && !isPending) {
  //   authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: "/",
  //   });
  // }
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <Button
        onClick={() => {
          authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        User Login
      </Button>
    </>
  );
}
