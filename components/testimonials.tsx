import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    <section id="reviews" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Patient Stories
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Loved by our community
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name} className="rounded-2xl">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <Quote className="size-8 text-primary/30" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-pretty leading-relaxed text-foreground">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-auto">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.detail}</p>
                </figcaption>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
