"use client"

import type React from "react"

import { useState } from "react"
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
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"

const services = [
  "General Checkup",
  "Teeth Cleaning",
  "Cosmetic Consultation",
  "Teeth Whitening",
  "Emergency Visit",
  "Other",
]

const info = [
  { icon: MapPin, label: "Address", value: "124 Maple Avenue, Brookline" },
  { icon: Phone, label: "Phone", value: "(555) 123-4567" },
  { icon: Mail, label: "Email", value: "hello@sheetaldental.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 8:00am – 6:00pm" },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState(services[0])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const phone = formData.get("phone")
    const email = formData.get("email")
    const message = formData.get("message")

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
          message,
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
    <section id="contact" className="bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Book an Appointment
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready for your healthiest smile?
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Request an appointment and our team will confirm your visit within
              one business day. We can&apos;t wait to meet you.
            </p>

            <ul className="mt-2 flex flex-col gap-5">
              {info.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Card className="rounded-3xl">
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                  <CheckCircle2 className="size-14 text-primary" />
                  <h3 className="font-heading text-2xl font-semibold text-foreground">
                    Request received!
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    Thank you for reaching out. Our team will contact you shortly
                    to confirm your appointment.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                    <div className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        type="text"
                        placeholder="Jane Doe"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                        placeholder="(555) 000-0000"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="jane@example.com"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="service">Service</Label>
                    <Select value={service} onValueChange={setService} disabled={loading}>
                      <SelectTrigger id="service" className="w-full">
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

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message">Message (optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us anything we should know..."
                      className="resize-none"
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" size="lg" className="mt-2 w-full rounded-full" disabled={loading}>
                    {loading ? "Requesting..." : "Request Appointment"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
