import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

const description =
  "Myo Min Thu (DJ), IT Director in charge of Cyber Security for three international schools in Myanmar, Thailand and Singapore. 19 years in IT, EdTech and robotics.";

export const metadata: Metadata = {
  metadataBase: new URL("https://myominthu.com"),
  title: "Myo Min Thu, IT Director and Cyber Security",
  description,
  openGraph: {
    title: "Myo Min Thu, IT Director and Cyber Security",
    description,
    url: "https://myominthu.com",
    siteName: "Myo Min Thu",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#6340D8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
