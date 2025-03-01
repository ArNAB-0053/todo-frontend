import { DashboardClient } from "@/components/dashboard-client";

export const metadata = {
  title: "Dashboard",
  description: "Manage your todos",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 relative w-full">
      <div className="flex justify-between items-center mt-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay organized.
          </p>
        </div>
      </div>
      <div className="space-y-6 mt-20">
        <DashboardClient />
      </div>
    </div>
  );
}