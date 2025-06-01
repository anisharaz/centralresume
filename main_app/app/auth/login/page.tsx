import { auth } from "@/auth";
import LoginForm from "@/components/auth/login-form";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";

async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    permanentRedirect("/user/profile");
  }
  return <LoginForm />;
}

export default LoginPage;
