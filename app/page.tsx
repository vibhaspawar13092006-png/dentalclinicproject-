import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
