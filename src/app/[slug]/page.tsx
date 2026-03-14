import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ToolPageShell } from "@/components/tool-page-shell";
import { ToolRenderer } from "@/components/tool-renderer";
import { toolMap, tools } from "@/lib/tools";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolMap[slug];

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "This tool does not exist.",
    };
  }

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: `/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} | QuickToolsHub`,
      description: tool.description,
      url: `https://quicktoolshub.com/${tool.slug}`,
      siteName: "QuickToolsHub",
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = toolMap[slug];

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-4 pt-6 sm:px-6">
        <Link href="/" className="text-sm text-slate-300 hover:text-white">
          ← Back to all tools
        </Link>
      </div>
      <ToolPageShell title={tool.name} description={tool.description}>
        <ToolRenderer slug={tool.slug} />
      </ToolPageShell>
    </>
  );
}
