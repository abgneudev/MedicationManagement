"use client"

import { useRouter } from "next/navigation"
import { Paper, Typography, Grid, Button, Box } from "@mui/material"
import {
  VideoCall as VideoCallIcon,
  AttachMoney as AttachMoneyIcon,
  DeleteOutline as DeleteOutlineIcon,
  Queue as QueueIcon,
  AccessibilityNew as AccessibilityNewIcon,
  Medication as MedicationIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/components/providers/language-provider"

export default function QuickActions() {
  const { t } = useLanguage()
  const router = useRouter()

  const actions = [
    {
      icon: <VideoCallIcon fontSize="large" />,
      label: t("actions.consult"),
      color: "#9c27b0",
      path: "/consultation",
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      label: t("actions.cost"),
      color: "#2e7d32",
      path: "/cost-estimation",
    },
    {
      icon: <QueueIcon fontSize="large" />,
      label: t("actions.queue"),
      color: "#1976d2",
      path: "/queue",
    },
    {
      icon: <DeleteOutlineIcon fontSize="large" />,
      label: t("disposal.title"),
      color: "#d32f2f",
      path: "/disposal",
    },
    {
      icon: <AccessibilityNewIcon fontSize="large" />,
      label: t("accessibility.curbside"),
      color: "#ed6c02",
      path: "/accessibility",
    },
    {
      icon: <MedicationIcon fontSize="large" />,
      label: t("prescriptions.title"),
      color: "#0288d1",
      path: "/prescriptions",
    },
  ]

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={6} key={action.path}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => router.push(action.path)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                borderColor: action.color,
                color: action.color,
                "&:hover": {
                  borderColor: action.color,
                  backgroundColor: `${action.color}10`,
                },
              }}
            >
              <Box sx={{ color: action.color, mb: 1 }}>{action.icon}</Box>
              <Typography variant="body2" align="center">
                {action.label}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
