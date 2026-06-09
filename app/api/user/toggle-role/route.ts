import { NextResponse } from "next/server"
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await currentUser()
    const currentRole = user?.publicMetadata?.role || "user"
    const newRole = currentRole === "admin" ? "user" : "admin"

    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: newRole,
      },
    })

    return NextResponse.json({ success: true, role: newRole })
  } catch (error: any) {
    console.error("Error updating Clerk metadata:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
