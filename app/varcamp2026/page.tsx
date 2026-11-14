import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";
import "./deck.css";
import SlideDeck from "@/components/SlideDeck";
import { varcampSlides } from "@/lib/varcamp-slides";

const title = "From Yangon to the World Stage - BarCamp Yangon 2026 - Myo Min Thu @ DJ";
const description =
  "Slides from Myo Min Thu's BarCamp Yangon 2026 talk: how to start robotics and AI engineering, free simulators and AI tools, and Myanmar's road to the World Robot Olympiad International Final.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/varcamp2026" },
  openGraph: {
    title,
    description,
    url: "https://myominthu.com/varcamp2026",
    siteName: "Myo Min Thu @ DJ",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default async function Varcamp2026() {
  // Render per request so Next.js scripts carry the CSP nonce.
  await headers();

  return (
    <main id="main" className="vc-page">
      <h1 className="vc-sr">From Yangon to the World Stage: BarCamp Yangon 2026 slides</h1>
      <SlideDeck slides={varcampSlides} />
    </main>
  );
}
