import Link from "next/link";

export default function AddChurchPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/churches"
          className="text-sm text-yellow-400 transition hover:text-yellow-300"
        >
          ← Return to Churches
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
            Shepherds Defense
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Add Church Prospect
          </h1>

          <p className="mt-2 text-gray-400">
            Create a new church record for outreach and follow-up.
          </p>
        </div>

        <form className="mt-8 space-y-6 rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-8">
          <div>
            <label
              htmlFor="churchName"
              className="mb-2 block text-sm font-medium"
            >
              Church name
            </label>

            <input
              id="churchName"
              name="churchName"
              type="text"
              required
              placeholder="Example: Grace Community Church"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-medium"
              >
                City
              </label>

              <input
                id="city"
                name="city"
                type="text"
                placeholder="Greensboro"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
              />
            </div>

            <div>
              <label
                htmlFor="county"
                className="mb-2 block text-sm font-medium"
              >
                County
              </label>

              <select
                id="county"
                name="county"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition focus:border-yellow-400"
                defaultValue=""
              >
                <option value="" disabled>
                  Select county
                </option>
                <option>Guilford</option>
                <option>Randolph</option>
                <option>Rockingham</option>
                <option>Forsyth</option>
                <option>Davidson</option>
                <option>Alamance</option>
                <option>Stokes</option>
                <option>Surry</option>
                <option>Davie</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium"
              >
                Office phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="336-555-1234"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Office email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="office@example.org"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="website"
              className="mb-2 block text-sm font-medium"
            >
              Website
            </label>

            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://example.org"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium"
              >
                Lead status
              </label>

              <select
                id="status"
                name="status"
                defaultValue="New"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition focus:border-yellow-400"
              >
                <option>New</option>
                <option>Warm Lead</option>
                <option>Contacted</option>
                <option>Meeting Scheduled</option>
                <option>Proposal Sent</option>
                <option>Partner</option>
                <option>Inactive</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                defaultValue="Medium"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition focus:border-yellow-400"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              rows={5}
              placeholder="Contact names, security needs, referrals, or follow-up information..."
              className="w-full resize-y rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-800 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/churches"
              className="rounded-lg border border-gray-700 px-5 py-3 text-center font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
            >
              Save Church
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          The Save Church button will connect to Supabase in the next stage.
        </p>
      </div>
    </main>
  );
}