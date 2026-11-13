import type { Metadata } from "next";
import { headers } from "next/headers";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Notice - Myo Min Thu @ DJ",
  description: "How myominthu.com uses cookies and handles visitor data.",
};

const updated = "13 November 2026";

export default async function Privacy() {
  // Render per request so Next.js scripts carry the CSP nonce.
  await headers();

  return (
    <>
      <header className="legal-header">
        <div className="container container-narrow">
          <a href="/" className="legal-back">
            ← myominthu.com
          </a>
        </div>
      </header>

      <main id="main" className="legal">
        <div className="container container-narrow">
          <h1>Privacy Notice</h1>
          <p className="legal-updated">Last updated: {updated}</p>

          <p>
            This is the personal website of Myo Min Thu (&quot;I&quot;, &quot;me&quot;). This notice explains
            what data is collected when you visit myominthu.com, why, and the choices you have. It
            is written with Thailand&apos;s and Singapore&apos;s Personal Data Protection Acts (PDPA)
            and the EU GDPR in mind.
          </p>

          <h2>1. What I collect</h2>
          <ul>
            <li>
              <strong>Analytics (only if you accept cookies).</strong> Google Analytics 4 records the
              pages you view, how long you stay, the site that referred you, your approximate
              location (city or country), and your device, browser and screen size. Google
              Analytics 4 does not log or store full IP addresses.
            </li>
            <li>
              <strong>Hosting logs.</strong> The site is hosted on Vercel, which keeps short-lived
              technical logs (such as IP address, time and requested page) to run and secure the
              service.
            </li>
            <li>
              <strong>Nothing else.</strong> There are no forms, accounts, advertising or social
              media trackers on this site.
            </li>
          </ul>

          <h2>2. Cookies and local storage</h2>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Set by</th>
                  <th>Purpose</th>
                  <th>Expires</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Google Analytics</td>
                  <td>Distinguishes visitors (random ID)</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_&lt;ID&gt;</code>
                  </td>
                  <td>Google Analytics</td>
                  <td>Keeps the current session</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>
                    <code>mmt-cookie-consent</code>
                  </td>
                  <td>This site (local storage)</td>
                  <td>Remembers your Accept or Reject choice</td>
                  <td>12 months</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Analytics cookies are set only after you click <em>Accept</em>. If you click{" "}
            <em>Reject</em>, none are set. You can change your mind at any time:{" "}
            <CookieSettingsButton />
          </p>

          <h2>3. Why I use it</h2>
          <p>
            To understand which content is useful and improve the site. The legal basis is your
            consent, which you can withdraw at any time.
          </p>

          <h2>4. Who receives it</h2>
          <p>
            Google (analytics) and Vercel (hosting) act as service providers and may process data
            outside your country, including in the United States. I do not sell or share your data
            for advertising, and Google signals and ad personalisation are turned off.
          </p>

          <h2>5. How long it is kept</h2>
          <p>Analytics data is kept for up to 14 months, then deleted automatically.</p>

          <h2>6. Your rights</h2>
          <p>
            You may ask to access, correct or delete your data, or object to its use. Since
            analytics data is pseudonymous, the fastest way is to reject cookies and clear your
            browser cookies. If you appear in a photo on this site and would like it removed,
            please contact me.
          </p>

          <h2>7. Security</h2>
          <p>
            The site is served only over HTTPS and uses a strict Content Security Policy and other
            security headers. No personal data is stored on the site itself.
          </p>

          <h2>8. Contact</h2>
          <p>
            For privacy questions or requests, message me on{" "}
            <a href={person.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            .
          </p>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} {person.displayName}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
