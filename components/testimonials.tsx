"use client"

import { useState, useEffect } from "react"
import { Star, Quote, Send, MessageSquarePlus, CheckCircle2, Sparkles, ThumbsUp, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useUser } from "@clerk/nextjs"
import { CLINIC_SERVICES_LIST } from "@/lib/pricing"

interface ReviewItem {
  _id?: string
  quote: string
  name: string
  detail?: string
  service?: string
  rating?: number
}

const defaultReviews: ReviewItem[] = [
  {
    quote:
      "I've always been nervous about the dentist, but Dr. Sheetal and the team made me feel completely at ease. Painless root canal and best dental experience I've ever had.",
    name: "Jessica M.",
    detail: "Patient since 2021",
    service: "Single Visit Root Canal",
    rating: 5,
  },
  {
    quote:
      "Booked an emergency visit for a chipped tooth and was treated the same day. Extremely professional, gentle, and transparent with pricing.",
    name: "David L.",
    detail: "Patient since 2022",
    service: "Emergency Dental Care",
    rating: 5,
  },
  {
    quote:
      "My teeth whitening results are incredible! The clinic at Dongri, Uttan is spotless, state-of-the-art, and modern. Highly recommend Sheetal Dental Clinic to everyone.",
    name: "Amara O.",
    detail: "Patient since 2020",
    service: "Teeth Whitening",
    rating: 5,
  },
]

export function Testimonials() {
  const { user, isLoaded } = useUser()
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(defaultReviews)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Review Form States
  const [name, setName] = useState("")
  const [service, setService] = useState(CLINIC_SERVICES_LIST[0])
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Pre-fill patient name if signed in
  useEffect(() => {
    if (isLoaded && user) {
      if (user.fullName) setName(user.fullName)
    }
  }, [isLoaded, user])

  // Fetch reviews from MongoDB
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews")
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setReviewsList([...data, ...defaultReviews])
          }
        }
      } catch (err) {
        console.error("Failed to load community reviews:", err)
      }
    }
    fetchReviews()
  }, [])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) {
      setErrorMessage("Please write a few words about your clinic experience.")
      return
    }
    if (!name.trim()) {
      setErrorMessage("Please provide your name.")
      return
    }

    setLoading(true)
    setErrorMessage("")
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          service: service.trim(),
          rating,
          comment: comment.trim(),
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSuccessMessage("Thank you! Your review has been published.")
        const newReviewItem: ReviewItem = {
          quote: comment.trim(),
          name: name.trim(),
          service: service.trim(),
          rating,
          detail: "Verified Patient",
        }
        setReviewsList((prev) => [newReviewItem, ...prev])
        setComment("")
        setTimeout(() => {
          setSuccessMessage("")
          setIsFormOpen(false)
        }, 3000)
      } else {
        setErrorMessage(data.error || "Failed to submit review. Please try again.")
      }
    } catch (err) {
      setErrorMessage("Network error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-background border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="size-3.5 text-accent" />
              Patient Experiences
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Loved by <em className="italic text-primary font-normal">our community</em>
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground text-sm font-light">
              Real feedback from patients treated by Dr. Sheetal Pawar and our specialized dental team.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Review Bar / Submission Box */}
        <ScrollReveal variant="fade-up" delay={180} duration={800} className="mt-10">
          <Card className="rounded-3xl border border-primary/20 bg-card/60 shadow-lg backdrop-blur-md overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              {!isFormOpen ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                      <MessageSquarePlus className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        Have you visited Sheetal Dental Clinic?
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Share your feedback about our doctors, treatments, and dental care.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 py-2.5 text-xs shadow-md hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Star className="size-3.5 fill-current" />
                    Write a Review
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2">
                      <MessageSquarePlus className="size-5 text-primary" />
                      <h4 className="font-heading text-base font-semibold text-foreground">
                        Add Your Review
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground block">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            className={`size-6 ${
                              star <= (hoverRating || rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-foreground ml-2">
                        {hoverRating || rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="E.g. Priya Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        Treatment Received
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary text-foreground"
                      >
                        {CLINIC_SERVICES_LIST.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Review Text Bar */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Your Experience & Service Feedback <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      rows={3}
                      placeholder="Share your experience about the doctor, friendliness, painless treatment, hygiene..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs font-semibold text-destructive">{errorMessage}</p>
                  )}

                  {successMessage && (
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="size-4" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFormOpen(false)}
                      className="rounded-xl text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      size="sm"
                      className="rounded-xl bg-primary text-primary-foreground font-semibold px-5 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Send className="size-3.5" />
                      {loading ? "Posting..." : "Submit Review"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewsList.map((review, index) => (
            <ScrollReveal
              key={review._id || `${review.name}-${index}`}
              variant="fade-up"
              delay={200 + (index % 3) * 100}
              duration={800}
              className="h-full"
            >
              <Card className="rounded-3xl border border-border/50 bg-background/50 hover:bg-background hover:shadow-2xl hover:border-accent/40 transition-all duration-300 relative group h-full flex flex-col">
                <CardContent className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-center justify-between">
                    <Quote className="size-8 text-accent/25 group-hover:text-accent/45 transition-colors duration-300" />
                    <div className="flex text-amber-500">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>

                  {review.service && (
                    <span className="text-[11px] font-mono font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full w-fit">
                      {review.service}
                    </span>
                  )}

                  <blockquote className="text-pretty leading-relaxed text-foreground/90 font-light text-[14px] italic">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
                        {review.detail || "Verified Patient"}
                      </p>
                    </div>
                    <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-primary">
                      <Heart className="size-3.5 fill-primary/20 text-primary" />
                    </span>
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
