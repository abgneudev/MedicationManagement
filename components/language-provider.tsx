"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr" | "zh"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "dashboard.title": "Dashboard",
    "prescriptions.title": "My Prescriptions",
    "prescriptions.status.filled": "Filled",
    "prescriptions.status.inProgress": "In Progress",
    "prescriptions.status.partial": "Partial",
    "prescriptions.pickup": "Pick Up",
    "prescriptions.refill": "Refill",
    "actions.consult": "Virtual Consultation",
    "actions.cost": "Cost Estimation",
    "actions.disposal": "Medication Disposal",
    "notifications.title": "Notification Settings",
    "notifications.email": "Email",
    "notifications.sms": "SMS",
    "notifications.push": "Push Notifications",
    // Add more translations as needed
  },
  es: {
    "dashboard.title": "Tablero",
    "prescriptions.title": "Mis Recetas",
    "prescriptions.status.filled": "Completado",
    "prescriptions.status.inProgress": "En Progreso",
    "prescriptions.status.partial": "Parcial",
    "prescriptions.pickup": "Recoger",
    "prescriptions.refill": "Rellenar",
    "actions.consult": "Consulta Virtual",
    "actions.cost": "Estimación de Costos",
    "actions.disposal": "Eliminación de Medicamentos",
    "notifications.title": "Configuración de Notificaciones",
    "notifications.email": "Correo Electrónico",
    "notifications.sms": "SMS",
    "notifications.push": "Notificaciones Push",
    // Add more translations as needed
  },
  fr: {
    "dashboard.title": "Tableau de Bord",
    "prescriptions.title": "Mes Ordonnances",
    "prescriptions.status.filled": "Rempli",
    "prescriptions.status.inProgress": "En Cours",
    "prescriptions.status.partial": "Partiel",
    "prescriptions.pickup": "Récupérer",
    "prescriptions.refill": "Renouveler",
    "actions.consult": "Consultation Virtuelle",
    "actions.cost": "Estimation des Coûts",
    "actions.disposal": "Élimination des Médicaments",
    "notifications.title": "Paramètres de Notification",
    "notifications.email": "E-mail",
    "notifications.sms": "SMS",
    "notifications.push": "Notifications Push",
    // Add more translations as needed
  },
  zh: {
    "dashboard.title": "仪表板",
    "prescriptions.title": "我的处方",
    "prescriptions.status.filled": "已配药",
    "prescriptions.status.inProgress": "进行中",
    "prescriptions.status.partial": "部分完成",
    "prescriptions.pickup": "取药",
    "prescriptions.refill": "续药",
    "actions.consult": "虚拟咨询",
    "actions.cost": "费用估算",
    "actions.disposal": "药物处置",
    "notifications.title": "通知设置",
    "notifications.email": "电子邮件",
    "notifications.sms": "短信",
    "notifications.push": "推送通知",
    // Add more translations as needed
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "es", "fr", "zh"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
