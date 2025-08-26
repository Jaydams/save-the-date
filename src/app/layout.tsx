import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-inter`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}