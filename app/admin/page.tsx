"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Plus,
  Search,
  Trash2,
  Filter,
  Calendar,
  User,
  Mail,
  Phone,
  LogOut,
  CheckCircle,
  Clock,
  Activity,
  FileText
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

export default function AdminDashboard() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState("All")
  const [isPending, startTransition] = useTransition()

  // Check if password exists in session storage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password")
    if (savedPassword) {
      verifyPassword(savedPassword)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    verifyPassword(password)
  }

  const verifyPassword = async (passToVerify: string) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/appointments", {
        headers: {
          Authorization: `Bearer ${passToVerify}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
        setIsAuthenticated(true)
        sessionStorage.setItem("admin_password", passToVerify)
        setPassword(passToVerify)
      } else {
        setError("Invalid admin password. Please try again.")
        sessionStorage.removeItem("admin_password")
      }
    } catch (err) {
      setError("An error occurred during authentication.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_password")
    setIsAuthenticated(false)
    setAppointments([])
    setPassword("")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment request?")) {
      return
    }

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (res.ok) {
        setAppointments((prev) => prev.filter((app) => app._id !== id))
      } else {
        alert("Failed to delete appointment.")
      }
    } catch (err) {
      alert("An error occurred while deleting.")
    }
  }

  // Filter and Search logic
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      (app.message && app.message.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesService = selectedService === "All" || app.service === selectedService

    return matchesSearch && matchesService
  })

  // Group metrics
  const totalAppointments = appointments.length
  const todayAppointments = appointments.filter((app) => {
    const appDate = new Date(app.createdAt)
    const today = new Date()
    return (
      appDate.getDate() === today.getDate() &&
      appDate.getMonth() === today.getMonth() &&
      appDate.getFullYear() === today.getFullYear()
    )
  }).length

  const servicesBreakdown = appointments.reduce((acc: Record<string, number>, curr) => {
    acc[curr.service] = (acc[curr.service] || 0) + 1
    return acc
  }, {})

  const servicesList = ["All", ...Array.from(new Set(appointments.map((app) => app.service)))]

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-radial from-background to-secondary/30 p-4">
        <Card className="w-full max-w-md border-border/80 bg-card/60 shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
              <Plus className="size-6" strokeWidth={2.5} />
            </div>
            <CardTitle className="font-heading text-2xl font-bold tracking-tight">
              Sheetal Dental Clinic
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Please enter the administrator password to access the portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-border bg-background/50 px-4 py-2.5 outline-none focus:border-primary"
                  required
                />
              </div>
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-2.5 font-semibold transition-all hover:opacity-90"
              >
                {loading ? "Authenticating..." : "Unlock Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plus className="size-5" strokeWidth={2.5} />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-muted-foreground md:inline-block">
              Welcome, Clinic Staff
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border-border hover:bg-muted text-destructive hover:text-destructive"
            >
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        {/* Banner Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Appointment Requests</h1>
            <p className="text-muted-foreground">
              View, search, and manage incoming patient requests for Sheetal Dental Clinic.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <h3 className="text-2xl font-bold">{totalAppointments}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Today</p>
                <h3 className="text-2xl font-bold">{todayAppointments}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/40 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Activity className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Services Requested</p>
                <h3 className="text-md font-bold truncate max-w-[200px]">
                  {Object.keys(servicesBreakdown).length} Unique Services
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/30 p-4 rounded-2xl border border-border/50">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, email, phone or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-border bg-background/50 pl-10 pr-4 py-2 outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="rounded-xl border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-primary"
            >
              {servicesList.map((service) => (
                <option key={service} value={service}>
                  {service === "All" ? "All Services" : service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="border-dashed border-2 border-border/80 bg-transparent text-center py-12">
              <CardContent className="space-y-3">
                <p className="text-lg font-medium text-muted-foreground">No appointments found</p>
                <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">
                  Try adjusting your search criteria or filter to locate the records.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredAppointments.map((app) => (
                <Card key={app._id} className="border-border/60 bg-card/30 hover:bg-card/50 transition-all shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      {/* Left: Primary Details */}
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            {app.name}
                          </h3>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {app.service}
                          </span>
                        </div>

                        <div className="grid gap-y-1.5 gap-x-6 text-sm text-muted-foreground sm:grid-cols-2">
                          <div className="flex items-center gap-2">
                            <Mail className="size-4 text-muted-foreground/80" />
                            <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="size-4 text-muted-foreground/80" />
                            <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 sm:col-span-2">
                            <Calendar className="size-4 text-muted-foreground/80" />
                            <span>
                              Requested on: {new Date(app.createdAt).toLocaleString(undefined, {
                                dateStyle: "long",
                                timeStyle: "short",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-end md:self-start">
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          onClick={() => handleDelete(app._id)}
                          aria-label="Delete request"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Requirement/Message message */}
                    {app.message && (
                      <div className="mt-4 border-t border-border/40 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-1">
                          Requirement Description:
                        </p>
                        <p className="text-sm bg-muted/40 p-3 rounded-xl border border-border/30 text-foreground whitespace-pre-wrap">
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
      </main>
    </div>
  )
}
