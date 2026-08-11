import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";

export default async function ChurchesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: churches, error } = await supabase
    .from("churches")
    .select("*")
    .order("church_name", { ascending: true });

  if (error) {
    console.error("Error loading churches:", error);
  }

  return (
    <AppShell active="churches">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-400">
            Church Outreach
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight">
            Church CRM
          </h2>

          <p className="mt-2 text-slate-400">
            Manage church prospects, relationships, and follow-ups.
          </p>
        </div>

        <a
          href="/churches/new"
          className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
        >
          + Add Church
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Total Churches
          </p>

          <p className="mt-2 text-4xl font-black text-amber-400">
            {churches?.length ?? 0}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Active Prospects
          </p>

          <p className="mt-2 text-4xl font-black text-amber-400">
            {churches?.filter((church) => church.status !== "Partner").length ??
              0}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Partners
          </p>

          <p className="mt-2 text-4xl font-black text-amber-400">
            {churches?.filter((church) => church.status === "Partner").length ??
              0}
          </p>
        </article>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-4">
          <input
            type="search"
            placeholder="Search churches..."
            className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400"
          />
        </div>

        {!churches || churches.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-semibold">
              No churches yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Add your first church prospect to begin building the SDOP pipeline.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Church</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Priority</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {churches.map((church) => (
                    <tr
                      key={church.id}
                      className="transition hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-4 font-semibold">
                        {church.church_name}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {[church.city, church.county]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {church.phone || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
                          {church.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {church.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-800 md:hidden">
              {churches.map((church) => (
                <article key={church.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">
  <Link
  href={`/churches/${church.id}`}
  className="transition hover:text-amber-400"
>
  {church.church_name}
</Link>
</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {[church.city, church.county]
                          .filter(Boolean)
                          .join(", ") || "Location not entered"}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
                      {church.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-400">
                    {church.phone || "No phone entered"}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </AppShell>
  );
}