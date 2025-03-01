"use client";
import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import Header from "@/components/header";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMDScreen, setIsMDScreen] = useState(false);
  const [isLGScreen, setIsLGScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMDScreen(window.innerWidth >= 768);
      setIsLGScreen(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-svh">
      {/* Sidebar */}
      <aside className="hidden md:fixed md:top-0 md:left-0 md:z-30 md:h-full md:w-48 lg:w-64 md:border-r md:bg-gray-100 md:block md:overflow-y-auto">
        <div className="flex flex-col items-start justify-center border-b p-4">
          <p className="text-sm text-gray-700 font-medium">
            Stay productive and manage your tasks efficiently.
          </p>
        </div>
        <DashboardNav />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col items-start justify-center border-b p-4">
          <Logo />
        </div>
        <DashboardNav />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main
        className={cn(
          "flex flex-col overflow-hidden transition-all duration-300 px-8 lg:px-10 xl:px-16",
          isLGScreen
            ? "w-[calc(100vw-16rem)] ml-64"
            : isMDScreen
            ? "w-[calc(100vw-12rem)] ml-48"
            : "w-full ml-0"
        )}
      >
        {/* Mobile Menu Button */}
        <div className="p-4 md:hidden absolute left-2 top-0.5 z-20">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <Header dashboard={true} />
        {children}
      </main>
    </div>
  );
}
