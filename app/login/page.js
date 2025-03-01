import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import NoteSection from "@/components/note-section";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-svh w-screen flex-col items-center justify-center px-8">
      {/* Home Button */}
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">Home</Button>
      </Link>

      {/* Login Form */}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/signup"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
      <NoteSection />
    </div>
  );
}
