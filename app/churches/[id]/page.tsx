import Link from "next/link";

type ChurchProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ChurchProfilePage({
  params,
}: ChurchProfilePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-4xl font-black text-amber-400">
        Church Profile Test
      </h1>

      <p className="mt-6 text-xl">
        Church ID:
      </p>

      <p className="mt-2 break-all text-slate-300">
        {id}
      </p>

      <Link
        href="/churches"
        className="mt-8 inline-block text-amber-400"
      >
        ← Back to Churches
      </Link>
    </main>
  );
}