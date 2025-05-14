import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Info } from "lucide-react";
import { auth } from "@/auth";
import { headers } from "next/headers";
import ActionButtons from "./ActionButtons";
export default async function OAuthConsentScreen({
  params,
}: {
  params: {
    appName: string;
  };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <div className="h-16 w-16 overflow-hidden rounded-full border bg-white dark:bg-gray-700 p-2">
            <Image
              src="/globe.svg?height=60&width=60"
              width={60}
              height={60}
              alt="App logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-1 text-center">
            <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
              {params.appName} wants to access your account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              This will allow {params.appName} to:
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-6 pt-2">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  View your resume with #general tag
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400"></p>
              </div>
            </div>
          </div>

          {/* 
          // ? terms and condition section
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 text-gray-500" />
              <p className="text-xs text-muted-foreground">
                YourApp will use this information in accordance with their
                <a href="#" className="mx-1 text-primary hover:underline">
                  privacy policy
                </a>
                and
                <a href="#" className="mx-1 text-primary hover:underline">
                  terms of service
                </a>
                .
              </p>
            </div>
          </div> */}
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-between p-4">
          <ActionButtons />
        </CardFooter>
      </Card>
    </div>
  );
}
