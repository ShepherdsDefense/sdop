import Link from "next/link";
import CompleteFollowUpButton from "@/components/CompleteFollowUpButton";
import SetNextFollowUpButton from "@/components/SetNextFollowUpButton";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";

export default async function FollowUpsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: followUps, error } = await supabase
    .from("churches")
    .select(
      "id, church_name, city, county, priority, follow_up_date, follow_up_type, follow_up_notes, follow_up_completed"
    )
    .eq("follow_up_completed", false)
    .not("follow_up_date", "is", null)
    .order("follow_up_date", { ascending: true });

  if (error) {
    console.error("Error loading follow-ups:", error);
  }

  const openFollowUps = followUps ?? [];

  const overdue = openFollowUps.filter(
    (church) =>
      church.follow_up_date &&
      church.follow_up_date < today
  );

  const dueToday = openFollowUps.filter(
    (church) =>
      church.follow_up_date === today
  );

  const upcoming = openFollowUps.filter(
    (church) =>
      church.follow_up_date &&
      church.follow_up_date > today
  );

  return (
    <AppShell active="dashboard">
      <div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-amber-400">
            Church Outreach
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
            Follow-Ups
          </h2>

          <p className="mt-2 text-slate-400">
            Keep track of churches that need your attention.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Overdue"
            value={overdue.length}
          />

          <StatCard
            label="Due Today"
            value={dueToday.length}
          />

          <StatCard
            label="Upcoming"
            value={upcoming.length}
          />
        </div>

        <FollowUpSection
          title="Overdue"
          description="These follow-ups need attention."
          churches={overdue}
        />

        <FollowUpSection
          title="Due Today"
          description="Follow-ups scheduled for today."
          churches={dueToday}
        />

        <FollowUpSection
          title="Upcoming"
          description="Scheduled follow-ups coming next."
          churches={upcoming}
        />
      </div>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-amber-400">
        {value}
      </p>
    </article>
  );
}

function FollowUpSection({
  title,
  description,
  churches,
}: {
  title: string;
  description: string;
  churches: any[];
}) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-5">
        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {churches.length > 0 ? (
        <div className="divide-y divide-slate-800">
          {churches.map((church) => (
            <div
  key={church.id}
  className="p-5 transition hover:bg-slate-800/50"
>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Link
  href={`/churches/${church.id}`}
  className="transition hover:text-amber-400"
>
  <h4 className="text-lg font-bold">
    {church.church_name}
  </h4>
</Link>

                  <p className="mt-1 text-sm text-slate-500">
                    {[church.city, church.county]
                      .filter(Boolean)
                      .join(", ") || "Location not entered"}
                  </p>

                  <p className="mt-3 font-semibold text-amber-400">
                    {church.follow_up_type || "Follow-Up"}
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {church.follow_up_notes ||
                      "No follow-up notes entered."}
                  </p>
                </div>

             <div className="flex flex-col gap-3 sm:items-end sm:text-right">
  <div>
    <p className="font-semibold">
      {church.follow_up_date}
    </p>

    <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
      {church.priority ?? "Medium"} Priority
    </p>
    <CompleteFollowUpButton
    churchId={church.id}
  />
  <SetNextFollowUpButton
  churchId={church.id}
/>
  </div>

</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-sm text-slate-500">
          Nothing here right now.
        </div>
      )}
    </section>
  );
}