"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Tab = "overview" | "commissions" | "products";

type Commission = {
  id: string;
  name: string;
  email: string;
  discord: string;
  details: string;
  type: string;
  status: string;
  createdAt: string;
  designers: string | null | undefined;
};

const mockProducts = [
  {
    id: "P-001",
    title: "Banners",
    price: 25,
    status: "Published",
  },
  {
    id: "P-002",
    title: "Youtube Thumbnail",
    price: 15,
    status: "Published",
  },
  {
    id: "P-003",
    title: "Profile Picture",
    price: 24,
    status: "Published",
  },
  {
    id: "P-004",
    title: "Twitch Emotes",
    price: 30,
    status: "Published",
  },
  {
    id: "P-005",
    title: "Logos",
    price: 40,
    status: "Published",
  },
  {
    id: "P-006",
    title: "Stream / Creator Packs",
    price: 60,
    status: "Published",
  },
];

function prettifyLabel(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/* ------------------------------------------------------------------ */
/* 1) SHELL: only handles token check + gating                         */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const expected = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    if (!expected) {
      console.error("Admin token missing in environment variables.");
      window.location.href = "/adminsLogin";
      return;
    }

    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("adminToken")
        : null;

    if (!stored || stored !== expected) {
      localStorage.removeItem("adminToken");
      window.location.href = "/adminsLogin";
      return;
    }

    setAllowed(true);
    setChecking(false);
  }, []);

  if (checking) return null;
  if (!allowed) return null;

  // Once allowed is true, render the real admin content
  return <AdminContent />;
}

/* ------------------------------------------------------------------ */
/* 2) CONTENT: all the actual admin UI + data fetching                 */
/* ------------------------------------------------------------------ */

