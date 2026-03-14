"use client";

import { useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

type ToolRendererProps = {
  slug: string;
};

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500 transition focus:ring";
const buttonPrimaryClass =
  "rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500";
const buttonGhostClass =
  "rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500";

export function ToolRenderer({ slug }: ToolRendererProps) {
  if (slug === "random-name-picker") return <RandomNamePicker />;
  if (slug === "password-generator") return <PasswordGenerator />;
  if (slug === "qr-code-generator") return <QrCodeGenerator />;
  if (slug === "random-number-generator") return <RandomNumberGenerator />;
  if (slug === "unit-converter") return <UnitConverter />;
  if (slug === "image-compressor") return <ImageCompressor />;
  if (slug === "json-formatter") return <JsonFormatter />;
  if (slug === "text-tools") return <TextTools />;
  if (slug === "color-picker") return <ColorPicker />;
  if (slug === "spin-wheel") return <SpinWheel />;
  return <p className="text-sm text-slate-300">Tool not found.</p>;
}

function RandomNamePicker() {
  const [nameInput, setNameInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState("");

  function addName() {
    if (!nameInput.trim()) return;
    setNames((prev) => [...prev, nameInput.trim()]);
    setNameInput("");
  }

  function pickWinner() {
    if (!names.length) return;
    const selected = names[Math.floor(Math.random() * names.length)];
    setWinner(selected);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className={inputClass}
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addName();
          }}
          placeholder="Enter a name"
        />
        <button className={buttonPrimaryClass} onClick={addName}>
          Add
        </button>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200">
        {names.length ? names.join(", ") : "No names added yet."}
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={buttonPrimaryClass} onClick={pickWinner}>
          Pick Winner
        </button>
        <button className={buttonGhostClass} onClick={() => setNames(["Alice", "Bob", "Charlie", "Diana"])}>
          Add Sample Names
        </button>
        <button
          className={buttonGhostClass}
          onClick={() => {
            setNames([]);
            setWinner("");
          }}
        >
          Clear
        </button>
      </div>
      {winner ? (
        <div className="rounded-xl border border-indigo-500/50 bg-indigo-500/10 p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-indigo-300">Winner</p>
          <p className="mt-1 text-2xl font-semibold text-white">{winner}</p>
        </div>
      ) : null}
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [password, setPassword] = useState("");

  const score = useMemo(() => {
    let value = 0;
    if (length >= 10) value += 1;
    if (length >= 16) value += 1;
    if (includeUpper && includeLower) value += 1;
    if (includeNumber) value += 1;
    if (includeSymbol) value += 1;
    return value;
  }, [length, includeLower, includeNumber, includeSymbol, includeUpper]);

  function generatePassword() {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumber) chars += "0123456789";
    if (includeSymbol) chars += "!@#$%^&*()_+-=[]{}<>?";

    if (!chars) {
      setPassword("Select at least one character set.");
      return;
    }

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const generated = Array.from(arr)
      .map((n) => chars[n % chars.length])
      .join("");
    setPassword(generated);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-slate-300">Length: {length}</label>
        <input
          className="w-full"
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-slate-200">
        <Toggle label="Uppercase" checked={includeUpper} onChange={setIncludeUpper} />
        <Toggle label="Lowercase" checked={includeLower} onChange={setIncludeLower} />
        <Toggle label="Numbers" checked={includeNumber} onChange={setIncludeNumber} />
        <Toggle label="Symbols" checked={includeSymbol} onChange={setIncludeSymbol} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={buttonPrimaryClass} onClick={generatePassword}>
          Generate Password
        </button>
        <button className={buttonGhostClass} onClick={() => navigator.clipboard.writeText(password)}>
          Copy
        </button>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-sm text-emerald-300">
        {password || "Click generate to create a password."}
      </div>
      <p className="text-sm text-slate-300">Strength score: {score}/5</p>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function QrCodeGenerator() {
  const [text, setText] = useState("https://quicktoolshub.com");
  const [size, setSize] = useState(240);
  const [color, setColor] = useState("#111827");
  const [dataUrl, setDataUrl] = useState("");

  async function generate() {
    const url = await QRCode.toDataURL(text || "https://quicktoolshub.com", {
      margin: 1,
      width: size,
      color: { dark: color, light: "#ffffff" },
    });
    setDataUrl(url);
  }

  return (
    <div className="space-y-4">
      <input
        className={inputClass}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter URL or text"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-slate-300">Size</label>
          <select
            className={inputClass}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value={160}>160 px</option>
            <option value={240}>240 px</option>
            <option value={320}>320 px</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">Color</label>
          <input
            className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button className={buttonPrimaryClass} onClick={generate}>
          Generate QR
        </button>
        <button
          className={buttonGhostClass}
          onClick={() => {
            if (!dataUrl) return;
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "qr-code.png";
            a.click();
          }}
        >
          Download
        </button>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        {dataUrl ? (
          <Image
            src={dataUrl}
            alt="Generated QR code"
            width={size}
            height={size}
            unoptimized
            className="mx-auto"
          />
        ) : (
          <p className="text-sm text-slate-300">Generate a QR code to preview it here.</p>
        )}
      </div>
    </div>
  );
}

function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState<string>("—");

  function generate() {
    if (min >= max) {
      setResult("Min must be less than Max.");
      return;
    }
    const safeCount = Math.min(Math.max(count, 1), 50);
    const values = Array.from(
      { length: safeCount },
      () => Math.floor(Math.random() * (max - min + 1)) + min,
    );
    setResult(values.join(", "));
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input className={inputClass} type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} placeholder="Min" />
        <input className={inputClass} type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} placeholder="Max" />
        <input className={inputClass} type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} placeholder="Count" />
      </div>
      <button className={buttonPrimaryClass} onClick={generate}>
        Generate
      </button>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xl font-semibold text-indigo-300">
        {result}
      </div>
    </div>
  );
}

