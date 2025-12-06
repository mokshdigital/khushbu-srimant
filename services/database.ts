import { UserProfile } from '../types';

/**
 * SESSION STORAGE SERVICE
 * 
 * Uses sessionStorage for temporary data that clears when browser closes.
 * Perfect for event-based games where each guest gets a fresh start.
 */

const STORAGE_KEY = 'srimant_user_session';

/**
 * Save user profile to session storage
 */
export const saveUserLocally = (user: UserProfile): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

/**
 * Get user profile from session storage
 */
export const getUserLocally = (): UserProfile | null => {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * Clear user session (for starting over)
 */
export const clearUserSession = (): void => {
  sessionStorage.removeItem(STORAGE_KEY);
};
