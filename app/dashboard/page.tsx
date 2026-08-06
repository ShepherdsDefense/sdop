import Link from "next/link";

const statistics = [
  {
    label: "Church Prospects",
    value: "50",
    detail: "4 added this month",
  },
  {
    label: "Follow-Ups Due",
    value: "7",
    detail: "3 due today",
  },
  {
    label: "Meetings Scheduled",
    value: "2",
    detail: "Next meeting Thursday",
  },
  {
    label: "Active Partners",
    value: "4",
    detail: "Churches and vendors",
  },
];

const tasks = [
  "Call Grace Life Church",
  "Send follow-up email to G-Code",
  "Prepare City Light training proposal",
  "Confirm range availability",
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Shepherds Defense
            </p>

            <h1 className="text-xl font-bold sm:text-2xl">
              Operations Portal
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-yellow-400 hover:text-yellow-400"
          >
            Sign Out
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-gray-800 bg-gray-900 p-4">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-black"
            >
              Dashboard
            </Link>

            <Link
              href="/churches"
              className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              Churches
            </Link>

            <span className="block rounded-lg px-4 py-3 text-gray-600">
              Partnerships
            </span>

            <span className="block rounded-lg px-4 py-3 text-gray-600">
              Training
            </span>

            <span className="block rounded-lg px-4 py-3 text-gray-600">
              Tasks
            </span>

            <span className="block rounded-lg px-4 py-3 text-gray-600">
              Reports
            </span>
          </nav>
        </aside>

        <section>
          <div>
            <p className="text-sm text-gray-400">
              Wednesday, August 5
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              Welcome to SDOP
            </h2>

            <p className="mt-2 text-gray-400">
              Here is your current Shepherds Defense operations overview.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((statistic) => (
              <article
                key={statistic.label}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <p className="text-sm text-gray-400">
                  {statistic.label}
                </p>

                <p className="mt-3 text-4xl font-bold text-yellow-400">
                  {statistic.value}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {statistic.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <article className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Tasks Due
                </h3>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                  {tasks.length} open
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {tasks.map((task) => (
                  <label
                    key={task}
                    className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950 p-4"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-yellow-500"
                    />

                    <span className="text-gray-200">
                      {task}
                    </span>
                  </label>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-xl font-bold">
                Upcoming Activity
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <p className="font-semibold text-yellow-400">
                    Church Outreach Meeting
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Thursday at 10:00 AM
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <p className="font-semibold text-yellow-400">
                    Falling Steel Competition
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Saturday
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <p className="font-semibold text-yellow-400">
                    Partnership Follow-Up
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    G-Code Holsters
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}