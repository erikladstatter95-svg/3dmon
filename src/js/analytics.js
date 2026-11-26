export const GA4_ID = 'G-E76DZMT0FL'
export const OFFICIAL_WA_PHONE = '542644113760'
export const THEME_STORAGE_KEY = '3dmon_theme'

/**
 * Indica si las visitas locales/internas deben excluirse de GA4.
 */
export function isAnalyticsIgnored() {
  if (typeof window === 'undefined') return true
  return Boolean(window._dmIgnoreAnalytics || window[`ga-disable-${GA4_ID}`])
}

/**
 * Envía un evento seguro a Google Analytics 4 respetando el filtro de tráfico interno.
 */
export function trackGA4Event(eventName, params = {}) {
  try {
    if (isAnalyticsIgnored()) return
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params)
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params })
    }
  } catch {
    // Silencioso si el navegador bloquea analítica
  }
}

/**
 * Clasifica la intención comercial según la ruta o el texto del enlace/botón.
 */
export function detectServiceIntent(textOrHref = '') {
  const path = (typeof window !== 'undefined' ? window.location.pathname : '').toLowerCase()
  const combined = `${path} ${(textOrHref || '').toLowerCase()}`

  if (combined.includes('repuesto') || combined.includes('engranaje') || combined.includes('pieza-rota')) {
    return 'repuestos'
  }
  if (combined.includes('prototip') || combined.includes('pyme') || combined.includes('ingenier')) {
    return 'prototipado'
  }
  if (
    combined.includes('mayor') ||
    combined.includes('souvenir') ||
    combined.includes('llavero') ||
    combined.includes('merch') ||
    combined.includes('medalla')
  ) {
    return 'mayorista'
  }
  if (
    combined.includes('pla') ||
    combined.includes('petg') ||
    combined.includes('abs') ||
    combined.includes('asa') ||
    combined.includes('tpu') ||
    combined.includes('resina') ||
    combined.includes('infill') ||
    combined.includes('tolerancia') ||
    combined.includes('capa')
  ) {
    return 'materiales_tecnicos'
  }
  return 'impresion_3d_general'
}

/**
 * Registra los eventos generate_lead y whatsapp_click ante clic humano en WhatsApp.
 */
export function trackWhatsAppConversion(element, customMsg = '') {
  try {
    if (isAnalyticsIgnored()) return
    const rawText = (
      element?.getAttribute?.('aria-label') ||
      element?.textContent ||
      'Boton WhatsApp'
    )
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80)

    const href = element?.getAttribute?.('href') || customMsg || ''
    const serviceIntent = detectServiceIntent(`${rawText} ${href}`)

    trackGA4Event('generate_lead', {
      currency: 'ARS',
      lead_source: window.location.pathname,
      page_title: document.title,
      service_intent: serviceIntent,
      cta_text: rawText,
    })

    trackGA4Event('whatsapp_click', {
      page_path: window.location.pathname,
      page_title: document.title,
      service_intent: serviceIntent,
      cta_text: rawText,
    })
  } catch {
    // Fallback silencioso
  }
}

/**
 * Aplica el tema elegido en data-theme y sincroniza <meta name="color-scheme">.
 */
export function applyTheme(theme) {
  const resolved = theme === 'light' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', resolved)
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) {
    meta.setAttribute('content', resolved)
  }
  return resolved
}

/**
 * Inicializa el toggle de tema claro/oscuro en páginas estáticas del blog.
 */
export function initThemeToggle(buttonSelector = '[data-theme-toggle]') {
  let current = 'dark'
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      current = stored
    }
  } catch {
    // localStorage bloqueado
  }

  applyTheme(current)

  const syncButtons = (themeValue) => {
    document.querySelectorAll(buttonSelector).forEach((btn) => {
      btn.setAttribute('aria-pressed', String(themeValue === 'light'))
    })
  }
  syncButtons(current)

  document.querySelectorAll(buttonSelector).forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
      applyTheme(next)
      syncButtons(next)
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        // localStorage bloqueado
      }
    })
  })

  window.addEventListener('storage', (event) => {
    if (event.key === THEME_STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
      applyTheme(event.newValue)
      syncButtons(event.newValue)
    }
  })
}

/**
 * Inicializa listeners globales de conversión WhatsApp, acordeones FAQ y lectura 75%.
 */
export function initGlobalTracking() {
  if (typeof window === 'undefined' || window._dmGlobalTrackingInit) return
  window._dmGlobalTrackingInit = true

  document.addEventListener('click', (event) => {
    const target = event.target
    if (!target || typeof target.closest !== 'function') return

    const waBtn = target.closest('[data-wa-msg]')
    if (waBtn) {
      event.preventDefault()
      const rawPhone = waBtn.getAttribute('data-wa-phone') || OFFICIAL_WA_PHONE
      const cleanPhone = rawPhone.replace(/[^0-9]/g, '') || OFFICIAL_WA_PHONE
      const msg =
        waBtn.getAttribute('data-wa-msg') ||
        'Hola 3DMON! Quiero consultar por un presupuesto de impresion 3D.'

      trackWhatsAppConversion(waBtn, msg)
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg.trim())}`
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }

    const waLink = target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]')
    if (waLink) {
      trackWhatsAppConversion(waLink, waLink.getAttribute('href') || '')
    }
  })

  document.addEventListener(
    'toggle',
    (event) => {
      const detail = event.target
      if (detail && detail.tagName === 'DETAILS' && detail.open) {
        const summary = detail.querySelector('summary')
        const questionText = (summary ? summary.textContent : 'FAQ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 100)
        trackGA4Event('faq_expand', {
          page_path: window.location.pathname,
          question_text: questionText,
        })
      }
    },
    { capture: true }
  )

  const path = window.location.pathname
  const isArticlePage = path.startsWith('/blog/') && path.replace(/\/+$/, '') !== '/blog'
  if (isArticlePage) {
    let read75Fired = false
    let timeQualified = false
    setTimeout(() => {
      timeQualified = true
    }, 8000)

    window.addEventListener(
      'scroll',
      () => {
        if (read75Fired || !timeQualified) return
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        if (docHeight > 300 && scrollTop / docHeight >= 0.75) {
          read75Fired = true
          trackGA4Event('article_read_75', {
            page_path: window.location.pathname,
            page_title: document.title,
          })
        }
      },
      { passive: true }
    )
  }
}
