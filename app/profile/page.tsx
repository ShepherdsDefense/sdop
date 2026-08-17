import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { saveMyProfile } from "@/app/churches/actions";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, email")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <AppShell active="profile">
      <div className="mx-auto max-w-2xl">
        <div>
          <p className="text-sm font-semibold text-amber-400">
            Account
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-tight">
            My Profile
          </h2>

          <p className="mt-2 text-slate-400">
            Set the name SDOP should use when recording activity.
          </p>
        </div>

        <form
          action={saveMyProfile}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Display Name
            </label>

            <input
              name="display_name"
              required
              defaultValue={profile?.display_name ?? ""}
              placeholder="Emily"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              value={profile?.email ?? user.email ?? ""}
              disabled
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </AppShell>
  );
}