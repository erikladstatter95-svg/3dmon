import React, { useRef, useEffect, useState } from 'react'
import './Gallery.css'

const images = [
    { src: '/portfolio/p1.jpg', alt: 'Abridor llavero personalizado impreso en 3D en San Juan' },
    { src: '/portfolio/p3.jpg', alt: 'Soporte organizador impreso en PLA alta calidad' },
    { src: '/portfolio/p4.jpg', alt: 'Pieza técnica y repuesto industrial en PETG' },
    { src: '/portfolio/p5.jpg', alt: 'Cortante de galletas diseño a medida impresión 3D' },
    { src: '/portfolio/p6.jpg', alt: 'Figura decorativa y maceta geométrica 3D' },
    { src: '/portfolio/p7.jpg', alt: 'Llaveros y souvenirs por mayor impresos en 3D' },
    { src: '/portfolio/p8.jpg', alt: 'Repuesto a medida para electrodoméstico impreso en 3D' },
    { src: '/portfolio/p9.jpg', alt: 'Maqueta arquitectónica a escala impresión 3D San Juan' }
]

const Gallery = () => {
    const scrollRef = useRef(null)
    const [isPaused, setIsPaused] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const displayImages = [...images, ...images, ...images]

    // Refs for drag state (to avoid re-renders during movement)
    const dragInfo = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        hasDragged: false
    })

    // Animation logic
    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        let animationId
        const step = () => {
            if (!isPaused && !dragInfo.current.isDown && !selectedImage) {
                container.scrollLeft += 1.5
                const oneThird = container.scrollWidth / 3
                if (container.scrollLeft >= oneThird * 2) {
                    container.scrollLeft -= oneThird
                }
            }
            animationId = requestAnimationFrame(step)
        }

        animationId = requestAnimationFrame(step)
        return () => cancelAnimationFrame(animationId)
    }, [isPaused, selectedImage])

    const scrollManual = (direction) => {
        const container = scrollRef.current
        if (!container) return

        setIsPaused(true)
        const scrollAmount = 340
        const target = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)

        container.scrollTo({
            left: target,
            behavior: 'smooth'
        })

        // Resume auto-scroll after a short delay
        setTimeout(() => setIsPaused(false), 3000)
    }

    // Unified Interaction Logic
    const startDragging = (posX) => {
        dragInfo.current.isDown = true
        dragInfo.current.hasDragged = false
        setIsPaused(true)
        dragInfo.current.startX = posX - scrollRef.current.offsetLeft
        dragInfo.current.scrollLeft = scrollRef.current.scrollLeft
    }

    const stopDragging = () => {
        if (!dragInfo.current.isDown) return
        dragInfo.current.isDown = false
        // Resume auto-scroll after a bit
        setTimeout(() => setIsPaused(false), 2000)
    }

    const moveDragging = (posX) => {
        if (!dragInfo.current.isDown) return
        const x = posX - scrollRef.current.offsetLeft
        const walk = (x - dragInfo.current.startX) * 1.5 // multiplier for sensitivity
        if (Math.abs(walk) > 5) {
            dragInfo.current.hasDragged = true
        }
        scrollRef.current.scrollLeft = dragInfo.current.scrollLeft - walk
    }

    const handleImageClick = (img) => {
        if (!dragInfo.current.hasDragged) {
            setSelectedImage(img)
        }
    }

    return (
        <section className="gallery" id="proyectos">
            <div className="section-head">
                <h2 className="section-title">PORTAFOLIO</h2>
            </div>

            <div className="slider-wrapper">
                <button className="slider-nav-btn prev" onClick={() => scrollManual('left')} aria-label="Anterior">‹</button>

                <div
                    className="slider-container"
                    ref={scrollRef}
                    onMouseDown={(e) => startDragging(e.pageX)}
                    onMouseLeave={stopDragging}
                    onMouseUp={stopDragging}
                    onMouseMove={(e) => {
                        if (!dragInfo.current.isDown) return
                        e.preventDefault()
                        moveDragging(e.pageX)
                    }}
                    onTouchStart={(e) => startDragging(e.touches[0].pageX)}
                    onTouchEnd={stopDragging}
                    onTouchMove={(e) => {
                        // Note: Don't preventDefault here to allow page scroll unless it's a clear horizontal swipe
                        moveDragging(e.touches[0].pageX)
                    }}
                >
                    <div className="slider-track-manual">
                        {displayImages.map((imgObj, idx) => (
                            <div className="slide" key={idx} onClick={() => handleImageClick(imgObj)}>
                                <div className="slide-inner">
                                    <img src={imgObj.src} alt={imgObj.alt} draggable="false" />
                                    <div className="slide-overlay">
                                        <span>VER DETALLE</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="slider-nav-btn next" onClick={() => scrollManual('right')} aria-label="Siguiente">›</button>
            </div>

            <div className="gallery-info">
                <p>Haz clic en las imágenes para verlas en detalle.</p>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>&times;</button>
                        <img src={selectedImage.src} alt={selectedImage.alt} className="lightbox-img" />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Gallery
