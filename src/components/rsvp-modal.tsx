"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'

type AttendanceStatus = 'attending' | 'not_sure' | 'not_attending'

export function RsvpModal({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<AttendanceStatus>('attending')
  const [fullName, setFullName] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const canSubmit = status !== 'attending' || (fullName.trim().length > 1 && location.trim().length > 1)

  async function handleSubmit() {
    if (!canSubmit) return
    setLoading(true)
    try {
      const { error } = await supabase.from('rsvps').insert({
        status,
        full_name: fullName.trim(),
        location: location.trim(),
      })
      if (error) throw error
      setOpen(false)
      setFullName('')
      setLocation('')
      setStatus('attending')
      toast.success('Thank you!', { description: 'Your response has been recorded.' })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      toast.error('Submission failed', { description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName ?? ' hover:bg-teal-700 data-[color-mode=purple]:bg-purple-600 data-[color-mode=purple]:hover:bg-purple-700'}>
          Indicate Interest
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[520px] w-[calc(100vw-2rem)] sm:w-auto border-white/30 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl
                   shadow-xl rounded-2xl p-6 md:p-8
                   bg-gradient-to-br from-white/80 via-white/60 to-teal-50/50 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-800/60
                   data-[color-mode=purple]:to-purple-50/50"
      >
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl md:text-3xl text-gray-800 dark:text-white">
            RSVP
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Please let us know if you’ll be attending.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-gray-800 dark:text-gray-200">Attendance</Label>
            <RadioGroup
              value={status}
              onValueChange={(v) => setStatus(v as AttendanceStatus)}
              className="grid grid-cols-1 gap-3"
            >
              {([
                { id: 'attending', label: 'Attending', value: 'attending' },
                { id: 'not_sure', label: 'Not Sure', value: 'not_sure' },
                { id: 'not_attending', label: 'Not Attending', value: 'not_attending' },
              ] as const).map((opt) => (
                <div
                  key={opt.id}
                  className={
                    `flex items-center gap-3 rounded-xl border p-3 transition
                     bg-white/70 dark:bg-gray-800/60 border-gray-200/70 dark:border-white/10 shadow-sm hover:shadow
                     ${status === opt.value ? 'ring-2 ring-teal-400 data-[color-mode=purple]:ring-purple-400' : ''}`
                  }
                >
                  <RadioGroupItem id={opt.id} value={opt.value} />
                  <Label htmlFor={opt.id} className="cursor-pointer text-gray-800 dark:text-gray-200">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {status === 'attending' && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full_name" className="text-gray-800 dark:text-gray-200">Full Name</Label>
                <Input
                  id="full_name"
                  placeholder="Your names"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/80 dark:bg-gray-800/70 border-gray-200/70 dark:border-white/10 focus-visible:ring-teal-400 data-[color-mode=purple]:focus-visible:ring-purple-400"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location" className="text-gray-800 dark:text-gray-200">Location</Label>
                <Input
                  id="location"
                  placeholder="Where you’re coming from"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/80 dark:bg-gray-800/70 border-gray-200/70 dark:border-white/10 focus-visible:ring-teal-400 data-[color-mode=purple]:focus-visible:ring-purple-400"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-2">
          <Button
            onClick={handleSubmit}
            disabled={loading || !canSubmit}
            className="bg-teal-600 hover:bg-teal-700 text-white data-[color-mode=purple]:bg-purple-600 data-[color-mode=purple]:hover:bg-purple-700"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                Sending...
              </span>
            ) : (
              'Submit'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


