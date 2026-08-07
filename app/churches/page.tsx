import Link from "next/link";

const churches = [
  {
    id: 1,
    name: "City Light Church",
    city: "High Point",
    county: "Guilford",
    phone: "Add phone",
    status: "Warm Lead",
    nextStep: "Request referrals",
  },
  {
    id: 2,
    name: "Triad Baptist Church",
    city: "Greensboro",
    county: "Guilford",
    phone: "Research needed",
    status: "New",
    nextStep: "Initial call",
  },
  {
    id: 3,
    name: "Grace Life Church",
    city: "Greensboro",
    county: "Guilford",
    phone: "Research needed",
    status: "New",
    nextStep: "Initial email",
  },
  {
    id: 4,
    name: "First Baptist Church Asheboro",
    city: "Asheboro",
    county: "Randolph",
    phone: "336-629-9191",
    status: "New",
    nextStep: "Initial call",
  },
];

function statusStyles(status: string) {
  if (status === "Warm Lead") {
    return "bg-yellow-500/15 text-yellow-300";
  }

  if (status === "Contacted") {
    return "bg-blue-500/15 text-blue-300";
  }

  return "bg-gray-700 text-gray-300";
}

export default function ChurchesPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Shepherds Defense
            </p>

            <h1 className="text-xl font-bold sm:text-2xl">
              Church CRM
            </h1>
          </div>

          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-yellow-400 hover:text-yellow-400"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Churches
            </h2>

            <p className="mt-2 text-gray-400">
              Manage outreach, contacts, follow-ups, and partnership opportunities.
            </p>
          </div>

          <Link
            href="/churches/new"
            className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            + Add Church
          </Link>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Total Prospects</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">50</p>
          </article>

          <article className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Warm Leads</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">1</p>
          </article>

          <article className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Follow-Ups Due</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">7</p>
          </article>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          <div className="border-b border-gray-800 p-4">
            <input
              type="search"
              placeholder="Search churches..."
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400 sm:max-w-md"
            />
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-gray-950 text-sm text-gray-400">
                <tr>
                  <th className="px-5 py-4 font-medium">Church</th>
                  <th className="px-5 py-4 font-medium">Location</th>
                  <th className="px-5 py-4 font-medium">Phone</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Next Step</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {churches.map((church) => (
                  <tr key={church.id} className="hover:bg-gray-800/50">
                    <td className="px-5 py-4 font-semibold">
                      {church.name}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {church.city}, {church.county}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {church.phone}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
                          church.status,
                        )}`}
                      >
                        {church.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {church.nextStep}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-gray-800 md:hidden">
            {churches.map((church) => (
              <article key={church.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">
                      {church.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      {church.city}, {church.county} County
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
                      church.status,
                    )}`}
                  >
                    {church.status}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-300">
                  Phone: {church.phone}
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  Next step: {church.nextStep}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}