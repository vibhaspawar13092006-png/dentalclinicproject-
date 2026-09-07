"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, Sparkles, Smile, ArrowRight, RotateCcw, Check } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function SmileQuiz() {
  const [step, setStep] = useState(0) // 0: intro, 1: concern, 2: goal, 3: result
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const concerns = [
    { key: "crooked", label: "Crooked or misaligned teeth" },
    { key: "stained", label: "Discolored, stained or yellowed teeth" },
    { key: "missing", label: "Missing tooth or gaps in between" },
    { key: "pain", label: "Severe toothache, infection or root pain" },
    { key: "checkup", label: "Standard checkup, cleaning & hygiene" },
  ]

  const goals = [
    { key: "invisible", label: "Invisible, comfortable and aesthetic treatments" },
    { key: "fast", label: "Fast, single-visit treatments" },
    { key: "painless", label: "Painless, minimally-invasive procedures" },
    { key: "permanent", label: "Long-term, permanent restoration of function" },
  ]

  const getRecommendation = () => {
    const concern = answers.concern
    const goal = answers.goal

    if (concern === "crooked" || goal === "invisible") {
      return {
        title: "Teeth Straightening",
        description: "Modern clear aligners and comfortable orthodontic braces custom-designed to correct crooked teeth discreetly.",
        path: "Teeth Straightening",
      }
    }
    if (concern === "stained" || goal === "fast") {
      return {
        title: "Teeth Whitening",
        description: "Professional medical-grade whitening treatments that restore brightness up to 8 shades in a single in-office visit.",
        path: "Teeth Whitening",
      }
    }
    if (concern === "missing" || goal === "permanent") {
      return {
        title: "Dental Implants",
        description: "Durable titanium posts combined with lifelike crowns to permanently replace missing teeth and restore chewing strength.",
        path: "Dental Implants",
      }
    }
    if (concern === "pain") {
      return {
        title: "Single Visit Root Canal Treatment",
        description: "Efficient, pain-free therapy using rotary instruments to clear infection and seal the tooth root in one comfortable visit.",
        path: "Single Visit Root Canal Treatment",
      }
    }
    return {
      title: "General Dentistry & Hygiene Checkup",
      description: "Comprehensive dental checkups, cleaning, scaling, and composite fillings to secure your long-term oral health.",
      path: "General Dentistry",
    }
  }

  const handleSelectConcern = (key: string) => {
    setAnswers((prev) => ({ ...prev, concern: key }))
    setStep(2)
  }

  const handleSelectGoal = (key: string) => {
    setAnswers((prev) => ({ ...prev, goal: key }))
    setStep(3)
  }

  const resetQuiz = () => {
    setAnswers({})
    setStep(0)
  }

  const recommendation = step === 3 ? getRecommendation() : null

  return (
    <section className="py-16 lg:py-24 bg-secondary/10 border-t border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-secondary px-3.5 py-1 text-xs font-mono uppercase tracking-widest font-semibold text-secondary-foreground">
              <HelpCircle className="size-3.5 text-accent" />
              Quick Consultation
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Find the Perfect Treatment for <em className="italic text-primary font-normal">Your Smile</em>
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground font-light leading-relaxed">
              Take our 1-minute smart advisor quiz to identify your primary dental concerns and receive a personalized treatment proposal.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200} duration={900}>
          <Card className="rounded-3xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-md relative overflow-hidden min-h-[380px] flex flex-col justify-center glass-card">
            <CardContent className="p-8 md:p-12">
              {step === 0 && (
                <div className="text-center space-y-6 animate-fade-in-up">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary border border-accent/10">
                    <Smile className="size-7 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                      Ready to discover your personalized dental plan?
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto font-light">
                      Answer a couple of quick questions about your symptoms, goals, and cosmetic preferences to match with our specialized services.
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep(1)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 h-12 shadow-lg transition-all hover:scale-[1.03] border border-accent/20 cursor-pointer"
                  >
                    Start Assessment
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                    <span>Question 1 of 2</span>
                    <span>Concern Check</span>
                  </div>
                  <h3 className="font-heading text-xl font-normal text-foreground">
                    What is your primary dental concern or symptom?
                  </h3>
                  <div className="grid gap-3">
                    {concerns.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleSelectConcern(option.key)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl border border-border/50 bg-background/40 hover:bg-primary/5 hover:border-accent/40 text-sm font-medium text-foreground transition-all duration-300 cursor-pointer flex items-center justify-between group hover:scale-[1.005] hover:shadow-sm"
                      >
                        {option.label}
                        <ChevronRightArrow />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                    <span>Question 2 of 2</span>
                    <span>Goal Selection</span>
                  </div>
                  <h3 className="font-heading text-xl font-normal text-foreground">
                    Which statement matches your desired outcome best?
                  </h3>
                  <div className="grid gap-3">
                    {goals.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleSelectGoal(option.key)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl border border-border/50 bg-background/40 hover:bg-primary/5 hover:border-accent/40 text-sm font-medium text-foreground transition-all duration-300 cursor-pointer flex items-center justify-between group hover:scale-[1.005] hover:shadow-sm"
                      >
                        {option.label}
                        <ChevronRightArrow />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && recommendation && (
                <div className="text-center space-y-6 animate-fade-in-up">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    <Check className="size-7" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold block">
                      Your Tailored Service Match
                    </span>
                    <h3 className="font-heading text-3xl font-normal text-foreground tracking-tight">
                      {recommendation.title}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed font-light">
                      {recommendation.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="rounded-full px-6 py-5 text-xs font-mono uppercase tracking-wider text-muted-foreground border-border hover:bg-muted cursor-pointer"
                    >
                      <RotateCcw className="size-4 mr-1.5" />
                      Retake Quiz
                    </Button>
                    <Button
                      render={<a href="/#contact" />}
                      nativeButton={false}
                      className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-5 shadow-lg transition-all hover:scale-[1.03] border border-accent/20 cursor-pointer text-sm"
                    >
                      Book This Treatment
                      <Sparkles className="size-4 ml-1.5 text-accent" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ChevronRightArrow() {
  return (
    <svg
      className="size-4 text-muted-foreground/60 group-hover:text-primary transition-colors transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
