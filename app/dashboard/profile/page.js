import { ProfileForm } from "@/components/profile-form"

export const metadata = {
  title: "Profile ",
  description: "Manage your profile",
}

export default function ProfilePage() {
  return (
    <div className="space-y-6 mt-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <ProfileForm />
    </div>
  )
}

