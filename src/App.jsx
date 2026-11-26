import React, { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import ServicesTeaser from './components/ServicesTeaser'
import Gallery from './components/Gallery'
import FunnelHighlights from './components/FunnelHighlights'
import ImageComparison from './components/ImageComparison'
import WhatsAppWidget from './components/WhatsAppWidget'
import { applyTheme, initGlobalTracking, THEME_STORAGE_KEY } from './js/analytics'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage bloqueado
  }
  return 'dark'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // localStorage bloqueado
    }
  }, [theme])

  useEffect(() => {
    initGlobalTracking()
    const onStorage = (event) => {
      if (event.key === THEME_STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <a href="/" className="header-brand" aria-label="3DMON Inicio">
          <img src="/logo-solo.png" alt="3DMON Logo" className="header-logo" />
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#servicios" className="nav-anchor-link">Cómo Trabajamos</a>
          <a href="#proyectos" className="nav-anchor-link">Portafolio</a>
          <a href="/blog/" className="nav-blog-link">Blog</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === 'light'}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                </svg>
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
                <span>Modo Oscuro</span>
              </>
            )}
          </button>
          <a href="https://wa.me/542644113760" className="nav-cta" target="_blank" rel="noopener noreferrer">
            Pedí tu Presupuesto
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <ServicesTeaser />
        <FunnelHighlights />

        <section className="image-comparison-section" style={{ padding: '0 10% 40px', background: 'var(--bg-primary)' }}>
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">DE LA IDEA A LA REALIDAD</h2>
            <p className="section-intro">Deslizá para ver cómo materializamos tus modelos.</p>
          </div>
          <ImageComparison
            beforeImage="/portfolio/before-llavero.jpg"
            afterImage="/portfolio/after-llavero.jpg"
            beforeLabel="Idea Inicial"
            afterLabel="Producto Final"
          />
        </section>

        <Gallery />
        <section className="seo-text-block">
          <div className="seo-container">
            <h2>Especialistas en Impresión 3D en San Juan</h2>
            <p>
              En <strong>3DMON</strong> transformamos tus ideas digitales en objetos tangibles con la más alta precisión. Somos un laboratorio de <strong>impresión 3D a medida ubicado en San Juan, Argentina</strong>, realizando envíos a todo el territorio nacional. Principalmente trabajamos con materiales de ingeniería y diseño como <strong>PLA, PLA+ y PETG</strong>.
            </p>
            <p>
              Traenos tu proyecto: diseñamos repuestos descatalogados, souvenirs impresos al por mayor, trofeos personalizados, piezas mecánicas y cualquier desarrollo de prototipado rápido. Nos avala la calidad de cada capa en cada impresión. Si querés aprender más sobre materiales y archivos, visitá nuestro <a href="/blog/" style={{ color: 'var(--accent-gold-dark)', fontWeight: 700 }}>Blog y Guías de Impresión 3D</a>.
            </p>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <img src="/logo-solo.png" alt="3DMON" style={{ height: '40px', marginBottom: '15px' }} />
            <p>Micropyme de Impresión 3D</p>
            <p>San Juan, Capital</p>
            <p>Envíos a todo el país</p>
          </div>
          <div className="footer-col">
            <h4>SERVICIOS</h4>
            <p>Impresión PLA / PETG</p>
            <p>Prototipado Rápido</p>
            <p>Pedidos Mayoristas</p>
          </div>
          <div className="footer-col">
            <h4>GUÍAS Y BLOG</h4>
            <a href="/blog/" className="social-link">Blog y Guías 3D</a>
            <a href="/blog/?eje=principiantes" className="social-link">Guías para Principiantes</a>
            <a href="/blog/?eje=tecnico" className="social-link">Información Técnica 3D</a>
            <a href="/blog/?eje=comercial" className="social-link">Servicios y Presupuestos</a>
          </div>
          <div className="footer-col" id="contacto">
            <h4>SEGUINOS</h4>
            <div className="social-links-footer">
              <a href="https://www.instagram.com/3d.mon_/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
              <a href="https://wa.me/542644113760" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 3DMON - Laboratorio de Impresión. Todos los derechos reservados.</p>
          <div className="footer-credit">
            <a
              href="https://erikwebsite.com/"
              target="_blank"
              rel="noopener"
              title="Diseño y desarrollo web de alta velocidad - Erik Website"
              className="erik-badge"
            >
              <span className="erik-dot"></span>
              Desarrollo web por <strong>Erik Website</strong>
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppWidget />
    </div>
  )
}

export default App
