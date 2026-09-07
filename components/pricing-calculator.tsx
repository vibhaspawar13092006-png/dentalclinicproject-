"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Shield, HelpCircle, ArrowRight } from "lucide-react"

const treatments = [
  { key: "general", label: "General Dentistry & Cleaning", baseCost: 150, category: "basic" },
  { key: "extraction", label: "Painless Dental Extraction", baseCost: 250, category: "basic" },
  { key: "whitening", label: "Professional Teeth Whitening", baseCost: 350, category: "cosmetic" },
  { key: "rootcanal", label: "Single Visit Root Canal Treatment", baseCost: 950, category: "major" },
  { key: "implants", label: "Premium Dental Implants", baseCost: 2500, category: "major" },
  { key: "straightening", label: "Orthodontic Teeth Straightening", baseCost: 3800, category: "major" },
]

const insurancePlans = [
  { key: "none", label: "No Insurance (Self-Pay)", basicCoverage: 0, majorCoverage: 0, cosmeticCoverage: 0 },
  { key: "basic", label: "Basic Care Dental (e.g. Delta/Cigna basic)", basicCoverage: 0.70, majorCoverage: 0.20, cosmeticCoverage: 0 },
  { key: "premium", label: "Premium Choice Dental (e.g. MetLife/Aetna prem)", basicCoverage: 0.90, majorCoverage: 0.50, cosmeticCoverage: 0.10 },
]

export function PricingCalculator() {
  const [selectedTreatmentKey, setSelectedTreatmentKey] = useState("general")
  const [selectedInsuranceKey, setSelectedInsuranceKey] = useState("none")
  const [isComplex, setIsComplex] = useState(false)

  const treatment = treatments.find((t) => t.key === selectedTreatmentKey) || treatments[0]
  const insurance = insurancePlans.find((i) => i.key === selectedInsuranceKey) || insurancePlans[0]

  // Calculate costs
  let baseCost = treatment.baseCost
  if (isComplex) {
    baseCost = Math.round(baseCost * 1.25)
  }

  let coveragePercent = 0
  if (treatment.category === "basic") {
    coveragePercent = insurance.basicCoverage
  } else if (treatment.category === "major") {
    coveragePercent = insurance.majorCoverage
  } else if (treatment.category === "cosmetic") {
    coveragePercent = insurance.cosmeticCoverage
  }

  const insuranceCoverage = Math.round(baseCost * coveragePercent)
  const patientOutofPocket = baseCost - insuranceCoverage

  return (
    <section className="py-16 lg:py-24 bg-background border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Calculator className="size-3.5" />
            Cost Estimator
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Treatment Cost & Insurance Estimator
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Get an instant transparent cost calculation for your treatment. Choose your service, select your dental insurance level, and see your estimated out-of-pocket budget.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Left: Input Selection Controls */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="rounded-3xl border border-border/60 bg-card/60 shadow-md backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Selector 1: Treatment */}
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-foreground">Select Dental Treatment</label>
                  <select
                    value={selectedTreatmentKey}
                    onChange={(e) => setSelectedTreatmentKey(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary cursor-pointer text-foreground"
                  >
                    {treatments.map((t) => (
                      <option key={t.key} value={t.key}>
                        {t.label} (Base: ${t.baseCost})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector 2: Insurance */}
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Shield className="size-4 text-primary" />
                    Dental Insurance Provider Coverage
                  </label>
                  <select
                    value={selectedInsuranceKey}
                    onChange={(e) => setSelectedInsuranceKey(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary cursor-pointer text-foreground"
                  >
                    {insurancePlans.map((i) => (
                      <option key={i.key} value={i.key}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector 3: Complexity Switch */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="block text-sm font-bold text-foreground">Complex Case Treatment?</span>
                    <span className="block text-xs text-muted-foreground max-w-sm">
                      Select if you require custom surgical adjustments, bone grafts, or multi-session root treatments (+25% cost).
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isComplex}
                      onChange={(e) => setIsComplex(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Price Breakdown Display */}
          <div className="lg:col-span-2">
            <Card className="rounded-3xl border-2 border-primary/20 bg-primary/5 shadow-xl relative overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <h3 className="font-heading text-xl font-bold text-foreground">Estimate Summary</h3>
                
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Base Treatment Cost</span>
                    <span className="font-semibold text-foreground">${treatment.baseCost}</span>
                  </div>

                  {isComplex && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Complexity Markup (+25%)</span>
                      <span className="font-semibold text-foreground">+${Math.round(treatment.baseCost * 0.25)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">${baseCost}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Insurance Coverage ({Math.round(coveragePercent * 100)}%)</span>
                    <span className="font-semibold">-${insuranceCoverage}</span>
                  </div>

                  <div className="pt-4 border-t border-primary/20 flex justify-between items-baseline">
                    <span className="text-base font-bold text-foreground">Patient Out-of-Pocket</span>
                    <span className="text-3xl font-extrabold text-primary">${patientOutofPocket}</span>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-2xl border border-border/50 flex gap-2.5 items-start text-xs text-muted-foreground">
                  <HelpCircle className="size-4 text-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    This is a pre-clinical cost estimate. Out-of-pocket values may vary depending on actual insurance copays, diagnostic scans, and specific doctor prescriptions.
                  </p>
                </div>

                <Button
                  render={<a href="/#contact" />}
                  nativeButton={false}
                  className="w-full rounded-full py-3 text-base font-semibold shadow-md cursor-pointer hover:scale-[1.02] transition-all"
                >
                  Schedule Appointment
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
