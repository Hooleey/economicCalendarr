const DEFAULT_API_BASE = "http://127.0.0.1:8000";
const API_BASE = (import.meta.env?.VITE_API_BASE || DEFAULT_API_BASE).replace(/\/+$/, "");

function apiUrl(path) {
  const p = String(path || "");
  if (!p.startsWith("/")) return `${API_BASE}/${p}`;
  return `${API_BASE}${p}`;
}

export async function fetchEvents(filters = {}, options = {}) {
  const params = new URLSearchParams();

  if (filters.country) params.set("country", filters.country);
  if (filters.regulator) params.set("regulator", filters.regulator);
  if (filters.importance) params.set("importance", filters.importance);
  if (options.autoRefresh !== undefined) {
    params.set("auto_refresh", String(Boolean(options.autoRefresh)));
  }

  const url = `${apiUrl("/events")}${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function refreshEvents() {
  const res = await fetch(apiUrl("/events/refresh"), { method: "POST" });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to refresh events");
  }
  return res.json();
}

export async function fetchEventDescription(eventId, lang) {
  const params = new URLSearchParams();
  if (lang) params.set("lang", lang);
  const url = `${apiUrl(`/events/${eventId}/description`)}${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch event description");
  return res.json();
}
