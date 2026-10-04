import Link from "next/link";
import { APP_NAME } from "@/constants";
import { DbStatus } from "./DbStatus";

export function Header() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/items">Items</Link>
          <Link href="/items/new">New Item</Link>
          <DbStatus />
        </div>
      </nav>
    </header>
  );
}
