// app/payment/cancel/page.tsx

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-[#111] text-gray-100 px-6 md:px-12 py-20">
      <section className="max-w-3xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Payment Status
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Payment Cancelled
          </h1>
          <p className="text-gray-300 leading-relaxed">
            It looks like your payment wasn’t completed.
            Your commission form has been received, but{" "}
            <span className="font-medium text-white">work won’t start until payment is confirmed</span>.
          </p>
        </div>

        {/* INFO CARD */}
        <div className="bg-[#1a1a1a] border border-gray-800 shadow-lg rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            No worries — you have options
          </h2>
          <ul className="space-y-3 text-gray-300 text-sm md:text-base">
            <li>
              • You can safely retry the payment using the checkout link you previously opened.
            </li>
            <li>
              • If you closed everything, feel free to{" "}
              <span className="font-medium text-white">submit a new commission</span> and try again.
            </li>
            <li>
              • If you cancelled on purpose, you can ignore this and nothing will be charged.
            </li>
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/commissions"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-gray-900 font-semibold text-sm md:text-base hover:bg-gray-200 transition"
          >
            Return to commission form
          </a>

          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-gray-700 text-gray-200 text-sm md:text-base hover:border-gray-500 hover:bg-[#181818] transition"
          >
            Back to Home
          </a>
        </div>

        {/* FOOTNOTE */}
        <p className="text-xs text-gray-500 pt-4">
          If you cancelled by mistake or had an issue with Stripe, contact me and I can help you sort it out.
        </p>
      </section>
    </main>
  );
}
