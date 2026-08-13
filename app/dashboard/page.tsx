import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";

const tasks = [
  "Call Grace Life Church",
  "Send follow-up email to G-Code",
  "Prepare City Light training proposal",
  "Confirm range availability",
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { count: churchCount, error: churchCountError } = await supabase
    .from("churches")
    .select("*", { count: "exact", head: true });

  if (churchCountError) {
    console.error("Error counting churches:", churchCountError);
  }
const today = new Date().toISOString().split("T")[0];

const { count: followUpCount, error: followUpCountError } = await supabase
  .from("churches")
  .select("*", { count: "exact", head: true })
  .eq("follow_up_completed", false)
  .lte("follow_up_date", today);

if (followUpCountError) {
  console.error("Error counting follow-ups:", followUpCountError);
}
  const statistics = [
    {
      label: "Church Prospects",
      value: String(churchCount ?? 0),
      detail: "Live from Church CRM",
    },
    {
  label: "Follow-Ups Due",
  value: String(followUpCount ?? 0),
  detail: "Open follow-ups due",
},
    {
      label: "Meetings",
      value: "2",
      detail: "Scheduled this week",
    },
    {
      label: "Active Partners",
      value: "4",
      detail: "Churches and vendors",
    },
  ];
  return (
    <AppShell active="dashboard">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/60 p-6 shadow-xl shadow-black/10">
  <p className="text-sm font-semibold text-amber-400">
    Welcome back
  </p>

  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
    Welcome to SDOP
  </h2>

  <p className="mt-3 max-w-2xl text-slate-400">
    Your command center for Shepherds Defense operations.
  </p>

  <p className="mt-4 text-sm text-slate-500">
    Signed in as {user.email}
  </p>
</div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => (
          <article
            key={statistic.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-slate-700"
          >
            <p className="text-sm font-medium text-slate-400">
              {statistic.label}
            </p>

            <p className="mt-3 text-4xl font-bold tracking-tight text-amber-400">
              {statistic.value}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {statistic.detail}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Operations
              </p>

              <h3 className="mt-1 text-xl font-bold">
                Tasks Due
              </h3>
            </div>

            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-400">
              {tasks.length} open
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {tasks.map((task) => (
              <label
                key={task}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-amber-400"
                />

                <span className="text-sm text-slate-200">
                  {task}
                </span>
              </label>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Schedule
          </p>

          <h3 className="mt-1 text-xl font-bold">
            Upcoming Activity
          </h3>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="font-semibold text-amber-400">
                Church Outreach Meeting
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Thursday · 10:00 AM
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="font-semibold text-amber-400">
                Falling Steel Competition
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Saturday
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="font-semibold text-amber-400">
                Partnership Follow-Up
              </p>

              <p className="mt-1 text-sm text-slate-500">
                G-Code Holsters
              </p>
            </div>
          </div>
        </article>
      </div>
    </AppShell>
  );
}