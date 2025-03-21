import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/components/theme/theme-registry"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/providers/language-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { NotificationProvider } from "@/components/providers/notification-provider"
import AppLayout from "@/components/layout/app-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedTrack - Medication Management System",
  description: "A comprehensive system for managing medications, prescriptions, and pharmacy interactions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeRegistry>
          <AuthProvider>
            <LanguageProvider>
              <NotificationProvider>
                <AppLayout>{children}</AppLayout>
                <Toaster />
              </NotificationProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}



import './globals.css'