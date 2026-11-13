"use client";

import { useEffect, useState } from "react";

// Google Analytics 4 loads only after the visitor accepts cookies.
// The Measurement ID is public; NEXT_PUBLIC_GA_ID in Vercel can override it.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-RJH80B47NX";
// Google Tag Manager container, also loaded only after consent.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WG5JVKVS";
const STORAGE_KEY = "mmt-cookie-consent";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // ask again after 12 months
const OPEN_EVENT = "mmt:open-cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { choice, at } = JSON.parse(raw) as { choice: Choice; at: number };
    if (Date.now() - at > MAX_AGE_MS) return null;
    return choice === "granted" || choice === "denied" ? choice : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }));
  } catch {
    /* storage blocked: the banner will simply show again next visit */
  }
}

let gaLoaded = false;

function loadGA() {
  if (!GA_ID || gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  // Analytics only; advertising signals stay off.
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { allow_google_signals: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  if (GTM_ID) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const g = document.createElement("script");
    g.async = true;
    g.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    // Pass the page's CSP nonce on so GTM Custom HTML tags can use it.
    const nonce = document.querySelector<HTMLScriptElement>("script[nonce]")?.nonce;
    if (nonce) g.nonce = nonce;
    document.head.appendChild(g);
  }
}

// Telegram visit alert (see app/api/visit). Once per page per browser session.
function notifyVisit() {
  try {
    const key = `mmt-visit:${location.pathname}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* storage blocked: still send once for this page load */
  }
  fetch("/api/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: location.pathname, referrer: document.referrer }),
    keepalive: true,
  }).catch(() => {});
}

function clearGACookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      });
    }
  });
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const choice = readChoice();
    if (choice === "granted") {
      loadGA();
      notifyVisit();
    }
    else if (choice === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!GA_ID || !open) return null;

  const accept = () => {
    saveChoice("granted");
    setOpen(false);
    loadGA();
    notifyVisit();
  };

  const reject = () => {
    const wasLoaded = gaLoaded;
    saveChoice("denied");
    setOpen(false);
    clearGACookies();
    if (wasLoaded) location.reload(); // unload GA that is already running
  };

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p className="cookie-text">
        I use Google Analytics cookies to see which pages are useful. They are only set if you
        accept. No advertising, and your data is never sold.{" "}
        <a href="/privacy">Privacy notice</a>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn cookie-btn-ghost" onClick={reject}>
          Reject
        </button>
        <button type="button" className="cookie-btn cookie-btn-primary" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      className="footer-link-btn"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
