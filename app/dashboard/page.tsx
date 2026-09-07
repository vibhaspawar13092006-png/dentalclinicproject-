"use client"

import { useState, useEffect, useTransition } from "react"
import { useUser, SignOutButton, SignInButton } from "@clerk/nextjs"
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
  status?: "pending" | "confirmed" | "cancelled" | "cancel_requested" | "reschedule_requested"
  scheduledDate?: string
  scheduledTime?: string
  doctorNotes?: string
  rescheduleDate?: string
  rescheduleTime?: string
  rescheduleMessage?: string
  createdAt: string
}

const services = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Restorative Care",
  "Pediatric Dentistry",
  "Emergency Care",
  "Dental Implants",
  "Teeth Straightening",
  "Single Visit Root Canal Treatment",
  "Painless Dental Extractions",
  "Teeth Scanning",
  "Laser Dentistry & Minor Surgery",
]

export default function UserDashboard() {
  const { user, isLoaded } = useUser()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  const nextConfirmedAppointment = appointments.find(
    (app) => app.status === "confirmed" && app.scheduledDate
  )

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

  // Reschedule & Cancel States
  const [reschedulingId, setReschedulingId] = useState<string | null>(null)
  const [reschedDate, setReschedDate] = useState("")
  const [reschedTime, setReschedTime] = useState("")
  const [reschedMessage, setReschedMessage] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  const handleCancelRequest = async (id: string) => {
    if (!confirm("Are you sure you want to request cancellation for this appointment?")) {
      return
    }
    setActionLoading(true)
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancel_requested" }),
      })

      if (res.ok) {
        alert("Cancellation request submitted successfully!")
        fetchAppointments()
      } else {
        alert("Failed to submit request.")
      }
    } catch (err) {
      alert("Error submitting cancellation request.")
    } finally {
      setActionLoading(false)
    }
  }

  const handleRescheduleSubmit = async (id: string) => {
    if (!reschedDate) {
      alert("Please select a date.")
      return
    }
    setActionLoading(true)
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "reschedule_requested",
          rescheduleDate: reschedDate,
          rescheduleTime: reschedTime || null,
          rescheduleMessage: reschedMessage,
        }),
      })

      if (res.ok) {
        alert("Reschedule request submitted successfully!")
        setReschedulingId(null)
        setReschedDate("")
        setReschedTime("")
        setReschedMessage("")
        fetchAppointments()
      } else {
        alert("Failed to submit request.")
      }
    } catch (err) {
      alert("Error submitting reschedule request.")
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoaded) return
    if (!user) {
      setLoading(false)
      return
    }
    const userRole = (user.publicMetadata?.role as string) || "user"
    setName(user.fullName || "")
    setEmail(user.emailAddresses[0]?.emailAddress || "")
    setRole(userRole)
    fetchAppointments()
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

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-border/80 bg-card/70 shadow-2xl backdrop-blur-lg text-center">
          <CardHeader className="space-y-3">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <User className="size-7" />
            </div>
            <CardTitle className="font-heading text-2xl font-bold tracking-tight">
              Patient Portal Sign In
            </CardTitle>
            <CardDescription className="text-sm">
              Please sign in to view your scheduled visits, request new dental appointments, and manage your treatments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInButton mode="modal">
              <Button size="lg" className="w-full rounded-xl py-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                Sign In / Register
              </Button>
            </SignInButton>
            <div className="flex items-center justify-center text-xs text-muted-foreground pt-2">
              <a href="/" className="hover:text-foreground transition-colors">
                ← Back to Clinic Website
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Plus className="size-5" strokeWidth={2.5} />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                Sheetal Dental
              </span>
            </a>
            <span className="text-muted-foreground text-sm">/</span>
            <span className="text-sm font-semibold text-foreground">Patient Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block px-2"
            >
              ← Clinic Home
            </a>
            {role === "admin" && (
              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors"
              >
                <Shield className="size-3 text-accent" />
                Admin Portal
              </a>
            )}
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

        {/* Confirmed Next Appointment Schedule Callout */}
        {nextConfirmedAppointment && (
          <Card className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 shadow-lg relative overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle className="size-6 text-emerald-600 animate-bounce" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground font-heading">
                      Next Confirmed Appointment Scheduled
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your upcoming dental treatment details confirmed by the medical team.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Confirmed
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 bg-card/60 p-5 rounded-2xl border border-border/50">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Dental Treatment
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {nextConfirmedAppointment.service}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Scheduled Date
                  </span>
                  <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                    <Calendar className="size-4 text-emerald-600" />
                    {nextConfirmedAppointment.scheduledDate}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Scheduled Time
                  </span>
                  <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                    <Clock className="size-4 text-emerald-600" />
                    {nextConfirmedAppointment.scheduledTime || "To be confirmed"}
                  </span>
                </div>
              </div>

              {nextConfirmedAppointment.doctorNotes && (
                <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-4 rounded-r-2xl">
                  <span className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                    Doctor Timetable Instructions:
                  </span>
                  <p className="text-sm text-foreground italic whitespace-pre-wrap">
                    "{nextConfirmedAppointment.doctorNotes}"
                  </p>
                </div>
              )}

              {/* Treatment Timeline Progress Tracker */}
              <div className="mt-6 pt-6 border-t border-border/40 space-y-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Treatment Progress Timeline:
                </span>
                
                <div className="relative flex items-center justify-between">
                  {/* Background Line */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted dark:bg-muted/30 z-0"></div>
                  {/* Highlighted Complete Line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 z-0 transition-all duration-500" style={{ width: "50%" }}></div>

                  {/* Steps */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">✓</div>
                    <span className="text-[10px] font-bold text-foreground mt-1.5">Request</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">✓</div>
                    <span className="text-[10px] font-bold text-foreground mt-1.5">Confirmed</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="size-8 rounded-full bg-emerald-500 text-white border-2 border-emerald-500 animate-pulse flex items-center justify-center font-bold text-sm shadow-md">3</div>
                    <span className="text-[10px] font-bold text-emerald-600 mt-1.5">Preparation</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="size-8 rounded-full bg-muted text-muted-foreground border-2 border-border flex items-center justify-center font-bold text-sm">4</div>
                    <span className="text-[10px] font-medium text-muted-foreground mt-1.5">Visit</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="size-8 rounded-full bg-muted text-muted-foreground border-2 border-border flex items-center justify-center font-bold text-sm">5</div>
                    <span className="text-[10px] font-medium text-muted-foreground mt-1.5">Follow-up</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          app.status === "confirmed"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : app.status === "cancelled"
                              ? "bg-destructive/10 text-destructive"
                              : app.status === "cancel_requested"
                                ? "bg-red-500/10 text-red-600"
                                : app.status === "reschedule_requested"
                                  ? "bg-blue-500/10 text-blue-600"
                                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}>
                          {app.status === "confirmed"
                            ? "Confirmed"
                            : app.status === "cancelled"
                              ? "Cancelled"
                              : app.status === "cancel_requested"
                                ? "Cancellation Requested"
                                : app.status === "reschedule_requested"
                                  ? "Reschedule Requested"
                                  : "Pending Confirmation"}
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

                      {app.status === "confirmed" && app.scheduledDate && (
                        <div className="border-t border-border/40 pt-3 mt-3 space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-1">
                            Confirmed Appointment Schedule:
                          </p>
                          <div className="flex flex-wrap gap-4 items-center bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 text-sm">
                            <div className="flex items-center gap-1.5 text-foreground">
                              <Calendar className="size-4 text-emerald-600" />
                              <span className="font-semibold">{app.scheduledDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-foreground">
                              <Clock className="size-4 text-emerald-600" />
                              <span className="font-semibold">{app.scheduledTime || "To be confirmed"}</span>
                            </div>
                            {app.doctorNotes && (
                              <div className="w-full text-xs text-muted-foreground mt-2 border-t border-border/20 pt-1.5">
                                <span className="font-bold text-foreground block mb-0.5">Doctor Instructions:</span>
                                {app.doctorNotes}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Reschedule Propose Details display if pending doctor review */}
                      {app.status === "reschedule_requested" && app.rescheduleDate && (
                        <div className="border-t border-border/40 pt-3 mt-3 space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-1">
                            Reschedule Proposed (Pending Review):
                          </p>
                          <div className="flex flex-wrap gap-4 items-center bg-blue-500/5 p-3 rounded-xl border border-blue-500/20 text-sm">
                            <div className="flex items-center gap-1.5 text-foreground">
                              <Calendar className="size-4 text-blue-600" />
                              <span className="font-semibold">{app.rescheduleDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-foreground">
                              <Clock className="size-4 text-blue-600" />
                              <span className="font-semibold">{app.rescheduleTime || "No specific time"}</span>
                            </div>
                            {app.rescheduleMessage && (
                              <div className="w-full text-xs text-muted-foreground mt-2 border-t border-border/20 pt-1.5">
                                <span className="font-bold text-foreground block mb-0.5">Patient Reason:</span>
                                {app.rescheduleMessage}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Patient Actions: Reschedule / Cancel */}
                      {app.status !== "cancelled" && app.status !== "cancel_requested" && (
                        <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={actionLoading}
                            onClick={() => {
                              if (reschedulingId === app._id) {
                                setReschedulingId(null)
                              } else {
                                setReschedulingId(app._id)
                                setReschedDate("")
                                setReschedTime("")
                                setReschedMessage("")
                              }
                            }}
                            className="rounded-xl font-medium cursor-pointer"
                          >
                            {reschedulingId === app._id ? "Cancel Reschedule" : "Request Reschedule"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelRequest(app._id)}
                            disabled={actionLoading}
                            className="rounded-xl font-medium cursor-pointer"
                          >
                            Request Cancel
                          </Button>
                        </div>
                      )}

                      {/* Reschedule Input Form */}
                      {reschedulingId === app._id && (
                        <div className="mt-3 p-4 bg-muted/40 rounded-2xl border border-border/50 space-y-4">
                          <h4 className="text-sm font-bold text-foreground">Propose New Schedule</h4>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-muted-foreground">New Date</label>
                              <input
                                type="date"
                                value={reschedDate}
                                onChange={(e) => setReschedDate(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary text-foreground"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-muted-foreground">New Time (Optional)</label>
                              <input
                                type="time"
                                value={reschedTime}
                                onChange={(e) => setReschedTime(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary text-foreground"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground">Reason for change</label>
                            <input
                              type="text"
                              placeholder="E.g., Work conflict, sick..."
                              value={reschedMessage}
                              onChange={(e) => setReschedMessage(e.target.value)}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary text-foreground"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              disabled={actionLoading}
                              onClick={() => handleRescheduleSubmit(app._id)}
                              className="rounded-xl"
                            >
                              {actionLoading ? "Submitting..." : "Submit Propose"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Role Toggle Developer section (Only visible if already an admin) */}
        {role === "admin" && (
          <Card className="border-dashed border border-amber-500/30 bg-amber-500/5 mt-12">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Shield className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    Administrator Controls
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Your current account role is <span className="font-semibold capitalize text-foreground">{role}</span>.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  render={<a href="/admin" />}
                  nativeButton={false}
                  className="rounded-xl text-primary border-primary/20 hover:bg-primary/5"
                >
                  Visit Admin Panel
                </Button>
                <Button
                  variant="secondary"
                  disabled={togglingRole}
                  onClick={handleToggleRole}
                  className="rounded-xl border border-amber-500/20 hover:bg-amber-500/10"
                >
                  {togglingRole ? "Updating..." : "Switch to Patient View"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
