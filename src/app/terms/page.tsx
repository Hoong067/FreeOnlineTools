import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for FreeOnlineTools.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-white">Terms and Conditions</h1>
      <div className="mt-6 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p>
          By using FreeOnlineTools, you agree to use the website lawfully and responsibly.
        </p>
        <p>
          All tools are provided &quot;as is&quot; without warranties of any kind. We are not liable
          for any losses or damages arising from use of this website.
        </p>
        <p>
          We may update these terms at any time. Continued use of the website means you
          accept the latest version.
        </p>
        <p>
          For questions about these terms, contact: inotecresources0303@gmail.com
        </p>
      </div>
    </div>
  );
}
