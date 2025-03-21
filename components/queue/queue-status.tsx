"use client"

import { useState, useEffect } from "react"
import { Paper, Typography, Box, CircularProgress, Button, LinearProgress, Chip } from "@mui/material"
import {
  QueuePlayNext as QueuePlayNextIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/components/providers/language-provider"
import { useNotifications } from "@/components/providers/notification-provider"

interface QueueInfo {
  position: number
  estimatedWaitTime: number // in minutes
  totalInQueue: number
  alertEnabled: boolean
}

export default function QueueStatus() {
  const { t } = useLanguage()
  const { sendNotification } = useNotifications()
  const [queueInfo, setQueueInfo] = useState<QueueInfo | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate fetching queue information
  useEffect(() => {
    const fetchQueueInfo = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock queue data
        setQueueInfo({
          position: 3,
          estimatedWaitTime: 15,
          totalInQueue: 8,
          alertEnabled: false,
        })
      } catch (error) {
        console.error("Failed to fetch queue information:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQueueInfo()
  }, [])

  // Simulate queue position updates
  useEffect(() => {
    if (!queueInfo) return

    // Update queue position every 10 seconds for demo purposes
    const interval = setInterval(() => {
      setQueueInfo((prev) => {
        if (!prev) return prev

        const newPosition = Math.max(prev.position - 1, 0)
        const newWaitTime = Math.max(prev.estimatedWaitTime - 5, 0)

        // If position becomes 1, send notification
        if (newPosition === 1 && prev.alertEnabled) {
          sendNotification({
            title: "You're Next in Queue",
            message: "Please proceed to the pharmacy counter. Your turn is coming up!",
            type: "queue",
            urgent: true,
          })
        }

        // If position becomes 0, send notification
        if (newPosition === 0) {
          sendNotification({
            title: "It's Your Turn",
            message: "Please proceed to the pharmacy counter immediately.",
            type: "queue",
            urgent: true,
          })
        }

        return {
          ...prev,
          position: newPosition,
          estimatedWaitTime: newWaitTime,
        }
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [queueInfo, sendNotification])

  const toggleAlert = () => {
    setQueueInfo((prev) => {
      if (!prev) return prev

      const alertEnabled = !prev.alertEnabled

      if (alertEnabled) {
        sendNotification({
          title: "Queue Alert Enabled",
          message: "You will be notified when it's your turn.",
          type: "queue",
          urgent: false,
        })
      }

      return {
        ...prev,
        alertEnabled,
      }
    })
  }

  if (loading) {
    return (
      <Paper sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
        <CircularProgress />
      </Paper>
    )
  }

  if (!queueInfo) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">Failed to load queue information.</Typography>
      </Paper>
    )
  }

  const progress = ((queueInfo.totalInQueue - queueInfo.position) / queueInfo.totalInQueue) * 100

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {t("actions.queue")}
      </Typography>

      {queueInfo.position === 0 ? (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            It's Your Turn!
          </Typography>
          <Typography>Please proceed to the pharmacy counter.</Typography>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <QueuePlayNextIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              {t("queue.position")}: <strong>{queueInfo.position}</strong>
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {queueInfo.position > 1 ? "Waiting" : "Next Up"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your Turn
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography>{t("queue.estimatedTime")}:</Typography>
            <Chip label={`${queueInfo.estimatedWaitTime} ${t("common.minutes")}`} color="primary" variant="outlined" />
          </Box>

          <Button
            variant={queueInfo.alertEnabled ? "contained" : "outlined"}
            color={queueInfo.alertEnabled ? "primary" : "primary"}
            startIcon={queueInfo.alertEnabled ? <NotificationsActiveIcon /> : <NotificationsIcon />}
            onClick={toggleAlert}
            fullWidth
          >
            {queueInfo.alertEnabled ? "Alert Enabled" : t("queue.alert")}
          </Button>
        </Box>
      )}
    </Paper>
  )
}
