"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createTask(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title")?.toString().trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  const assignedToEmail =
    formData.get("assigned_to_email")?.toString().trim() || null;

    const category =
  formData.get("category")?.toString().trim() || null;

const contact =
  formData.get("contact")?.toString().trim() || null;

const { error } = await supabase.from("tasks").insert({
    title,
    description:
      formData.get("description")?.toString() || null,
      category,
      contact,
    due_date:
      formData.get("due_date")?.toString() || null,
    priority:
      formData.get("priority")?.toString() || "Medium",
    status: "Open",

    assigned_to_email: assignedToEmail,

    created_by_user_id: user.id,
    created_by_email: user.email ?? null,
  });

  if (error) {
    console.error("Error creating task:", error);
    throw new Error("Unable to create task.");
  }

  revalidatePath("/tasks");
  revalidatePath("/dashboard");

  redirect("/tasks");
}

export async function completeTask(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      status: "Completed",
      completed_at: new Date().toISOString(),
      completed_by_user_id: user.id,
      completed_by_email: user.email ?? null,
    })
    .eq("id", id);

  if (error) {
    console.error("Error completing task:", error);
    throw new Error("Unable to complete task.");
  }

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}
export async function updateTask(id: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title")?.toString().trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  const category =
    formData.get("category")?.toString().trim() || null;

  const contact =
    formData.get("contact")?.toString().trim() || null;

  const assignedToEmail =
    formData.get("assigned_to_email")?.toString().trim() || null;

  const { error } = await supabase
    .from("tasks")
    .update({
      title,
      description:
        formData.get("description")?.toString().trim() || null,
      category,
      contact,
      due_date:
        formData.get("due_date")?.toString() || null,
      priority:
        formData.get("priority")?.toString() || "Medium",
      assigned_to_email: assignedToEmail,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating task:", error);
    throw new Error("Unable to update task.");
  }

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);

  redirect(`/tasks/${id}`);
}