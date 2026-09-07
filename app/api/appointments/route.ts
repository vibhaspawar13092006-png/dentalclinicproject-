import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import clientPromise from "@/lib/mongodb"
import { sendSMS } from "@/lib/sms"

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

    const { userId } = await auth()

    const client = await clientPromise
    const db = client.db("dental_clinic")
    const appointmentsCollection = db.collection("appointments")

    const newAppointment = {
      name,
      email,
      phone,
      service,
      status: "pending",
      scheduledDate: null,
      scheduledTime: null,
      doctorNotes: "",
      message: message || "",
      userId: userId || null,
      createdAt: new Date(),
    }

    const result = await appointmentsCollection.insertOne(newAppointment)

    // Send SMS notification
    try {
      const smsMessage = `Hello ${name}, your Sheetal Dental Clinic appointment request for "${service}" has been received! We will notify you once confirmed by the doctor.`
      await sendSMS(phone, smsMessage)
    } catch (smsErr) {
      console.error("SMS notification trigger failed during POST:", smsErr)
    }

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
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await currentUser()
    const role = user?.publicMetadata?.role
    const userEmail = user?.emailAddresses[0]?.emailAddress

    const client = await clientPromise
    const db = client.db("dental_clinic")
    const appointmentsCollection = db.collection("appointments")

    let appointments
    if (role === "admin") {
      // Admin gets all appointments
      appointments = await appointmentsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray()
    } else {
      // Regular user gets only their appointments (matching userId or registered email)
      const query = {
        $or: [
          { userId: userId },
          ...(userEmail ? [{ email: userEmail }] : []),
        ],
      }
      appointments = await appointmentsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray()
    }

    return NextResponse.json(appointments)
  } catch (error: any) {
    console.error("Database connection/query error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}


