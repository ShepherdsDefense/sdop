"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createPartnership(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const organizationName = formData
    .get("organization_name")
    ?.toString()
    .trim();

  if (!organizationName) {
    throw new Error("Organization name is required.");
  }

  const { error } = await supabase.from("partnerships").insert({
    organization_name: organizationName,
    organization_type:
      formData.get("organization_type")?.toString() || null,
    contact_name:
      formData.get("contact_name")?.toString() || null,
    phone:
      formData.get("phone")?.toString() || null,
    email:
      formData.get("email")?.toString() || null,
    website:
      formData.get("website")?.toString() || null,
    address:
      formData.get("address")?.toString() || null,
    city:
      formData.get("city")?.toString() || null,
    state:
      formData.get("state")?.toString() || null,
    zip_code:
      formData.get("zip_code")?.toString() || null,
    county:
      formData.get("county")?.toString() || null,
    status:
      formData.get("status")?.toString() || "New",
    priority:
      formData.get("priority")?.toString() || "Medium",
      follow_up_date:
  formData.get("follow_up_date")?.toString() || null,

follow_up_type:
  formData.get("follow_up_type")?.toString() || null,

follow_up_notes:
  formData.get("follow_up_notes")?.toString() || null,

follow_up_completed:
  formData.get("follow_up_completed") === "on",
    notes:
      formData.get("notes")?.toString() || null,
  });

  if (error) {
    console.error("Error creating partnership:", error);
    throw new Error("Unable to create partnership.");
  }

  revalidatePath("/partnerships");
  revalidatePath("/dashboard");

  redirect("/partnerships");
}

export async function updatePartnership(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const organizationName = formData
    .get("organization_name")
    ?.toString()
    .trim();

  if (!organizationName) {
    throw new Error("Organization name is required.");
  }

  const { error } = await supabase
    .from("partnerships")
    .update({
      organization_name: organizationName,
      organization_type:
        formData.get("organization_type")?.toString() || null,
      contact_name:
        formData.get("contact_name")?.toString() || null,
      phone:
        formData.get("phone")?.toString() || null,
      email:
        formData.get("email")?.toString() || null,
      website:
        formData.get("website")?.toString() || null,
      address:
        formData.get("address")?.toString() || null,
      city:
        formData.get("city")?.toString() || null,
      state:
        formData.get("state")?.toString() || null,
      zip_code:
        formData.get("zip_code")?.toString() || null,
      county:
        formData.get("county")?.toString() || null,
      status:
        formData.get("status")?.toString() || "New",
      priority:
        formData.get("priority")?.toString() || "Medium",
        follow_up_date:
  formData.get("follow_up_date")?.toString() || null,

follow_up_type:
  formData.get("follow_up_type")?.toString() || null,

follow_up_notes:
  formData.get("follow_up_notes")?.toString() || null,

follow_up_completed:
  formData.get("follow_up_completed") === "on",
      notes:
        formData.get("notes")?.toString() || null,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating partnership:", error);
    throw new Error("Unable to update partnership.");
  }

  revalidatePath("/partnerships");
  revalidatePath(`/partnerships/${id}`);
  revalidatePath("/dashboard");

  redirect(`/partnerships/${id}`);
}