"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings,
  Logout,
  Translate,
  DarkMode,
  LightMode,
} from "@mui/icons-material"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { useAuth } from "@/components/providers/auth-provider"
import { useLanguage } from "@/components/providers/language-provider"
import { useNotifications } from "@/components/providers/notification-provider"
import NotificationMenu from "@/components/notifications/notification-menu"

interface AppHeaderProps {
  toggleSidebar: () => void
}

export default function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const { user, logout } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const { unreadCount } = useNotifications()
  const muiTheme = useMuiTheme()
  const toggleColorMode = (muiTheme.toggleColorMode as () => void) || (() => {})

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null)
  const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget)
  }

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null)
  }

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget)
  }

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null)
  }

  const handleLanguageChange = (lang: "en" | "es" | "fr" | "zh") => {
    setLanguage(lang)
    handleCloseLanguageMenu()
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t("app.title")}
        </Typography>

        {/* Language Selector */}
        <Tooltip title={t("settings.language")}>
          <IconButton color="inherit" onClick={handleOpenLanguageMenu}>
            <Translate />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElLanguage}
          open={Boolean(anchorElLanguage)}
          onClose={handleCloseLanguageMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem selected={language === "en"} onClick={() => handleLanguageChange("en")}>
            English
          </MenuItem>
          <MenuItem selected={language === "es"} onClick={() => handleLanguageChange("es")}>
            Español
          </MenuItem>
          <MenuItem selected={language === "fr"} onClick={() => handleLanguageChange("fr")}>
            Français
          </MenuItem>
          <MenuItem selected={language === "zh"} onClick={() => handleLanguageChange("zh")}>
            中文
          </MenuItem>
        </Menu>

        {/* Theme Toggle */}
        <Tooltip title={muiTheme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {muiTheme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title={t("notifications.title")}>
          <IconButton color="inherit" onClick={handleOpenNotificationsMenu}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <NotificationMenu
          anchorEl={anchorElNotifications}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotificationsMenu}
        />

        {/* User Menu */}
        <Box sx={{ ml: 2 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name || "User"} src="/avatar.png" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={user?.name || "User"} secondary={user?.email} />
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t("settings.title")} />
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
