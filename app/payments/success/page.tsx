// app/payment/success/page.tsx

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#111] text-gray-100 px-6 md:px-12 py-20">
      <section className="max-w-3xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Payment Status
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Payment Successful ✅
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Thank you for supporting <span className="font-semibold text-white">Plexdi Studio</span>.
            Your payment has been received and your commission is now{" "}
            <span className="font-medium text-white">in the queue</span>.
          </p>
        </div>

        {/* INFO CARD */}
        <div className="bg-[#1a1a1a] border border-gray-800 shadow-lg rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            What happens next?
          </h2>
          <ul className="space-y-3 text-gray-300 text-sm md:text-base">
            <li>
              • You’ll receive an email shortly with a summary of your commission details.
            </li>
            <li>
              • I’ll review your request and, if needed, reach out on{" "}
              <span className="font-medium text-white">Discord</span> for clarifications.
            </li>
            <li>
              • Once everything is clear, I’ll start working on your design and keep you updated.
            </li>
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-gray-900 font-semibold text-sm md:text-base hover:bg-gray-200 transition"
          >
            Back to Home
          </a>

          <a
            href="/commissions"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-gray-700 text-gray-200 text-sm md:text-base hover:border-gray-500 hover:bg-[#181818] transition"
          >
            Submit another commission
          </a>
        </div>

        {/* FOOTNOTE */}
        <p className="text-xs text-gray-500 pt-4">
          If you think something went wrong with your payment, please contact support via email or Discord with your details.
        </p>
      </section>
    </main>
  );
}