const unitTable = {
  length: {
    units: ["meter", "kilometer", "centimeter", "mile", "foot"],
    base: [1, 1000, 0.01, 1609.344, 0.3048],
  },
  weight: {
    units: ["kilogram", "gram", "pound", "ounce"],
    base: [1, 0.001, 0.453592, 0.0283495],
  },
  temperature: {
    units: ["celsius", "fahrenheit", "kelvin"],
  },
};

function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof unitTable>("length");
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [value, setValue] = useState(1);

  const result = useMemo(() => {
    if (Number.isNaN(value)) return "—";

    if (category === "temperature") {
      return convertTemperature(value, fromIndex, toIndex).toFixed(4);
    }

    const data = unitTable[category] as { units: string[]; base: number[] };
    return ((value * data.base[fromIndex]) / data.base[toIndex]).toFixed(6);
  }, [category, fromIndex, toIndex, value]);

  const units = unitTable[category].units;

  return (
    <div className="space-y-4">
      <select
        className={inputClass}
        value={category}
        onChange={(e) => {
          const next = e.target.value as keyof typeof unitTable;
          setCategory(next);
          setFromIndex(0);
          setToIndex(1);
        }}
      >
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select className={inputClass} value={fromIndex} onChange={(e) => setFromIndex(Number(e.target.value))}>
          {units.map((unit, index) => (
            <option key={unit} value={index}>
              {unit}
            </option>
          ))}
        </select>
        <select className={inputClass} value={toIndex} onChange={(e) => setToIndex(Number(e.target.value))}>
          {units.map((unit, index) => (
            <option key={unit} value={index}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <input
        className={inputClass}
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-lg font-semibold text-indigo-300">
        {result} {units[toIndex]}
      </div>
    </div>
  );
}

function convertTemperature(value: number, fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return value;

  if (fromIndex === 0 && toIndex === 1) return value * (9 / 5) + 32;
  if (fromIndex === 0 && toIndex === 2) return value + 273.15;
  if (fromIndex === 1 && toIndex === 0) return (value - 32) * (5 / 9);
  if (fromIndex === 1 && toIndex === 2) return (value - 32) * (5 / 9) + 273.15;
  if (fromIndex === 2 && toIndex === 0) return value - 273.15;
  if (fromIndex === 2 && toIndex === 1) return (value - 273.15) * (9 / 5) + 32;

  return value;
}

function ImageCompressor() {
  const [quality, setQuality] = useState(80);
  const [sourceInfo, setSourceInfo] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function handleFile(file: File | null) {
    if (!file) return;

    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(bitmap, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", quality / 100);
    });

    if (!blob) return;

    const compressedObjectUrl = URL.createObjectURL(blob);
    setPreviewUrl(compressedObjectUrl);
    setDownloadUrl(compressedObjectUrl);
    setSourceInfo(`Original: ${(file.size / 1024).toFixed(1)} KB`);
    setCompressedSize(`Compressed: ${(blob.size / 1024).toFixed(1)} KB`);
  }

  return (
    <div className="space-y-4">
      <input
        className={inputClass}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      <div>
        <label className="mb-1 block text-sm text-slate-300">Quality: {quality}%</label>
        <input
          className="w-full"
          type="range"
          min={10}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>
      <p className="text-sm text-slate-300">{sourceInfo}</p>
      <p className="text-sm text-emerald-300">{compressedSize}</p>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Compressed preview"
          width={640}
          height={480}
          unoptimized
          className="max-h-64 w-auto rounded-xl"
        />
      ) : null}
      {downloadUrl ? (
        <a className={buttonPrimaryClass} href={downloadUrl} download="compressed.jpg">
          Download Compressed Image
        </a>
      ) : null}
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function format(pretty: boolean) {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, pretty ? 2 : 0));
      setError("");
    } catch (parseError) {
      setError(parseError instanceof Error ? parseError.message : "Invalid JSON");
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className={`${inputClass} min-h-44`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"name": "QuickToolsHub"}'
      />
      <div className="flex flex-wrap gap-2">
        <button className={buttonPrimaryClass} onClick={() => format(true)}>
          Prettify
        </button>
        <button className={buttonGhostClass} onClick={() => format(false)}>
          Minify
        </button>
        <button className={buttonGhostClass} onClick={() => navigator.clipboard.writeText(output)}>
          Copy Output
        </button>
      </div>
      {error ? <p className="text-sm text-rose-300">JSON Error: {error}</p> : null}
      <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-emerald-300">
        {output || "Formatted JSON output will appear here."}
      </pre>
    </div>
  );
}

function TextTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const words = useMemo(() => (input.trim() ? input.trim().split(/\s+/).length : 0), [input]);

  return (
    <div className="space-y-4">
      <textarea
        className={`${inputClass} min-h-40`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste text here"
      />
      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Stat label="Words" value={words.toString()} />
        <Stat label="Characters" value={input.length.toString()} />
        <Stat label="No Spaces" value={input.replace(/\s/g, "").length.toString()} />
        <Stat label="Lines" value={(input ? input.split("\n").length : 0).toString()} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={buttonGhostClass} onClick={() => setOutput(input.toUpperCase())}>
          UPPERCASE
        </button>
        <button className={buttonGhostClass} onClick={() => setOutput(input.toLowerCase())}>
          lowercase
        </button>
        <button className={buttonGhostClass} onClick={() => setOutput(toTitleCase(input))}>
          Title Case
        </button>
        <button className={buttonGhostClass} onClick={() => setOutput(input.replace(/[ \t]+/g, " ").trim())}>
          Remove extra spaces
        </button>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-100">
        {output || "Transformed text appears here."}
      </div>
    </div>
  );
}

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
      <p className="text-lg font-semibold text-indigo-300">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function ColorPicker() {
  const [hex, setHex] = useState("#7c6af5");
  const [saved, setSaved] = useState<string[]>([]);

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="color"
          className="h-16 w-16 rounded-xl border border-slate-700 bg-slate-950"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
        />
        <div className="text-sm text-slate-200">
          <p>HEX: {hex.toUpperCase()}</p>
          <p>
            RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})
          </p>
          <p>
            HSL: hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </p>
        </div>
      </div>
      <button
        className={buttonGhostClass}
        onClick={() => {
          if (saved.includes(hex)) return;
          setSaved((prev) => [hex, ...prev].slice(0, 20));
        }}
      >
        Save Color
      </button>
      <div className="flex flex-wrap gap-2">
        {saved.map((item) => (
          <button
            key={item}
            className="h-8 w-8 rounded-md border border-slate-700"
            style={{ backgroundColor: item }}
            title={item}
            onClick={() => setHex(item)}
          />
        ))}
      </div>
    </div>
  );
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const number = Number.parseInt(value, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rn:
        h = (gn - bn) / delta + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function SpinWheel() {
  const [optionInput, setOptionInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  function addOption() {
    if (!optionInput.trim()) return;
    setOptions((prev) => [...prev, optionInput.trim()]);
    setOptionInput("");
  }

  function spin() {
    if (!options.length || isSpinning) return;

    setIsSpinning(true);
    setResult("Spinning...");

    timeoutRef.current = window.setTimeout(() => {
      const winner = options[Math.floor(Math.random() * options.length)];
      setResult(winner);
      setIsSpinning(false);
    }, 1300);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className={inputClass}
          value={optionInput}
          onChange={(e) => setOptionInput(e.target.value)}
          placeholder="Add an option"
          onKeyDown={(e) => {
            if (e.key === "Enter") addOption();
          }}
        />
        <button className={buttonPrimaryClass} onClick={addOption}>
          Add
        </button>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200">
        {options.length ? options.join(" • ") : "No options yet."}
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={buttonPrimaryClass} onClick={spin} disabled={isSpinning || !options.length}>
          {isSpinning ? "Spinning..." : "Spin Wheel"}
        </button>
        <button className={buttonGhostClass} onClick={() => setOptions(["Yes", "No", "Maybe", "Later"])}>
          Add Sample Options
        </button>
        <button
          className={buttonGhostClass}
          onClick={() => {
            if (timeoutRef.current) {
              window.clearTimeout(timeoutRef.current);
            }
            setOptions([]);
            setResult("");
            setIsSpinning(false);
          }}
        >
          Clear
        </button>
      </div>
      {result ? (
        <div className="rounded-xl border border-indigo-500/50 bg-indigo-500/10 p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-indigo-300">Result</p>
          <p className="mt-1 text-2xl font-semibold text-white">{result}</p>
        </div>
      ) : null}
    </div>
  );
}
