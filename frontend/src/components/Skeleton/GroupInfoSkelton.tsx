export function GroupInfoSkeleton() {
  const memberRows = Array.from({ length: 8 })

  return (
    <div className="min-h-dvh bg-base-100 text-base-content" role="status" aria-busy="true" aria-live="polite">
      {/* Top bar */}
      <header className="navbar bg-base-100 sticky top-0 z-10 px-2">
        <div className="navbar-start">
          <div className="btn btn-ghost btn-circle">
            <div className="skeleton h-10 w-10 rounded-full" aria-hidden />
          </div>
        </div>
        <div className="navbar-center" />
        <div className="navbar-end">
          <div className="skeleton h-8 w-16 rounded-md" aria-hidden />
        </div>
      </header>

      <main className="mx-auto px-4 pb-7 w-full max-w-2xl">
        {/* Group header section */}
        <section className="flex flex-col items-center text-center pt-4">
          <div className="avatar">
            <div
              className="skeleton w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
              aria-hidden
            />
          </div>
          <div className="skeleton mt-3 h-6 w-40 rounded-md" aria-hidden />
          <div className="skeleton mt-2 h-4 w-64 max-w-full rounded-md opacity-80" aria-hidden />
        </section>

        {/* Group actions (admins only) - placeholder line and small button */}
        <section className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="skeleton h-3 w-3 rounded-full" aria-hidden />
              <div className="skeleton h-4 w-24 rounded-md" aria-hidden />
            </div>
            <div className="skeleton h-8 w-28 rounded-md" aria-hidden />
          </div>
        </section>

        {/* Members header */}
        <div className="skeleton mt-6 mb-2 h-4 w-56 rounded-md opacity-80" aria-hidden />

        {/* Search input skeleton */}
        <div className="mb-2">
          <div className="skeleton h-12 w-full rounded-lg" aria-hidden />
        </div>

        {/* Members list with fixed height + scrollbar */}
        <section className="card bg-base-100 border border-base-300 mt-3">
          <div className="h-80 md:h-[60vh] overflow-y-auto p-3">
            {memberRows.map((_, idx) => (
              <div key={idx} className="sm:px-3">
                <div className="flex px-2 rounded-lg items-center gap-3 py-3 border-b border-base-300 last:border-b-0">
                  {/* avatar */}
                  <div className="avatar">
                    <div className="skeleton w-10 h-10 rounded-full" aria-hidden />
                  </div>

                  {/* name + badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="skeleton h-4 w-28 rounded-md" aria-hidden />
                      <div className="skeleton h-4 w-14 rounded-md" aria-hidden />
                      <div className="skeleton h-4 w-16 rounded-md" aria-hidden />
                    </div>
                  </div>

                  {/* admin actions area placeholders */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="skeleton h-6 w-6 rounded-md" aria-hidden />
                    <div className="skeleton h-6 w-6 rounded-md" aria-hidden />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom leave button */}
      <div className="h-16 px-3 bg-base-100 border-t border-base-300 flex items-center">
        <div className="skeleton [@media(min-width:800px)]:w-[640px] w-full h-10 rounded-md mx-auto" aria-hidden />
      </div>
    </div>
  )
}

export default GroupInfoSkeleton