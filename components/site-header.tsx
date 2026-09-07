"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Plus } from "lucide-react"
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs"


const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-300 animate-slide-down">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-500 group-hover:rotate-180">
            <Plus className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Sheetal Dental Clinic
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase font-mono tracking-widest font-semibold text-muted-foreground transition-colors hover:text-foreground nav-link-underline py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+15551234567"
            className="text-xs font-mono tracking-wider font-semibold text-foreground hover:text-primary transition-colors"
          >
            (555) 123-4567
          </a>
          <ThemeToggle />
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all font-medium border border-accent/20 px-5"
          >
            Book Appointment
          </Button>

          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <Button variant="ghost" size="sm" className="rounded-full text-xs font-medium">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
              <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium border border-border">
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>

        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden animate-fade-in-up">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href="#contact" onClick={() => setOpen(false)} />}
              nativeButton={false}
              className="mt-2 w-full rounded-full"
            >
              Book Appointment
            </Button>

            <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
              <Show when="signed-out">
                <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <Button variant="outline" className="w-full rounded-full">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <Button className="w-full rounded-full">
                    Sign Up
                  </Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-3 px-3 py-2">
                  <UserButton />
                  <span className="text-sm font-medium">Account Settings</span>
                </div>
              </Show>
            </div>
          </nav>
        </div>
      )}

    </header>
  )
}
