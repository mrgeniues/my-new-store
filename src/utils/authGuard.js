// AI Tools Store - Reusable Authentication Guard
import { authService } from '../lib/auth.js';
import { openAuthModal } from '../components/AuthModal.js';

/**
 * Protects an action by checking user authentication.
 * If user is authenticated, executes actionCallback immediately.
 * If not authenticated, opens the Sign Up / Sign In popup and automatically
 * executes actionCallback after successful authentication.
 *
 * @param {Function} actionCallback - The original action to perform (e.g. open WhatsApp Buy link)
 * @param {Object} [options] - Options (e.g. defaultTab: 'signup' or 'signin')
 */
export async function requireAuth(actionCallback, options = {}) {
  const user = await authService.getCurrentUser();

  if (user) {
    if (typeof actionCallback === 'function') {
      actionCallback();
    }
  } else {
    openAuthModal({
      defaultTab: options.defaultTab || 'signup',
      onAuthenticated: () => {
        if (typeof actionCallback === 'function') {
          // Automatically continue the original action without requiring user to click again!
          actionCallback();
        }
      }
    });
  }
}
