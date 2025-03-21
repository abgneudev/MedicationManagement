import type { Prescription } from "@/lib/utils"

// Mock prescription data
const mockPrescriptions: Prescription[] = [
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
    doctor: "Smith",
    urgent: false,
    sideEffects: ["Dizziness", "Headache", "Dry cough"],
    allergies: [],
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
    doctor: "Johnson",
    urgent: true,
    sideEffects: ["Nausea", "Diarrhea", "Stomach pain"],
    allergies: [],
    cost: {
      retail: 32.5,
      withInsurance: 5.0,
      copay: 5.0,
    },
  },
  {
    id: "rx-1003",
    name: "Atorvastatin",
    dosage: "20mg",
    instructions: "Take once daily in the evening",
    status: "partial",
    refillsRemaining: 5,
    lastFilled: "2023-01-15",
    nextRefillDate: "2023-02-15",
    pharmacy: "CarePharm",
    doctor: "Williams",
    urgent: false,
    sideEffects: ["Muscle pain", "Joint pain", "Fatigue"],
    allergies: ["Grapefruit juice may interact with this medication"],
    cost: {
      retail: 78.25,
      withInsurance: 15.5,
      copay: 15.5,
    },
  },
  {
    id: "rx-1004",
    name: "Levothyroxine",
    dosage: "75mcg",
    instructions: "Take on an empty stomach, 30-60 minutes before breakfast",
    status: "readyForPickup",
    refillsRemaining: 1,
    lastFilled: "2023-01-30",
    nextRefillDate: "2023-03-01",
    pharmacy: "MedPlus Pharmacy",
    doctor: "Brown",
    urgent: true,
    sideEffects: ["Weight changes", "Increased appetite", "Nervousness"],
    allergies: [],
    cost: {
      retail: 42.75,
      withInsurance: 8.5,
      copay: 8.5,
    },
  },
]

/**
 * Fetch prescriptions from the API
 * @param options Optional filter options
 * @returns Promise with prescription data
 */
export async function fetchPrescriptions(options?: {
  status?: string
  urgent?: boolean
}): Promise<Prescription[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Apply filters if provided
  let filteredPrescriptions = [...mockPrescriptions]

  if (options?.status) {
    filteredPrescriptions = filteredPrescriptions.filter((p) => p.status === options.status)
  }

  if (options?.urgent !== undefined) {
    filteredPrescriptions = filteredPrescriptions.filter((p) => p.urgent === options.urgent)
  }

  return filteredPrescriptions
}

/**
 * Update a prescription's status
 * @param id Prescription ID
 * @param status New status
 * @returns Updated prescription
 */
export async function updatePrescriptionStatus(id: string, status: Prescription["status"]): Promise<Prescription> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const prescriptionIndex = mockPrescriptions.findIndex((p) => p.id === id)

  if (prescriptionIndex === -1) {
    throw new Error(`Prescription with ID ${id} not found`)
  }

  mockPrescriptions[prescriptionIndex] = {
    ...mockPrescriptions[prescriptionIndex],
    status,
  }

  return mockPrescriptions[prescriptionIndex]
}

/**
 * Request a prescription refill
 * @param id Prescription ID
 * @returns Updated prescription
 */
export async function requestRefill(id: string): Promise<Prescription> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const prescriptionIndex = mockPrescriptions.findIndex((p) => p.id === id)

  if (prescriptionIndex === -1) {
    throw new Error(`Prescription with ID ${id} not found`)
  }

  if (mockPrescriptions[prescriptionIndex].refillsRemaining <= 0) {
    throw new Error("No refills remaining")
  }

  mockPrescriptions[prescriptionIndex] = {
    ...mockPrescriptions[prescriptionIndex],
    status: "inProgress",
    refillsRemaining: mockPrescriptions[prescriptionIndex].refillsRemaining - 1,
  }

  return mockPrescriptions[prescriptionIndex]
}
