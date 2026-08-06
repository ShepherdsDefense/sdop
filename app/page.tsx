import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-6xl font-bold text-yellow-400">
          🛡 Shepherds Defense
        </h1>

        <h2 className="text-3xl mt-3">
          Operations Portal
        </h2>

        <p className="mt-6 text-gray-400 text-lg">
          Equipping Those Who Protect What Matters Most
        </p>

        <Link
  href="/login"
  className="mt-10 inline-block rounded-xl bg-yellow-500 px-8 py-4 text-xl font-bold text-black transition hover:bg-yellow-400"
>
  Login
</Link>

        <p className="mt-12 text-sm text-gray-500">
          Version 0.1
        </p>

      </div>
    </main>
  );
}