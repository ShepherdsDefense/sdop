import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { updateTask } from "../../actions";

type EditTaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTaskPage({
  params,
}: EditTaskPageProps) {
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
  const updateTaskWithId = updateTask.bind(null, id);

  return (
    <AppShell active="tasks">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/tasks/${id}`}
          className="text-sm font-semibold text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Task
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold text-amber-400">Operations</p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Edit Task
          </h1>

          <p className="mt-2 text-slate-400">
            Update task details, assignment, priority, category, and contact
            information.
          </p>
          <form
  action={updateTaskWithId}
  className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
>
  <div>
    <label className="mb-2 block text-sm font-medium">
      Task Title *
    </label>

    <input
      name="title"
      required
      defaultValue={task.title}
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Description
    </label>

    <textarea
      name="description"
      rows={4}
      defaultValue={task.description || ""}
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Category
    </label>

    <select
      name="category"
      defaultValue={task.category || ""}
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    >
      <option value="">Select a category</option>
      <option value="Church">Church</option>
      <option value="Partnership">Partnership</option>
      <option value="Training">Training</option>
      <option value="Outreach">Outreach</option>
      <option value="Follow-Up">Follow-Up</option>
      <option value="Administrative">Administrative</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Contact
    </label>

    <input
      name="contact"
      type="text"
      defaultValue={task.contact || ""}
      placeholder="Name, phone number, or email"
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    />
  </div>

  <div className="grid gap-6 sm:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-medium">
        Due Date
      </label>

      <input
        name="due_date"
        type="date"
        defaultValue={task.due_date || ""}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium">
        Priority
      </label>

      <select
        name="priority"
        defaultValue={task.priority || "Medium"}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
    </div>
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Assigned To
    </label>

    <input
      name="assigned_to_email"
      type="email"
      defaultValue={task.assigned_to_email || ""}
      placeholder="Email address"
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
    />
  </div>

  <div className="flex justify-end gap-3 border-t border-slate-800 pt-6">
    <Link
      href={`/tasks/${id}`}
      className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
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
      </div>
    </AppShell>
  );
}