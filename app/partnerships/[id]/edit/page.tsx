import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { updatePartnership } from "../../actions";

type EditPartnershipPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPartnershipPage({
  params,
}: EditPartnershipPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: partnership, error } = await supabase
    .from("partnerships")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !partnership) {
    notFound();
  }

  const updatePartnershipWithId = updatePartnership.bind(null, id);

  return (
    <AppShell active="partnerships">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/partnerships/${id}`}
          className="text-sm font-medium text-amber-400 hover:text-amber-300"
        >
          ← Back to Partnership Profile
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-amber-400">
            Relationship Management
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight">
            Edit Partnership
          </h2>

          <p className="mt-2 text-slate-400">
            Update organization, contact, location, and relationship details.
          </p>
        </div>

        <form
          action={updatePartnershipWithId}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Organization Name *
            </label>

            <input
              name="organization_name"
              required
              defaultValue={partnership.organization_name}
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
                defaultValue={partnership.organization_type ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="">Select type</option>
                <option value="Vendor">Vendor</option>
                <option value="Range">Range</option>
                <option value="Firearms Business">Firearms Business</option>
                <option value="Training Partner">Training Partner</option>
                <option value="Community Organization">
                  Community Organization
                </option>
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
                defaultValue={partnership.contact_name ?? ""}
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
                defaultValue={partnership.phone ?? ""}
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
                defaultValue={partnership.email ?? ""}
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
              defaultValue={partnership.website ?? ""}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <input
              name="address"
              defaultValue={partnership.address ?? ""}
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
                defaultValue={partnership.city ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                County
              </label>

              <input
                name="county"
                defaultValue={partnership.county ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                State
              </label>

              <input
                name="state"
                defaultValue={partnership.state ?? ""}
                placeholder="NC"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                ZIP Code
              </label>

              <input
                name="zip_code"
                inputMode="numeric"
                defaultValue={partnership.zip_code ?? ""}
                placeholder="28376"
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
                defaultValue={partnership.status ?? "New"}
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
                defaultValue={partnership.priority ?? "Medium"}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
<div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
    Follow-Up
  </p>

  <div className="mt-5 grid gap-6 sm:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-medium">
        Follow-Up Date
      </label>

      <input
        name="follow_up_date"
        type="date"
        defaultValue={partnership.follow_up_date ?? ""}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium">
        Follow-Up Type
      </label>

      <select
        name="follow_up_type"
        defaultValue={partnership.follow_up_type ?? ""}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      >
        <option value="">No follow-up selected</option>
        <option value="Phone Call">Phone Call</option>
        <option value="Email">Email</option>
        <option value="Meeting">Meeting</option>
        <option value="Affiliate Check-In">Affiliate Check-In</option>
        <option value="Vendor Follow-Up">Vendor Follow-Up</option>
        <option value="Proposal">Proposal</option>
        <option value="Range Coordination">Range Coordination</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>

  <div className="mt-6">
    <label className="mb-2 block text-sm font-medium">
      Follow-Up Notes
    </label>

    <textarea
      name="follow_up_notes"
      rows={4}
      defaultValue={partnership.follow_up_notes ?? ""}
      placeholder="What needs to happen next?"
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    />
  </div>

  <label className="mt-6 flex items-center gap-3">
    <input
      name="follow_up_completed"
      type="checkbox"
      defaultChecked={partnership.follow_up_completed ?? false}
      className="h-4 w-4 accent-amber-400"
    />

    <span className="text-sm text-slate-300">
      Follow-up completed
    </span>
  </label>
</div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              name="notes"
              rows={6}
              defaultValue={partnership.notes ?? ""}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
            <Link
              href={`/partnerships/${id}`}
              className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-300 hover:border-slate-500"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}