'use client';

import { number } from "motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CommissionsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    discord: "",
    type: "",
    tier: "",
    details: "",
    refs: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://plexdistudiobackend-1020b5dfc70b.herokuapp.com/commissions", {
      // const res = await fetch("http://localhost:10000/commissions", {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // If backend returns a message, show it. Otherwise show generic.
        toast.error(data.message || "❌ Something went wrong.");
        throw new Error(`Server error: ${res.status}`);
      }
      const commissionId = data.id;

      // Display backend's message directly
      toast.success(data.message || "Commission submitted!");

      const PaymentRes = await fetch("https://plexdistudiobackend-1020b5dfc70b.herokuapp.com/payments/createCheckoutSession", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item : form.type,
          tier: form.tier,
          amount: 1,
          CommissionID : commissionId
        })
      })

      const paymentData = await PaymentRes.json();
      if (!PaymentRes.ok) {
        toast.error(paymentData.message || "❌ Payment initiation failed.");
        throw new Error(`Payment server error: ${PaymentRes.status}`);
      }
      // Redirect to payment URL
      window.location.href = paymentData.url;

      // Reset
      setForm({
        name: "",
        email: "",
        discord: "",
        type: "",
        tier: "",
        details: "",
        refs: "",
      });

    } catch (err) {
      console.error("Error:", err);
      toast.error("❌ Unable to send commission. Please try again.");
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
              <option value="Banner">Banner Design</option>
              <option value="Logos">Logo Design</option>
              <option value="Thumbnail">YouTube Thumbnail</option>
              <option value="PFP">Profile Picture</option>
              <option value="Twitch Emotes">Twitch Emotes</option>
              <option value="Discord Server Package">Discord Server Package</option>
              <option value="Discord User Profile Package">Discord User Profile Package</option>
              <option value="Social Media Banner Package">Social Media Banner Package</option>
              <option value="Starter Streamer Package">Starter Streamer Package</option>
              <option value="Starter Youtube Package">Starter Youtube Package</option>
              <option value="Streamer Package">Stream / Creator Package</option>
              <option value="custom">Custom Request</option>
            </select>
          </div>
          {(
            form.type === "Discord Server Package" ||
            form.type === "Discord User Profile Package" ||
            form.type === "Social Media Banner Package" ||
            form.type === "Starter Streamer Package" ||
            form.type === "Starter Youtube Package" ||
            form.type === "Streamer Package"
          ) && (
            <div className="text-sm text-gray-400 bg-gray-800 p-3 rounded-lg">
              <p>
                Note: For package commissions, please select the "Standard" tier to ensure all components are included.
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tier</label>
            <select
              name="tier"
              value={form.tier}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
            >
              <option value="">Select type</option>
              <option value="Starter">Starter</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Conditional input: only show when 'banner' is chosen */}
          {form.type === "Banner  " && (
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
      </section>
    </main>
  );
}
