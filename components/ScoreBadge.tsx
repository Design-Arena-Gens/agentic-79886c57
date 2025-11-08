"use client";
import { Lead } from "@lib/types";
import { scoreLead } from "@lib/scoring";

export default function ScoreBadge({ lead }: { lead: Lead }) {
  const s = scoreLead(lead);
  const color = s.fit === "Strong" ? "bg-green-600" : s.fit === "Good" ? "bg-emerald-500" : s.fit === "Neutral" ? "bg-yellow-500" : "bg-zinc-500";
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full ${color}`}>{s.total}</span>
      <span className="text-xs text-zinc-600">{s.fit}</span>
    </div>
  );
}
