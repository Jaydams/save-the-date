import { createClient } from '@/utils/supabase/server'
import { Clock, Search } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

type SearchParams = {
  searchParams?: {
    q?: string
    status?: 'all' | 'attending' | 'not_sure' | 'not_attending'
  }
}

export default async function AttendeesPage({ searchParams }: SearchParams) {
  const q = (searchParams?.q ?? '').trim()
  const status = (searchParams?.status ?? 'attending') as SearchParams['searchParams']['status']

  const supabase = await createClient()
  let query = supabase
    .from('rsvps')
    .select('full_name, location, created_at, status')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }
  if (q) {
    const pattern = `%${q.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`
    query = query.or(`full_name.ilike.${pattern},location.ilike.${pattern}`)
  }

  const { data, error } = await query

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  const attendees = data ?? []

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 data-[color-mode=purple]:from-purple-50 data-[color-mode=purple]:via-white data-[color-mode=purple]:to-purple-100 data-[color-mode=purple]:dark:from-gray-900 data-[color-mode=purple]:dark:via-purple-900/20 data-[color-mode=purple]:dark:to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="font-playfair text-3xl md:text-4xl text-gray-800 dark:text-white mb-3">Attendees</h1>
          <p className="text-gray-600 dark:text-gray-400">Friends and family who’ve shared their plans</p>
        </div>

        <form className="mb-8 grid gap-3 md:grid-cols-3" action="/attendees" method="get">
          <div className="md:col-span-2">
            <div className="relative">
              <input
                name="q"
                defaultValue={q}
                placeholder="Search by name or location..."
                className="w-full rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-sm px-4 py-3 pl-11 text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2 justify-stretch">
            {([
              { label: 'All', value: 'all' },
              { label: 'Attending', value: 'attending' },
              { label: 'Not sure', value: 'not_sure' },
              { label: 'Not attending', value: 'not_attending' },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                name="status"
                value={opt.value}
                className={`flex-1 rounded-full px-4 py-2 text-sm border transition
                  ${status === opt.value
                    ? 'bg-teal-600 text-white border-teal-600 data-[color-mode=purple]:bg-purple-600 data-[color-mode=purple]:border-purple-600'
                    : 'bg-white/70 dark:bg-gray-900/60 border-white/30 dark:border-white/10 text-gray-700 dark:text-gray-300'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </form>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {attendees.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
              No attendees yet.
            </div>
          ) : (
            attendees.map((a, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-sm hover:shadow transition"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-playfair text-xl text-gray-800 dark:text-white">{a.full_name ?? 'Anonymous'}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{a.location ?? '—'}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(a.created_at as string).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}


