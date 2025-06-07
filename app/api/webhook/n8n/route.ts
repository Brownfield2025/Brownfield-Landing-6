import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Log the webhook call for debugging
    console.log("n8n webhook triggered with data:", formData)

    // Validate that we have the required data
    if (!formData.firstName || !formData.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // You can add any additional processing here if needed
    // For example, data transformation, validation, etc.

    // Return success response that n8n expects
    return NextResponse.json({
      success: true,
      message: "Webhook received successfully",
      timestamp: new Date().toISOString(),
      data: formData,
    })
  } catch (error) {
    console.error("n8n webhook error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Webhook processing failed",
      },
      { status: 500 },
    )
  }
}

// Optional: Add GET method for webhook testing
export async function GET() {
  return NextResponse.json({
    message: "n8n webhook endpoint is active",
    timestamp: new Date().toISOString(),
  })
}
