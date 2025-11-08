"use client";
import { useEffect, useMemo, useState } from "react";
import LeadForm from "@components/LeadForm";
import LeadTable from "@components/LeadTable";
import FiltersBar, { Filters } from "@components/FiltersBar";
import { Lead } from "@lib/types";
import { loadLeads, saveLeads } from "@lib/storage";
import { scoreLead } from "@lib/scoring";
import Link from "next/link";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<Filters>({ q: "", industry: "All", location: "All", fit: "All" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => { setLeads(loadLeads()); }, []);
  useEffect(() => { saveLeads(leads); }, [leads]);

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase();
    let arr = leads.filter(l =>
      (!q || `${l.brandName} ${l.instagram ?? ''} ${l.notes ?? ''}`.toLowerCase().includes(q)) &&
      (filters.industry === "All" || l.industry === filters.industry) &&
      (filters.location === "All" || l.location === filters.location)
    );
    if (filters.fit !== "All") {
      arr = arr.filter(l => scoreLead(l).fit === filters.fit);
    }
    return arr;
  }, [leads, filters]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Lead Research</h1>
          <p className="text-sm text-zinc-600">Small to mid-size premium brands (India, UAE, UK, USA)</p>
        </div>
        <Link href="/leads/pitch" className="btn btn-primary">Open Pitch Generator</Link>
      </div>

      <LeadForm onSubmit={(lead) => setLeads(prev => [lead, ...prev])} />
      <FiltersBar filters={filters} onChange={setFilters} />
      <LeadTable leads={filtered} onChange={setLeads} onSelect={setSelectedIds} />

      {selectedIds.length > 0 && (
        <div className="flex justify-end">
          <Link href={`/leads/pitch?ids=${encodeURIComponent(selectedIds.join(","))}`} className="btn btn-outline">Generate pitch for {selectedIds.length} selected</Link>
        </div>
      )}
    </div>
  );
}
