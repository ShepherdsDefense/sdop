"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createChurch(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const churchName = formData.get("church_name")?.toString().trim();

  if (!churchName) {
    throw new Error("Church name is required.");
  }

  const { error } = await supabase.from("churches").insert({
    church_name: churchName,
    denomination: formData.get("denomination")?.toString() || null,
    address: formData.get("address")?.toString() || null,
    city: formData.get("city")?.toString() || null,
    county: formData.get("county")?.toString() || null,
    phone: formData.get("phone")?.toString() || null,
    email: formData.get("email")?.toString() || null,
    website: formData.get("website")?.toString() || null,
    status: formData.get("status")?.toString() || "New",
    priority: formData.get("priority")?.toString() || "Medium",
    notes: formData.get("notes")?.toString() || null,
    follow_up_date: formData.get("follow_up_date")?.toString() || null,
follow_up_type: formData.get("follow_up_type")?.toString() || null,
follow_up_notes: formData.get("follow_up_notes")?.toString() || null,
follow_up_completed: formData.get("follow_up_completed") === "on",
  });

  if (error) {
    console.error("Error creating church:", error);
    throw new Error("Unable to save church.");
  }

  revalidatePath("/churches");
  redirect("/churches");
}

export async function updateChurch(id: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const churchName = formData.get("church_name")?.toString().trim();

  if (!churchName) {
    throw new Error("Church name is required.");
  }

  const { error } = await supabase
    .from("churches")
    .update({
      church_name: churchName,
      denomination: formData.get("denomination")?.toString() || null,
      address: formData.get("address")?.toString() || null,
      city: formData.get("city")?.toString() || null,
      county: formData.get("county")?.toString() || null,
      phone: formData.get("phone")?.toString() || null,
      email: formData.get("email")?.toString() || null,
      website: formData.get("website")?.toString() || null,
      status: formData.get("status")?.toString() || "New",
      priority: formData.get("priority")?.toString() || "Medium",
      notes: formData.get("notes")?.toString() || null,
      follow_up_date: formData.get("follow_up_date")?.toString() || null,
follow_up_type: formData.get("follow_up_type")?.toString() || null,
follow_up_notes: formData.get("follow_up_notes")?.toString() || null,
follow_up_completed: formData.get("follow_up_completed") === "on",
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating church:", error);
    throw new Error("Unable to update church.");
  }

  revalidatePath("/churches");
  revalidatePath(`/churches/${id}`);

  redirect(`/churches/${id}`);
}
export async function deleteChurch(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("churches")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting church:", error);
    throw new Error("Unable to delete church.");
  }

  revalidatePath("/churches");
  revalidatePath("/dashboard");

  redirect("/churches");
}
export async function completeFollowUp(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("churches")
    .update({
      follow_up_completed: true,
    })
    .eq("id", id);

  if (error) {
    console.error("Error completing follow-up:", error);
    throw new Error("Unable to complete follow-up.");
  }

  revalidatePath("/follow-ups");
  revalidatePath("/dashboard");
  revalidatePath(`/churches/${id}`);
}