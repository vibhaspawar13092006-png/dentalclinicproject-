import { Plus } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <a href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Plus className="size-5" strokeWidth={2.5} />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
                Sheetal Dental Clinic
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Gentle, modern dentistry for the whole family. Your comfort and
              your smile come first.
            </p>
          </div>

          <FooterCol
            title="Services"
            links={[
              "General Dentistry",
              "Cosmetic Dentistry",
              "Teeth Whitening",
              "Emergency Care",
            ]}
          />
          <FooterCol
            title="Clinic"
            links={["About Us", "Our Team", "Reviews", "Contact"]}
          />

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Visit Us</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Dongri, Uttan
              <br />
              Mira Bhayandar, Maharashtra 401106
              <br />
              <a href="tel:+917304252372" className="hover:text-primary transition-colors font-medium">
                +91 7304252372
              </a>
              <br />
              Mon–Sat: 10:00 am – 6:00 pm
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sheetal Dental Clinic. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
