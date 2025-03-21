"use client"

import React from "react"

import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material"
import {
  Medication as MedicationIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/components/providers/language-provider"
import { type Prescription, formatCurrency, formatDate } from "@/lib/utils"

interface UpcomingMedicationsProps {
  prescriptions: Prescription[]
  loading: boolean
}

export default function UpcomingMedications({ prescriptions, loading }: UpcomingMedicationsProps) {
  const { t } = useLanguage()

  // Filter prescriptions to show only those that need refills soon
  const upcomingMedications = prescriptions
    .filter((p) => p.refillsRemaining > 0 && p.nextRefillDate)
    .sort((a, b) => {
      const dateA = new Date(a.nextRefillDate)
      const dateB = new Date(b.nextRefillDate)
      return dateA.getTime() - dateB.getTime()
    })

  if (loading) {
    return (
      <Paper sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
        <CircularProgress />
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upcoming Medications
      </Typography>

      {upcomingMedications.length === 0 ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">No upcoming medication refills found.</Typography>
        </Box>
      ) : (
        <List disablePadding>
          {upcomingMedications.map((medication, index) => (
            <React.Fragment key={medication.id}>
              {index > 0 && <Divider component="li" />}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <Box
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MedicationIcon />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" component="span">
                        {medication.name} {medication.dosage}
                      </Typography>
                      {medication.urgent && (
                        <Chip label={t("prescriptions.urgent")} color="error" size="small" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          Next refill: {formatDate(medication.nextRefillDate)}
                        </Typography>
                      </Box>
                      {medication.cost && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(medication.cost.withInsurance)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  )
}
