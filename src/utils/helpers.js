// AI Tools Store - UI & Data Helper Utilities

// Parse any YouTube link into a clean embed URL
export function formatVideoEmbedUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();

  // Already an embed URL
  if (trimmed.includes('/embed/')) {
    return trimmed;
  }

  // Standard youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=0&rel=0`;
  }

  // Return direct URL (e.g. mp4 or other video hosts)
  return trimmed;
}

// Country Flags & Display Helper
export function getCountryFlag(countryName = '') {
  const c = (countryName || '').toLowerCase().trim();
  if (c.includes('pakistan')) return '🇵🇰';
  if (c.includes('india')) return '🇮🇳';
  if (c.includes('emirates') || c.includes('uae') || c.includes('dubai')) return '🇦🇪';
  if (c.includes('saudi')) return '🇸🇦';
  if (c.includes('united states') || c.includes('usa') || c === 'us') return '🇺🇸';
  if (c.includes('united kingdom') || c.includes('uk') || c.includes('britain')) return '🇬🇧';
  if (c.includes('canada')) return '🇨🇦';
  if (c.includes('australia')) return '🇦🇺';
  if (c.includes('germany')) return '🇩🇪';
  if (c.includes('france')) return '🇫🇷';
  if (c.includes('bangladesh')) return '🇧🇩';
  if (c.includes('turkey') || c.includes('turkiye')) return '🇹🇷';
  return '🌐';
}

// Resolve country-targeted localized price for a tool
export function getToolLocalizedPrice(tool, targetCountry = '') {
  if (!tool) return '$19 /month';
  const pricing = tool.countryPricing || tool.country_pricing || {};
  
  // Normalize target country
  let country = targetCountry;
  if (!country) {
    try {
      const stored = localStorage.getItem('ai_tools_user_country_v1');
      if (stored) country = stored;
    } catch (e) {}
  }
  if (!country) country = 'Pakistan';

  const cleanTarget = country.toLowerCase().trim();

  // 1. Direct match on country name in pricing object
  for (const [key, val] of Object.entries(pricing)) {
    if (val && typeof val === 'string' && val.trim()) {
      const k = key.toLowerCase().trim();
      if (k === cleanTarget || cleanTarget.includes(k) || k.includes(cleanTarget)) {
        return val.trim();
      }
    }
  }

  // 2. Fallback to DEFAULT / Global / Other in countryPricing
  for (const [key, val] of Object.entries(pricing)) {
    if (val && typeof val === 'string' && val.trim()) {
      const k = key.toLowerCase().trim();
      if (['default', 'global', 'other', 'others', 'world'].includes(k)) {
        return val.trim();
      }
    }
  }

  // 3. Fallback to base tool.price
  return tool.price || '$19 /month';
}

