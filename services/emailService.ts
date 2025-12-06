import { UserProfile } from '../types';

/**
 * Submit user scores and game data via email
 * 
 * Note: In development, this will show a console message.
 * In production (Vercel), it will send an actual email.
 */
export const submitScores = async (userData: UserProfile): Promise<{ success: boolean; error?: string }> => {
    try {
        // Check if we're in development mode
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        if (isDev) {
            // In development: Just log to console and simulate success
            console.log('📧 EMAIL SUBMISSION (DEV MODE)');
            console.log('================================');
            console.log('Guest Name:', userData.name);
            console.log('Total Score:', userData.score);
            console.log('Games Completed:', userData.completedGames);
            console.log('Predictions:', userData.predictions);
            console.log('================================');
            console.log('✅ In production, this will be sent to your email via Resend API');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return { success: true };
        }

        // In production: Send actual email via API
        const response = await fetch('/api/submit-scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to submit scores');
        }

        const result = await response.json();
        return { success: true };
    } catch (error) {
        console.error('Email submission error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};
