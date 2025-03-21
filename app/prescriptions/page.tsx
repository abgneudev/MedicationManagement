"use client"

import type React from "react"

import {
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material"
import { CheckCircle, Pending, ArrowBack, Refresh, LocalPharmacy } from "@mui/icons-material"
import Link from "next/link"
import { useState } from "react"

export default function PrescriptionsPage() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button component={Link} href="/" startIcon={<ArrowBack />} variant="text" sx={{ mr: 2 }}>
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1">
          My Prescriptions
        </Typography>
      </Box>

      <PrescriptionTabs />
    </Box>
  )
}

function PrescriptionTabs() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="prescription tabs">
          <Tab label="Active" />
          <Tab label="History" />
          <Tab label="Refill Requests" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ActivePrescriptions />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PrescriptionHistory />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RefillRequests />
      </TabPanel>
    </Box>
  )
}

function TabPanel(props: {
  children?: React.ReactNode
  index: number
  value: number
}) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`prescription-tabpanel-${index}`}
      aria-labelledby={`prescription-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

function ActivePrescriptions() {
  return (
    <Paper sx={{ p: 0 }}>
      <List disablePadding>
        <ListItem
          divider
          sx={{
            borderLeft: "4px solid #2e7d32",
            pl: 2,
            py: 2,
          }}
        >
          <ListItemIcon>
            <CheckCircle color="success" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Lisinopril 10mg</Typography>
                <Chip size="small" label="Ready for Pickup" color="success" sx={{ ml: 1 }} />
              </Box>
            }
            secondary={
              <>
                <Typography variant="body2">Take once daily with food</Typography>
                <Typography variant="body2" color="text.secondary">
                  Refills: 3 remaining • Pharmacy: MedPlus
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <Button variant="contained" size="small">
              Pick Up
            </Button>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem
          divider
          sx={{
            borderLeft: "4px solid #ed6c02",
            pl: 2,
            py: 2,
          }}
        >
          <ListItemIcon>
            <Pending color="warning" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Metformin 500mg</Typography>
                <Chip size="small" label="In Progress" color="warning" sx={{ ml: 1 }} />
                <Chip size="small" label="Urgent" color="error" sx={{ ml: 1 }} />
              </Box>
            }
            secondary={
              <>
                <Typography variant="body2">Take twice daily with meals</Typography>
                <Typography variant="body2" color="text.secondary">
                  Refills: 2 remaining • Pharmacy: HealthRx
                </Typography>
              </>
            }
          />
        </ListItem>

        <ListItem
          sx={{
            borderLeft: "4px solid #0288d1",
            pl: 2,
            py: 2,
          }}
        >
          <ListItemIcon>
            <LocalPharmacy color="info" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Atorvastatin 20mg</Typography>
                <Chip size="small" label="Partial Fill" color="info" sx={{ ml: 1 }} />
              </Box>
            }
            secondary={
              <>
                <Typography variant="body2">Take once daily in the evening</Typography>
                <Typography variant="body2" color="text.secondary">
                  Refills: 5 remaining • Pharmacy: CarePharm
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <Button variant="outlined" size="small">
              Refill
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  )
}

function PrescriptionHistory() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="body1" paragraph>
        View your prescription history for the past 12 months.
      </Typography>
      <List>
        <ListItem divider>
          <ListItemText primary="Amoxicillin 500mg" secondary="Filled on Jan 15, 2023 • Pharmacy: MedPlus" />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Prednisone 10mg" secondary="Filled on Dec 5, 2022 • Pharmacy: HealthRx" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Azithromycin 250mg" secondary="Filled on Nov 20, 2022 • Pharmacy: CarePharm" />
        </ListItem>
      </List>
    </Paper>
  )
}

function RefillRequests() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Pending Refill Requests</Typography>
        <Button startIcon={<Refresh />} size="small">
          Refresh
        </Button>
      </Box>

      <List>
        <ListItem divider>
          <ListItemIcon>
            <Pending color="warning" />
          </ListItemIcon>
          <ListItemText primary="Metformin 500mg" secondary="Requested on Feb 28, 2023 • Status: Processing" />
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Request a New Refill
      </Typography>
      <Typography variant="body2" paragraph>
        Select an eligible prescription to request a refill.
      </Typography>
      <Button variant="contained">Request Refill</Button>
    </Paper>
  )
}
