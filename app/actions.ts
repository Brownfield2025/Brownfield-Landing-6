"use server"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
}

export async function submitQuoteRequest(formData: FormData) {
  try {
    // Generate a reference ID for tracking
    const referenceId = `BF-${Date.now().toString().slice(-8)}`

    // Log the form submission for backup tracking
    console.log("Quote request submitted:", {
      referenceId,
      customer: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      timestamp: new Date().toISOString(),
    })

    // Format the sales team email with HTML for better presentation
    const salesEmailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #f0f0f0; padding: 15px; text-align: center;">
      <h2 style="color: #333; margin: 0;">New Quote Request Received</h2>
      <p style="margin: 5px 0 0; color: #666;">Reference ID: ${referenceId}</p>
    </div>
    
    <div style="padding: 20px;">
      <h3 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Customer Information:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.firstName} ${formData.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${formData.email}" style="color: #0066cc;">${formData.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${formData.phone}" style="color: #0066cc;">${formData.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service Needed:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.service}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date Submitted:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
        </tr>
      </table>
      
      <h3 style="color: #555; margin-top: 20px;">Message:</h3>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ddd; margin-bottom: 20px;">
        ${formData.message}
      </div>
      
      <div style="background-color: #fffbf0; padding: 15px; border: 1px solid #ffe0b2; border-radius: 4px;">
        <p style="color: #e65100; font-weight: bold; margin-top: 0;">Action Required:</p>
        <p style="margin-bottom: 0;">Please follow up with this customer within 24 hours. Reference ID: ${referenceId}</p>
      </div>
    </div>
    
    <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center;">
      This is an automated message from the Brownfield Website System.
    </div>
  </div>
`

    // Format the customer email with HTML for better presentation
    const customerEmailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
      <h2 style="color: #333; margin: 0;">Thank You for Your Interest in Brownfield</h2>
    </div>
    
    <div style="padding: 30px; background-color: white; border: 1px solid #eee;">
      <p style="font-size: 16px;">Dear <strong>${formData.firstName} ${formData.lastName}</strong>,</p>
      
      <p style="font-size: 16px;">Thank you for your interest in Brownfield General Maintenance & Properties Management services.</p>
      
      <div style="background-color: #f9f9f9; border-left: 4px solid #ccc; padding: 15px; margin: 20px 0;">
        <p style="font-size: 16px; margin: 0;"><strong>Request Details:</strong></p>
        <p style="font-size: 16px; margin: 10px 0 0 0;"><strong>Service:</strong> ${formData.service}</p>
        <p style="font-size: 16px; margin: 5px 0 0 0;"><strong>Date Submitted:</strong> ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        <p style="font-size: 16px; margin: 5px 0 0 0;"><strong>Reference ID:</strong> ${referenceId}</p>
      </div>
      
      <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">What Happens Next?</h3>
      
      <ol style="font-size: 16px; line-height: 1.6;">
        <li><strong>Initial Review:</strong> Our team will review your request within 2-4 hours.</li>
        <li><strong>Contact:</strong> A member of our sales team will contact you within 24 hours to discuss your needs.</li>
        <li><strong>Quote Preparation:</strong> We'll prepare a detailed, no-obligation quote for your approval.</li>
        <li><strong>Service Scheduling:</strong> Once approved, we'll schedule your service at a time convenient for you.</li>
      </ol>
      
      <p style="font-size: 16px;">If you have any urgent questions, please don't hesitate to call us at <a href="tel:+971565755877" style="color: #0066cc; text-decoration: none;">+971 56 5755877</a>.</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin-bottom: 5px; font-size: 16px;"><strong>Best regards,</strong></p>
        <p style="margin-top: 0; font-size: 16px;">Brownfield Sales Team<br>
        <a href="mailto:sales@brownfield.ae" style="color: #0066cc; text-decoration: none;">sales@brownfield.ae</a></p>
      </div>
    </div>
    
    <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 14px; color: #777;">
      <p><strong>Brownfield General Maintenance & Properties Management LLC</strong><br>
      Office 103, Al Ain Tower, Hamdan St, Abu Dhabi<br>
      Phone: <a href="tel:+971565755877" style="color: #0066cc; text-decoration: none;">+971 56 5755877</a><br>
      Email: <a href="mailto:info@brownfield.ae" style="color: #0066cc; text-decoration: none;">info@brownfield.ae</a></p>
      
      <p style="margin-top: 15px; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
`

    // Plain text versions for email clients that don't support HTML
    const salesEmailText = `
NEW QUOTE REQUEST RECEIVED
Reference ID: ${referenceId}

CUSTOMER INFORMATION:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Service Needed: ${formData.service}
- Date Submitted: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}

MESSAGE:
${formData.message}

ACTION REQUIRED:
Please follow up with this customer within 24 hours. Reference ID: ${referenceId}

Best regards,
Brownfield Website System
`.trim()

    const customerEmailText = `
Dear ${formData.firstName} ${formData.lastName},

Thank you for your interest in Brownfield General Maintenance & Properties Management services.

REQUEST DETAILS:
Service: ${formData.service}
Date Submitted: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Reference ID: ${referenceId}

WHAT HAPPENS NEXT?
1. Initial Review: Our team will review your request within 2-4 hours.
2. Contact: A member of our sales team will contact you within 24 hours to discuss your needs.
3. Quote Preparation: We'll prepare a detailed, no-obligation quote for your approval.
4. Service Scheduling: Once approved, we'll schedule your service at a time convenient for you.

If you have any urgent questions, please don't hesitate to call us at +971 56 5755877.

Best regards,
Brownfield Sales Team
sales@brownfield.ae

---
Brownfield General Maintenance & Properties Management LLC
Office 103, Al Ain Tower, Hamdan St, Abu Dhabi
Phone: +971 56 5755877
Email: info@brownfield.ae

This is an automated message. Please do not reply to this email.
`.trim()

    // Get the base URL for the API call
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.brownfield.ae"

    // Prepare data for n8n webhook
    const n8nPayload = {
      // Form data
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,

      // Additional metadata
      timestamp: new Date().toISOString(),
      source: "brownfield_website",
      formType: "quote_request",
      referenceId: referenceId,

      // Useful for n8n workflows
      leadScore: "high", // You can customize this based on service type
      priority: formData.service.toLowerCase().includes("emergency") ? "urgent" : "normal",

      // Contact preferences (you can expand this)
      preferredContact: "email", // Default, could be made dynamic

      // Business context
      companyName: "Brownfield General Maintenance & Properties Management",
      website: "www.brownfield.ae",
    }

    // Track email sending results
    let salesEmailSent = false
    let customerEmailSent = false
    const emailErrors = []

    // Trigger n8n webhook (do this first, before emails)
    try {
      const n8nResponse = await fetch(`${baseUrl}/api/webhook/n8n`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(n8nPayload),
      })

      if (n8nResponse.ok) {
        console.log("n8n webhook triggered successfully")
      } else {
        console.error("n8n webhook failed:", await n8nResponse.text())
      }
    } catch (error) {
      console.error("Error triggering n8n webhook:", error)
      // Don't fail the entire process if n8n webhook fails
    }

    // Send email to sales team
    try {
      const salesEmailResponse = await fetch(`${baseUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "sales@brownfield.ae",
          subject: `New Quote Request from ${formData.firstName} ${formData.lastName} - ${referenceId}`,
          text: salesEmailText,
          html: salesEmailHtml,
        }),
      })

      const salesResult = await salesEmailResponse.json()
      if (salesEmailResponse.ok && salesResult.emailSent !== false) {
        salesEmailSent = true
        console.log("Sales team email sent successfully")
      } else {
        console.error("Failed to send email to sales team:", salesResult)
        emailErrors.push("Sales team notification")
      }
    } catch (error) {
      console.error("Error sending sales email:", error)
      emailErrors.push("Sales team notification")
    }

    // Send confirmation email to customer
    try {
      const customerEmailResponse = await fetch(`${baseUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email,
          subject: `Quote Request Received - Brownfield General Maintenance (${referenceId})`,
          text: customerEmailText,
          html: customerEmailHtml,
        }),
      })

      const customerResult = await customerEmailResponse.json()
      if (customerEmailResponse.ok && customerResult.emailSent !== false) {
        customerEmailSent = true
        console.log("Customer confirmation email sent successfully")
      } else {
        console.error("Failed to send confirmation email to customer:", customerResult)
        emailErrors.push("Customer confirmation")
      }
    } catch (error) {
      console.error("Error sending customer email:", error)
      emailErrors.push("Customer confirmation")
    }

    // Determine success message based on email results
    let successMessage = ""

    if (salesEmailSent && customerEmailSent) {
      successMessage = `Thank you! Your request (${referenceId}) has been received. We've sent a confirmation to your email and our team will contact you within 24 hours.`
    } else if (salesEmailSent || customerEmailSent) {
      successMessage = `Thank you! Your request (${referenceId}) has been received. Our team will contact you within 24 hours. If you don't receive a confirmation email, please call us at +971 56 5755877.`
    } else {
      successMessage = `Thank you! Your request (${referenceId}) has been received. Our team will contact you within 24 hours. Please save this reference number and call us at +971 56 5755877 if you need immediate assistance.`
    }

    return {
      success: true,
      message: successMessage,
      referenceId: referenceId,
      emailsSent: {
        sales: salesEmailSent,
        customer: customerEmailSent,
      },
    }
  } catch (error) {
    console.error("Error submitting quote request:", error)
    return {
      success: false,
      message: "Failed to submit quote request. Please try again or contact us directly at +971 56 5755877.",
    }
  }
}