function AdminContent() {
  const [tab, setTab] = useState<Tab>("overview");
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchCommissions = async () => {
    try {
      setFetchError(null);
      setLoading(true);
      console.log("[AdminPage] fetchCommissions: starting request");

      const res = await fetch("https://backend-8qjc.onrender.com/commissions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      console.log(
        `[AdminPage] fetchCommissions: response status ${res.status}`
      );

      let data: any = null;
      try {
        data = await res.json();
        console.log("[AdminPage] fetchCommissions: parsed data", data);
      } catch (parseErr) {
        console.error(
          "[AdminPage] fetchCommissions: failed to parse JSON",
          parseErr
        );
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) {
        const msg = data?.message || `Server error: ${res.status}`;
        toast.error(msg);
        setFetchError(msg);
        throw new Error(msg);
      }

      const mapped: Commission[] = Array.isArray(data)
        ? data.map((raw: any) => ({
            id: String(raw.id),
            name: raw.name,
            email: raw.email,
            discord: raw.discord,
            details: raw.details,
            type: prettifyLabel(raw.type), // "banner" -> "Banner"
            status: prettifyLabel(raw.status), // "in_progress" -> "In Progress"
            createdAt: raw.created_at,
            designers: raw.designers,
          }))
        : [];

      setCommissions(mapped);
      console.log(
        "[AdminPage] fetchCommissions: commissions set, count =",
        mapped.length
      );
      toast.success("Commissions updated");
    } catch (err: any) {
      console.error("[AdminPage] fetchCommissions: Error:", err);
      const msg = err?.message || "Failed to load commissions";
      setFetchError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateCommissionStatus = async (id: string, uiStatus: string) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: uiStatus } : c))
    );

    let backendStatus = uiStatus;
    if (uiStatus === "Completed") backendStatus = "completed";
    if (uiStatus === "In Progress") backendStatus = "in_progress";
    if (uiStatus === "Queued") backendStatus = "queued";

    try {
      await fetch(`https://backend-8qjc.onrender.com/commissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: backendStatus }),
      });
      toast.success("Status updated");
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status (offline)");
    }
  };

  const deleteCommission = async (id: string) => {
    setCommissions((prev) => prev.filter((c) => c.id !== id));

    try {
      await fetch(`https://backend-8qjc.onrender.com/commissions/${id}`, {
        method: "DELETE",
      });
      toast.success("Commission deleted");
    } catch (err) {
      console.error("Failed to delete commission", err);
      toast.error("Failed to delete commission (offline)");
    }
  };

  const createCommission = async (payload: {
    name: string;
    email?: string;
    discord?: string;
    type?: string;
    details?: string;
  }) => {
    const optimisticId = `tmp-${Date.now()}`;
    const now = new Date().toISOString().split("T")[0];
    const optimisticItem: Commission = {
      id: optimisticId,
      name: payload.name,
      email: payload.email || "",
      discord: payload.discord || "",
      details: payload.details || "",
      type: payload.type ? prettifyLabel(payload.type) : "General",
      status: "Queued",
      createdAt: now,
      designers: null,
    };

    setCommissions((prev) => [optimisticItem, ...prev]);

    try {
      const backendBody = {
        name: payload.name,
        email: payload.email,
        discord: payload.discord,
        details: payload.details,
        type: payload.type || "general",
        status: "queued",
      };

      const res = await fetch("https://backend-8qjc.onrender.com/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendBody),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.message || `Server error: ${res?.status || "unknown"}`
        );
      }

      const created: Commission = {
        id: String(data.id ?? data._id ?? optimisticId),
        name: data.name ?? optimisticItem.name,
        email: data.email ?? optimisticItem.email,
        discord: data.discord ?? optimisticItem.discord,
        details: data.details ?? optimisticItem.details,
        type: prettifyLabel(data.type ?? backendBody.type),
        status: prettifyLabel(data.status ?? "queued"),
        createdAt: data.created_at ?? data.createdAt ?? now,
        designers: data.designers ?? null,
      };

      setCommissions((prev) =>
        prev.map((c) => (c.id === optimisticId ? created : c))
      );
      toast.success("Commission created");
    } catch (err: any) {
      console.error("createCommission failed", err);
      toast.error("Failed to create commission");
      setCommissions((prev) => prev.filter((c) => c.id !== optimisticId));
    }
  };

  // fetch on mount
  useEffect(() => {
    fetchCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-[#111] text-gray-100 px-6 md:px-12 py-16">
      <section className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white">
              Admin Panel
            </h1>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Internal view for managing commissions and shop products. This is
              a local-only admin panel for now — token-based access and backend
              integration can be wired in later.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-gray-700 bg-[#181818] px-3 py-1 text-xs text-gray-400">
            Plexdi Studio • Internal
          </span>
        </header>

        {/* fetch error banner */}
        {fetchError && (
          <div className="rounded-md border border-red-600/40 bg-red-600/5 px-4 py-2 text-sm text-red-300">
            Error loading commissions: {fetchError}. Check the browser console
            for details.
          </div>
        )}

        {/* Tabs */}
        <nav className="flex gap-2 rounded-full bg-[#181818] border border-gray-800 p-1 w-full sm:w-auto">
          <TabButton label="Overview" value="overview" tab={tab} setTab={setTab} />
          <TabButton
            label="Commissions"
            value="commissions"
            tab={tab}
            setTab={setTab}
          />
          <TabButton label="Products" value="products" tab={tab} setTab={setTab} />
        </nav>

        {/* Content */}
        {tab === "overview" && <OverviewSection commissions={commissions} />}
        {tab === "commissions" && (
          <CommissionsSection
            commissions={commissions}
            onRefresh={fetchCommissions}
            loading={loading}
            onUpdateStatus={updateCommissionStatus}
            onDelete={deleteCommission}
            onCreateCommission={createCommission}
          />
        )}
        {tab === "products" && <ProductsSection />}
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* CHILD COMPONENTS (unchanged logic)                                 */
/* ------------------------------------------------------------------ */

function TabButton({
  label,
  value,
  tab,
  setTab,
}: {
  label: string;
  value: Tab;
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  const active = tab === value;
  return (
    <button
      type="button"
      onClick={() => setTab(value)}
      className={`flex-1 sm:flex-none rounded-full px-4 py-1.5 text-sm transition ${
        active
          ? "bg-white text-black font-medium"
          : "text-gray-400 hover:text-gray-100 hover:bg-[#222]"
      }`}
    >
      {label}
    </button>
  );
}

function OverviewSection({ commissions }: { commissions: Commission[] }) {
  const totalCommissions = commissions.length;
  const queued = commissions.filter((c) => c.status === "Queued").length;
  const inProgress = commissions.filter((c) => c.status === "In Progress")
    .length;
  const completed = commissions.filter((c) => c.status === "Completed").length;

  return (
    <section className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Commissions" value={totalCommissions.toString()} />
        <StatCard label="Queued" value={queued.toString()} accent="yellow" />
        <StatCard
          label="In Progress"
          value={inProgress.toString()}
          accent="blue"
        />
        <StatCard label="Completed" value={completed.toString()} accent="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">
          <h2 className="text-base font-semibold text-white mb-3">
            Latest Commissions
          </h2>
          <div className="space-y-3">
            {commissions.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="flex items-start justify-between rounded-xl border border-gray-800 bg-[#121212] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {c.name}{" "}
                    <span className="text-xs text-gray-500">• {c.type}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {c.discord} • {c.createdAt}
                  </p>
                </div>
                <StatusPill status={c.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">
          <h2 className="text-base font-semibold text-white mb-3">
            Quick Notes
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            This panel is currently using mock data by default. Use the Refresh
            button in the Commissions tab to pull real data from your backend
            once it’s wired up.
          </p>
          <p className="mt-3 text-xs text-gray-500">
            You can also extend this later with:
          </p>
          <ul className="mt-1 text-xs text-gray-400 space-y-1 list-disc list-inside">
            <li>Token-based login (stored in localStorage)</li>
            <li>Status updates for each commission</li>
            <li>Editable product list for the shop</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function CommissionsSection({
  commissions,
  onRefresh,
  loading,
  onUpdateStatus,
  onDelete,
  onCreateCommission,
}: {
  commissions: Commission[];
  onRefresh: () => void;
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onCreateCommission?: (payload: {
    name: string;
    email?: string;
    discord?: string;
    type?: string;
    details?: string;
  }) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [type, setType] = useState("banner");
  const [details, setDetails] = useState("");

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    await onCreateCommission?.({ name, email, discord, type, details });
    setName("");
    setEmail("");
    setDiscord("");
    setType("banner");
    setDetails("");
    setShowForm(false);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-white">Commissions</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowForm((s) => !s)}
              className="rounded-lg bg-white text-black text-xs font-medium px-3 py-1 hover:bg-gray-200 transition"
            >
              {showForm ? "Cancel" : "+ New Commission"}
            </button>
          </div>
          <span className="text-xs text-gray-500">
            Showing {commissions.length} requests
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg border border-gray-700 bg-[#121212] px-3 py-1 text-xs text-gray-200 hover:bg-[#222] disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={submit}
          className="rounded-2xl border border-gray-800 bg-[#181818] p-4 space-y-3"
        >
          <div className="grid gap-2 md:grid-cols-3">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client name"
              className="rounded-md bg-[#121212] border border-gray-700 px-2 py-1 text-sm text-gray-100"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="rounded-md bg-[#121212] border border-gray-700 px-2 py-1 text-sm text-gray-100"
            />
            <input
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              placeholder="Discord (optional)"
              className="rounded-md bg-[#121212] border border-gray-700 px-2 py-1 text-sm text-gray-100"
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-md bg-[#121212] border border-gray-700 px-2 py-1 text-sm text-gray-100"
            >
              <option value="banner">Banner</option>
              <option value="emotes">Emotes</option>
              <option value="logo">Logo</option>
              <option value="thumbnail">Thumbnail</option>
            </select>
            <input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Short details (optional)"
              className="rounded-md bg-[#121212] border border-gray-700 px-2 py-1 text-sm text-gray-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-gray-700 px-3 py-1 text-xs text-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#181818]">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-xs uppercase text-gray-500">
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Discord</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Actions</th>
              <th className="px-4 py-3 text-left">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.id} className="border-t border-gray-800/70">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-white">{c.name}</span>
                    <span className="text-[11px] text-gray-500">{c.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-200">{c.type}</td>
                <td className="px-4 py-3 text-gray-300">{c.discord}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <select
                      aria-label={`Change status for ${c.id}`}
                      value={c.status}
                      onChange={(e) => onUpdateStatus(c.id, e.target.value)}
                      className="rounded-md bg-[#121212] border border-gray-700 text-xs px-2 py-1 text-gray-100"
                    >
                      <option value="Queued">Queued</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <StatusPill status={c.status} />
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {c.createdAt}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onDelete(c.id)}
                    className="rounded-lg border border-red-600/50 bg-red-600/10 px-3 py-1 text-xs text-red-300 hover:bg-red-600/20"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {c.designers || "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-white">Shop Products</h2>
        <button
          type="button"
          className="rounded-lg bg-white text-black text-xs font-medium px-3 py-1 hover:bg-gray-200 transition"
        >
          + New Product (future)
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-gray-800 bg-[#181818] px-4 py-4 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{p.title}</p>
                <p className="text-xs text-gray-500 mt-1">{p.id}</p>
              </div>
              <span className="text-sm font-semibold text-gray-100">
                £{p.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <ProductStatus status={p.status} />
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-700 bg-[#121212] px-3 py-1 text-xs text-gray-200 hover:bg-[#222]">
                  Edit
                </button>
                <button className="rounded-lg border border-red-600/50 bg-red-600/10 px-3 py-1 text-xs text-red-300 hover:bg-red-600/20">
                  Disable
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "yellow" | "blue" | "green";
}) {
  const accentColor =
    accent === "yellow"
      ? "bg-yellow-500/20 text-yellow-300"
      : accent === "blue"
      ? "bg-blue-500/20 text-blue-300"
      : accent === "green"
      ? "bg-emerald-500/20 text-emerald-300"
      : "bg-gray-500/20 text-gray-300";

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] px-4 py-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <span
        className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-[11px] ${accentColor}`}
      >
        Admin metric
      </span>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  let color = "bg-gray-500/20 text-gray-300 border-gray-600/40";

  if (status === "Queued") {
    color = "bg-yellow-500/10 text-yellow-300 border-yellow-500/40";
  } else if (status === "In Progress") {
    color = "bg-blue-500/10 text-blue-300 border-blue-500/40";
  } else if (status === "Completed") {
    color = "bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] ${color}`}
    >
      {status}
    </span>
  );
}

function ProductStatus({ status }: { status: string }) {
  const isPublished = status === "Published";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] ${
        isPublished
          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
          : "bg-gray-500/10 text-gray-300 border-gray-600/40"
      }`}
    >
      {status}
    </span>
  );
}
