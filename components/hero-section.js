"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Roboto, Lexend_Giga, Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });
const lexendgiga = Lexend_Giga({ subsets: ["latin"], weight: ["400"], variable: "--font-playfair" });

export function HeroSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-6 md:px-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-2 leading-tight">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              <span className={montserrat.className}>Manage</span> <br />
              <span className={`${lexendgiga.className} leading-5 tracking-wider `}>Your Tasks</span> <br />
              <span className={montserrat.className}>Efficiently</span>
            </h1>
          </div>

          <p className={`${roboto.className} mx-auto max-w-[700px] text-gray-600 md:text-lg`}>
            Stay organized, focused, and in control of your daily tasks with our intuitive todo application.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            {isAuthenticated ? (
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                Get Started
              </Button>
            ) : (
              <>
                <Link href="/signup">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white cursor-pointer">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
