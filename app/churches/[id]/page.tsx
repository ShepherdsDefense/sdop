import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import DeleteChurchButton from "@/components/DeleteChurchButton";

type ChurchProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ChurchProfilePage({
  params,
}: ChurchProfilePageProps) {
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

  if (error) {
    console.error("Church profile error:", error);
  }

  if (!church) {
    notFound();
  }
  const { data: followUpHistory, error: historyError } = await supabase
  .from("follow_up_history")
  .select(
    "id, follow_up_date, follow_up_type, follow_up_notes, completed_at"
  )
  .eq("church_id", id)
  .order("completed_at", { ascending: false });

if (historyError) {
  console.error("Follow-up history error:", historyError);
}

  return (
    <AppShell active="churches">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/churches"
          className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Church CRM
        </Link>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p className="text-sm font-semibold text-amber-400">
        Church Profile
      </p>

      <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
        {church.church_name}
      </h2>

      <p className="mt-2 text-slate-400">
        {[church.city, church.county]
          .filter(Boolean)
          .join(", ") || "Location not entered"}
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-400">
        {church.status}
      </span>

      <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
        {church.priority} Priority
      </span>

      <Link
        href={`/churches/${church.id}/edit`}
        className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
      >
        Edit Church
      </Link>

      <DeleteChurchButton
        churchId={church.id}
        churchName={church.church_name}
      />
    </div>
  </div>
</section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Contact Information
            </p>

            <div className="mt-5 space-y-5">
              <Detail label="Phone" value={church.phone} />
              <Detail label="Email" value={church.email} />
              <Detail label="Website" value={church.website} />
              <Detail label="Denomination" value={church.denomination} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Location
            </p>

            <div className="mt-5 space-y-5">
              <Detail label="Address" value={church.address} />
              <Detail label="City" value={church.city} />
              <Detail label="County" value={church.county} />
            </div>
          </section>
        </div>
<section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        Follow-Up
      </p>

      <h3 className="mt-1 text-xl font-bold">
        Next Action
      </h3>
    </div>

    <span
      className={
        church.follow_up_completed
          ? "rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400"
          : "rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-400"
      }
    >
      {church.follow_up_completed ? "Completed" : "Open"}
    </span>
  </div>

  {church.follow_up_date ||
  church.follow_up_type ||
  church.follow_up_notes ? (
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <Detail
        label="Follow-Up Date"
        value={church.follow_up_date}
      />

      <Detail
        label="Follow-Up Type"
        value={church.follow_up_type}
      />

      <div className="sm:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Follow-Up Notes
        </p>

        <p className="mt-1 whitespace-pre-wrap text-slate-200">
          {church.follow_up_notes || "No follow-up notes entered"}
        </p>
      </div>
    </div>
  ) : (
    <p className="mt-4 text-slate-400">
      No follow-up is currently scheduled.
    </p>
  )}
</section>
<section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <div>
    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
      Follow-Up History
    </p>

    <h3 className="mt-1 text-xl font-bold">
      Completed Activity
    </h3>

    <p className="mt-1 text-sm text-slate-400">
      Previous completed follow-ups for this church.
    </p>
  </div>

  {followUpHistory && followUpHistory.length > 0 ? (
    <div className="mt-6 space-y-4">
      {followUpHistory.map((followUp) => (
        <div
          key={followUp.id}
          className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-semibold text-amber-400">
                {followUp.follow_up_type || "Follow-Up"}
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {followUp.follow_up_notes || "No notes entered."}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-semibold text-slate-200">
                {followUp.follow_up_date || "No date entered"}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-emerald-400">
                Completed
              </p>
            </div>
          </div>

          <p className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-500">
            Completed:{" "}
            {followUp.completed_at
              ? new Date(followUp.completed_at).toLocaleString()
              : "Completion time unavailable"}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
      <p className="text-sm text-slate-500">
        No completed follow-ups yet.
      </p>
    </div>
  )}
</section>
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Notes
          </p>

          <p className="mt-4 whitespace-pre-wrap text-slate-300">
            {church.notes || "No notes have been entered yet."}
          </p>
        </section>
      </div>
    </AppShell>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-slate-200">
        {value || "Not entered"}
      </p>
    </div>
  );
}