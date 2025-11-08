"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadLeads } from "@lib/storage";
import { Lead } from "@lib/types";
import { scoreLead } from "@lib/scoring";

function generatePitch(lead: Lead) {
  const s = scoreLead(lead);
  return (
`Subject: Nodi Verse x ${lead.brandName} ? Cinematic Animated Campaign

Hi ${lead.brandName} team,

We?re Nodi Verse ? a next?gen creative animation studio combining AI and human artistry to craft cinematic brand visuals and animated ads.

Why we reached out:
- Industry: ${lead.industry} | Location: ${lead.location}
- Activity: ${lead.postingFrequencyPerWeek ?? '?'}/week | Audience: ${typeof lead.followers === 'number' ? lead.followers.toLocaleString() : '?'} IG followers
- Creative fit: ${s.fit} (${s.total}/100)

What we can build for ${lead.brandName}:
1) 12?20s cinematic animated ad for performance + social (IG Reels/Stories)
2) Brand identity motion system: title cards, animated logo, product micro?moments
3) Mini storytelling spots (3x): narrative sequences highlighting product benefits

Style: Minimal, premium, futuristic (white/red/black)
Timeline: 2?3 weeks | Delivery: ready?to?ship formats for IG/YouTube/paid

If this aligns, we can share a quick moodboard + a lightweight storyboard this week.

Best,
Nodi Verse
AI x Human Artistry
https://agentic-79886c57.vercel.app
`);
}

export default function PitchPage() {
  const params = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => { setLeads(loadLeads()); }, []);
  useEffect(() => {
    const ids = (params.get("ids") ?? "").split(",").filter(Boolean);
    const sels = leads.filter(l => ids.includes(l.id));
    setSelected(sels);
    if (sels.length === 1) setContent(generatePitch(sels[0]));
    else if (sels.length > 1) setContent(sels.map(generatePitch).join("\n\n---\n\n"));
  }, [params, leads]);

  function copy() {
    navigator.clipboard.writeText(content);
  }

  function download() {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `nodi-pitch-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-extrabold">Pitch Generator</h1>
        <p className="text-sm text-zinc-600">Template?based outreach tailored by lead attributes</p>
      </div>
      <div className="flex gap-2 justify-end">
        <button className="btn btn-outline" onClick={copy}>Copy</button>
        <button className="btn btn-primary" onClick={download}>Download</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <textarea className="textarea w-full" rows={22} value={content} onChange={e=>setContent(e.target.value)} />
        </div>
        <div className="card text-sm">
          <div className="font-semibold mb-2">Selected leads</div>
          <ul className="space-y-2">
            {selected.map(l => (
              <li key={l.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{l.brandName}</div>
                  <div className="text-xs text-zinc-500">{l.industry} ? {l.location}</div>
                </div>
                <div className="text-xs text-zinc-500">{scoreLead(l).total}</div>
              </li>
            ))}
            {selected.length === 0 && <li className="text-zinc-500">No leads selected</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
