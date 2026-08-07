import { createClient } from "@/lib/supabase/client";
import type { Church } from "@/types/church";

export async function getChurches(): Promise<Church[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("churches")
    .select("*")
    .order("church_name", { ascending: true });

  if (error) {
    console.error("Error loading churches:", error);
    return [];
  }

  return data ?? [];
}