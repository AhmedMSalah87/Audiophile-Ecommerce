"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import googleIcon from "@/public/google.svg";
import { useRouter } from "next/navigation";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6).max(10),
});

type loginForm = z.infer<typeof loginSchema>;

export function SignIn() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(formData: loginForm) {
    console.log(formData);
    signIn("credentials", {
      ...formData,
      redirect: false,
    }).then((response) => {
      console.log(response);
      if (response?.error) {
        toast("Invalid email or password.", {
          style: { background: "#900808", border: "none" },
        });
      } else {
        router.push("/");
      }
    });
  }

  return (
    <div className="bg-secondary h-screen flex items-center justify-center">
      <Card className="w-100">
        <CardHeader>
          <CardTitle>Sign In with your E-mail</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-10"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign in</Button>
            </form>
          </Form>
          <div className="text-center my-2">Or</div>
          <Button
            variant="outline"
            onClick={() => signIn("google", { redirectTo: "/" })}
            className="w-full"
          >
            <span>Sign in with google</span>
            <img src={googleIcon.src} alt="google icon" width="24px" />
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>Don't have an account?</p>
          <Button
            asChild
            variant="link"
            size="sm"
            className="text-primary font-bold p-0"
          >
            <Link href="/signup">SIGN UP</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
