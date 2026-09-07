import type { Metadata } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const fraunces = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sheetal Dental Clinic — Modern, Gentle Dentistry',
  description:
    'Sheetal Dental Clinic is a modern dental clinic offering gentle, comprehensive care — from routine cleanings to cosmetic and restorative dentistry. Book your appointment today.',
  generator: 'v0.app',
  verification: {
    google: 'wJ3wD44cqVVuoEuGw1Fu96lXFoPwr6931f76rLxsQxY',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Dentist",
                "name": "Sheetal Dental Clinic",
                "image": "https://dental-clinic-website-ecru.vercel.app/hero-dental.png",
                "telephone": "+917304252372",
                "url": "https://dental-clinic-website-ecru.vercel.app",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Dongri, Uttan",
                  "addressLocality": "Mira Bhayandar",
                  "addressRegion": "Maharashtra",
                  "postalCode": "401106",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 19.2824387,
                  "longitude": 72.7848782
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    "opens": "10:00",
                    "closes": "18:00"
                  }
                ]
              })
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

