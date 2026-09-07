export async function sendSMS(to: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_FROM_NUMBER

  const toClean = to.trim()

  // Fallback simulator if Twilio environment variables are not configured
  if (!accountSid || !authToken || !fromNumber) {
    console.log(`
┌────────────── SMS SIMULATION ──────────────
│ To: ${toClean}
│ Message: ${message}
│ Status: Simulated Success
│ Note: To send real SMS, configure TWILIO_ACCOUNT_SID,
│       TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER in .env
└────────────────────────────────────────────
    `)
    return { success: true, simulated: true }
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: toClean,
        From: fromNumber,
        Body: message,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error("[Twilio SMS Error]:", errorData)
      return { success: false, error: errorData.message || "Failed to send SMS" }
    }

    const data = await res.json()
    console.log(`[Twilio SMS Sent]: To ${toClean}, SID: ${data.sid}`)
    return { success: true, simulated: false, sid: data.sid }
  } catch (error) {
    console.error("[Twilio SMS Catch Error]:", error)
    return { success: false, error: "Internal error sending SMS" }
  }
}
