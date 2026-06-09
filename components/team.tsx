const team = [
  {
    name: "Dr. Marcus Reed",
    role: "Lead Dentist, DDS",
    image: "/dentist-1.png",
  },
  {
    name: "Dr. Elena Park",
    role: "Cosmetic Dentist",
    image: "/dentist-2.png",
  },
  {
    name: "Sophie Tran",
    role: "Dental Hygienist",
    image: "/dentist-3.png",
  },
]

export function Team() {
  return (
    <section id="team" className="bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Meet the Team
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Friendly faces you can trust
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our skilled, compassionate professionals are dedicated to your
            smile and your comfort.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-border/60 shadow-sm">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={`Portrait of ${member.name}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
