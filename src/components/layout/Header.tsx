import Link from "next/link";
import { APP_NAME } from "@/constants";
import { DbStatus } from "./DbStatus";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-gray-900 hover:text-indigo-600 transition-colors duration-300">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            href="/items" 
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Items
          </Link>
          <Link 
            href="/items/new" 
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              New Item
            </span>
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <div className="hidden sm:block">
            <DbStatus />
          </div>
        </div>
      </nav>
    </header>
  );
}
