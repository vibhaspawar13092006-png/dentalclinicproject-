import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"
import { SignInButton, Show } from "@clerk/nextjs"
import { ScrollReveal } from "@/components/scroll-reveal"

const info = [
  { 
    icon: MapPin, 
    label: "Address", 
    value: "Dongri, Uttan, Mira Bhayandar, Maharashtra 401106",
    link: "https://www.google.com/maps/place/7QMM%2B3X4,+Dongri,+Uttan,+Mira+Bhayandar,+Maharashtra+401106/@19.2824387,72.7848782,17z"
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+91 7304252372",
    link: "tel:+917304252372"
  },
  { 
    icon: Clock, 
    label: "Hours", 
    value: "Mon–Sat, 10:00am – 6:00pm" 
  },
]

export function Contact() {
  return (
    <section id="contact" className="bg-secondary/20 py-16 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Info Details */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Book an Appointment
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
                Ready for your <em className="italic text-primary font-normal">healthiest smile?</em>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={300} duration={900}>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground font-light">
                Request an appointment and our team will confirm your visit within
                one business day. We can&apos;t wait to welcome you to our clinic.
              </p>
            </ScrollReveal>

            <ul className="mt-4 flex flex-col gap-5 w-full">
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
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-heading text-[17px] font-normal text-foreground hover:text-primary transition-colors mt-0.5 inline-block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-heading text-[17px] font-normal text-foreground mt-0.5">{item.value}</p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          {/* Right Column: Auth booking card wrapper */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <ScrollReveal variant="scale-in" delay={300} duration={950} className="w-full max-w-[420px]">
              <Card className="rounded-3xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-md flex flex-col justify-center glass-card relative overflow-hidden">
                <CardContent className="p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-6 py-12">
                  <Show when="signed-out">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-accent border border-accent/15">
                      <Phone className="size-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                        Book Your Appointment
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm font-light leading-relaxed">
                        To request a dental treatment or manage your scheduled visits, please sign in or register a patient account.
                      </p>
                    </div>
                    <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                      <Button size="lg" className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 shadow-lg transition-all hover:scale-[1.03] border border-accent/20 cursor-pointer w-full max-w-[240px]">
                        Sign In to Book
                      </Button>
                    </SignInButton>
                  </Show>
                  <Show when="signed-in">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      <CheckCircle2 className="size-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                        You are Signed In
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm font-light leading-relaxed">
                        Access your Patient Dashboard to request new treatments and manage your records.
                      </p>
                    </div>
                    <Button
                      render={<a href="/dashboard" />}
                      nativeButton={false}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 shadow-lg transition-all hover:scale-[1.03] border border-accent/20 cursor-pointer w-full max-w-[240px]"
                    >
                      Go to Dashboard
                    </Button>
                  </Show>
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
