import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, LineChart } from "lucide-react"
import Link from "next/link"
import { formatCurrency, generateMockPrescriptions } from "@/lib/utils"

// This would normally come from a database or API
const prescriptions = generateMockPrescriptions(5)

export default function CostEstimationPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Cost Estimation</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Medication Costs</CardTitle>
            <CardDescription>View cost estimates for your medications with and without insurance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">
                      {prescription.name} {prescription.dosage}
                    </h3>
                    <p className="text-sm text-muted-foreground">{prescription.pharmacy}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-0">
                    <div>
                      <p className="text-sm text-muted-foreground">Retail Price</p>
                      <p className="font-medium">
                        {prescription.cost ? formatCurrency(prescription.cost.retail) : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">With Insurance</p>
                      <p className="font-medium text-green-600">
                        {prescription.cost ? formatCurrency(prescription.cost.withInsurance) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Provider</p>
                  <p className="font-medium">HealthPlus Insurance</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Policy Number</p>
                  <p className="font-medium">HP-12345678</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deductible Status</p>
                  <p className="font-medium">$500 / $1,500 met</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out-of-Pocket Maximum</p>
                  <p className="font-medium">$3,000 / $5,000 met</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost History</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <LineChart className="h-16 w-16 text-primary mb-4" />
              <p className="text-center mb-6">View your medication cost history and track spending over time.</p>
              <Button className="w-full" variant="outline">
                View Cost History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Reports</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <FileText className="h-16 w-16 text-primary mb-4" />
              <p className="text-center mb-6">Download cost reports for tax or reimbursement purposes.</p>
              <Button className="w-full" variant="outline">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
