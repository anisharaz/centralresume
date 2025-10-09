"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPasswordSchema } from "@/lib/schemas";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import forgot_password_img from "@/public/forgot-password.png";

type ForgotPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      const res = await authClient.resetPassword({
        newPassword: values.newPassword,
        token: token || "",
      });
      if (res.data?.status) {
        setIsSuccess(true);
      } else {
        form.setError("root", {
          type: "manual",
          message: res.error?.message || "Failed to reset password",
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg bg-black/60 backdrop-blur-md rounded-xl py-8">
          <CardHeader className="space-y-1">
            <Image
              src={forgot_password_img}
              alt="Invalid Request"
              width={100}
              height={100}
              className="h-16 w-16 mx-auto mb-1 bg-neutral-700 rounded-full p-2"
            />
            <CardTitle className="text-2xl font-bold text-center text-red-600">
              Invalid Request
            </CardTitle>
            <CardDescription className="text-center">
              No valid token provided for password reset
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg bg-black/60 backdrop-blur-md rounded-xl py-8">
          <CardHeader className="space-y-1">
            <Image
              src={forgot_password_img}
              alt="Password Reset Successful"
              width={100}
              height={100}
              className="h-16 w-16 mx-auto mb-1 bg-neutral-700 rounded-full p-2"
            />
            <CardTitle className="text-2xl font-bold text-center text-green-600">
              Password Reset Successful
            </CardTitle>
            <CardDescription className="text-center">
              Your password has been successfully updated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link
                href="/auth/login"
                className="text-sm text-blue-500 hover:underline flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-lg bg-black/60 backdrop-blur-md rounded-xl py-8">
        <CardHeader className="space-y-1">
          <Image
            src={forgot_password_img}
            alt="Reset Password"
            width={100}
            height={100}
            className="h-16 w-16 mx-auto mb-1 bg-neutral-700 rounded-full p-2"
          />
          <CardTitle className="text-2xl font-bold text-center">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>

              {form.formState.errors.root && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {form.formState.errors.root.message}
                </p>
              )}
            </form>
          </Form>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-500 hover:underline flex items-center justify-center"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
          Loading...
        </div>
      }
    >
      <ResetForm />
    </Suspense>
  );
}

export default ResetPasswordPage;
