"use client";
import { authClient } from "@/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  };

  return (
    <Button className="w-full cursor-pointer" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export function LoginButton() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Button variant={"outline"} className="w-full cursor-pointer" disabled>
        ...
      </Button>
    );
  }

  return (
    <>
      {data ? (
        <Button className="w-full cursor-pointer" asChild>
          <Link href="/user/profile">Dashboard</Link>
        </Button>
      ) : (
        <Button className="w-full cursor-pointer" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </>
  );
}
