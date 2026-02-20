import React from 'react'
import './ServicesTeaser.css'

const steps = [
    { id: 1, title: 'Recibimos tu idea', desc: 'Envíanos tu archivo STL, fotos o cuéntanos tu idea por WhatsApp.' },
    { id: 2, title: 'Presupuestamos', desc: 'Realizamos un análisis técnico y te pasamos el valor en 24-48hs.' },
    { id: 3, title: 'Imprimimos', desc: 'Materializamos tu pieza en PLA o PETG con control de calidad constante.' },
    { id: 4, title: 'Enviamos', desc: 'Realizamos envíos seguros a todo el país desde San Juan.' }
]

const ServicesTeaser = () => {
    return (
        <section className="services-teaser" id="servicios">
            <div className="how-it-works">
                <h2 className="section-title">CÓMO <span className="highlight">TRABAJAMOS</span></h2>

                <div className="process-split">
                    <div className="video-column">
                        <div className="video-card">
                            <video autoPlay loop muted playsInline className="p-video">
                                <source src="/ornamentos.mp4" type="video/mp4" />
                            </video>
                            <div className="video-label">En proceso: Adornos Navideños</div>
                        </div>
                    </div>

                    <div className="steps-column">
                        <div className="steps-list">
                            {steps.map(s => (
                                <div key={s.id} className="step-item">
                                    <div className="step-num-small">{s.id}</div>
                                    <div className="step-text">
                                        <h3>{s.title}</h3>
                                        <p>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="micropyme-note">
                <p>Desde San Juan para toda la Argentina: convertimos fotos e ideas en objetos reales.</p>
            </div>
        </section>
    )
}

export default ServicesTeaser
