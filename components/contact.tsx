"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  Send,
  User,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { ScrollReveal } from "@/components/scroll-reveal"

const services = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Dental Implants",
  "Single Visit Root Canal Treatment",
  "Painless Dental Extractions",
  "Teeth Straightening",
  "Pediatric Dentistry",
  "Emergency Visit",
  "Other",
]

const info = [
  {
    icon: MapPin,
    label: "Address",
    value: "Dongri, Uttan, Mira Bhayandar, Maharashtra 401106",
    link: "https://www.google.com/maps/place/7QMM%2B3X4,+Dongri,+Uttan,+Mira+Bhayandar,+Maharashtra+401106/@19.2824387,72.7848782,17z",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7304252372",
    link: "tel:+917304252372",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat, 10:00am – 6:00pm",
  },
]

export function Contact() {
  const { user, isLoaded } = useUser()

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [service, setService] = useState(services[0])
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [message, setMessage] = useState("")

  // Pre-fill fields if user is signed in
  useEffect(() => {
    if (isLoaded && user) {
      if (user.fullName) setName(user.fullName)
      if (user.emailAddresses[0]?.emailAddress) {
        setEmail(user.emailAddresses[0].emailAddress)
      }
    }
  }, [isLoaded, user])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const compiledMessage = [
      preferredDate ? `Preferred Date: ${preferredDate}` : "",
      preferredTime ? `Preferred Time: ${preferredTime}` : "",
      message ? `Notes: ${message}` : "",
    ]
      .filter(Boolean)
      .join(" | ")

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          message: compiledMessage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "An error occurred while scheduling your appointment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/20 py-16 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Text & Info Details */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                <Sparkles className="size-3.5 text-accent" />
                Book an Appointment
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
                Ready for your{" "}
                <em className="italic text-primary font-normal">healthiest smile?</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300} duration={900}>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground font-light">
                Fill out our quick appointment questionnaire. Our clinical team will confirm your scheduled slot and contact you shortly.
              </p>
            </ScrollReveal>

            <ul className="mt-2 flex flex-col gap-5 w-full">
              {info.map((item, index) => (
                <ScrollReveal
                  key={item.label}
                  variant="fade-up"
                  delay={350 + index * 80}
                  duration={750}
                  className="flex items-center gap-4 group"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary border border-accent/20 text-accent group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-heading text-[16px] font-normal text-foreground hover:text-primary transition-colors mt-0.5 inline-block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-heading text-[16px] font-normal text-foreground mt-0.5">
                        {item.value}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </ul>

            {/* Quick Portal Access Shortcuts */}
            <ScrollReveal variant="fade-up" delay={550} duration={800}>
              <div className="mt-4 p-5 rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                  Quick Portal Access
                </span>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="/dashboard"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border px-3.5 py-2.5 text-xs font-semibold text-foreground transition-colors"
                  >
                    <User className="size-3.5 text-primary" />
                    Patient Portal
                  </a>
                  <a
                    href="/admin"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border px-3.5 py-2.5 text-xs font-semibold text-foreground transition-colors"
                  >
                    <Shield className="size-3.5 text-accent" />
                    Admin Portal
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Appointment Questionnaire */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal variant="scale-in" delay={300} duration={950} className="w-full">
              <Card className="rounded-3xl border border-border/60 bg-card/70 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center gap-5 py-12 text-center animate-fade-in-up">
                      <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <CheckCircle2 className="size-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                          Appointment Requested!
                        </h3>
                        <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
                          Thank you for reaching out, <span className="text-foreground font-semibold">{name}</span>. Our clinical staff will review your appointment request for <span className="text-primary font-semibold">{service}</span> and reach out to confirm your timing shortly.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          className="rounded-full border-border"
                          onClick={() => {
                            setSubmitted(false)
                            setMessage("")
                            setPreferredDate("")
                            setPreferredTime("")
                          }}
                        >
                          Book Another Appointment
                        </Button>
                        <a
                          href="/dashboard"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 text-sm shadow-md transition-all hover:scale-[1.02]"
                        >
                          View in Patient Portal
                          <ArrowRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-foreground">
                          Book an Appointment
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Complete this quick form to reserve your treatment.
                        </p>
                      </div>

                      {error && (
                        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm font-medium text-destructive">
                          {error}
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="app-name" className="text-xs font-semibold">
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="app-name"
                            required
                            type="text"
                            placeholder="e.g. Rahul Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="app-phone" className="text-xs font-semibold">
                            Phone Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="app-phone"
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={loading}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="app-email" className="text-xs font-semibold">
                            Email Address <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="app-email"
                            required
                            type="email"
                            placeholder="rahul@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="rounded-xl"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="app-service" className="text-xs font-semibold">
                            Treatment Required <span className="text-destructive">*</span>
                          </Label>
                          <Select value={service} onValueChange={setService} disabled={loading}>
                            <SelectTrigger id="app-service" className="rounded-xl w-full">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {services.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="app-date" className="text-xs font-semibold">
                            Preferred Date (Optional)
                          </Label>
                          <Input
                            id="app-date"
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            disabled={loading}
                            className="rounded-xl"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="app-time" className="text-xs font-semibold">
                            Preferred Time (Optional)
                          </Label>
                          <Input
                            id="app-time"
                            type="time"
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            disabled={loading}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="app-message" className="text-xs font-semibold">
                          Symptoms / Doctor Notes (Optional)
                        </Label>
                        <Textarea
                          id="app-message"
                          rows={3}
                          placeholder="Tell us about any toothache, sensitivity, or goals..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="resize-none rounded-xl"
                          disabled={loading}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          "Submitting Request..."
                        ) : (
                          <>
                            <Send className="size-4 mr-2" />
                            Request Appointment
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-16 pt-12 border-t border-border/40">
          <ScrollReveal variant="fade-up" delay={150} duration={850}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  Find Us on Google Maps
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-normal text-foreground mt-1">
                  Sheetal Dental Clinic Location
                </h3>
                <p className="text-sm text-muted-foreground font-light mt-1">
                  Dongri, Uttan, Mira Bhayandar, Maharashtra 401106
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/7QMM%2B3X4,+Dongri,+Uttan,+Mira+Bhayandar,+Maharashtra+401106/@19.2824387,72.7848782,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold px-6 py-3 shadow-md hover:bg-primary/90 transition-all hover:scale-[1.02] border border-accent/20 self-start sm:self-center"
              >
                <MapPin className="size-4" />
                Get Directions
              </a>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-muted">
              <iframe
                title="Sheetal Dental Clinic Location Map"
                src="https://maps.google.com/maps?q=19.2824387,72.7848782&hl=en&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
