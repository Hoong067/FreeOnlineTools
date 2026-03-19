import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for FreeOnlineTools.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
      <div className="mt-6 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p>
          FreeOnlineTools provides online utilities that run in your browser. We do not
          require account signup to use our tools.
        </p>
        <p>
          We may use third-party services such as Google Analytics and Google AdSense
          to understand traffic and display ads. These services may use cookies or similar
          technologies according to their own policies.
        </p>
        <p>
          You can disable cookies in your browser settings. Continued use of this website
          means you agree to this policy.
        </p>
        <p>
          If you have questions, contact us at: inotecresources0303@gmail.com
        </p>
      </div>
    </div>
  );
}
