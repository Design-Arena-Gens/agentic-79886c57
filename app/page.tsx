import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Next?Gen Animation for Premium Brands
          </h1>
          <p className="text-zinc-600 text-lg">
            Nodi Verse blends AI and human artistry to craft cinematic brand visuals,
            animated ads, and storytelling content. Minimal. Premium. Futuristic.
          </p>
          <div className="flex gap-3">
            <Link href="/leads" className="btn btn-primary">
              Start Lead Research <ArrowRight size={18} />
            </Link>
            <a href="/leads/pitch" className="btn btn-outline">Pitch Generator</a>
          </div>
        </div>
        <div className="card">
          <div className="aspect-video rounded-lg bg-black grid place-items-center text-white">
            <div className="text-center">
              <div className="text-[var(--accent)] font-semibold mb-2">Nodi Verse</div>
              <div className="text-2xl font-bold">AI x Animation Studio</div>
              <div className="text-xs opacity-75 mt-2">White ? Red ? Black</div>
            </div>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {["Cinematic Ads","Brand Identity Videos","Futuristic Visuals"].map((k) => (
          <div key={k} className="card">
            <div className="text-sm text-[var(--accent)] font-semibold">Capability</div>
            <div className="text-xl font-bold mt-1">{k}</div>
            <p className="text-sm text-zinc-600 mt-2">
              Designed for modern brands that value design, storytelling, and visual excellence.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
