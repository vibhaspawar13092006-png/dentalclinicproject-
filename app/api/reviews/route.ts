import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("dental_clinic")
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray()

    return NextResponse.json(reviews)
  } catch (error: any) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, rating, service, comment } = body

    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and review comment are required." },
        { status: 400 }
      )
    }

    const numericRating = Math.min(5, Math.max(1, Number(rating) || 5))
    const { userId } = await auth()

    const client = await clientPromise
    const db = client.db("dental_clinic")

    const newReview = {
      name: name.trim(),
      rating: numericRating,
      service: service ? service.trim() : "General Dental Care",
      quote: comment.trim(),
      userId: userId || null,
      createdAt: new Date(),
    }

    const result = await db.collection("reviews").insertOne(newReview)

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully! Thank you for your feedback.",
        review: { ...newReview, _id: result.insertedId },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error submitting review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
