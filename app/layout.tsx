import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nodi Verse | Lead Research",
  description: "Find premium, visually-driven brands aligned with Nodi Verse.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-zinc-200">
          <div className="container-max flex items-center justify-between py-4">
            <Link href="/" className="font-bold text-xl tracking-tight">
              <span className="text-[var(--accent)]">Nodi</span> Verse
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/leads" className="hover:text-[var(--accent)]">Leads</Link>
              <Link href="/leads/pitch" className="hover:text-[var(--accent)]">Pitch</Link>
              <a href="https://nodiverse.example" target="_blank" className="hover:text-[var(--accent)]">Studio</a>
            </nav>
          </div>
        </header>
        <main className="container-max py-8 min-h-[calc(100vh-160px)]">{children}</main>
        <footer className="border-t border-zinc-200">
          <div className="container-max py-6 text-xs text-zinc-500 flex items-center justify-between">
            <p>? {new Date().getFullYear()} Nodi Verse</p>
            <p>AI + Human Artistry</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
