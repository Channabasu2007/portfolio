import Mailjet from 'node-mailjet';

// Initialized inside handler

export async function POST(req) {
    try {
        const mailjet = Mailjet.apiConnect(
            process.env.MAILJET_API_KEY,
            process.env.MAILJET_SECRET_KEY
        );

        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": process.env.CONTACT_EMAIL,
                            "Name": "Portfolio Contact Form"
                        },
                        "To": [
                            {
                                "Email": process.env.CONTACT_EMAIL,
                                "Name": "Channabasavaswami Mathad"
                            }
                        ],
                        "Subject": `New Message from ${name} (${email})`,
                        "TextPart": `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                        "HTMLPart": `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><br/><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
                        "ReplyTo": {
                            "Email": email,
                            "Name": name
                        }
                    }
                ]
            });

        await request;

        return Response.json({ success: true, message: "Email sent successfully" });

    } catch (error) {
        console.error("Mailjet Error Details:", error);
        console.error("API Keys Status:", {
            apiKeyPresent: !!process.env.MAILJET_API_KEY,
            secretKeyPresent: !!process.env.MAILJET_SECRET_KEY,
            emailPresent: !!process.env.CONTACT_EMAIL
        });
        return Response.json({ error: "Failed to send email", details: error.message }, { status: 500 });
    }
}
