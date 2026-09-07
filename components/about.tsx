import { Check } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const points = [
  "State-of-the-art equipment & digital imaging",
  "Pain-free, anxiety-friendly treatment options",
  "Transparent pricing with flexible payment plans",
  "Convenient evening and weekend appointments",
]

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24 overflow-hidden bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        
        {/* Left Column: Image with Luxury Framing */}
        <div className="order-2 lg:order-1 lg:col-span-6 w-full flex justify-center lg:justify-start">
          <ScrollReveal variant="scale-in" delay={200} duration={900} className="relative w-full max-w-[480px]">
            <div className="absolute -inset-4 rounded-3xl border border-accent/20 translate-x-3 translate-y-3 pointer-events-none" />
            <div className="absolute -inset-4 rounded-3xl bg-secondary/35 -translate-x-3 -translate-y-3 -z-10 pointer-events-none" />
            
            <div className="overflow-hidden rounded-3xl border border-border/40 shadow-2xl aspect-[4/3] bg-muted relative group">
              <img
                src="/clinic-interior.png"
                alt="Modern, calming dental treatment room"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Text Content */}
        <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-start gap-6">
          <ScrollReveal variant="fade-up" delay={100} duration={800}>
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Why Sheetal Dental
            </span>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={200} duration={800}>
            <h2 className="text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Care that puts <em className="italic text-primary font-normal">your comfort first</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300} duration={800}>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground font-light">
              We built Sheetal Dental Clinic to feel less like a clinic and more like a
              calm, welcoming space. Our team takes the time to listen, explain,
              and tailor every treatment to your specific needs.
            </p>
          </ScrollReveal>

          <ul className="flex flex-col gap-4 w-full">
            {points.map((point, index) => (
              <ScrollReveal 
                key={point} 
                variant="fade-up" 
                delay={350 + index * 80} 
                duration={700}
                className="flex items-start gap-3.5"
              >
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary border border-accent/20 text-accent">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-foreground/90 font-light text-sm sm:text-base">{point}</span>
              </ScrollReveal>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
