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

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123"

    if (!authHeader || authHeader !== `Bearer ${expectedPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("dental_clinic")
    const appointmentsCollection = db.collection("appointments")

    const appointments = await appointmentsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(appointments)
  } catch (error: any) {
    console.error("Database connection/query error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

