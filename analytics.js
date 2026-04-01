// analytics.js - Simple analytics scaffold for HuntGuideHub

// Placeholder for Google Analytics 4 (GA4) Measurement ID
// Replace 'G-XXXXXXX' with your actual GA4 Measurement ID.
const GA_MEASUREMENT_ID = 'G-XXXXXXX';

// Initialize GA4 if measurement ID is set
function initGA4() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXX') return;
  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

// Simple page view tracking
function trackPageView() {
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }
}

// Event tracking skeleton – call `trackEvent('category','action','label',value)`
function trackEvent(category, action, label = null, value = null) {
  if (typeof gtag === 'function') {
    const event = {
      event_category: category,
      event_label: label,
      value: value,
    };
    gtag('event', action, event);
  }
}

// Placeholder for Google Search Console verification token
// Add a meta tag in your HTML: <meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN" />
// This JS file does not need to do anything special for verification.

// Initialize analytics when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initGA4();
  trackPageView();
});
