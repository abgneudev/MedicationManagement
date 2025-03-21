import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prescription status types
export type PrescriptionStatus = "filled" | "inProgress" | "partial" | "readyForPickup"

// Notification types
export type NotificationType = "email" | "sms" | "push"

// Prescription interface
export interface Prescription {
  id: string
  name: string
  dosage: string
  instructions: string
  status: PrescriptionStatus
  refillsRemaining: number
  lastFilled: string
  nextRefillDate: string
  pharmacy: string
  doctor: string
  urgent: boolean
  sideEffects?: string[]
  allergies?: string[]
  cost?: {
    retail: number
    withInsurance: number
    copay: number
  }
  queuePosition?: number
  estimatedReadyTime?: string
}

// User notification preferences
export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  urgentOnly: boolean
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Get status color based on prescription status
export function getStatusColor(status: PrescriptionStatus): string {
  switch (status) {
    case "filled":
      return "success"
    case "inProgress":
      return "warning"
    case "partial":
      return "info"
    case "readyForPickup":
      return "primary"
    default:
      return "default"
  }
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// Calculate time difference in minutes
export function getTimeDifference(dateString: string): number {
  const date = new Date(dateString)
  const now = new Date()
  return Math.floor((date.getTime() - now.getTime()) / (1000 * 60))
}

// Format time difference
export function formatTimeDifference(minutes: number): string {
  if (minutes < 0) {
    return "Now"
  }
  if (minutes < 60) {
    return `${minutes} min`
  }
  if (minutes < 1440) {
    return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`
  }
  return `${Math.floor(minutes / 1440)} days`
}

// Generate mock prescriptions
export function generateMockPrescriptions(count: number): Prescription[] {
  const mockPrescriptions: Prescription[] = []
  for (let i = 0; i < count; i++) {
    mockPrescriptions.push({
      id: `mock-rx-${i + 1}`,
      name: `Medication ${i + 1}`,
      dosage: `${(i + 1) * 10}mg`,
      instructions: "Take as directed",
      status: "filled",
      refillsRemaining: 2,
      lastFilled: new Date().toISOString().slice(0, 10),
      nextRefillDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 7 days from now
      pharmacy: "Mock Pharmacy",
      doctor: "Dr. Mock",
      urgent: i % 2 === 0,
      cost: {
        retail: 50 + i * 5,
        withInsurance: 15 + i * 2,
        copay: 10,
      },
    })
  }
  return mockPrescriptions
}