// Render formatted multiline text or bullet points into clean HTML list
export function renderFormattedPoints(rawText, options = {}) {
  if (!rawText) return '';
  const isCard = Boolean(options.isCard);
  const maxCardPoints = options.maxPoints || 3;

  // Normalize line breaks
  const normalized = String(rawText).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!normalized) return '';

  // Check if text has multiple lines or bullet markers
  const rawLines = normalized.split('\n');
  const bulletRegex = /^[\s]*[•\-\*\+✔✓✦\>»]\s*/;
  const numberedRegex = /^[\s]*\d+[\.\)]\s*/;

  let points = [];

  // Case 1: Multiple lines present
  if (rawLines.length > 1) {
    points = rawLines
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(bulletRegex, '').replace(numberedRegex, '').trim())
      .filter(Boolean);
  } else {
    // Case 2: Single string that might contain bullet symbols like • or - or ✦
    if (normalized.includes('•') || normalized.includes('✦') || normalized.includes(' - ')) {
      points = normalized
        .split(/(?:[•✦]|\s+-\s+)/)
        .map((p) => p.trim())
        .filter(Boolean);
    }
  }

  // If valid points were found (at least 2 points, or 1 marked bullet)
  if (points.length >= 2 || (points.length === 1 && (bulletRegex.test(rawText) || rawLines.length > 1))) {
    const displayPoints = isCard ? points.slice(0, maxCardPoints) : points;
    const itemsHtml = displayPoints
      .map((point) => {
        // Escape basic HTML entities
        const safeText = point
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<li class="tool-bullet-item"><span class="tool-bullet-dot">✦</span><span class="tool-bullet-text">${safeText}</span></li>`;
      })
      .join('');

    const moreIndicator = (isCard && points.length > maxCardPoints)
      ? `<li class="tool-bullet-more">+ ${points.length - maxCardPoints} more points...</li>`
      : '';

    return `<ul class="tool-desc-bullets ${isCard ? 'tool-desc-bullets-card' : ''}">${itemsHtml}${moreIndicator}</ul>`;
  }

  // Otherwise return safe paragraph with line breaks preserved
  const safeText = normalized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<span class="tool-desc-plain">${safeText}</span>`;
}

// Generate high-converting WhatsApp direct link
export function buildWhatsAppLink(whatsappUrl, toolName = '', toolPrice = '', userCountry = '') {
  if (whatsappUrl && whatsappUrl.startsWith('http') && !toolPrice) {
    return whatsappUrl;
  }
  const defaultBase = import.meta.env.VITE_DEFAULT_WHATSAPP_URL || 'https://chat.whatsapp.com/invite/aitools-store-vip';
  if (!toolName) return defaultBase;

  let msgText = `Hello! I would like to purchase and activate ${toolName} from AI Tools Store.`;
  if (toolPrice) {
    const countryText = userCountry ? ` for ${userCountry}` : '';
    msgText = `Hello! I would like to purchase ${toolName} at ${toolPrice}${countryText} from AI Tools Store. Please share activation details.`;
  }

  // If custom WhatsApp URL is already a wa.me or API link, retain the base phone number
  if (whatsappUrl && whatsappUrl.includes('wa.me/')) {
    const phoneMatch = whatsappUrl.match(/wa\.me\/([0-9+]+)/);
    if (phoneMatch && phoneMatch[1]) {
      return `https://wa.me/${phoneMatch[1].replace(/\D/g, '')}?text=${encodeURIComponent(msgText)}`;
    }
  }

  return `https://wa.me/1234567890?text=${encodeURIComponent(msgText)}`;
}

// Brand SVG Icons Generator for pixel-perfect cards
export function getToolIconSvg(toolId, toolName = '') {
  const id = (toolId || '').toLowerCase();

  // WriteGen AI - Spiral whirl icon from reference
  if (id.includes('writegen')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm0-8a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
      <path d="M12 6a6 6 0 0 1 6 6"/>
      <path d="M12 18a6 6 0 0 1-6-6"/>
    </svg>`;
  }

  // Artify Studio - Futuristic layered triangle / delta from reference
  if (id.includes('artify')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3L2 21h20L12 3z" fill="rgba(16, 185, 129, 0.25)"/>
      <path d="M12 8l5 9H7l5-9z" fill="currentColor"/>
    </svg>`;
  }

  // CodePilot AI - 3D Isometric Cube from reference
  if (id.includes('codepilot')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="rgba(59, 130, 246, 0.25)"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>`;
  }

  if (id.includes('chatgpt')) {
    return `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.5 10.3c-.2-1.3-.9-2.4-2-3.1-.3-.2-.6-.4-1-.5-.2-.9-.8-1.7-1.6-2.2-.8-.5-1.7-.6-2.6-.4-.5-.7-1.3-1.2-2.2-1.4-.9-.2-1.8 0-2.6.5-1.1-.7-2.5-.8-3.7-.3-1.2.5-2 1.5-2.2 2.8-1 .3-1.8 1-2.3 1.9-.5.9-.6 2-.2 3-.7.9-.9 2-.5 3 .4 1 1.2 1.7 2.2 2 .2.9.8 1.7 1.6 2.2.8.5 1.7.6 2.6.4.5.7 1.3 1.2 2.2 1.4.9.2 1.8 0 2.6-.5 1.1.7 2.5.8 3.7.3 1.2-.5 2-1.5 2.2-2.8 1-.3 1.8-1 2.3-1.9.5-.9.6-2 .2-3 .8-.9 1-2 .6-3-.4-1-1.2-1.7-2.2-2.1zm-8.8 10.2c-.7 0-1.4-.3-1.9-.8l.2-.1 3.5-2c.2-.1.3-.3.3-.5v-4.9l1.5.9v4.4c0 1.7-1.6 3-3.6 3zm-6.8-4.4c-.4-.7-.5-1.6-.3-2.4l.2.1 3.5 2c.2.1.4.1.6 0l4.2-2.5v1.7l-3.8 2.2c-1.5.9-3.5.4-4.4-1.1zm-1.5-7.5c.3-.7.9-1.3 1.6-1.6v4.2c0 .2.1.4.3.5l4.2 2.5-1.5.9-3.8-2.2c-1.5-.9-2-2.8-1.1-4.3zm12.3 2.5l-4.2-2.5 1.5-.9 3.8 2.2c1.5.9 2 2.8 1.1 4.3-.3.7-.9 1.3-1.6 1.6v-4.2c0-.2-.1-.4-.3-.5zm1.8-3c.4.7.5 1.6.3 2.4l-.2-.1-3.5-2c-.2-.1-.4-.1-.6 0l-4.2 2.5v-1.7l3.8-2.2c1.5-.9 3.5-.4 4.4 1.1zm-7-2.3c.7 0 1.4.3 1.9.8l-.2.1-3.5 2c-.2.1-.3.3-.3.5v4.9l-1.5-.9v-4.4c0-1.7 1.6-3 3.6-3z"/>
    </svg>`;
  }

  if (id.includes('midjourney')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19c4-1 12-1 16 0"/>
      <path d="M12 4v12"/>
      <path d="M12 4c3 4 5 7 8 10"/>
      <path d="M12 4c-3 4-5 7-8 10"/>
    </svg>`;
  }

  if (id.includes('notion')) {
    return `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 4.5v15h3.8v-8.4l6.4 8.4h4.8v-15h-3.8v8.4l-6.4-8.4H4.5z"/>
    </svg>`;
  }

  if (id.includes('runway')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 5h7a5 5 0 0 1 0 10H6V5z"/>
      <path d="M12 15l6 5"/>
    </svg>`;
  }

  if (id.includes('elevenlabs') || id.includes('voice')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 10v4"/>
      <path d="M8 7v10"/>
      <path d="M12 3v18"/>
      <path d="M16 7v10"/>
      <path d="M20 10v4"/>
    </svg>`;
  }

  if (id.includes('claude')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>`;
  }

  if (id.includes('copilot') || id.includes('code')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>`;
  }

  if (id.includes('descript')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 6h6a6 6 0 0 1 0 12H6z"/>
      <path d="M6 18h12"/>
    </svg>`;
  }

  if (id.includes('tome') || id.includes('present')) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    </svg>`;
  }

  // Default Sparkle / AI icon
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z"/>
  </svg>`;
}

// Show Toast notification
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
