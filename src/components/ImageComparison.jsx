import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ImageComparison.css';

const ImageComparison = ({
    beforeImage,
    afterImage,
    beforeLabel = 'Antes',
    afterLabel = 'Después'
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = useCallback((clientX) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;

        // Calculate relative x position within the container
        let x = clientX - containerRect.left;

        // Constrain x between 0 and containerWidth
        x = Math.max(0, Math.min(x, containerWidth));

        // Convert to percentage
        const percent = (x / containerWidth) * 100;
        setSliderPosition(percent);
    }, []);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        // Prevent default scroll when sliding
        e.preventDefault();
        handleMove(e.touches[0].clientX);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    // Add global event listeners to catch mouseup/touchend outside the container
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', stopDragging);
            window.addEventListener('touchend', stopDragging);
        } else {
            window.removeEventListener('mouseup', stopDragging);
            window.removeEventListener('touchend', stopDragging);
        }

        return () => {
            window.removeEventListener('mouseup', stopDragging);
            window.removeEventListener('touchend', stopDragging);
        };
    }, [isDragging]);

    return (
        <div className="image-comparison-wrapper">
            <div
                className={`image-comparison-container ${isDragging ? 'dragging' : ''}`}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                {/* Underneath image (After / Realidad) */}
                <div className="comparison-image after-image">
                    <img src={afterImage} alt="Resultado Final" loading="lazy" />
                    <div className="comparison-label label-after">{afterLabel}</div>
                </div>

                {/* Top image (Before / Idea) - Clipped via CSS */}
                <div
                    className="comparison-image before-image"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <img src={beforeImage} alt="Imagen Original" loading="lazy" />
                    <div className="comparison-label label-before">{beforeLabel}</div>
                </div>

                {/* The Slider Divider Line & Handle */}
                <div
                    className="comparison-slider"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="slider-handle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageComparison;
