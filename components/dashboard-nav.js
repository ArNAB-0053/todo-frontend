"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "check",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "userCircle",
  },
  {
    title: "GitHub",
    icon: "github",
    subItems: [
      {
        title: "Frontend",
        href: "https://github.com/ArNAB-0053/todo-frontend", 
        external: true,
      },
      {
        title: "Backend",
        href: "https://github.com/ArNAB-0053/todo-backend", 
        external: true,
      },
    ],
  },
  {
    title: "Postscript",
    href: "#",
    icon: "danzer", 
    hasPulse: true,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item, index) => {
        const Icon = Icons[item.icon];
        const isActive = pathname === item.href;

        // Regular button content for items without subItems
        const buttonContent = (
          <Button
            variant={isActive && !item.subItems && !item.hasPulse ? "default" : "ghost"}
            className={cn(
              "w-full justify-start relative",
              isActive && !item.subItems && !item.hasPulse && "bg-primary text-primary-foreground"
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {item.title}
            {item.hasPulse && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-black animate-pulse" />
            )}
          </Button>
        );

        // Separator after "Profile" (index 1)
        const isAfterProfile = index === 1;
        const separator = isAfterProfile ? (
          <div className="my-2 border-t border-gray-300" />
        ) : null;

        // GitHub subItems
        if (item.subItems) {
          return (
            <div key={item.title} className="space-y-1">
              <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-600">
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </div>
              {item.subItems.map((subItem) => {
                const isSubActive = pathname === subItem.href;
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant={isSubActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start pl-8 text-sm",
                        isSubActive && "bg-primary text-primary-foreground"
                      )}
                    >
                      {subItem.title}
                    </Button>
                  </Link>
                );
              })}
              {separator}
            </div>
          );
        }

        // External link (none here now, handled in subItems)
        if (item.external) {
          return (
            <div key={item.href}>
              <Link href={item.href} target="_blank" rel="noopener noreferrer">
                {buttonContent}
              </Link>
              {separator}
            </div>
          );
        }

        // Postscript with dialog
        if (item.hasPulse) {
          return (
            <div key={item.title}>
              <Button
                variant="ghost"
                onClick={() => setIsNotesModalOpen(true)}
                className="w-full justify-start relative border border-gray-600 rounded-md mt-4"
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {item.title}
                <span className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-black animate-pulse" />
              </Button>
              <Dialog open={isNotesModalOpen} onOpenChange={setIsNotesModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Postscript</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      To keep this assignment simple and deliver it quickly, I've implemented this as a basic feature.
                    </p>
                    <p>
                      In the interest of time, I may have overlooked some more robust error handling and security measures that I'd typically include in a production environment.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              {separator}
            </div>
          );
        }

        // Dashboard, Profile
        return (
          <div key={item.href}>
            <Link href={item.href}>
              {buttonContent}
            </Link>
            {separator}
          </div>
        );
      })}
    </nav>
  );
}