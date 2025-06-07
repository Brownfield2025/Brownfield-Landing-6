import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY environment variable is not set - email functionality disabled")

      // Return a success response but log that emails weren't sent
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (email service temporarily unavailable)",
        emailSent: false,
      })
    }

    // Dynamically import and initialize Resend only when needed
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { to, subject, text, html } = await request.json()

    // Validate required fields
    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Brownfield <no-reply@brownfield.ae>",
      to: [to],
      subject: subject,
      text: text,
      html: html || undefined,
    })

    if (error) {
      console.error("Resend API error:", error)
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (email delivery pending)",
        emailSent: false,
        error: "Email service temporarily unavailable",
      })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({ success: true, data, emailSent: true })
  } catch (error) {
    console.error("Error sending email:", error)

    // Return success for form submission even if email fails
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully (email service temporarily unavailable)",
      emailSent: false,
    })
  }
}
