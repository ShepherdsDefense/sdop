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
export async function completePartnershipFollowUp(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get the current follow-up before marking it complete
  const { data: partnership, error: partnershipError } = await supabase
    .from("partnerships")
    .select(
      "id, follow_up_date, follow_up_type, follow_up_notes"
    )
    .eq("id", id)
    .single();

  if (partnershipError || !partnership) {
    console.error(
      "Error loading partnership follow-up:",
      partnershipError
    );
    throw new Error("Unable to load partnership follow-up.");
  }

  // Save the completed follow-up permanently in history
  const { error: historyError } = await supabase
    .from("partnership_follow_up_history")
    .insert({
      partnership_id: id,
      follow_up_date: partnership.follow_up_date,
      follow_up_type: partnership.follow_up_type,
      follow_up_notes: partnership.follow_up_notes,
      completed_by_user_id: user.id,
      completed_by_email: user.email ?? null,
    });

  if (historyError) {
    console.error(
      "Error saving partnership follow-up history:",
      historyError
    );
    throw new Error(
      "Unable to save partnership follow-up history."
    );
  }

  // Mark the current partnership follow-up completed
  const { error: updateError } = await supabase
    .from("partnerships")
    .update({
      follow_up_completed: true,
    })
    .eq("id", id);

  if (updateError) {
    console.error(
      "Error completing partnership follow-up:",
      updateError
    );
    throw new Error("Unable to complete partnership follow-up.");
  }

  revalidatePath("/follow-ups");
  revalidatePath("/dashboard");
  revalidatePath("/partnerships");
  revalidatePath(`/partnerships/${id}`);
}