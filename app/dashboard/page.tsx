"use client"

import { useState, useEffect, useTransition } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Clock,
  User,
  Plus,
  LogOut,
  ChevronRight,
  TrendingUp,
  Activity,
  Heart,
  CheckCircle,
  FileText,
  Shield
} from "lucide-react"

interface Appointment {
  _id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  createdAt: string
}

const services = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Orthodontics",
  "Teeth Whitening",
  "Dental Implants",
  "Root Canal Therapy",
  "Oral Surgery",
]

export default function UserDashboard() {
  const { user, isLoaded } = useUser()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  // Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")
  const [message, setMessage] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState("")
  const [formError, setFormError] = useState("")

  // Role toggle state
  const [togglingRole, setTogglingRole] = useState(false)
  const [role, setRole] = useState<string>("user")

  useEffect(() => {
    if (isLoaded && user) {
      setName(user.fullName || "")
      setEmail(user.emailAddresses[0]?.emailAddress || "")
      setRole((user.publicMetadata?.role as string) || "user")
      fetchAppointments()
    }
  }, [isLoaded, user])

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments")
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } catch (err) {
      console.error("Failed to load appointments:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormSuccess("")
    setFormError("")

    if (!service) {
      setFormError("Please select a service.")
      setFormLoading(false)
      return
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message,
        }),
      })

      if (res.ok) {
        setFormSuccess("Your appointment request has been submitted successfully!")
        setPhone("")
        setService("")
        setMessage("")
        fetchAppointments()
      } else {
        const errData = await res.json()
        setFormError(errData.error || "Failed to submit request.")
      }
    } catch (err) {
      setFormError("An error occurred. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  const handleToggleRole = async () => {
    setTogglingRole(true)
    try {
      const res = await fetch("/api/user/toggle-role", {
        method: "POST",
      })
      if (res.ok) {
        const data = await res.json()
        setRole(data.role)
        alert(`Success! Your role has been updated to "${data.role}". Please refresh to apply fully.`)
        window.location.reload()
      } else {
        alert("Failed to toggle role.")
      }
    } catch (err) {
      alert("Error toggling role.")
    } finally {
      setTogglingRole(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground text-sm font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plus className="size-5" strokeWidth={2.5} />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              Patient Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold">{user?.fullName}</span>
              <span className="text-xs text-muted-foreground capitalize">Role: {role}</span>
            </div>
            <SignOutButton>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 rounded-full border-border hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </SignOutButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Section */}
        <div className="rounded-3xl bg-radial from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Hello, {user?.firstName || "Patient"}!
            </h1>
            <p className="text-muted-foreground">
              Manage your dental visits, submit new requirement files, and configure your appointments.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="size-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Health Status
              </span>
              <span className="text-sm font-bold text-foreground">Up to Date</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Calendar className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <h3 className="text-2xl font-bold">{appointments.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Care</p>
                <h3 className="text-2xl font-bold">1 Active</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/40 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Clock className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latest Update</p>
                <h3 className="text-sm font-semibold truncate max-w-[200px]">
                  {appointments.length > 0
                    ? new Date(appointments[0].createdAt).toLocaleDateString()
                    : "No appointments yet"}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold">
                  Book an Appointment
                </CardTitle>
                <CardDescription>
                  Send a requirement request directly to Sheetal Dental Clinic.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookAppointment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      disabled
                      className="rounded-xl bg-muted border-border cursor-not-allowed opacity-80"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="rounded-xl bg-muted border-border cursor-not-allowed opacity-80"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="rounded-xl bg-background/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Select Service</Label>
                    <select
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                      className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm outline-none focus:border-primary"
                    >
                      <option value="" disabled>Choose a dental treatment...</option>
                      {services.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Reason / Requirement details</Label>
                    <Textarea
                      id="message"
                      placeholder="Please details any toothache, check-up request or specific details here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="rounded-xl bg-background/50 border-border"
                    />
                  </div>

                  {formError && <p className="text-sm font-semibold text-destructive">{formError}</p>}
                  {formSuccess && <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formSuccess}</p>}

                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="w-full rounded-xl py-2.5 font-semibold"
                  >
                    {formLoading ? "Submitting Request..." : "Request Appointment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Appointments List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">Your Appointment History</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-medium">
                {appointments.length} entries found
              </span>
            </div>

            {appointments.length === 0 ? (
              <Card className="border-dashed border-2 border-border/80 bg-transparent text-center py-12">
                <CardContent className="space-y-3">
                  <p className="text-lg font-medium text-muted-foreground">No bookings found</p>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">
                    You haven't requested any appointments yet. Fill out the booking form on the left to schedule your first visit!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {appointments.map((app) => (
                  <Card key={app._id} className="border-border/60 bg-card/30 hover:bg-card/50 transition-all shadow-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-2">
                            {app.service}
                          </span>
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Dental Treatment Request
                          </h3>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          Pending Confirmation
                        </span>
                      </div>

                      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <User className="size-4" />
                          <span>{app.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="size-4" />
                          <span>
                            {new Date(app.createdAt).toLocaleDateString(undefined, {
                              dateStyle: "medium",
                            })}
                          </span>
                        </div>
                      </div>

                      {app.message && (
                        <div className="border-t border-border/40 pt-3 mt-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-1">
                            Your Notes:
                          </p>
                          <p className="text-sm bg-muted/40 p-3 rounded-xl border border-border/30 text-foreground">
                            {app.message}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Role Toggle Developer section */}
        <Card className="border-dashed border border-amber-500/30 bg-amber-500/5 mt-12">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Shield className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  Developer Role Switcher
                </h4>
                <p className="text-xs text-muted-foreground">
                  Your current account role is <span className="font-semibold capitalize text-foreground">{role}</span>. Toggle this to test Role-Based Access Controls on /admin.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {role === "admin" && (
                <Button
                  variant="outline"
                  render={<a href="/admin" />}
                  nativeButton={false}
                  className="rounded-xl text-primary border-primary/20 hover:bg-primary/5"
                >
                  Visit Admin Panel
                </Button>
              )}
              <Button
                variant="secondary"
                disabled={togglingRole}
                onClick={handleToggleRole}
                className="rounded-xl border border-amber-500/20 hover:bg-amber-500/10"
              >
                {togglingRole ? "Updating..." : `Switch to ${role === "admin" ? "User" : "Admin"}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
