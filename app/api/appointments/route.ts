import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validation
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Name, email, phone, and service are required fields." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("dental_clinic")
    const appointmentsCollection = db.collection("appointments")

    const newAppointment = {
      name,
      email,
      phone,
      service,
      message: message || "",
      createdAt: new Date(),
    }

    const result = await appointmentsCollection.insertOne(newAppointment)

    return NextResponse.json(
      {
        message: "Appointment request submitted successfully",
        id: result.insertedId,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Database connection/query error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
