import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, gender, weight, date, assignedLetter, boyName, girlName } = req.body;

        if (!name || !gender || !weight || !date || !assignedLetter || !boyName || !girlName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const recipientEmail = process.env.RECIPIENT_EMAIL;
        if (!recipientEmail) {
            return res.status(500).json({ error: 'Recipient email not configured' });
        }

        // Format the email content
        const emailHtml = `
      <h2>🎉 Srimant Ceremony - Summary Submission</h2>
      <p><strong>Guest Name:</strong> ${name}</p>
      
      <h3>👶 Baby Predictions</h3>
      <ul>
        <li><strong>Gender:</strong> ${gender}</li>
        <li><strong>Weight:</strong> ${weight} lbs</li>
        <li><strong>Birth Date:</strong> ${new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</li>
      </ul>
      
      <h3>✨ Name Suggestions</h3>
      <p><strong>Assigned Letter:</strong> ${assignedLetter}</p>
      <ul>
        <li><strong>Boy Name:</strong> ${boyName}</li>
        <li><strong>Girl Name:</strong> ${girlName}</li>
      </ul>
      
      <hr />
      <p style="color: #666; font-size: 12px;">
        Submitted at: ${new Date().toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            dateStyle: 'full',
            timeStyle: 'long'
        })}
      </p>
    `;

        const emailText = `
Srimant Ceremony - Summary Submission

Guest Name: ${name}

BABY PREDICTIONS
- Gender: ${gender}
- Weight: ${weight} lbs
- Birth Date: ${new Date(date).toLocaleDateString()}

NAME SUGGESTIONS
- Assigned Letter: ${assignedLetter}
- Boy Name: ${boyName}
- Girl Name: ${girlName}

---
Submitted at: ${new Date().toLocaleString()}
    `;

        await resend.emails.send({
            from: 'Srimant Games <onboarding@resend.dev>',
            to: recipientEmail,
            subject: `🎉 Summary - ${name}`,
            html: emailHtml,
            text: emailText,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
