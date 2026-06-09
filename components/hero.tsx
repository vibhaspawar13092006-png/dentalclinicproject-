import { Button } from "@/components/ui/button"
import { Star, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Accepting new patients
          </span>

          <h1 className="text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Gentle, modern dentistry for a healthier smile
          </h1>

          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            From routine cleanings to cosmetic care, our caring team makes every
            visit comfortable. Experience dentistry designed around you.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              size="lg"
              className="rounded-full"
            >
              Book Your Visit
            </Button>
            <Button
              render={<a href="#services" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              Explore Services
            </Button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-accent text-accent"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> from
              1,200+ happy patients
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-sm">
            <img
              src="/hero-dental.png"
              alt="A friendly dentist smiling in a modern dental clinic"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-border/60 bg-card p-4 shadow-md sm:block">
            <p className="font-heading text-2xl font-semibold text-foreground">
              15+ yrs
            </p>
            <p className="text-sm text-muted-foreground">Trusted local care</p>
          </div>
        </div>
      </div>
    </section>
  )
}
