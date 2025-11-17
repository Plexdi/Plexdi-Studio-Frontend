'use client';

import { useState } from "react";
import toast from "react-hot-toast";

export default function CommissionsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    discord: "",
    type: "",
    details: "",
    refs: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend-8qjc.onrender.com/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      console.log("Commission submitted:", data);

  // store response and show popup
  setResponseData(data);
  setShowResponse(true);

      toast.success("✅ Commission sent! I’ll reach out on Discord soon 🎨");
      setForm({ name: "", email: "", discord: "", type: "", details: "", refs: "" });
    } catch (err) {
      console.error("Error:", err);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#111] text-gray-100 px-6 md:px-12 py-20">
      <section className="max-w-4xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Commission Enquiry</h1>
          <p className="text-gray-300 leading-relaxed">
            Looking for a <span className="font-semibold text-white">custom banner, logo, or visual design</span>?
            Fill out the form below with your details and I’ll reach out to discuss your idea.  
            Turnaround time typically ranges between <span className="text-white font-medium">2–5 days</span> depending on complexity.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-6 rounded-2xl space-y-5 shadow-lg border border-gray-800"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
              placeholder="Your name or username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
              placeholder="you@example.com"
            />
          </div>

          {/* Discord Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Discord Username</label>
            <input
              type="text"
              name="discord"
              value={form.discord}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
              placeholder="e.g. plexdi#1234"
            />
          </div>

          {/* Type of Commission */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
            >
              <option value="">Select type</option>
              <option value="banner">Banner Design</option>
              <option value="logo">Logo Design</option>
              <option value="thumbnail">YouTube Thumbnail</option>
              <option value="pfp">Profile Picture</option>
              <option value="emotes">Twitch Emotes</option>
              <option value="custom">Custom Request</option>
            </select>
          </div>
          {/* Conditional input: only show when 'banner' is chosen */}
          {form.type === "banner" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Platform for Banner
              </label>
              <input
                type="text"
                name="platform"
                value={(form as any).platform || ""}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                placeholder="e.g. Twitch, YouTube, Twitter..."
              />
            </div>
          )}
          {/* Project Details */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Details</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400 resize-none"
              placeholder="Describe your idea, color theme, style, etc."
            ></textarea>
          </div>

          {/* Reference Links */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Reference Links (optional)</label>
            <input
              type="text"
              name="refs"
              value={form.refs}
              onChange={handleChange}
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
              placeholder="Paste any links or image references"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Commission Request"}
            </button>
          </div>
        </form>

        {/* JSON response modal */}
        {showResponse && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setShowResponse(false)}
            />

            <div className="relative max-w-3xl w-full bg-[#0b0b0b] border border-gray-700 rounded-xl p-6 shadow-lg text-sm text-gray-100">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">Server response</h3>
                <button
                  onClick={() => setShowResponse(false)}
                  className="text-gray-300 hover:text-white"
                  aria-label="Close response"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 max-h-80 overflow-auto bg-[#060606] p-4 rounded-md border border-gray-800">
                <pre className="whitespace-pre-wrap break-words text-xs">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowResponse(false)}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTNOTE */}
        <div className="text-gray-400 text-sm text-center pt-8">
          <p>
            Payments are currently handled via{" "}
            <span className="text-white font-medium">PayPal</span>.  
          </p>
        </div>
      </section>
    </main>
  );
}
