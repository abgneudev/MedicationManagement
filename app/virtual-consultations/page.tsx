import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VirtualConsultationPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Virtual Consultation</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Consultation</CardTitle>
            <CardDescription>Connect with a healthcare provider through a secure video call</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Video className="h-16 w-16 text-primary mb-4" />
            <p className="text-center mb-6">
              Speak face-to-face with a healthcare provider about your medications, side effects, or other health
              concerns.
            </p>
            <Button className="w-full">Start Video Consultation</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Secure Messaging</CardTitle>
            <CardDescription>Send messages to your healthcare provider</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <MessageSquare className="h-16 w-16 text-primary mb-4" />
            <p className="text-center mb-6">
              Send messages to your healthcare provider about non-urgent medication questions or concerns.
            </p>
            <Button className="w-full" variant="outline">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            You have no upcoming virtual consultations scheduled.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
