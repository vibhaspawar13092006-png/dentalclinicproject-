import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { auth, currentUser } from "@clerk/nextjs/server"
import clientPromise from "@/lib/mongodb"
import { sendSMS } from "@/lib/sms"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await currentUser()
    const role = user?.publicMetadata?.role

    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
    }

    const { id } = await params

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid appointment ID" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("dental_clinic")
    const appointmentsCollection = db.collection("appointments")

    const result = await appointmentsCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Appointment deleted successfully" })
  } catch (error: any) {
    console.error("Database connection/query error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await currentUser()
    const role = user?.publicMetadata?.role
    const isAdmin = role === "admin"

    const { id } = await params

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid appointment ID" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("dental_clinic")
    const appointmentsCollection = db.collection("appointments")

    // Fetch existing appointment details
    const existingAppointment = await appointmentsCollection.findOne({
      _id: new ObjectId(id),
    })

    if (!existingAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      )
    }

    // Check permissions: either Admin, OR the regular user owning the appointment request
    const isOwner = existingAppointment.userId === userId
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden: Access denied" }, { status: 403 })
    }

    const body = await request.json()
    const { status, scheduledDate, scheduledTime, doctorNotes, rescheduleDate, rescheduleTime, rescheduleMessage } = body

    const updateFields: any = {}

    if (isAdmin) {
      // Admin has full control
      if (status !== undefined) {
        if (!["pending", "confirmed", "cancelled", "cancel_requested", "reschedule_requested"].includes(status)) {
          return NextResponse.json({ error: "Invalid status value." }, { status: 400 })
        }
        updateFields.status = status
      }
      if (scheduledDate !== undefined) updateFields.scheduledDate = scheduledDate
      if (scheduledTime !== undefined) updateFields.scheduledTime = scheduledTime
      if (doctorNotes !== undefined) updateFields.doctorNotes = doctorNotes
      
      // If admin is confirming or canceling, clear reschedule requests if resolved
      if (status === "confirmed" || status === "cancelled") {
        updateFields.rescheduleDate = null
        updateFields.rescheduleTime = null
        updateFields.rescheduleMessage = ""
      }
    } else {
      // Patient can ONLY ask for cancellation or rescheduling
      if (status !== undefined) {
        if (!["cancel_requested", "reschedule_requested"].includes(status)) {
          return NextResponse.json({ error: "Invalid status modification for patients." }, { status: 400 })
        }
        updateFields.status = status
      }
      if (rescheduleDate !== undefined) updateFields.rescheduleDate = rescheduleDate
      if (rescheduleTime !== undefined) updateFields.rescheduleTime = rescheduleTime
      if (rescheduleMessage !== undefined) updateFields.rescheduleMessage = rescheduleMessage
    }

    updateFields.updatedAt = new Date()

    const result = await appointmentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      )
    }

    // Send SMS notification if details successfully updated
    try {
      const patientPhone = existingAppointment.phone
      const patientName = existingAppointment.name
      const treatment = existingAppointment.service

      const targetStatus = status !== undefined ? status : existingAppointment.status
      const targetDate = scheduledDate !== undefined ? scheduledDate : existingAppointment.scheduledDate
      const targetTime = scheduledTime !== undefined ? scheduledTime : existingAppointment.scheduledTime
      const targetNotes = doctorNotes !== undefined ? doctorNotes : existingAppointment.doctorNotes

      let smsMessage = ""
      if (targetStatus === "confirmed") {
        const timeStr = targetTime ? ` at ${targetTime}` : ""
        const dateStr = targetDate ? ` on ${targetDate}` : ""
        const notesStr = targetNotes ? `. Instructions: ${targetNotes}` : ""
        smsMessage = `Hello ${patientName}, your Sheetal Dental Clinic appointment for "${treatment}" is CONFIRMED${dateStr}${timeStr}${notesStr}. See you soon!`
      } else if (targetStatus === "cancelled") {
        smsMessage = `Hello ${patientName}, your appointment request for "${treatment}" at Sheetal Dental Clinic has been cancelled. Please call us at (555) 123-4567 for any queries.`
      } else if (targetStatus === "pending") {
        smsMessage = `Hello ${patientName}, your appointment request status for "${treatment}" has been set back to pending confirmation.`
      } else if (targetStatus === "cancel_requested") {
        smsMessage = `Hello ${patientName}, we have received your request to CANCEL your Sheetal Dental Clinic appointment. We will process this shortly.`
      } else if (targetStatus === "reschedule_requested") {
        const dateStr = rescheduleDate ? ` to ${rescheduleDate}` : ""
        smsMessage = `Hello ${patientName}, we received your request to RESCHEDULE your appointment${dateStr}. Our team will review and notify you once confirmed.`
      }

      if (smsMessage && patientPhone) {
        await sendSMS(patientPhone, smsMessage)
      }
    } catch (smsErr) {
      console.error("SMS notification trigger failed during PUT:", smsErr)
    }

    return NextResponse.json({ message: "Appointment updated successfully" })
  } catch (error: any) {
    console.error("Database connection/query error during PUT:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
