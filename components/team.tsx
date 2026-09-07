import { ScrollReveal } from "@/components/scroll-reveal"

const team = [
  {
    name: "Dr. Swapnil Jadhav",
    role: "Lead Dentist & Surgeon",
    image: "/dentist-1.png",
  },
  {
    name: "Dr. Chaudhry",
    role: "Cosmetic Dentist & Orthodontist",
    image: "/dentist-2.png",
  },
  {
    name: "Dr. Manju Singh",
    role: "Restorative & Pediatric Care",
    image: "/dentist-3.png",
  },
  {
    name: "Sonu Tejpal",
    role: "Compounder & Clinical Assistant",
    image: "/sonu-tejpal.jpg",
  },
]

export function Team() {
  return (
    <section id="team" className="bg-secondary/15 py-16 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Meet the Team
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              Friendly faces <em className="italic text-primary font-normal">you can trust</em>
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground font-light leading-relaxed">
              Our skilled, compassionate clinical team is dedicated to your oral health and comfortable experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <ScrollReveal
              key={member.name}
              variant="fade-up"
              delay={200 + index * 100}
              duration={850}
              className="text-center"
            >
              {/* Polaroid/Magazine Styled Portrait Frame */}
              <div className="relative group max-w-sm mx-auto">
                <div className="absolute -inset-2 rounded-[2rem] border border-accent/20 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                
                <div className="mx-auto aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/40 bg-muted shadow-lg relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={`Portrait of ${member.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                
                <h3 className="mt-6 font-heading text-2xl font-normal text-foreground tracking-tight">
                  {member.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mt-1">
                  {member.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
