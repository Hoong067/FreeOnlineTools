export type ToolItem = {
  slug: string;
  name: string;
  description: string;
  category: "Generator" | "Utility" | "Design & Fun";
};

export const tools: ToolItem[] = [
  {
    slug: "random-name-picker",
    name: "Random Name Picker",
    description: "Add names and pick a winner instantly.",
    category: "Generator",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Create secure random passwords with custom options.",
    category: "Generator",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate downloadable QR codes for links or text.",
    category: "Generator",
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate one or many random numbers by range.",
    category: "Generator",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight, temperature, and more.",
    category: "Utility",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images directly in your browser.",
    category: "Utility",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Prettify, validate, and minify JSON quickly.",
    category: "Utility",
  },
  {
    slug: "text-tools",
    name: "Text Tools",
    description: "Case conversion and word count utilities.",
    category: "Utility",
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors between HEX/RGB/HSL.",
    category: "Design & Fun",
  },
  {
    slug: "spin-wheel",
    name: "Spin Wheel",
    description: "Decision maker wheel for choices and giveaways.",
    category: "Design & Fun",
  },
];

export const toolMap = Object.fromEntries(tools.map((tool) => [tool.slug, tool]));
