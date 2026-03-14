import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online Tools",
  description:
    "Use free online tools including random picker, password generator, QR code generator, unit converter, image compressor, and more.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const grouped = {
    generators: tools.filter((tool) => tool.category === "Generator"),
    utilities: tools.filter((tool) => tool.category === "Utility"),
    fun: tools.filter((tool) => tool.category === "Design & Fun"),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          All the useful online tools in one place
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Free, fast, SEO-friendly tools with dedicated pages like /random-name-picker,
          /password-generator, and /qr-code-generator.
        </p>
      </section>

      <AdSlot slot="4444444444" label="Homepage Top Ad" className="my-6" />

      <div className="space-y-8">
        <ToolGroup title="Generators" items={grouped.generators} />
        <ToolGroup title="Utilities" items={grouped.utilities} />
        <ToolGroup title="Design & Fun" items={grouped.fun} />
      </div>

      <AdSlot slot="5555555555" label="Homepage Bottom Ad" className="my-8" />

      <footer className="border-t border-slate-800 pt-6 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} QuickToolsHub</p>
        <p className="mt-1">All tools run in your browser. No signup required.</p>
      </footer>
    </div>
  );
}

function ToolGroup({ title, items }: { title: string; items: (typeof tools)[number][] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-indigo-500/60 hover:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-white">{tool.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
