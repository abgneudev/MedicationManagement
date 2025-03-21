"use client"

import { Menu, MenuItem, Typography, Box, Divider, Button, ListItemText, ListItemIcon } from "@mui/material"
import { Notifications as NotificationsIcon, CheckCircle, Warning, Info } from "@mui/icons-material"
import { useNotifications } from "@/components/providers/notification-provider"
import { useLanguage } from "@/components/providers/language-provider"

interface NotificationMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
}

export default function NotificationMenu({ anchorEl, open, onClose }: NotificationMenuProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()
  const { t } = useLanguage()

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
  }

  const getNotificationIcon = (type: string, urgent: boolean) => {
    if (urgent) {
      return <Warning color="error" />
    }

    switch (type) {
      case "prescription":
        return <CheckCircle color="success" />
      case "queue":
        return <Info color="info" />
      default:
        return <NotificationsIcon color="action" />
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          width: 350,
          maxHeight: 400,
          overflowY: "auto",
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">{t("notifications.title")}</Typography>
        <Button size="small" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </Box>
      <Divider />
      {notifications.length === 0 ? (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No notifications
          </Typography>
        </Box>
      ) : (
        notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => handleMarkAsRead(notification.id)}
            sx={{
              backgroundColor: notification.read ? "transparent" : "action.hover",
              borderLeft: notification.urgent ? "4px solid red" : "none",
            }}
          >
            <ListItemIcon>{getNotificationIcon(notification.type, notification.urgent)}</ListItemIcon>
            <ListItemText
              primary={notification.title}
              secondary={notification.message}
              primaryTypographyProps={{
                fontWeight: notification.read ? "normal" : "bold",
              }}
            />
          </MenuItem>
        ))
      )}
    </Menu>
  )
}
