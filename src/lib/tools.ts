export type ToolItem = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: "Generator" | "Utility" | "Design & Fun";
};

export const tools: ToolItem[] = [
  {
    slug: "random-name-picker",
    name: "Random Name Picker",
    description: "Add names and pick a winner instantly.",
    icon: "🎯",
    category: "Generator",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Create secure random passwords with custom options.",
    icon: "🔐",
    category: "Generator",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate downloadable QR codes for links or text.",
    icon: "▣",
    category: "Generator",
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate one or many random numbers by range.",
    icon: "🎲",
    category: "Generator",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight, temperature, and more.",
    icon: "⚖️",
    category: "Utility",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images directly in your browser.",
    icon: "🖼️",
    category: "Utility",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Prettify, validate, and minify JSON quickly.",
    icon: "{}",
    category: "Utility",
  },
  {
    slug: "text-tools",
    name: "Text Tools",
    description: "Case conversion and word count utilities.",
    icon: "Aa",
    category: "Utility",
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors between HEX/RGB/HSL.",
    icon: "🎨",
    category: "Design & Fun",
  },
  {
    slug: "spin-wheel",
    name: "Spin Wheel",
    description: "Decision maker wheel for choices and giveaways.",
    icon: "🌀",
    category: "Design & Fun",
  },
];

export const toolMap = Object.fromEntries(tools.map((tool) => [tool.slug, tool]));
