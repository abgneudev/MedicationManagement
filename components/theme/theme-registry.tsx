"use client"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import type React from "react"

import CssBaseline from "@mui/material/CssBaseline"
import { useState, useEffect, useMemo } from "react"
import { useMediaQuery } from "@mui/material"

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedMode) {
      setMode(savedMode)
      document.documentElement.classList.toggle("dark", savedMode === "dark")
    } else {
      setMode(prefersDarkMode ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDarkMode)
    }
  }, [prefersDarkMode])

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light"
      localStorage.setItem("theme", newMode)
      document.documentElement.classList.toggle("dark", newMode === "dark")
      return newMode
    })
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
            light: mode === "light" ? "#42a5f5" : "#e3f2fd",
            dark: mode === "light" ? "#1565c0" : "#42a5f5",
          },
          secondary: {
            main: mode === "light" ? "#9c27b0" : "#ce93d8",
            light: mode === "light" ? "#ba68c8" : "#f3e5f5",
            dark: mode === "light" ? "#7b1fa2" : "#ab47bc",
          },
          error: {
            main: mode === "light" ? "#d32f2f" : "#f44336",
          },
          warning: {
            main: mode === "light" ? "#ed6c02" : "#ff9800",
          },
          info: {
            main: mode === "light" ? "#0288d1" : "#29b6f6",
          },
          success: {
            main: mode === "light" ? "#2e7d32" : "#66bb6a",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#121212",
            paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#ffffff",
            secondary: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.7)",
            disabled: mode === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.5)",
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 8,
                padding: "8px 16px",
                minHeight: "48px",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === "light" ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "0px 2px 4px rgba(0, 0, 0, 0.3)",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={{ ...theme, toggleColorMode }}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
