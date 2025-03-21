"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Medication as MedicationIcon,
  VideoCall as VideoCallIcon,
  AttachMoney as AttachMoneyIcon,
  DeleteOutline as DeleteOutlineIcon,
  AccessibilityNew as AccessibilityNewIcon,
  Queue as QueueIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/components/providers/language-provider"

interface AppSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const menuItems = [
    {
      text: t("dashboard.title"),
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: t("prescriptions.title"),
      icon: <MedicationIcon />,
      path: "/prescriptions",
    },
    {
      text: t("consultation.video"),
      icon: <VideoCallIcon />,
      path: "/consultation",
    },
    {
      text: t("actions.cost"),
      icon: <AttachMoneyIcon />,
      path: "/cost-estimation",
    },
    {
      text: t("actions.queue"),
      icon: <QueueIcon />,
      path: "/queue",
    },
    {
      text: t("disposal.title"),
      icon: <DeleteOutlineIcon />,
      path: "/disposal",
    },
    {
      text: t("accessibility.curbside"),
      icon: <AccessibilityNewIcon />,
      path: "/accessibility",
    },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    if (isMobile) {
      onClose()
    }
  }

  const drawerContent = (
    <Box sx={{ width: 240 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton selected={pathname === item.path} onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation("/settings")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t("settings.title")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return isMobile ? (
    <Drawer anchor="left" open={open} onClose={onClose}>
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? 240 : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          top: "64px",
          height: "calc(100% - 64px)",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
