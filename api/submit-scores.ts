import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { UserProfile } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const userData: UserProfile = req.body;

        if (!userData || !userData.name) {
            return res.status(400).json({ error: 'Invalid user data' });
        }

        // Format game results
        const gameResults = formatGameResults(userData);

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Srimant Games <onboarding@resend.dev>', // Use your verified domain
            to: [process.env.RECIPIENT_EMAIL || 'your-email@example.com'],
            subject: `🎉 Srimant Game Scores - ${userData.name}`,
            html: `
        <h2>Guest Submission from ${userData.name}</h2>
        <p><strong>Total Score:</strong> ${userData.score} points</p>
        <p><strong>Games Completed:</strong> ${userData.completedGames.length}</p>
        <hr />
        <h3>Game Results:</h3>
        ${gameResults}
        <hr />
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ success: true, messageId: data?.id });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function formatGameResults(userData: UserProfile): string {
    let html = '<ul>';

    // Check which games were completed and format their data
    if (userData.completedGames.includes('memory' as any)) {
        html += '<li><strong>Guess the Item (Memory Game):</strong> Completed ✓</li>';
    }

    if (userData.completedGames.includes('who-said-it' as any)) {
        html += '<li><strong>Mom or Dad?:</strong> Completed ✓</li>';
    }

    if (userData.completedGames.includes('predictions' as any)) {
        const pred = userData.predictions;
        html += `<li><strong>Baby Predictions:</strong><br/>`;
        if (pred) {
            html += `Gender: ${pred.gender || 'N/A'}<br/>`;
            html += `Weight: ${pred.weight || 'N/A'}<br/>`;
            html += `Date: ${pred.date || 'N/A'}`;
        }
        html += '</li>';
    }

    if (userData.completedGames.includes('cravings' as any)) {
        html += '<li><strong>Khushbu\'s Cravings:</strong> Completed ✓</li>';
    }

    if (userData.completedGames.includes('scramble' as any)) {
        html += '<li><strong>Word Scramble:</strong> Completed ✓</li>';
    }

    html += '</ul>';
    return html;
}
