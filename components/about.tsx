import { Check } from "lucide-react"

const points = [
  "State-of-the-art equipment & digital imaging",
  "Pain-free, anxiety-friendly treatment options",
  "Transparent pricing with flexible payment plans",
  "Convenient evening and weekend appointments",
]

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 overflow-hidden rounded-3xl border border-border/60 shadow-sm lg:order-1">
          <img
            src="/clinic-interior.png"
            alt="Modern, calming dental treatment room"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="order-1 flex flex-col items-start gap-6 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Sheetal Dental
          </p>
          <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Care that puts your comfort first
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            We built Sheetal Dental Clinic to feel less like a clinic and more like a
            calm, welcoming space. Our team takes the time to listen, explain,
            and tailor every treatment to your needs.
          </p>

          <ul className="flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
