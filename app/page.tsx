import Link from "next/link";
import AuthBranding from "@/components/AuthBranding";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">
        <AuthBranding />

        <div className="mt-10">
          <Link
            href="/login"
            className="block w-full rounded-xl bg-amber-400 px-5 py-3 text-center text-lg font-bold text-slate-950 transition hover:bg-amber-300"
          >
            Enter SDOP
          </Link>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-5 text-center">
          <p className="text-xs text-slate-500">
            Version 0.3 Alpha
          </p>

          <p className="mt-2 text-xs text-slate-600">
            © 2026 Shepherds Defense Group
          </p>
        </div>
      </section>
    </main>
  );
}