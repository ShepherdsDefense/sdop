import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { updateChurch } from "../../actions";

type EditChurchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditChurchPage({
  params,
}: EditChurchPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: church, error } = await supabase
    .from("churches")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !church) {
    notFound();
  }

  const updateChurchWithId = updateChurch.bind(null, id);

  return (
    <AppShell active="churches">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/churches/${id}`}
          className="text-sm font-medium text-amber-400 hover:text-amber-300"
        >
          ← Back to Church Profile
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-amber-400">
            Church Outreach
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight">
            Edit Church
          </h2>

          <p className="mt-2 text-slate-400">
            Update church information and relationship status.
          </p>
        </div>

        <form
          action={updateChurchWithId}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Church Name *
            </label>

            <input
              name="church_name"
              required
              defaultValue={church.church_name}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Denomination
              </label>

              <input
                name="denomination"
                defaultValue={church.denomination ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                County
              </label>

              <input
                name="county"
                defaultValue={church.county ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <input
              name="address"
              defaultValue={church.address ?? ""}
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
                defaultValue={church.city ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                name="phone"
                type="tel"
                defaultValue={church.phone ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                name="email"
                type="email"
                defaultValue={church.email ?? ""}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Website
              </label>

              <input
                name="website"
                type="url"
                defaultValue={church.website ?? ""}
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
                defaultValue={church.status ?? "New"}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Meeting Scheduled</option>
                <option>Proposal Sent</option>
                <option>Partner</option>
                <option>Inactive</option>
              </select>
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
        defaultValue={church.follow_up_date ?? ""}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium">
        Follow-Up Type
      </label>

      <select
        name="follow_up_type"
        defaultValue={church.follow_up_type ?? ""}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      >
        <option value="">No follow-up selected</option>
        <option value="Phone Call">Phone Call</option>
        <option value="Email">Email</option>
        <option value="Meeting">Meeting</option>
        <option value="Proposal">Proposal</option>
        <option value="Visit">Visit</option>
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
      defaultValue={church.follow_up_notes ?? ""}
      placeholder="What needs to happen next?"
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    />
  </div>

  <label className="mt-6 flex items-center gap-3">
    <input
      name="follow_up_completed"
      type="checkbox"
      defaultChecked={church.follow_up_completed ?? false}
      className="h-4 w-4 accent-amber-400"
    />

    <span className="text-sm text-slate-300">
      Follow-up completed
    </span>
  </label>
</div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                name="priority"
                defaultValue={church.priority ?? "Medium"}
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
              defaultValue={church.notes ?? ""}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
            <Link
              href={`/churches/${id}`}
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