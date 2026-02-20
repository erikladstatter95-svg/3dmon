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
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg" alt="AR" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
                        Envíos a todo el país
                    </span>
                    <span className="badge">♻️ PLA Ecológico</span>
                    <span className="badge">🔨 PETG Resistente</span>
                </div>
                <div className="hero-cta">
                    <a href="#proyectos" className="cta-button-digi">VER PROYECTOS</a>
                    <a href="https://wa.me/542644113760" className="cta-button-outline" target="_blank" rel="noopener noreferrer">PRESUPUESTAR</a>
                </div>
            </div>

            <div className="hero-visual">
                <div className="visual-pattern"></div>
                <img src="/logo-main.png" alt="3DMON Logo Principal" className="hero-floating-logo" />
            </div>
        </section>
    )
}

export default Hero
