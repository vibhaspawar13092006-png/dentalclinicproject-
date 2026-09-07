import { Button } from "@/components/ui/button"
import { Star, ShieldCheck, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-24">
      {/* Editorial subtle gradient background element */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-radial-[circle_at_70%_20%] from-primary/5 via-transparent to-transparent opacity-60 dark:opacity-30 pointer-events-none" />
      
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          <ScrollReveal variant="fade-up" delay={100} duration={800}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-secondary px-4 py-1.5 text-xs font-mono uppercase tracking-widest font-semibold text-secondary-foreground shadow-sm">
              <ShieldCheck className="size-4 text-accent" />
              Sheetal Dental Clinic • Accepting New Patients
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={900}>
            <h1 className="text-balance font-heading text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-foreground">
              Gentle, modern dentistry at <em className="italic font-normal text-primary">Sheetal Dental</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300} duration={1000}>
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground font-light">
              From routine cleanings to cosmetic care, our dedicated team makes every
              visit comfortable. Experience a new standard of dental care designed entirely around you.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400} duration={1000}>
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 h-12 shadow-lg transition-all hover:scale-[1.03] pulse-gold-btn border border-accent/20 cursor-pointer"
              >
                Book Your Visit
                <ArrowRight className="size-4 ml-1.5 transition-transform group-hover/button:translate-x-1" />
              </Button>
              <Button
                render={<a href="#services" />}
                nativeButton={false}
                size="lg"
                variant="ghost"
                className="rounded-full text-foreground hover:text-primary transition-all font-semibold px-6 hover:bg-primary/5 cursor-pointer"
              >
                Explore Services
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={500} duration={1000} className="w-full">
            <div className="flex items-center gap-3 pt-4 border-t border-border/40 w-full">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-accent"
                  />
                ))}
              </div>
              <p className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
                <span className="font-semibold text-foreground">4.9/5 Rating</span> from
                1,200+ happy patients
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Hero Image with Editorial Framing */}
        <div className="relative lg:col-span-5 w-full flex justify-center lg:justify-end">
          <ScrollReveal variant="scale-in" delay={300} duration={1000} className="relative w-full max-w-[420px]">
            {/* Geometric luxury background frames */}
            <div className="absolute -inset-4 rounded-3xl border border-accent/20 translate-x-2 translate-y-2 pointer-events-none" />
            <div className="absolute -inset-4 rounded-3xl bg-secondary/30 -translate-x-2 -translate-y-2 -z-10 pointer-events-none" />
            
            <div className="overflow-hidden rounded-3xl border border-border/40 shadow-2xl aspect-[4/5] bg-muted relative group">
              <img
                src="/hero-dental.png"
                alt="A friendly dentist smiling in a modern dental clinic"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
            
            {/* Minimalist floating badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-accent/20 bg-background/95 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
              <p className="font-heading text-3xl font-normal text-primary">
                15+ <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mt-0.5">Years</span>
              </p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">Trusted Local Care</p>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  )
}
