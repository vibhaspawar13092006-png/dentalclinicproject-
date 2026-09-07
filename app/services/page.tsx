import { Header } from "@/components/ui/header-2"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PricingCalculator } from "@/components/pricing-calculator"
import { 
  Sparkles, 
  Stethoscope, 
  Smile, 
  Baby, 
  ShieldPlus, 
  Syringe, 
  Scan, 
  Zap, 
  ChevronRight, 
  ArrowLeft 
} from "lucide-react"

const specializedServices = [
  {
    icon: ShieldPlus,
    title: "Dental Implants",
    description:
      "A permanent, natural-looking solution to replace missing teeth. We use premium titanium posts capped with custom-crafted porcelain crowns to fully restore your smile's strength and natural appearance.",
  },
  {
    icon: Smile,
    title: "Teeth Straightening",
    description:
      "Achieve your dream smile with modern orthodontic options. We offer state-of-the-art clear aligner therapy and comfortable braces, custom-fitted for both adults and teens to correct misalignments gently.",
  },
  {
    icon: Sparkles,
    title: "Single Visit Root Canal Treatment",
    description:
      "Advanced endodontic therapy designed to save your natural teeth and relieve pain in just one visit. We use rotary tools and precision tech to make the procedure quick, comfortable, and highly successful.",
  },
  {
    icon: Syringe,
    title: "Painless Dental Extractions",
    description:
      "Comfort-first tooth extractions utilizing advanced localized anesthesia and gentle, minimally invasive techniques to ensure you feel minimal pressure and absolutely no pain during your procedure.",
  },
  {
    icon: Scan,
    title: "Teeth Scanning",
    description:
      "Say goodbye to uncomfortable traditional impression putties. Our high-precision 3D digital intraoral scanners capture exact replicas of your teeth in seconds for accurate crown, bridge, and aligner planning.",
  },
  {
    icon: Zap,
    title: "Laser Dentistry & Minor Surgery",
    description:
      "Specialized minimally invasive laser dental treatments for fast healing, less bleeding, and reduced discomfort. We handle minor outpatient oral surgical cases (like gum contouring and biopsies) with absolute precision.",
  },
]

const generalServices = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description:
      "Comprehensive checkups, advanced digital X-rays, professional cleanings, and seamless composite fillings to keep your teeth healthy for life.",
  },
  {
    icon: Smile,
    title: "Cosmetic Dentistry",
    description:
      "Premium porcelain veneers, aesthetic bonding, and tooth contouring to address chips or gaps and give you a confident, radiant smile.",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description:
      "Safe, professional in-office whitening treatments that lift years of stains for noticeably brighter, beautiful results in just one visit.",
  },
  {
    icon: ShieldPlus,
    title: "Restorative Care",
    description:
      "Custom-crafted crowns, durable bridges, and restorative implants to return complete chewing function and strength to damaged teeth.",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description:
      "Gentle, encouraging, and reassurance-focused dental care designed especially to foster positive habits and smiles in little ones.",
  },
  {
    icon: Syringe,
    title: "Emergency Care",
    description:
      "Prompt, same-day diagnosis and emergency relief appointments for sudden severe toothaches, chipped teeth, and urgent dental needs.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        {/* Banner Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <Button
              render={<a href="/" />}
              nativeButton={false}
              variant="ghost"
              size="sm"
              className="inline-flex items-center gap-1.5 rounded-full mb-6 border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Medical Services
            </p>
            <h1 className="mt-3 text-balance font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Comprehensive Dental Care
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Explore our wide range of dental treatments. From state-of-the-art diagnostic digital scanning to specialized laser treatments, minor oral surgery, and preventative family care.
            </p>
          </div>
        </section>

        {/* Specialized Services Section */}
        <section className="py-16 lg:py-24 border-t border-border/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Specialized Treatments
              </span>
              <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Advanced & Surgical Procedures
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                We utilize the latest clinical innovations and equipment to offer highly specialized, comfortable, and efficient dental surgeries.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {specializedServices.map((service) => (
                <Card
                  key={service.title}
                  className="group rounded-3xl transition-all hover:shadow-xl hover:translate-y-[-4px] border-border/80 bg-card/60 shadow-md backdrop-blur-sm"
                >
                  <CardContent className="p-8 flex flex-col h-full justify-between">
                    <div>
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                        <service.icon className="size-7" />
                      </span>
                      <h3 className="mt-6 font-heading text-2xl font-semibold text-foreground tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </div>
                    <a
                      href="/#contact"
                      className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/btn cursor-pointer"
                    >
                      <span>Book this treatment</span>
                      <span className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-[11px] bg-primary/10 text-primary px-3 py-1.5 rounded-full group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-all shadow-sm">
                        Book Now
                        <ChevronRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* General Dentistry Section */}
        <section className="bg-secondary/40 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                General Care
              </span>
              <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Essential Care for Healthy Smiles
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Maintain optimal health for you and your family with our gentle, complete, and regular general treatments.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {generalServices.map((service) => (
                <Card
                  key={service.title}
                  className="group rounded-2xl transition-shadow hover:shadow-md border-border/60 bg-card/80"
                >
                  <CardContent className="p-6">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="size-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <a
                      href="/#contact"
                      className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/btn cursor-pointer"
                    >
                      <span>Book this care</span>
                      <span className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-[11px] bg-primary/10 text-primary px-3 py-1.5 rounded-full group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-all shadow-sm">
                        Book Now
                        <ChevronRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <PricingCalculator />

        {/* CTA Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="rounded-3xl bg-radial from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12 space-y-6 shadow-xl backdrop-blur-sm">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Experience Better Care?
              </h2>
              <p className="mx-auto max-w-md text-pretty text-muted-foreground">
                Whether you need a specialized surgical procedure or a routine checkup, our medical team is here for you. Schedule your visit online in minutes.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row pt-2">
                <Button
                  render={<a href="/#contact" />}
                  nativeButton={false}
                  size="lg"
                  className="rounded-full px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Book Appointment
                </Button>
                <Button
                  render={<a href="tel:+917304252372" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-3 text-base font-semibold border-border hover:bg-muted transition-all"
                >
                  Call: +91 7304252372
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
