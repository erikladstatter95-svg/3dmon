import React, { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import ServicesTeaser from './components/ServicesTeaser'
import Gallery from './components/Gallery'
import FunnelHighlights from './components/FunnelHighlights'
import WhatsAppWidget from './components/WhatsAppWidget'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <a href="/" className="header-brand">
          <img src="/logo-solo.png" alt="3DMON Logo" className="header-logo" />
        </a>

        <nav className="main-nav">
          <a href="#servicios">Cómo Trabajamos</a>
          <a href="#proyectos">Portafolio</a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
          <a href="https://wa.me/542644113760" className="nav-cta" target="_blank" rel="noopener noreferrer">Pedí tu Presupuesto</a>
        </nav>
      </header>

      <main>
        <Hero />
        <ServicesTeaser />
        <FunnelHighlights />
        <Gallery />
        <section className="seo-text-block">
          <div className="seo-container">
            <h2>Especialistas en Impresión 3D en San Juan</h2>
            <p>
              En <strong>3DMON</strong> transformamos tus ideas digitales en objetos tangibles con la más alta precisión. Somos un laboratorio de <strong>impresión 3D a medida ubicado en San Juan, Argentina</strong>, realizando envíos a todo el territorio nacional. Principalmente trabajamos con materiales de ingeniería y diseño como <strong>PLA, PLA+ y PETG</strong>.
            </p>
            <p>
              Tráenos tu proyecto: diseñamos repuestos descatalogados, souvenirs impresos al por mayor, trofeos personalizados, piezas mecánicas y cualquier desarrollo de prototipado rápido. Nos avala la calidad de cada capa en cada impresión.
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
            <p>Envíos a todo el país 🇦🇷</p>
          </div>
          <div className="footer-col">
            <h4>SERVICIOS</h4>
            <p>Impresión PLA / PETG</p>
            <p>Prototipado Rápido</p>
            <p>Pedidos Mayoristas</p>
          </div>
          <div className="footer-col" id="contacto">
            <h4>SÍGUENOS</h4>
            <div className="social-links-footer">
              <a href="https://www.instagram.com/3d.mon_/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
              <a href="https://wa.me/542644113760" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 3DMON - Laboratorio de Impresión</p>
        </div>
      </footer>

      <WhatsAppWidget />
    </div>
  )
}

export default App
