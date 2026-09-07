import { Header } from "@/components/ui/header-2"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { SmileSlider } from "@/components/smile-slider"
import { SmileQuiz } from "@/components/smile-quiz"
import { About } from "@/components/about"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {


  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <SmileSlider />
        <SmileQuiz />
        <About />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

