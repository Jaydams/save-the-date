"use client"

import { Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface CalendarButtonProps {
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
}

export function CalendarButton({ title, description, startDate, endDate, location }: CalendarButtonProps) {
  const generateICS = () => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Save the Date//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wedding-save-the-date.ics'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateGoogleCalendarURL = () => {
    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
      details: description,
      location: location,
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => window.open(generateGoogleCalendarURL(), '_blank')}
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full shadow-lg data-[color-mode=purple]:from-purple-600 data-[color-mode=purple]:to-purple-700 data-[color-mode=purple]:hover:from-purple-700 data-[color-mode=purple]:hover:to-purple-800"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Add to Google Calendar
        </Button>
      </motion.div>

      {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={generateICS}
          variant="outline"
          className="px-6 py-3 rounded-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 data-[color-mode=purple]:border-purple-600 data-[color-mode=purple]:text-purple-600 data-[color-mode=purple]:hover:bg-purple-50"
        >
          <Download className="mr-2 h-4 w-4" />
          Download .ics
        </Button>
      </motion.div> */}
    </div>
  )
}