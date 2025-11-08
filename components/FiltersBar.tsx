"use client";
import { Industry, Location } from "@lib/types";

export interface Filters {
  q: string;
  industry: Industry | "All";
  location: Location | "All";
  fit: "All" | "Strong" | "Good" | "Neutral" | "Weak";
}

export default function FiltersBar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void; }) {
  return (
    <div className="card">
      <div className="grid md:grid-cols-5 gap-3">
        <div className="md:col-span-2">
          <label className="label">Search</label>
          <input className="input" placeholder="Brand, handle, notes..." value={filters.q} onChange={e => onChange({ ...filters, q: e.target.value })} />
        </div>
        <div>
          <label className="label">Industry</label>
          <select className="select" value={filters.industry} onChange={e => onChange({ ...filters, industry: e.target.value as any })}>
            {(["All","Fashion","Tech","F&B","Lifestyle","Beauty","Entertainment","Other"] as const).map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Location</label>
          <select className="select" value={filters.location} onChange={e => onChange({ ...filters, location: e.target.value as any })}>
            {(["All","India","UAE","UK","USA","Other"] as const).map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Fit</label>
          <select className="select" value={filters.fit} onChange={e => onChange({ ...filters, fit: e.target.value as any })}>
            {(["All","Strong","Good","Neutral","Weak"] as const).map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
