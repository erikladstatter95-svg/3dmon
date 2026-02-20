import React, { useRef, useEffect, useState } from 'react'
import './Gallery.css'

const images = [
    '/portfolio/p1.jpg', '/portfolio/p3.jpg', '/portfolio/p4.jpg',
    '/portfolio/p5.jpg', '/portfolio/p6.jpg', '/portfolio/p7.jpg',
    '/portfolio/p8.jpg', '/portfolio/p9.jpg'
]

const Gallery = () => {
    const scrollRef = useRef(null)
    const [isPaused, setIsPaused] = useState(false)
    const displayImages = [...images, ...images, ...images]

    // Refs for drag state (to avoid re-renders during movement)
    const dragInfo = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0
    })

    // Animation logic
    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        let animationId
        const step = () => {
            if (!isPaused && !dragInfo.current.isDown) {
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
    }, [isPaused])

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
        scrollRef.current.scrollLeft = dragInfo.current.scrollLeft - walk
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
                        {displayImages.map((img, idx) => (
                            <div className="slide" key={idx}>
                                <div className="slide-inner">
                                    <img src={img} alt={`Trabajo ${idx}`} draggable="false" />
                                    <div className="slide-overlay">
                                        <span>3DMON FDM</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="slider-nav-btn next" onClick={() => scrollManual('right')} aria-label="Siguiente">›</button>
            </div>

            <div className="gallery-info">
                <p>Expertos en piezas técnicas, decorativas y mayoristas.</p>
            </div>
        </section>
    )
}

export default Gallery
