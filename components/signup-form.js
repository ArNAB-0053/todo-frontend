"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { apiService } from "@/lib/api-service"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
  
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
  
    try {
      // Register the user
      const registerResponse = await apiService.register({ name, email, password })
      
      if (!registerResponse?.message) {
        throw new Error("Invalid response from server");
      }
      
      toast.success("Account created successfully! Logging in...")
  
      // Now login to get the token
      const loginResponse = await apiService.login({ email, password })
      
      if (!loginResponse?.token) {
        throw new Error("Login failed after registration");
      }
      
      // Store the token from login response
      localStorage.setItem("token", loginResponse.token);
      
      // Also sign in with next-auth
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
  
      if (signInResult?.error) {
        throw new Error(signInResult.error)
      }
  
      toast.success(`Welcome, ${loginResponse.user?.name || name || "User"}!`)
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      // console.error("Registration Error:", error);
      // Check for specific error messages from the server
      const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleSignIn = async () => {
    toast.info("Google Sign-in is unavailable. Please use the standard login method.")
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="John Doe" disabled={isLoading} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="name@example.com" type="email" disabled={isLoading} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" disabled={isLoading} required />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignIn}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}