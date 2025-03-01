import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import NoteSection from "@/components/note-section";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="container flex h-svh w-screen flex-col items-center justify-center relative px-8">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">Home</Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <SignUpForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>

      <NoteSection />
    </div>
  );
}
