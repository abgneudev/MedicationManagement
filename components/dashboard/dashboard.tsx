"use client"

import { useState, useEffect } from "react"
import { Grid, Typography, Box } from "@mui/material"
import { useLanguage } from "@/components/providers/language-provider"
import PrescriptionTracker from "@/components/prescriptions/prescription-tracker"
import QuickActions from "@/components/dashboard/quick-actions"
import QueueStatus from "@/components/queue/queue-status"
import UpcomingMedications from "@/components/prescriptions/upcoming-medications"
import { useNotifications } from "@/components/providers/notification-provider"
import type { Prescription } from "@/lib/utils"
import { fetchPrescriptions } from "@/lib/api/prescriptions"

export function Dashboard() {
  const { t } = useLanguage()
  const { sendNotification } = useNotifications()
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPrescriptions = async () => {
      setLoading(true)
      try {
        const data = await fetchPrescriptions()
        setPrescriptions(data)
      } catch (error) {
        console.error("Failed to load prescriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPrescriptions()
  }, [])

  // Simulate real-time prescription status updates
  useEffect(() => {
    // Find prescriptions that are in progress
    const inProgressPrescriptions = prescriptions.filter((p) => p.status === "inProgress")

    // Set up timers for each in-progress prescription
    const timers = inProgressPrescriptions.map((prescription) => {
      // Simulate a prescription becoming ready after a random time (5-15 seconds for demo)
      const readyTime = Math.floor(Math.random() * 10000) + 5000

      return setTimeout(() => {
        // Update the prescription status
        setPrescriptions((prevPrescriptions) =>
          prevPrescriptions.map((p) => (p.id === prescription.id ? { ...p, status: "readyForPickup" } : p)),
        )

        // Send notification
        sendNotification({
          title: "Prescription Ready",
          message: `Your ${prescription.name} is now ready for pickup.`,
          type: "prescription",
          urgent: prescription.urgent,
        })
      }, readyTime)
    })

    // Clean up timers on component unmount
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [prescriptions, sendNotification])

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("dashboard.title")}
      </Typography>

      <Grid container spacing={3}>
        {/* Prescription Tracker */}
        <Grid item xs={12} md={8}>
          <PrescriptionTracker prescriptions={prescriptions} loading={loading} />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <QuickActions />
        </Grid>

        {/* Queue Status */}
        <Grid item xs={12} md={4}>
          <QueueStatus />
        </Grid>

        {/* Upcoming Medications */}
        <Grid item xs={12} md={8}>
          <UpcomingMedications prescriptions={prescriptions} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  )
}
