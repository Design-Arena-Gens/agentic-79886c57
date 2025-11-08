"use client";
import { useId, useState } from "react";
import { BudgetTier, Industry, Lead, Location } from "@lib/types";

export default function LeadForm({ onSubmit }: { onSubmit: (lead: Lead) => void }) {
  const [form, setForm] = useState<Partial<Lead>>({ industry: "Fashion", location: "India", budgetTier: "Mid" });
  const id = useId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.brandName || !form.industry || !form.location) return;
    const lead: Lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      brandName: form.brandName!,
      industry: form.industry as Industry,
      location: form.location as Location,
      instagram: form.instagram?.trim() || undefined,
      website: form.website?.trim() || undefined,
      followers: parseOptionalNumber(form.followers),
      postingFrequencyPerWeek: parseOptionalNumber(form.postingFrequencyPerWeek),
      designQuality: parseOptionalNumber(form.designQuality),
      videoFocus: parseOptionalNumber(form.videoFocus),
      budgetTier: form.budgetTier as BudgetTier,
      notes: form.notes?.trim() || undefined,
      createdAt: Date.now(),
    };
    onSubmit(lead);
    setForm({ industry: form.industry, location: form.location, budgetTier: form.budgetTier });
  }

  return (
    <form onSubmit={handleSubmit} className="card grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <label className="label">Brand name</label>
        <input className="input" placeholder="e.g., Aster Labs" value={form.brandName ?? ''} onChange={e=>setForm(f=>({...f, brandName: e.target.value}))} />
      </div>
      <div>
        <label className="label">Industry</label>
        <select className="select" value={form.industry as any} onChange={e=>setForm(f=>({...f, industry: e.target.value as Industry}))}>
          {(["Fashion","Tech","F&B","Lifestyle","Beauty","Entertainment","Other"] as const).map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Location</label>
        <select className="select" value={form.location as any} onChange={e=>setForm(f=>({...f, location: e.target.value as Location}))}>
          {(["India","UAE","UK","USA","Other"] as const).map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <div>
        <label className="label">Instagram handle</label>
        <input className="input" placeholder="@brand" value={form.instagram ?? ''} onChange={e=>setForm(f=>({...f, instagram: e.target.value}))} />
      </div>
      <div>
        <label className="label">Website</label>
        <input className="input" placeholder="https://..." value={form.website ?? ''} onChange={e=>setForm(f=>({...f, website: e.target.value}))} />
      </div>
      <div>
        <label className="label">Followers (IG)</label>
        <input className="input" type="number" placeholder="50000" value={form.followers ?? ''} onChange={e=>setForm(f=>({...f, followers: e.target.value as any}))} />
      </div>

      <div>
        <label className="label">Posts per week</label>
        <input className="input" type="number" placeholder="3" value={form.postingFrequencyPerWeek ?? ''} onChange={e=>setForm(f=>({...f, postingFrequencyPerWeek: e.target.value as any}))} />
      </div>
      <div>
        <label className="label">Design quality (1-5)</label>
        <input className="input" type="number" min={1} max={5} placeholder="4" value={form.designQuality ?? ''} onChange={e=>setForm(f=>({...f, designQuality: e.target.value as any}))} />
      </div>
      <div>
        <label className="label">Video focus (1-5)</label>
        <input className="input" type="number" min={1} max={5} placeholder="4" value={form.videoFocus ?? ''} onChange={e=>setForm(f=>({...f, videoFocus: e.target.value as any}))} />
      </div>

      <div>
        <label className="label">Budget tier</label>
        <select className="select" value={form.budgetTier as any} onChange={e=>setForm(f=>({...f, budgetTier: e.target.value as any}))}>
          {(["Low","Mid","High"] as const).map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label">Notes</label>
        <textarea className="textarea" rows={2} placeholder="Observations, style notes, campaign ideas..." value={form.notes ?? ''} onChange={e=>setForm(f=>({...f, notes: e.target.value}))} />
      </div>

      <div className="md:col-span-3 flex justify-end">
        <button className="btn btn-primary" type="submit">Add Lead</button>
      </div>
    </form>
  );
}

function parseOptionalNumber(v: any): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
