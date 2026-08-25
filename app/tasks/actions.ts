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

  const { error } = await supabase.from("tasks").insert({
    title,
    description:
      formData.get("description")?.toString() || null,
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