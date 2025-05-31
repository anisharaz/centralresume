"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createOauthClientSchema } from "@/lib/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateOauthClient } from "@/app/actions/oauth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Globe, Key, Link, Info, CheckCircle } from "lucide-react";
import { toast } from "sonner";

function CreateOauthClientForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof createOauthClientSchema>>({
    resolver: zodResolver(createOauthClientSchema),
    defaultValues: {
      name: "",
      description: "",
      redirectUri: "",
      website: "",
      icon: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createOauthClientSchema>) {
    try {
      const res = await CreateOauthClient(values);
      if (res.success) {
        form.reset();
        setIsOpen(false);
        toast.success("OAuth client created successfully!");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to create OAuth client");
        form.setError("root", { message: res.message });
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      form.setError("root", { message: "An unexpected error occurred" });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create OAuth Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl">Create OAuth Client</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Create a new OAuth application to allow other services to access
            user resume data securely.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Information Card */}
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      OAuth Client Setup
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      After creation, you&apos;ll receive a Client ID and Client
                      Secret. Keep the secret secure and never expose it in
                      client-side code.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Application Name
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="My Awesome App"
                            {...field}
                            className="transition-all focus:ring-2"
                          />
                        </FormControl>
                        <FormDescription>
                          The name displayed to users during authorization
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://myapp.com"
                            {...field}
                            className="transition-all focus:ring-2"
                          />
                        </FormControl>
                        <FormDescription>
                          Your application&apos;s homepage
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of what your application does..."
                          className="resize-none transition-all focus:ring-2"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Help users understand what your application does
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* OAuth Configuration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">OAuth Configuration</h3>
                </div>

                <FormField
                  control={form.control}
                  name="redirectUri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Redirect URI
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://myapp.com/auth/callback"
                          {...field}
                          className="transition-all focus:ring-2"
                        />
                      </FormControl>
                      <FormDescription>
                        Where users will be redirected after authorization. Must
                        be HTTPS in production.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Future feature placeholder */}
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Icon URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://myapp.com/icon.png"
                          {...field}
                          className="transition-all focus:ring-2"
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        Coming soon: Upload or provide a URL for your app icon
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Error Message */}
            {form.formState.errors.root && (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="pt-4">
                  <p className="text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex items-center gap-2"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Create Client
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOauthClientForm;
