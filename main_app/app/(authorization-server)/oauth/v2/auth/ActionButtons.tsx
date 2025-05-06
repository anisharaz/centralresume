"use client";

import { AllowOauthAccessToGeneralTag } from "@/app/actions/oauth";
import { authClient } from "@/auth";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
function ActionButtons() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }
  async function HandleAllow() {
    setLoading(true);
    const res = await AllowOauthAccessToGeneralTag({
      client_id: searchParams.get("client_id") as string,
      redirect_uri: searchParams.get("redirect_uri") as string,
      code_challenge: searchParams.get("code_challenge") as string,
      code_challenge_method: searchParams.get(
        "code_challenge_method"
      ) as string,
      scope: searchParams.get("scope") as string,
      response_type: searchParams.get("response_type") as string,
    });
    if (!res.success) {
      alert(res.message);
    }
    setLoading(false);
  }
  return (
    <>
      <Button variant="outline">Cancel</Button>
      {session ? (
        <>
          <Button onClick={HandleAllow}>
            {loading ? "Loading..." : "Allow"}
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              router.push(
                `/auth/login?redirect=${encodeURIComponent(
                  window.location.href
                )}`
              );
            }}
          >
            SignIn
          </Button>
        </>
      )}
    </>
  );
}

export default ActionButtons;
