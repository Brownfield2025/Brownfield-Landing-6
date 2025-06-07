import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json()

    // Log the submission data (in production, you might want to save this to a database)
    console.log("=== QUOTE REQUEST SUBMISSION ===")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Reference ID:", submissionData.referenceId)
    console.log("Customer:", submissionData.fullName)
    console.log("Email:", submissionData.email)
    console.log("Phone:", submissionData.phone)
    console.log("Service:", submissionData.service)
    console.log("Message:", submissionData.message)
    console.log("================================")

    return NextResponse.json({
      success: true,
      message: "Submission logged successfully",
    })
  } catch (error) {
    console.error("Error logging submission:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to log submission",
      },
      { status: 500 },
    )
  }
}
