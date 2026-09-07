"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function SmileSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let position = (x / rect.width) * 100
    if (position < 0) position = 0
    if (position > 100) position = 100
    setSliderPosition(position)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <section className="py-16 lg:py-24 bg-background border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-secondary px-3.5 py-1 text-xs font-mono uppercase tracking-widest font-semibold text-secondary-foreground">
              <Sparkles className="size-3.5 text-accent" />
              Smile Gallery
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Real Transformations, <em className="italic text-primary font-normal">Proven Results</em>
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground font-light leading-relaxed">
              Drag the golden handle to slide between our patient’s original teeth alignment & whitening status, and their final result after treatments.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale-in" delay={250} duration={900} className="mx-auto max-w-2xl relative select-none">
          <div
            ref={containerRef}
            className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-border/40 shadow-2xl bg-muted cursor-ew-resize"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* After Image (Background) */}
            <img
              src="/teeth_after.png"
              alt="After treatment teeth smile"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
            <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground border border-accent/20 backdrop-blur-md text-xs font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-xl shadow-md z-10 select-none">
              After Treatment
            </div>

            {/* Before Image (Overlay Container) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Image needs to stay parent-width to avoid stretching/shrinking */}
              <div className="absolute inset-0 h-[380px] w-[672px] sm:w-[608px] md:w-[672px] lg:w-[672px] max-w-2xl">
                <img
                  src="/teeth_before.png"
                  alt="Before treatment teeth smile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-background/90 text-foreground border border-accent/20 backdrop-blur-md text-xs font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-xl shadow-md z-10 select-none">
                Before Treatment
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-accent cursor-ew-resize z-20 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="size-10 rounded-full bg-accent text-accent-foreground border-2 border-background shadow-2xl flex items-center justify-center pulse-gold-btn cursor-ew-resize">
                <svg
                  className="size-4 text-accent-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l-3 3 3 3m8-6l3 3-3 3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
