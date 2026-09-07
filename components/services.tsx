import { Sparkles, Stethoscope, Smile, Baby, ShieldPlus, Syringe, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description:
      "Comprehensive checkups, cleanings, and fillings to keep your teeth healthy for life.",
  },
  {
    icon: Smile,
    title: "Cosmetic Dentistry",
    description:
      "Veneers, bonding, and whitening to give you a confident, radiant smile.",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description:
      "Professional whitening treatments for noticeably brighter results in one visit.",
  },
  {
    icon: ShieldPlus,
    title: "Restorative Care",
    description:
      "Crowns, bridges, and implants to restore function and natural appearance.",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description:
      "Gentle, fun, and reassuring dental care designed especially for little ones.",
  },
  {
    icon: Syringe,
    title: "Emergency Care",
    description:
      "Same-day appointments for toothaches, chips, and urgent dental needs.",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-secondary/20 py-16 lg:py-24 border-y border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Our Services
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Everything your smile needs, <em className="italic text-primary font-normal">under one roof</em>
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground font-light">
              Our experienced team offers a full range of treatments using modern,
              comfortable techniques.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              variant="fade-up"
              delay={150 + index * 80}
              duration={800}
              className="h-full"
            >
              <Card
                className="group rounded-3xl border border-border/50 bg-background/50 hover:bg-background hover:shadow-2xl hover:border-accent/40 hover:translate-y-[-6px] transition-all duration-300 h-full flex flex-col"
              >
                <CardContent className="p-8 flex flex-col h-full justify-between items-start">
                  <div>
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm group-hover:rotate-[360deg]">
                      <service.icon className="size-6" />
                    </span>
                    <h3 className="mt-6 font-heading text-2xl font-normal text-foreground tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground text-sm font-light">
                      {service.description}
                    </p>
                  </div>
                  
                  <a 
                    href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-6 flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest font-semibold text-accent group-hover:text-primary transition-colors pt-4 border-t border-border/20 w-full"
                  >
                    Learn More
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={400} duration={800}>
          <div className="mt-12 flex justify-center">
            <Button
              render={<a href="/services" />}
              nativeButton={false}
              className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 h-12 shadow-lg transition-all hover:scale-[1.03] border border-accent/20 cursor-pointer"
            >
              More Services
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
