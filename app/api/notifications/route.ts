import { NextResponse } from "next/server"

// This would be a database model in a real application
interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "prescription" | "refill" | "appointment" | "general"
  urgent: boolean
  read: boolean
  createdAt: string
}

// Mock database of notifications
const notifications: Notification[] = [
  {
    id: "1",
    userId: "user-1",
    title: "Prescription Ready",
    message: "Your Lisinopril prescription is ready for pickup.",
    type: "prescription",
    urgent: false,
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user-1",
    title: "Refill Reminder",
    message: "Your Metformin prescription will need a refill in 5 days.",
    type: "refill",
    urgent: true,
    read: false,
    createdAt: new Date().toISOString(),
  },
]

/**
 * GET handler for fetching notifications
 * @param request - The incoming request
 */
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by userId
  // const userId = auth.getUserId(request);
  const userId = "user-1" // Mock user ID

  // Get query parameters
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const urgentOnly = searchParams.get("urgentOnly") === "true"

  // Filter notifications
  let filteredNotifications = notifications.filter((notification) => notification.userId === userId)

  if (type) {
    filteredNotifications = filteredNotifications.filter((notification) => notification.type === type)
  }

  if (urgentOnly) {
    filteredNotifications = filteredNotifications.filter((notification) => notification.urgent)
  }

  return NextResponse.json({ notifications: filteredNotifications })
}

/**
 * POST handler for creating a new notification
 * @param request - The incoming request
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.title || !body.message || !body.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new notification
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      userId: body.userId,
      title: body.title,
      message: body.message,
      type: body.type,
      urgent: body.urgent || false,
      read: false,
      createdAt: new Date().toISOString(),
    }

    // In a real app, we would save to a database
    notifications.push(newNotification)

    // In a real app, we would also trigger push notifications here
    // if the user has enabled them

    return NextResponse.json({ notification: newNotification }, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}

/**
 * PATCH handler for marking notifications as read
 * @param request - The incoming request
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.notificationId) {
      return NextResponse.json({ error: "Missing notification ID" }, { status: 400 })
    }

    // Find and update the notification
    const notificationIndex = notifications.findIndex((n) => n.id === body.notificationId)

    if (notificationIndex === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    // Update the notification
    notifications[notificationIndex] = {
      ...notifications[notificationIndex],
      read: true,
    }

    return NextResponse.json({
      notification: notifications[notificationIndex],
    })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}
