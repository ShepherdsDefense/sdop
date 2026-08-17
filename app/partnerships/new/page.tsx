import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { createPartnership } from "../actions";

export default async function NewPartnershipPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell active="partnerships">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/partnerships"
          className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Partnerships
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-amber-400">
            Relationship Management
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight">
            Add Partnership
          </h2>

          <p className="mt-2 text-slate-400">
            Add a business, vendor, range, or organization to the Partnerships CRM.
          </p>
        </div>

        <form
          action={createPartnership}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Organization Name *
            </label>

            <input
              name="organization_name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Organization Type
              </label>

              <select
                name="organization_type"
                defaultValue=""
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="">Select type</option>
                <option value="Vendor">Vendor</option>
                <option value="Range">Range</option>
                <option value="Firearms Business">Firearms Business</option>
                <option value="Training Partner">Training Partner</option>
                <option value="Community Organization">Community Organization</option>
                <option value="Affiliate">Affiliate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Contact Name
              </label>

              <input
                name="contact_name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                name="phone"
                type="tel"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                name="email"
                type="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Website
            </label>

            <input
              name="website"
              type="url"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <input
              name="address"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                name="city"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                County
              </label>

              <input
                name="county"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                defaultValue="New"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Meeting Scheduled</option>
                <option>Proposal Sent</option>
                <option>Active Partner</option>
                <option>Inactive</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                name="priority"
                defaultValue="Medium"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              name="notes"
              rows={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/partnerships"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-300 hover:border-slate-500"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Save Partnership
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}