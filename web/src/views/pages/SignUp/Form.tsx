import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { cn } from "@/app/lib/utils";
import { routes } from "@/app/Router/routes";
import { Button } from "@/views/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/views/components/ui/card";
import { Input } from "@/views/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/views/components/ui/form";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { toast } from "sonner";
import { UserSignUpInput, userSignUpSchema } from "@/app/schemas/user";
import { ComponentPropsWithoutRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/views/components/ui/select";
import { getUserRoleOptions } from "@/app/constants/userRole";

export function SignUpForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof userSignUpSchema>>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "analyst",
    },
  });

  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function onSubmit(values: UserSignUpInput) {
    try {
      await signUp(values);

      toast.success("User successfully created. \nRedirecting to sign in...");

      navigate(routes.signIn);
    } catch (error: any) {
      toast.error("Failed to sign up", {
        description: error?.message,
      });
    }
  }

  function SignUpButton() {
    if (form.formState.isSubmitting) {
      return (
        <Button disabled className="gap-1">
          <Loader2 className="animate-spin h-[1.2rem] w-[1.2rem]" />
          Please wait
        </Button>
      );
    }

    return <Button className="w-full">Sign up</Button>;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Payturismo</CardTitle>
          <CardDescription>Register a new user</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Role</SelectLabel>
                                  {getUserRoleOptions().map(
                                    ({ label, value }) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <SignUpButton />
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to={routes.signIn}
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
