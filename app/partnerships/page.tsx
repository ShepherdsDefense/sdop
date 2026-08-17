import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";

export default async function PartnershipsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: partnerships, error } = await supabase
    .from("partnerships")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading partnerships:", error);
  }

  return (
    <AppShell active="partnerships">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-400">
            Relationship Management
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
            Partnerships
          </h2>

          <p className="mt-2 text-slate-400">
            Track businesses, vendors, ranges, and organizations connected to Shepherds Defense.
          </p>
        </div>

        <Link
          href="/partnerships/new"
          className="rounded-xl bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-300"
        >
          Add Partnership
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {partnerships && partnerships.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {partnerships.map((partnership) => (
              <Link
                key={partnership.id}
                href={`/partnerships/${partnership.id}`}
                className="block p-5 transition hover:bg-slate-800/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      {partnership.organization_name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {partnership.organization_type || "Organization type not entered"}
                    </p>

                    <p className="mt-3 text-sm text-slate-300">
                      {[partnership.city, partnership.county]
                        .filter(Boolean)
                        .join(", ") || "Location not entered"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-400">
                      {partnership.status}
                    </span>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                      {partnership.priority} Priority
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <h3 className="font-bold">
              No partnerships yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add your first business, vendor, range, or organization.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}