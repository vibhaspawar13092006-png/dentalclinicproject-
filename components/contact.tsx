"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"
import { SignInButton, Show } from "@clerk/nextjs"

const info = [
  { icon: MapPin, label: "Address", value: "124 Maple Avenue, Brookline" },
  { icon: Phone, label: "Phone", value: "(555) 123-4567" },
  { icon: Mail, label: "Email", value: "hello@sheetaldental.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 8:00am – 6:00pm" },
]

export function Contact() {
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

          <Card className="rounded-3xl border-border bg-card/60 shadow-xl backdrop-blur-sm flex flex-col justify-center">
            <CardContent className="p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-6 py-12">
              <Show when="signed-out">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail className="size-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    Book Your Appointment
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    To request a dental treatment or manage your scheduled visits, please sign in or register a patient account.
                  </p>
                </div>
                <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <Button size="lg" className="rounded-full w-full max-w-[240px]">
                    Sign In to Book
                  </Button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="size-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    You are Signed In
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Access your Patient Dashboard to request new treatments and manage your records.
                  </p>
                </div>
                <Button
                  render={<a href="/dashboard" />}
                  nativeButton={false}
                  size="lg"
                  className="rounded-full w-full max-w-[240px]"
                >
                  Go to Dashboard
                </Button>
              </Show>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
