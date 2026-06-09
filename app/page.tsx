import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs/server"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default async function Page() {
  const { userId } = await auth()
  if (userId) {
    const user = await currentUser()
    const role = user?.publicMetadata?.role
    if (role === "admin") {
      redirect("/admin")
    } else {
      redirect("/dashboard")
    }
  }


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

