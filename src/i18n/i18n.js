// AI Tools Store - Internationalization & Translation Engine
// Supports 47+ world languages, instant RTL switching, dynamic fallback & tool overlays

import { SUPPORTED_LANGUAGES, RTL_LANGUAGES, getLanguageByCode } from './languages.js';
import enCatalog from './locales/en.js';
import urCatalog from './locales/ur.js';
import arCatalog from './locales/ar.js';
import hiCatalog from './locales/hi.js';
import esCatalog from './locales/es.js';
import frCatalog from './locales/fr.js';
import deCatalog from './locales/de.js';
import zhCatalog from './locales/zh.js';
import { authService } from '../lib/auth.js';
import { supabase } from '../lib/supabase.js';

// Pre-registered language catalogs
const catalogs = {
  en: enCatalog,
  ur: urCatalog,
  ar: arCatalog,
  hi: hiCatalog,
  es: esCatalog,
  fr: frCatalog,
  de: deCatalog,
  zh: zhCatalog
};

// Curated Tool Overlays for Key Featured Tools (in-memory overlay only; preserves DB)
const toolOverlays = {
  ur: {
    'writegen-ai': {
      name: 'رائٹ جین اے آئی',
      tagline: 'اعلیٰ معیار کا مواد، بلاگ اور کاپی سیکنڈز میں لکھیں',
      description: 'جدید ترین اے آئی ٹیکنالوجی کی مدد سے بلاگ پوسٹس، مارکیٹنگ کاپی، ای میلز اور سوشل میڈیا مواد تیار کریں۔ تیز، مؤثر اور 100 فیصد اصل تحریر۔'
    },
    'artify-studio': {
      name: 'آرٹیفائی اسٹوڈیو',
      tagline: 'اپنے تخیل کو حیرت انگیز ڈیجیٹل شاہکاروں میں تبدیل کریں',
      description: 'جدید نیورل آرٹ جنریٹر جو آپ کے خیالات کو سیکنڈوں میں شاندار تصاویر اور ویژولز میں تبدیل کر دیتا ہے۔'
    },
    'codepilot-ai': {
      name: 'کوڈ پائلٹ اے آئی',
      tagline: 'آپ کا ذہین پروگرامنگ پارٹنر اور کوڈ جنریٹر',
      description: 'کوڈ جنریشن، غلطیوں کی اصلاح اور آٹومیشن کے ذریعے اپنی کوڈنگ کی رفتار کو 10 گنا تیز کریں۔ تمام جدید زبانوں کے لیے تیار۔'
    }
  },
  ar: {
    'writegen-ai': {
      name: 'رايت جين للذكاء الاصطناعي',
      tagline: 'أنشئ محتوى ومقالات إبداعية عالية الجودة في ثوانٍ',
      description: 'أداة كتابة احترافية بالذكاء الاصطناعي لكتابة المقالات، والنصوص التسويقية، ورسائل البريد الإلكتروني بسرعة ودقة متناهية.'
    },
    'artify-studio': {
      name: 'استوديو أرتيفاي',
      tagline: 'حول خيالك وأفكارك إلى أعمال فنية بصرية مذهلة',
      description: 'منشئ فنون بصرية مدعوم بالذكاء الاصطناعي التوليدي لإنشاء تصاميم وصور فائقة الجودة في لمح البصر.'
    },
    'codepilot-ai': {
      name: 'كود بايلوت الذكي',
      tagline: 'مساعد البرمجة الذكي لتسريع كتابة وتصحيح الأكواد',
      description: 'اكتب كوداً نظيفاً، واكتشف الأخطاء البرمجية تلقائياً، وضاعف سرعتك البرمجية بفضل نماذج الذكاء الاصطناعي المتطورة.'
    }
  },
  hi: {
    'writegen-ai': {
      name: 'राइटजेन एआई',
      tagline: 'सेकंडों में उच्च गुणवत्ता वाली सामग्री और ब्लॉग लिखें',
      description: 'उन्नत एआई तकनीक से ब्लॉग पोस्ट, मार्केटिंग कॉपी, ईमेल और सोशल मीडिया सामग्री तुरंत तैयार करें।'
    },
    'artify-studio': {
      name: 'आर्टिफ़ाई स्टूडियो',
      tagline: 'अपनी कल्पना को शानदार डिजिटल कलाकृतियों में बदलें',
      description: 'शक्तिशाली न्यूरल आर्ट जनरेटर जो आपके विचारों को सेकंडों में आकर्षक कला और तस्वीरों में बदल देता है।'
    },
    'codepilot-ai': {
      name: 'कोडपायलट एआई',
      tagline: 'आपका बुद्धिमान प्रोग्रामिंग सहायक और कोड जनरेटर',
      description: 'कोड जनरेशन, बग फिक्सिंग और ऑटोमेशन के साथ अपनी कोडिंग गति को 10 गुना तेज करें।'
    }
  },
  es: {
    'writegen-ai': {
      name: 'WriteGen AI',
      tagline: 'Crea contenido y artículos de alta calidad en segundos',
      description: 'Asistente de escritura de IA para generar publicaciones de blog, textos publicitarios y correos con máxima velocidad y creatividad.'
    },
    'artify-studio': {
      name: 'Artify Studio',
      tagline: 'Transforma tu imaginación en impresionante arte digital',
      description: 'Generador de imágenes y arte impulsado por IA que convierte texto en obras de arte de alta fidelidad al instante.'
    },
    'codepilot-ai': {
      name: 'CodePilot AI',
      tagline: 'Tu copiloto inteligente para escribir y depurar código',
      description: 'Acelera tu desarrollo de software con autocompletado inteligente, detección de errores y generación de código multifuncional.'
    }
  }
};

