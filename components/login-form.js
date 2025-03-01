"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { apiService } from "@/lib/api-service";

export function LoginForm() {
  const router = useRouter();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  async function onSubmit(event) {
    event.preventDefault();
    setIsSignInLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiService.login({ email, password });

      if (!response?.token) {
        throw new Error("Invalid response from server");
      }

      const { token, user } = response;

      localStorage.setItem("token", token);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success(`Welcome back, ${user?.name || "User"}!`);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSignInLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSignInLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="h-auto p-0 text-sm"
                onClick={() => router.push("/forgot-password")}
                type="button"
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isSignInLoading}
              required
            />
          </div>
          <Button disabled={isSignInLoading}>
            {isSignInLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading}
        onClick={handleGoogleSignIn}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
