import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8">
        <h1 className="text-center text-3xl font-bold text-yellow-400">
          SDOP Login
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Shepherds Defense Operations Portal
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block">
              Email address
            </label>

            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block">
              Password
            </label>

            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 px-4 py-3 font-bold text-black"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-yellow-400">
            ← Return home
          </Link>
        </div>
      </section>
    </main>
  );
}