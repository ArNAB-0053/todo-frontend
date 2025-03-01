"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

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
      // 🔹 Call API Service Instead of fetch()
      await apiService.register({ name, email, password })
      
      toast.success("Account created successfully! Redirecting...")
  
      // Auto login after registration
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
  
      if (signInResult?.error) {
        throw new Error(signInResult.error)
      }
  
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("google", { redirect: false })
      if (result?.error) throw new Error("Failed to sign in with Google")
      
      toast.success("Signed in with Google! Redirecting...")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

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
