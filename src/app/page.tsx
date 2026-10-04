import Link from "next/link";
import { APP_NAME } from "@/constants";

export default function Home() {
  return (
    <section className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold">{APP_NAME}</h1>
      <p className="text-gray-500">A simple Next.js CRUD starter.</p>
      <Link href="/items" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
        View Items
      </Link>
    </section>
  );
}
