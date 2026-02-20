import React from 'react'
import './FunnelHighlights.css'

const highlights = [
    {
        title: 'Diseño desde cero',
        desc: '¿Tienes una idea o una foto? La convertimos en un modelo 3D. Especialistas en llaveros y medallas personalizadas.',
        icon: '✍️'
    },
    {
        title: 'Merchandising & Souvenirs',
        desc: 'Producción en serie para eventos y marcas con tiempos récord en San Juan. Calidad que sorprende.',
        icon: '🏆'
    },
    {
        title: 'Piezas a Medida',
        desc: 'Desde accesorios para karting hasta repuestos específicos en PETG. Si lo imaginas, lo fabricamos.',
        icon: '🚀'
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
                    <span className="badge-icon">⏱️</span>
                    <div className="badge-text">
                        <strong>Cotización 24-48h</strong>
                        <p>Análisis técnico detallado</p>
                    </div>
                </div>
                <div className="trust-badge">
                    <span className="badge-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg" alt="AR" style={{ width: '30px' }} />
                    </span>
                    <div className="badge-text">
                        <strong>Envíos Nacionales</strong>
                        <p>Desde San Juan al país</p>
                    </div>
                </div>
                <div className="trust-badge">
                    <span className="badge-icon">✅</span>
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
