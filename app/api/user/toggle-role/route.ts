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

    // Parse body for passcode
    const body = await request.json().catch(() => ({}))
    const { passcode } = body

    const expectedPasscode = process.env.ADMIN_PASSCODE || "Sheetal@Admin2026"

    // If currently not admin and attempting to unlock admin role, verify passcode
    if (currentRole !== "admin") {
      if (!passcode || passcode.trim() !== expectedPasscode.trim()) {
        return NextResponse.json(
          { error: "Incorrect Admin Security Passcode! Access Denied." },
          { status: 403 }
        )
      }
    }

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
