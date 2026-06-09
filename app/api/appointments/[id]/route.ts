import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { auth, currentUser } from "@clerk/nextjs/server"
import clientPromise from "@/lib/mongodb"

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

