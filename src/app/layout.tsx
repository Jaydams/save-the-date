import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, MonteCarlo, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montecarlo = MonteCarlo({ subsets: ['latin'], variable: '--font-montecarlo', weight: '400' })

export const metadata: Metadata = {
  title: 'Save the Date - Dr. Josephine & Dr. Lucky',
  description: 'Join us as we celebrate our special day on November 15, 2025',
  keywords: 'wedding, save the date, Dr. Josephine Gaza, Dr. Lucky James',
  authors: [{ name: 'Wedding Planning Team' }],
  openGraph: {
    title: 'Save the Date - Dr. Josephine & Dr. Lucky',
    description: 'Join us as we celebrate our special day on November 15, 2025',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <body className={`${inter.variable} ${playfair.variable} ${montecarlo.variable} font-inter`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}