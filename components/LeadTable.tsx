"use client";
import { useMemo, useState } from "react";
import { Checkbox, Download, Upload } from "lucide-react";
import { Lead } from "@lib/types";
import { scoreLead } from "@lib/scoring";
import ScoreBadge from "@components/ScoreBadge";
import { leadsToCSV, parseCSV } from "@lib/csv";

export default function LeadTable({ leads, onChange, onSelect }: { leads: Lead[]; onChange: (leads: Lead[]) => void; onSelect?: (ids: string[]) => void; }) {
  const [selected, setSelected] = useState<string[]>([]);

  const sorted = useMemo(() => {
    return [...leads].sort((a, b) => scoreLead(b).total - scoreLead(a).total);
  }, [leads]);

  function toggle(id: string) {
    const next = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
    setSelected(next);
    onSelect?.(next);
  }

  function remove(id: string) {
    onChange(leads.filter(l => l.id !== id));
  }

  function exportCSV() {
    const csv = leadsToCSV(sorted);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nodi-leads.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function importCSV(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const partials = parseCSV(text);
        const toAdd: Lead[] = partials.filter(p => p.brandName).map(p => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
          brandName: p.brandName!,
          industry: (p.industry as any) ?? "Other",
          location: (p.location as any) ?? "Other",
          instagram: p.instagram,
          website: p.website,
          followers: p.followers,
          postingFrequencyPerWeek: p.postingFrequencyPerWeek,
          designQuality: p.designQuality,
          videoFocus: p.videoFocus,
          budgetTier: p.budgetTier as any,
          notes: p.notes,
          createdAt: Date.now(),
        }));
        onChange([...leads, ...toAdd]);
      } catch {
        alert("Failed to import CSV");
      }
    };
    reader.readAsText(file);
    ev.currentTarget.value = "";
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-zinc-600">{sorted.length} leads</div>
        <div className="flex items-center gap-2">
          <label className="btn btn-outline cursor-pointer">
            <Upload size={16} /> Import CSV
            <input type="file" className="hidden" accept="text/csv" onChange={importCSV} />
          </label>
          <button className="btn btn-primary" onClick={exportCSV}><Download size={16} /> Export CSV</button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-2">Select</th>
              <th className="py-2 px-2">Brand</th>
              <th className="py-2 px-2">Industry</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Instagram</th>
              <th className="py-2 px-2">Followers</th>
              <th className="py-2 px-2">Posts/Wk</th>
              <th className="py-2 px-2">Score</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(l => (
              <tr key={l.id} className="border-b last:border-0">
                <td className="py-2 px-2">
                  <input type="checkbox" checked={selected.includes(l.id)} onChange={()=>toggle(l.id)} />
                </td>
                <td className="py-2 px-2">
                  <div className="font-semibold">{l.brandName}</div>
                  <div className="text-xs text-zinc-500 line-clamp-1 max-w-[300px]">{l.notes}</div>
                </td>
                <td className="py-2 px-2">{l.industry}</td>
                <td className="py-2 px-2">{l.location}</td>
                <td className="py-2 px-2">
                  {l.instagram ? (<a className="text-[var(--accent)] hover:underline" href={`https://instagram.com/${l.instagram.replace(/^@/, '')}`} target="_blank">{l.instagram}</a>) : <span className="text-zinc-400">?</span>}
                </td>
                <td className="py-2 px-2">{typeof l.followers === 'number' ? l.followers.toLocaleString() : '?'}</td>
                <td className="py-2 px-2">{l.postingFrequencyPerWeek ?? '?'}</td>
                <td className="py-2 px-2"><ScoreBadge lead={l} /></td>
                <td className="py-2 px-2">
                  <button className="text-xs text-red-600 hover:underline" onClick={()=>remove(l.id)}>Remove</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td className="py-8 text-center text-zinc-500" colSpan={9}>No leads yet. Add some above or import CSV.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
