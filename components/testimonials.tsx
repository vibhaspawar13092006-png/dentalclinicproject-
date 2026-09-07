import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

const reviews = [
  {
    quote:
      "I've always been nervous about the dentist, but the team here made me feel completely at ease. Best dental experience I've ever had.",
    name: "Jessica M.",
    detail: "Patient since 2021",
  },
  {
    quote:
      "Booked an emergency appointment and was seen the same day. Professional, gentle, and genuinely caring from start to finish.",
    name: "David L.",
    detail: "Patient since 2022",
  },
  {
    quote:
      "My whitening results are incredible and the office is spotless and modern. I recommend Sheetal Dental Clinic to everyone I know.",
    name: "Amara O.",
    detail: "Patient since 2020",
  },
]

export function Testimonials() {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Patient Stories
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Loved by <em className="italic text-primary font-normal">our community</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ScrollReveal
              key={review.name}
              variant="fade-up"
              delay={200 + index * 100}
              duration={800}
              className="h-full"
            >
              <Card className="rounded-3xl border border-border/50 bg-background/50 hover:bg-background hover:shadow-2xl hover:border-accent/40 transition-all duration-300 relative group h-full flex flex-col">
                <CardContent className="flex h-full flex-col gap-5 p-8">
                  <Quote className="size-10 text-accent/25 group-hover:text-accent/45 transition-colors duration-300" />
                  
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-accent" />
                    ))}
                  </div>
                  
                  <blockquote className="text-pretty leading-relaxed text-foreground/90 font-light text-[15px] italic">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  
                  <figcaption className="mt-auto pt-6 border-t border-border/20">
                    <p className="font-heading text-lg font-normal text-foreground">{review.name}</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{review.detail}</p>
                  </figcaption>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
