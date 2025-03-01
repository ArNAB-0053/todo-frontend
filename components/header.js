"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { Logo } from "./Logo";

const Header = ({dashboard = false}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  return (
    <header className={`sticky top-0 z-10 border-b bg-background/95 backdrop-blur ${!dashboard && "px-8 lg:px-10 xl:px-16"}`}>
      <div className="container flex h-16 items-center justify-between">
        <span className={`${dashboard ? "ml-12 md:ml-0" : "ml-0" }`}>
        <Logo/>
        </span>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button
                className={`cursor-pointer max-md:hidden ${dashboard && "hidden"}`}
                onClick={() => router.push("/dashboard")}
              >
                Get Started
              </Button>
              <UserNav />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className={`cursor-pointer ${dashboard && "hidden"}`}>
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className={`cursor-pointer ${dashboard && "hidden"}`}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
