"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "./auth-provider"

interface Notification {
  id: string
  title: string
  message: string
  type: "prescription" | "refill" | "appointment" | "queue" | "disposal" | "system"
  urgent: boolean
  read: boolean
  createdAt: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  sendNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Prescription Ready",
    message: "Your Lisinopril prescription is ready for pickup.",
    type: "prescription",
    urgent: false,
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "notif-2",
    title: "Urgent Refill Needed",
    message: "Your Metformin prescription will run out in 3 days. Please request a refill.",
    type: "refill",
    urgent: true,
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "notif-3",
    title: "Queue Update",
    message: "You are next in line for pickup. Please proceed to counter 3.",
    type: "queue",
    urgent: false,
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  // Load notifications on mount
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, use mock data
        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Failed to load notifications:", error)
      }
    }

    if (user) {
      loadNotifications()
    }
  }, [user])

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Send a new notification
  const sendNotification = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast notification if user has preferences enabled
    if (user?.preferences?.notifications) {
      const { email, sms, push, urgentOnly } = user.preferences.notifications

      // Only show toast for urgent notifications if urgentOnly is true
      if (push && (!urgentOnly || (urgentOnly && notification.urgent))) {
        toast({
          title: notification.title,
          description: notification.message,
          variant: notification.urgent ? "destructive" : "default",
        })
      }

      // In a real app, we would also send email/SMS notifications here
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        sendNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
