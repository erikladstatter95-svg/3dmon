import React, { useState, useEffect } from 'react'
import './WhatsAppWidget.css'
import { OFFICIAL_WA_PHONE, trackWhatsAppConversion } from '../js/analytics'

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Show popup when scrolling to #servicios section
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsOpen(true)
                observer.disconnect()
            }
        }, { threshold: 0.1 })

        const target = document.getElementById('servicios')
        if (target) observer.observe(target)

        // Fallback timer if they don't scroll
        const timer = setTimeout(() => setIsOpen(true), 6000)

        return () => {
            observer.disconnect()
            clearTimeout(timer)
        }
    }, [])

    const handleWhatsAppClick = (e) => {
        const rawMsg = '¡Hola 3DMON! Tengo una idea para imprimir y quiero pedir un presupuesto.'
        trackWhatsAppConversion(e.currentTarget, rawMsg)
        const msg = encodeURIComponent(rawMsg)
        window.open(`https://wa.me/${OFFICIAL_WA_PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="wa-widget-container">
            {isOpen && (
                <div className="wa-popup shadow">
                    <button type="button" className="close-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">×</button>
                    <div className="wa-msg">
                        <p><strong>3DMON</strong></p>
                        <p>¿En qué podemos ayudarte hoy?</p>
                        <button
                            type="button"
                            onClick={handleWhatsAppClick}
                            className="wa-btn-inner"
                        >
                            Consultar por WhatsApp
                        </button>
                    </div>
                </div>
            )}
            <button
                type="button"
                className="wa-fab shadow-pop"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir consulta por WhatsApp"
                style={{ border: 'none' }}
            >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp 3DMON" />
                <span className="wa-pulse"></span>
            </button>
        </div>
    )
}

export default WhatsAppWidget
