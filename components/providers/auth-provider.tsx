"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "patient" | "pharmacist" | "admin"
  preferences?: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
      urgentOnly: boolean
    }
    accessibility: {
      needsAssistance: boolean
      prefersCurbside: boolean
      mobilityAids: string[]
    }
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUserPreferences: (preferences: Partial<User["preferences"]>) => void
}

// Mock user data
const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "patient",
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
      urgentOnly: false,
    },
    accessibility: {
      needsAssistance: false,
      prefersCurbside: false,
      mobilityAids: [],
    },
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading user data on mount
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call to validate the session
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user is stored in localStorage (for demo purposes)
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          // For demo purposes, auto-login with mock user
          setUser(mockUser)
          localStorage.setItem("user", JSON.stringify(mockUser))
        }
      } catch (error) {
        console.error("Failed to load user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, always succeed with mock user
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUserPreferences = (preferences: Partial<User["preferences"]>) => {
    if (!user) return

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences,
      },
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUserPreferences }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