const STORAGE_KEY = 'ai_tools_preferred_language';
const listeners = new Set();

// Detect initial language
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && getLanguageByCode(saved)) {
      return saved;
    }
    const navLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
    if (getLanguageByCode(navLang)) {
      return navLang;
    }
  } catch (err) {
    // Ignore localStorage access errors
  }
  return 'en';
}

let currentLang = detectInitialLanguage();

/**
 * Check if a language is Right-to-Left (RTL)
 */
export function isRTL(langCode = currentLang) {
  return RTL_LANGUAGES.includes(langCode.toLowerCase());
}

/**
 * Get current active language code
 */
export function getCurrentLanguage() {
  return currentLang;
}

/**
 * Get current language details
 */
export function getCurrentLanguageInfo() {
  return getLanguageByCode(currentLang) || getLanguageByCode('en');
}

/**
 * Subscribe to language changes
 */
export function onLanguageChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Translate a key with parameter interpolation
 * Example: t('nav.home'), t('allTools.resultsCount', { count: 12 })
 */
export function t(path, params = {}) {
  const activeCatalog = catalogs[currentLang] || catalogs.en;
  
  // Helper to traverse object by dot notation
  function getNested(obj, p) {
    if (!obj || typeof obj !== 'object') return undefined;
    return p.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  let value = getNested(activeCatalog, path);

  // Fallback to English if not found in active catalog
  if (value === undefined && activeCatalog !== catalogs.en) {
    value = getNested(catalogs.en, path);
  }

  // Fallback to path itself if still not found
  if (value === undefined) {
    return path;
  }

  if (typeof value !== 'string') {
    return value;
  }

  // Parameter replacement: {name}, {count}, etc.
  return value.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
}

/**
 * Apply layout direction and attributes to the document
 */
export function applyLanguageLayout(langCode) {
  if (typeof document === 'undefined') return;
  const rtl = isRTL(langCode);
  const root = document.documentElement;
  const body = document.body;

  if (!root || !body) return;

  root.setAttribute('lang', langCode);
  root.setAttribute('dir', rtl ? 'rtl' : 'ltr');

  if (rtl) {
    root.classList.add('rtl');
    body.classList.add('rtl-layout');
  } else {
    root.classList.remove('rtl');
    body.classList.remove('rtl-layout');
  }

  // Special font classes for Urdu & Arabic
  if (langCode === 'ur') {
    root.classList.add('lang-ur');
    root.classList.remove('lang-ar');
  } else if (langCode === 'ar') {
    root.classList.add('lang-ar');
    root.classList.remove('lang-ur');
  } else {
    root.classList.remove('lang-ur', 'lang-ar');
  }
}

/**
 * Set active language globally
 */
export async function setLanguage(langCode) {
  if (!getLanguageByCode(langCode)) {
    console.warn(`[i18n] Language '${langCode}' not recognized, falling back to 'en'.`);
    langCode = 'en';
  }

  currentLang = langCode;

  try {
    localStorage.setItem(STORAGE_KEY, langCode);
  } catch (err) {
    console.warn('[i18n] Could not persist language to localStorage:', err);
  }

  applyLanguageLayout(langCode);

  // Sync with Supabase profile if user is logged in
  try {
    const user = authService.getCurrentUser();
    if (user && user.id && supabase) {
      supabase.from('profiles').update({ preferred_language: langCode }).eq('id', user.id)
        .then(() => {})
        .catch(() => {});
    }
  } catch (err) {
    // Non-blocking
  }

  // Notify subscribers
  listeners.forEach(cb => {
    try {
      cb(langCode, isRTL(langCode));
    } catch (err) {
      console.error('[i18n] Error in language listener:', err);
    }
  });

  return langCode;
}

/**
 * Get localized tool fields without altering Supabase records
 */
export function getLocalizedTool(tool) {
  if (!tool) return tool;

  const overlay = toolOverlays[currentLang]?.[tool.slug];
  if (!overlay) {
    return tool; // Return original tool data if no localized overlay exists
  }

  return {
    ...tool,
    name: overlay.name || tool.name,
    tagline: overlay.tagline || tool.tagline,
    description: overlay.description || tool.description
  };
}

// Initial application on file load
if (typeof document !== 'undefined') {
  applyLanguageLayout(currentLang);
}

export default {
  t,
  setLanguage,
  getCurrentLanguage,
  getCurrentLanguageInfo,
  isRTL,
  onLanguageChange,
  getLocalizedTool,
  SUPPORTED_LANGUAGES,
  RTL_LANGUAGES
};
