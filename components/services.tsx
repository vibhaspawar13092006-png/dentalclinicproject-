import { Sparkles, Stethoscope, Smile, Baby, ShieldPlus, Syringe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    <section id="services" className="bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything your smile needs, under one roof
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our experienced team offers a full range of treatments using modern,
            comfortable techniques.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group rounded-2xl transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
