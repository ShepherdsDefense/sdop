import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";

type TaskDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskDetailsPage({
  params,
}: TaskDetailsPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !task) {
    notFound();
  }

  return (
    <AppShell active="tasks">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/tasks"
          className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Tasks
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-400">
                Task Details
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight">
                {task.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {task.description || "No description entered"}
              </p>
            </div>

            <div className="flex items-center gap-3">
  <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                task.status === "Completed"
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-amber-400/10 text-amber-400"
              }`}
            >
              {task.status}
            </span>
            <Link
  href={`/tasks/${id}/edit`}
  className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
>
  Edit Task
</Link>
</div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Due Date
              </p>
              <p className="mt-2 font-semibold text-slate-200">
                {task.due_date || "No due date"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Priority
              </p>
              <p className="mt-2 font-semibold text-slate-200">
                {task.priority} Priority
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Assigned To
              </p>
              <p className="mt-2 font-semibold text-slate-200">
                {task.assigned_to_email || "Unassigned"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Created By
              </p>
              <p className="mt-2 font-semibold text-slate-200">
                {task.created_by_email || "User not recorded"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
    Category
  </p>
  <p className="mt-2 font-semibold text-slate-200">
    {task.category || "No category"}
  </p>
</div>

<div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
    Contact
  </p>
  <p className="mt-2 font-semibold text-slate-200">
    {task.contact || "No contact"}
  </p>
</div>

          {task.status === "Completed" && (
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="text-sm font-bold text-emerald-400">
                Completion Information
              </p>

              <p className="mt-2 text-sm text-slate-300">
                Completed:{" "}
                {task.completed_at
                  ? new Date(task.completed_at).toLocaleString()
                  : "Completion time unavailable"}
              </p>

              <p className="mt-1 text-sm text-slate-300">
                Completed by:{" "}
                {task.completed_by_email || "User not recorded"}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}