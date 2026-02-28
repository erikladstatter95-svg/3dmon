import React from 'react'
import './FunnelHighlights.css'

const highlights = [
    {
        title: 'Diseño desde cero',
        desc: '¿Tienes una idea o una foto? La convertimos en un modelo 3D. Especialistas en llaveros y medallas personalizadas.',
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    },
    {
        title: 'Merchandising & Souvenirs',
        desc: 'Producción en serie para eventos y marcas con tiempos récord en San Juan. Calidad que sorprende.',
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
    },
    {
        title: 'Piezas a Medida',
        desc: 'Desde accesorios para karting hasta repuestos específicos en PETG. Si lo imaginas, lo fabricamos.',
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
    }
]

const FunnelHighlights = () => {
    return (
        <section className="funnel-highlights">
            <div className="section-head">
                <h2 className="section-title">¿QUÉ PODEMOS <span className="highlight">CREAR</span>?</h2>
                <p className="section-intro">Transformamos tus ideas y fotos en realidad palpable.</p>
            </div>

            <div className="highlights-grid">
                {highlights.map((h, idx) => (
                    <div key={idx} className="highlight-card">
                        <div className="highlight-icon">{h.icon}</div>
                        <h3>{h.title}</h3>
                        <p>{h.desc}</p>
                    </div>
                ))}
            </div>

            <div className="testimonial-section">
                <h3 className="sub-title">LO QUE DICEN NUESTROS CLIENTES</h3>
                <div className="testimonial-card">
                    <div className="test-img-wrapper">
                        <img src="/testimonial-sc.png" alt="Trabajo Karting" />
                    </div>
                    <div className="test-content">
                        <p className="quote">"Geniooooo. Están re lindos. Me sorprendiste con los llaveros. Muchísimas gracias."</p>
                        <span className="client-name">— Cliente Satisfecho (Karting/Llaveros)</span>
                    </div>
                </div>
            </div>

            <div className="trust-badges">
                <div className="trust-badge">
                    <span className="badge-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold-dark)' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                    <div className="badge-text">
                        <strong>Cotización 24-48h</strong>
                        <p>Análisis técnico detallado</p>
                    </div>
                </div>
                <div className="trust-badge">
                    <span className="badge-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg" alt="Bandera de Argentina" width="30" height="19" loading="lazy" />
                    </span>
                    <div className="badge-text">
                        <strong>Envíos Nacionales</strong>
                        <p>Desde San Juan al país</p>
                    </div>
                </div>
                <div className="trust-badge">
                    <span className="badge-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-green)' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </span>
                    <div className="badge-text">
                        <strong>Calidad Garantizada</strong>
                        <p>Revisión manual de piezas</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FunnelHighlights
