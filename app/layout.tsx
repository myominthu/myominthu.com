import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const description =
  "Myo Min Thu @ DJ, Director of Information Technology & Cyber Security at ILBC. 19 years of IT experience in international schools, supporting companies in Myanmar, Thailand and Singapore with IT and cybersecurity. EdTech and robotics.";

export const metadata: Metadata = {
  metadataBase: new URL("https://myominthu.com"),
  title: "Myo Min Thu @ DJ - Director of Information Technology & Cyber Security",
  description,
  openGraph: {
    title: "Myo Min Thu @ DJ - Director of Information Technology & Cyber Security",
    description,
    url: "https://myominthu.com",
    siteName: "Myo Min Thu @ DJ",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
