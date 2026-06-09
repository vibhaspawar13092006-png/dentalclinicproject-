"use client"

import { useState, useEffect } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Plus,
  Search,
  Trash2,
  Filter,
  Calendar,
  Mail,
  Phone,
  LogOut,
  Clock,
  Activity,
  FileText,
  ShieldAlert,
  ArrowLeft,
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

export default function AdminDashboard() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState("All")
  const [togglingRole, setTogglingRole] = useState(false)

  // Check if role is admin
  const role = user?.publicMetadata?.role as string || "user"
  const isAdmin = role === "admin"

  const handleToggleRole = async () => {
    setTogglingRole(true)
    try {
      const res = await fetch("/api/user/toggle-role", {
        method: "POST",
      })
      if (res.ok) {
        alert("Success! Your role has been updated to User. Redirecting to Patient Portal...")
        window.location.href = "/dashboard"
      } else {
        alert("Failed to toggle role.")
      }
    } catch (err) {
      alert("Error toggling role.")
    } finally {
      setTogglingRole(false)
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn && isAdmin) {
      fetchAppointments()
    } else if (isLoaded && (!isSignedIn || !isAdmin)) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, isAdmin])

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments")
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      } else {
        setError("Failed to fetch appointments. You may not have administrative access.")
      }
    } catch (err) {
      setError("An error occurred while loading data.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment request?")) {
      return
    }

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
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

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground text-sm font-medium">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-border/80 bg-card/60 shadow-2xl backdrop-blur-lg text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <ShieldAlert className="size-6" />
            </div>
            <CardTitle className="font-heading text-2xl font-bold tracking-tight">
              Sign In Required
            </CardTitle>
            <CardDescription>
              Please log in to access the administrator panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              render={<a href="/" />}
              nativeButton={false}
              className="w-full rounded-xl py-2.5 font-semibold"
            >
              Go to Home to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-border/80 bg-card/60 shadow-2xl backdrop-blur-lg text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="size-6" />
            </div>
            <CardTitle className="font-heading text-2xl font-bold tracking-tight">
              Access Denied
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              You do not have permission to view this page. Admin role is required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xs text-muted-foreground">
              Tip: You can visit your Patient Dashboard and click the "Developer Role Switcher" button to promote your account to Admin for testing.
            </p>
            <div className="flex flex-col gap-2">
              <Button
                render={<a href="/dashboard" />}
                nativeButton={false}
                className="w-full rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-4" />
                Go to Dashboard
              </Button>
              <SignOutButton>
                <Button variant="outline" className="w-full rounded-xl py-2.5 font-semibold text-destructive">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
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
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold">{user?.fullName}</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 capitalize">Administrator</span>
            </div>
            <SignOutButton>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 rounded-full border-border hover:bg-muted text-destructive hover:text-destructive"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </SignOutButton>
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              render={<a href="/dashboard" />}
              nativeButton={false}
              className="rounded-xl border-border"
            >
              Go to Patient Portal
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-destructive bg-destructive/5 text-destructive p-4 rounded-xl">
            <p className="text-sm font-semibold">{error}</p>
          </Card>
        )}

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
                  Your current account role is <span className="font-semibold capitalize text-foreground">{role}</span>. Toggle this to test Role-Based Access Controls on /dashboard.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                disabled={togglingRole}
                onClick={handleToggleRole}
                className="rounded-xl border border-amber-500/20 hover:bg-amber-500/10"
              >
                {togglingRole ? "Updating..." : `Switch to User`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
