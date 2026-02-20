import React, { useState, useEffect } from 'react'
import './WhatsAppWidget.css'

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

    const handleWhatsAppClick = () => {
        const msg = encodeURIComponent("¡Hola 3DMON! Tengo una idea para imprimir y quiero pedir un presupuesto.")
        window.open(`https://wa.me/542644113760?text=${msg}`, "_blank")
    }

    return (
        <div className="wa-widget-container">
            {isOpen && (
                <div className="wa-popup shadow">
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    <div className="wa-msg">
                        <p><strong>3DMON</strong></p>
                        <p>¿En qué podemos ayudarte hoy?</p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="wa-btn-inner"
                        >
                            Consultar por WhatsApp
                        </button>
                    </div>
                </div>
            )}
            <div className="wa-fab shadow-pop" onClick={() => setIsOpen(!isOpen)}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" />
                <span className="wa-pulse"></span>
            </div>
        </div>
    )
}

export default WhatsAppWidget
