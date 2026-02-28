import React from 'react'
import './Hero.css'

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">IMPRESIÓN 3D ARGENTINA</h1>
                <p className="hero-subtitle">
                    SOLUCIONES DE CALIDAD DESDE <span className="highlight-location">SAN JUAN</span>
                </p>
                <div className="hero-description">
                    Somos una micropyme dedicada a materializar tus ideas en todo el país. Especialistas en <strong>diseño e impresión 3D</strong> (PLA y PETG) para repuestos, modelos y pedidos mayoristas.
                </div>
                <div className="hero-info-badges">
                    <span className="badge">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg" alt="Bandera de Argentina" width="20" height="13" style={{ verticalAlign: 'middle' }} />
                        Envíos a todo el país
                    </span>
                    <span className="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3D8700' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        PLA Ecológico
                    </span>
                    <span className="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E9A900' }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                        PETG Resistente
                    </span>
                </div>
                <div className="hero-cta">
                    <a href="#proyectos" className="cta-button-digi">VER PROYECTOS</a>
                    <a href="https://wa.me/542644113760" className="cta-button-outline" target="_blank" rel="noopener noreferrer">PRESUPUESTAR</a>
                </div>
            </div>

            <div className="hero-visual">
                <div className="visual-pattern"></div>
                <img src="/logo-main.png" alt="3DMON Logo Principal" className="hero-floating-logo" width="350" height="350" fetchpriority="high" />
            </div>
        </section>
    )
}

export default Hero
