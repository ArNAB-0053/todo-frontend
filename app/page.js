import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header/>
      <main className="flex-1 max-md:mt-20">
        <HeroSection />
      </main>
      <footer className="border-t py-6 px-8 lg:px-10 xl:px-16">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Todo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

