import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import CompleteTaskButton from "@/components/CompleteTaskButton";

export default async function TasksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("status", { ascending: true })
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("Error loading tasks:", error);
  }

  return (
    <AppShell active="tasks">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-400">
            Operations
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
            Tasks
          </h2>

          <p className="mt-2 text-slate-400">
            Track operational tasks, assignments, priorities, and due dates.
          </p>
        </div>

        <Link
          href="/tasks/new"
          className="rounded-xl bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-300"
        >
          Add Task
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {tasks && tasks.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-5 transition hover:bg-slate-800/40"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {task.description || "No description entered"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                        {task.priority} Priority
                      </span>

                      <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
                        {task.status}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Due
                    </p>

                    <p className="mt-1 text-sm text-slate-200">
                      {task.due_date || "No due date"}
                    </p>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Assigned To
                    </p>

                    {task.status === "Open" && (
  <div className="mt-4">
    <CompleteTaskButton taskId={task.id} />
  </div>
)}

                    <p className="mt-1 text-sm text-slate-300">
                      {task.assigned_to_email || "Unassigned"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <h3 className="font-bold">
              No tasks yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add your first SDOP task to get started.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}