/**
 * Minimal analytics utility function.
 * Tracks user interactions and payment events.
 */
export function trackEvent(eventName, payload = {}) {
  console.log(`[Analytics] ${eventName}:`, payload);
  
  // If window.gtag exists, report it to Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}
