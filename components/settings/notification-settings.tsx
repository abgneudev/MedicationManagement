"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { NotificationPreferences } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function NotificationSettings() {
  const { t } = useLanguage()
  const { toast } = useToast()

  // Initial notification preferences
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    push: true,
    urgentOnly: false,
  })

  const handleToggle = (type: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const savePreferences = async () => {
    // In a real app, this would save to a database
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    })

    // Simulate saving to a database
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("notifications.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">{t("notifications.email")}</Label>
            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch id="email-notifications" checked={preferences.email} onCheckedChange={() => handleToggle("email")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-notifications">{t("notifications.sms")}</Label>
            <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
          </div>
          <Switch id="sms-notifications" checked={preferences.sms} onCheckedChange={() => handleToggle("sms")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications">{t("notifications.push")}</Label>
            <p className="text-sm text-muted-foreground">Receive push notifications</p>
          </div>
          <Switch id="push-notifications" checked={preferences.push} onCheckedChange={() => handleToggle("push")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="urgent-only">Urgent Medications Only</Label>
            <p className="text-sm text-muted-foreground">Only notify for urgent medications</p>
          </div>
          <Switch
            id="urgent-only"
            checked={preferences.urgentOnly}
            onCheckedChange={() => handleToggle("urgentOnly")}
          />
        </div>

        <Button onClick={savePreferences} className="w-full mt-4">
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}
