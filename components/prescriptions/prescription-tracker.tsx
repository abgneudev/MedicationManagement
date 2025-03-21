"use client"

import { useState } from "react"
import { Paper, Typography, Box, Chip, Button, Divider, CircularProgress, Collapse, Alert } from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  HourglassBottom as HourglassBottomIcon, // Replace PartiallyFilledIcon
  LocalPharmacy as LocalPharmacyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/components/providers/language-provider"
import { type Prescription, type PrescriptionStatus, formatCurrency } from "@/lib/utils"
import { useNotifications } from "@/components/providers/notification-provider"

interface PrescriptionTrackerProps {
  prescriptions: Prescription[]
  loading: boolean
}

export default function PrescriptionTracker({ prescriptions, loading }: PrescriptionTrackerProps) {
  const { t } = useLanguage()
  const { sendNotification } = useNotifications()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handlePickup = (prescription: Prescription) => {
    sendNotification({
      title: "Pickup Initiated",
      message: `You've initiated pickup for ${prescription.name}. Please proceed to the pharmacy counter.`,
      type: "prescription",
      urgent: false,
    })

    // In a real app, this would update the database and notify the pharmacy
  }

  const handleRefill = (prescription: Prescription) => {
    sendNotification({
      title: "Refill Requested",
      message: `Your refill request for ${prescription.name} has been submitted.`,
      type: "refill",
      urgent: prescription.urgent,
    })

    // In a real app, this would send a refill request to the pharmacy
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getStatusIcon = (status: PrescriptionStatus) => {
    switch (status) {
      case "filled":
        return <CheckCircleIcon color="success" />
      case "inProgress":
        return <PendingIcon color="warning" />
      case "partial":
        return <HourglassBottomIcon color="info" /> // Updated icon
      case "readyForPickup":
        return <LocalPharmacyIcon color="primary" />
      default:
        return null
    }
  }

  const getStatusText = (status: PrescriptionStatus) => {
    return t(`prescriptions.status.${status}`)
  }

  const getStatusColor = (status: PrescriptionStatus) => {
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

  if (loading) {
    return (
      <Paper sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <CircularProgress />
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("prescriptions.title")}
      </Typography>

      {prescriptions.length === 0 ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">
            No prescriptions found. Ask your doctor to send prescriptions to your preferred pharmacy.
          </Typography>
        </Box>
      ) : (
        <Box>
          {prescriptions.map((prescription) => (
            <Box key={prescription.id} sx={{ mb: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Box sx={{ mr: 2, mt: 0.5 }}>{getStatusIcon(prescription.status)}</Box>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                        <Typography variant="h6" component="span">
                          {prescription.name} {prescription.dosage}
                        </Typography>
                        {prescription.urgent && (
                          <Chip
                            label={t("prescriptions.urgent")}
                            color="error"
                            size="small"
                            icon={<WarningIcon />}
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {prescription.instructions}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 1, flexWrap: "wrap", gap: 1 }}>
                        <Chip
                          label={getStatusText(prescription.status)}
                          color={
                            getStatusColor(prescription.status) as
                              | "success"
                              | "warning"
                              | "info"
                              | "primary"
                              | "default"
                          }
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {prescription.pharmacy} • Dr. {prescription.doctor}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {(prescription.status === "filled" || prescription.status === "readyForPickup") && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePickup(prescription)}
                        sx={{ minWidth: 120 }}
                      >
                        {t("prescriptions.pickup")}
                      </Button>
                    )}
                    {prescription.refillsRemaining > 0 && (
                      <Button variant="outlined" onClick={() => handleRefill(prescription)} sx={{ minWidth: 120 }}>
                        {t("prescriptions.refill")} ({prescription.refillsRemaining})
                      </Button>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                  <Button
                    size="small"
                    onClick={() => toggleExpand(prescription.id)}
                    endIcon={expandedId === prescription.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {expandedId === prescription.id ? "Less Details" : "More Details"}
                  </Button>

                  {prescription.cost && (
                    <Typography variant="body2">
                      {t("prescriptions.copay")}: {formatCurrency(prescription.cost.copay)}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Collapse in={expandedId === prescription.id}>
                <Divider />
                <Box sx={{ p: 2, bgcolor: "background.default" }}>
                  {/* Side Effects */}
                  {prescription.sideEffects && prescription.sideEffects.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {t("prescriptions.sideEffects")}
                      </Typography>
                      <Alert severity="info" sx={{ mb: 1 }}>
                        <ul>
                          {prescription.sideEffects.map((effect, index) => (
                            <li key={index}>{effect}</li>
                          ))}
                        </ul>
                      </Alert>
                    </Box>
                  )}

                  {/* Allergies */}
                  {prescription.allergies && prescription.allergies.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {t("prescriptions.allergies")}
                      </Typography>
                      <Alert severity="warning">
                        <ul>
                          {prescription.allergies.map((allergy, index) => (
                            <li key={index}>{allergy}</li>
                          ))}
                        </ul>
                      </Alert>
                    </Box>
                  )}

                  {/* Cost Information */}
                  {prescription.cost && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        {t("prescriptions.cost")}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2">{t("prescriptions.retail")}:</Typography>
                        <Typography variant="body2">{formatCurrency(prescription.cost.retail)}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2">{t("prescriptions.insurance")}:</Typography>
                        <Typography variant="body2">{formatCurrency(prescription.cost.withInsurance)}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2">{t("prescriptions.copay")}:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(prescription.cost.copay)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  )
}
