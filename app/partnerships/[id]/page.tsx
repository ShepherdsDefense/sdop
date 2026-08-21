import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import SetNextPartnershipFollowUpButton from "@/components/SetNextPartnershipFollowUpButton";

type PartnershipProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PartnershipProfilePage({
  params,
}: PartnershipProfilePageProps) {
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

  if (error) {
    console.error("Partnership profile error:", error);
  }

  if (!partnership) {
    notFound();
  }
const {
  data: partnershipFollowUpHistory,
  error: historyError,
} = await supabase
  .from("partnership_follow_up_history")
  .select(
    "id, follow_up_date, follow_up_type, follow_up_notes, completed_at, completed_by_user_id, completed_by_email"
  )
  .eq("partnership_id", id)
  .order("completed_at", { ascending: false });

if (historyError) {
  console.error(
    "Partnership follow-up history error:",
    historyError
  );
}
const completedByUserIds = [
  ...new Set(
    (partnershipFollowUpHistory ?? [])
      .map((followUp) => followUp.completed_by_user_id)
      .filter((userId): userId is string => Boolean(userId))
  ),
];

const { data: completedByProfiles, error: profilesError } =
  completedByUserIds.length > 0
    ? await supabase
        .from("profiles")
        .select("id, display_name")
        .in("id", completedByUserIds)
    : { data: [], error: null };

if (profilesError) {
  console.error(
    "Partnership completed-by profile error:",
    profilesError
  );
}

const displayNameByUserId = new Map(
  (completedByProfiles ?? []).map((profile) => [
    profile.id,
    profile.display_name,
  ])
);
  return (
    <AppShell active="partnerships">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/partnerships"
          className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Partnerships
        </Link>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-400">
                Partnership Profile
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
                {partnership.organization_name}
              </h2>

              <p className="mt-2 text-slate-400">
                {partnership.organization_type || "Organization type not entered"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-400">
                {partnership.status}
              </span>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                {partnership.priority} Priority
              </span>

              <Link
                href={`/partnerships/${partnership.id}/edit`}
                className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Edit Partnership
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Contact Information
            </p>

            <div className="mt-5 space-y-5">
              <Detail label="Contact Name" value={partnership.contact_name} />
              <Detail label="Phone" value={partnership.phone} />
              <Detail label="Email" value={partnership.email} />
              <Detail label="Website" value={partnership.website} />
            </div>
          </section>
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
        partnership.follow_up_completed
          ? "rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400"
          : "rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-400"
      }
    >
      {partnership.follow_up_completed ? "Completed" : "Open"}
    </span>
  </div>

  {partnership.follow_up_date ||
  partnership.follow_up_type ||
  partnership.follow_up_notes ? (
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <Detail
        label="Follow-Up Date"
        value={partnership.follow_up_date}
      />

      <Detail
        label="Follow-Up Type"
        value={partnership.follow_up_type}
      />

      <div className="sm:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Follow-Up Notes
        </p>

        <p className="mt-1 whitespace-pre-wrap text-slate-200">
          {partnership.follow_up_notes || "No follow-up notes entered"}
        </p>
      </div>
    </div>
  ) : (
    <p className="mt-4 text-slate-400">
      No follow-up is currently scheduled.
    </p>
  )}
  <div className="mt-6">
  <SetNextPartnershipFollowUpButton
    partnershipId={partnership.id}
  />
</div>
</section>
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Location
            </p>

            <div className="mt-5 space-y-5">
              <Detail label="Address" value={partnership.address} />
              <Detail label="City" value={partnership.city} />
              <Detail label="State" value={partnership.state} />
              <Detail label="ZIP Code" value={partnership.zip_code} />
              <Detail label="County" value={partnership.county} />
            </div>
          </section>
        </div>
<section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <div>
    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
      Follow-Up History
    </p>

    <h3 className="mt-1 text-xl font-bold">
      Completed Activity
    </h3>

    <p className="mt-1 text-sm text-slate-400">
      Previous completed follow-ups for this partnership.
    </p>
  </div>

  {partnershipFollowUpHistory &&
  partnershipFollowUpHistory.length > 0 ? (
    <div className="mt-6 space-y-4">
      {partnershipFollowUpHistory.map((followUp) => (
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

          <div className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-500">
            <p>
              Completed:{" "}
              {followUp.completed_at
                ? new Date(followUp.completed_at).toLocaleString()
                : "Completion time unavailable"}
            </p>

            <p className="mt-1">
              Completed by:{" "}
              <span className="text-slate-300">
                {(followUp.completed_by_user_id &&
                  displayNameByUserId.get(
                    followUp.completed_by_user_id
                  )) ||
                  followUp.completed_by_email ||
                  "User not recorded"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
      <p className="text-sm text-slate-500">
        No completed partnership follow-ups yet.
      </p>
    </div>
  )}
</section>
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Notes
          </p>

          <p className="mt-4 whitespace-pre-wrap text-slate-300">
            {partnership.notes || "No notes have been entered yet."}
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