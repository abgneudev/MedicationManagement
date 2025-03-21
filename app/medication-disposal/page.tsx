import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function MedicationDisposalPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Medication Disposal</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Safe Disposal Instructions</CardTitle>
            <CardDescription>Learn how to safely dispose of different types of medications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Pills & Tablets
              </h3>
              <ol className="mt-2 space-y-2 pl-5 list-decimal">
                <li>Mix medications with unpalatable substances like dirt, cat litter, or used coffee grounds.</li>
                <li>Place the mixture in a sealed container to prevent leakage.</li>
                <li>Remove or black out all personal information on prescription labels.</li>
                <li>Dispose of the container in your household trash.</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Liquids
              </h3>
              <ol className="mt-2 space-y-2 pl-5 list-decimal">
                <li>Keep medication in its original container.</li>
                <li>Add a non-toxic solid substance like salt, flour, or charcoal to make it less appealing.</li>
                <li>Secure the lid and place tape around it.</li>
                <li>Place the container inside a non-leaking container like a plastic bag.</li>
                <li>Dispose of in household trash.</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Inhalers & Aerosols
              </h3>
              <ol className="mt-2 space-y-2 pl-5 list-decimal">
                <li>Do not puncture or throw into a fire or incinerator.</li>
                <li>Check with your local waste management authorities for proper disposal guidelines.</li>
                <li>Some pharmacies may accept inhalers for proper disposal.</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Find Disposal Locations</CardTitle>
            <CardDescription>Locate nearby medication disposal sites</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <MapPin className="h-16 w-16 text-primary mb-4" />
            <p className="text-center mb-6">
              Find authorized collection sites, including pharmacies, hospitals, and law enforcement facilities that
              accept unused medications.
            </p>
            <Button className="w-full mb-4">Find Nearby Locations</Button>
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map will display here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expired Medication Reminders</CardTitle>
          <CardDescription>Set up reminders to check for expired medications</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Trash2 className="h-16 w-16 text-primary mb-4" />
          <p className="text-center mb-6">
            We'll send you reminders every 6 months to check your medicine cabinet for expired medications that need
            proper disposal.
          </p>
          <Button className="w-full">Enable Expiration Reminders</Button>
        </CardContent>
      </Card>
    </div>
  )
}
