"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createOauthClientSchema } from "@/lib/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateOauthClient } from "@/app/actions/oauth";
import { useRouter } from "next/navigation";
function CreateOauthClientForm() {
  const router = useRouter();
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
    const res = await CreateOauthClient(values);
    if (res.success) {
      form.reset();
      router.refresh();
    } else {
      form.setError("root", { message: "Client Created Successfully" });
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">
        Create Client
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Fill the details</DialogTitle>
              {/* <DialogDescription></DialogDescription> */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="redirectUri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Redirect URL <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-2">
                  {form.formState.isSubmitting ? "..." : "Submit"}
                </Button>
              </DialogFooter>
            </DialogHeader>
            <div className="text-red-600">
              {form.formState.errors.root?.message}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOauthClientForm;
