"use client";
import { authClient } from "@/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function LogoutButton() {
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

export default LogoutButton;
