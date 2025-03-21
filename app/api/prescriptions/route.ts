import { NextResponse } from "next/server"
import type { Prescription } from "@/lib/utils"

// Mock database of prescriptions
const prescriptions: Prescription[] = [
  {
    id: "rx-1001",
    name: "Lisinopril",
    dosage: "10mg",
    instructions: "Take once daily with food",
    status: "filled",
    refillsRemaining: 3,
    lastFilled: "2023-02-15",
    nextRefillDate: "2023-03-15",
    pharmacy: "MedPlus Pharmacy",
    doctor: "Dr. Smith",
    urgent: false,
    cost: {
      retail: 45.99,
      withInsurance: 10.0,
      copay: 10.0,
    },
  },
  {
    id: "rx-1002",
    name: "Metformin",
    dosage: "500mg",
    instructions: "Take twice daily with meals",
    status: "inProgress",
    refillsRemaining: 2,
    lastFilled: "2023-02-01",
    nextRefillDate: "2023-03-01",
    pharmacy: "HealthRx",
    doctor: "Dr. Johnson",
    urgent: true,
    cost: {
      retail: 32.5,
      withInsurance: 5.0,
      copay: 5.0,
    },
  },
]

/**
 * GET handler for fetching prescriptions
 * @param request - The incoming request
 */
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by userId
  // const userId = auth.getUserId(request);

  // Get query parameters
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const urgent = searchParams.get("urgent") === "true"

  // Filter prescriptions
  let filteredPrescriptions = [...prescriptions]

  if (status) {
    filteredPrescriptions = filteredPrescriptions.filter((prescription) => prescription.status === status)
  }

  if (urgent) {
    filteredPrescriptions = filteredPrescriptions.filter((prescription) => prescription.urgent)
  }

  return NextResponse.json({ prescriptions: filteredPrescriptions })
}

/**
 * POST handler for creating a new prescription
 * @param request - The incoming request
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.dosage || !body.instructions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new prescription
    const newPrescription: Prescription = {
      id: `rx-${Date.now()}`,
      name: body.name,
      dosage: body.dosage,
      instructions: body.instructions,
      status: body.status || "inProgress",
      refillsRemaining: body.refillsRemaining || 0,
      lastFilled: body.lastFilled || new Date().toISOString().split("T")[0],
      nextRefillDate: body.nextRefillDate || "",
      pharmacy: body.pharmacy || "",
      doctor: body.doctor || "",
      urgent: body.urgent || false,
      cost: body.cost,
    }

    // In a real app, we would save to a database
    prescriptions.push(newPrescription)

    return NextResponse.json({ prescription: newPrescription }, { status: 201 })
  } catch (error) {
    console.error("Error creating prescription:", error)
    return NextResponse.json({ error: "Failed to create prescription" }, { status: 500 })
  }
}

/**
 * PATCH handler for updating a prescription
 * @param request - The incoming request
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.id) {
      return NextResponse.json({ error: "Missing prescription ID" }, { status: 400 })
    }

    // Find and update the prescription
    const prescriptionIndex = prescriptions.findIndex((p) => p.id === body.id)

    if (prescriptionIndex === -1) {
      return NextResponse.json({ error: "Prescription not found" }, { status: 404 })
    }

    // Update the prescription
    prescriptions[prescriptionIndex] = {
      ...prescriptions[prescriptionIndex],
      ...body,
    }

    return NextResponse.json({
      prescription: prescriptions[prescriptionIndex],
    })
  } catch (error) {
    console.error("Error updating prescription:", error)
    return NextResponse.json({ error: "Failed to update prescription" }, { status: 500 })
  }
}
