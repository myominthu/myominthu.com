import { NextResponse, type NextRequest } from "next/server";

// Sends a Telegram alert for each consented visit: page, city/country, referrer, device.
// Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel. The visitor's IP is never sent.

const ALLOWED_ORIGINS = ["https://myominthu.com", "https://www.myominthu.com"];
const BOT_UA = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor/i;

// Simple per-instance rate limit: max 10 alerts per IP per minute.
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    if (hits.size > 5000) hits.clear();
    return false;
  }
  h.n += 1;
  return h.n > 10;
}

function device(ua: string) {
  const type = /mobile|iphone|android/i.test(ua) ? "Mobile" : /ipad|tablet/i.test(ua) ? "Tablet" : "Desktop";
  const os = /windows/i.test(ua)
    ? "Windows"
    : /iphone|ipad|ios/i.test(ua)
      ? "iOS"
      : /android/i.test(ua)
        ? "Android"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Other OS";
  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /opr\/|opera/i.test(ua)
      ? "Opera"
      : /chrome|crios/i.test(ua)
        ? "Chrome"
        : /firefox|fxios/i.test(ua)
          ? "Firefox"
          : /safari/i.test(ua)
            ? "Safari"
            : "Other browser";
  return `${type} · ${os} · ${browser}`;
}

type VpnInfo = { line: string };

// VPN/proxy lookup via proxycheck.io (v3). PROXYCHECK_API_KEY is optional:
// 100 checks/day without a key, 1,000/day with a free key.
async function checkVpn(ip: string): Promise<VpnInfo | null> {
  if (!ip) return null;
  const key = process.env.PROXYCHECK_API_KEY;
  try {
    const res = await fetch(
      `https://proxycheck.io/v3/${encodeURIComponent(ip)}${key ? `?key=${encodeURIComponent(key)}` : ""}`,
      { signal: AbortSignal.timeout(2500), cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.status !== "ok" && json?.status !== "warning") return null;
    const r = json[ip] ?? {};
    const d = r.detections ?? {};
    const operator: string = r.operator?.name ?? "";

    // v3 uses booleans under "detections"; fall back to v2-style fields if present.
    const kinds: string[] = [];
    if (d.vpn === true) kinds.push("VPN");
    if (d.tor === true) kinds.push("Tor");
    if (d.proxy === true) kinds.push("Proxy");
    if (d.hosting === true && kinds.length === 0) kinds.push("Hosting/Data centre");
    if (kinds.length === 0 && r.proxy === "yes") kinds.push(r.type || "Proxy");

    const line = kinds.length
      ? `⚠️ Yes · ${kinds.join(", ")}${operator ? ` (${operator})` : ""}`
      : "✅ No";
    return { line };
  } catch {
    return null; // timeout or service down: still send the alert
  }
}

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, "").slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId || process.env.VERCEL_ENV !== "production") {
    return new NextResponse(null, { status: 204 });
  }

  const origin = req.headers.get("origin") ?? "";
  const ua = req.headers.get("user-agent") ?? "";
  if (!ALLOWED_ORIGINS.includes(origin) || BOT_UA.test(ua)) {
    return new NextResponse(null, { status: 204 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (limited(ip)) return new NextResponse(null, { status: 429 });

  let body: { path?: unknown; referrer?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const path = clean(body.path, 120);
  if (!path.startsWith("/")) return new NextResponse(null, { status: 400 });

  let referrer = "Direct / unknown";
  const ref = clean(body.referrer, 300);
  if (ref) {
    try {
      const u = new URL(ref);
      if (!ALLOWED_ORIGINS.includes(u.origin)) referrer = u.hostname;
      else referrer = "Internal";
    } catch {
      /* ignore malformed referrer */
    }
  }

  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "") || "Unknown city";
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  let countryName = country || "Unknown country";
  try {
    if (country) countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(country) ?? country;
  } catch {
    /* keep the code */
  }
  const vpn = await checkVpn(ip);
  const time = new Date().toLocaleString("en-GB", { timeZone: "Asia/Yangon", hour12: false });

  const text = [
    "🌐 New visit on myominthu.com",
    `📄 Page: ${path}`,
    `📍 From: ${city}, ${countryName}`,
    `🔗 Referrer: ${referrer}`,
    `🛡 VPN/Proxy: ${vpn ? vpn.line : "Unknown"}`,
    `💻 Device: ${device(ua)}`,
    `🕒 ${time} (Yangon)`,
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
  } catch {
    /* alert failure must never affect the visitor */
  }
  return new NextResponse(null, { status: 204 });
}
