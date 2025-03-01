import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Todo.",
    template: "Todo • %s"
  },

  description: "A simple todo application with authentication",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}  suppressHydrationWarning>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}