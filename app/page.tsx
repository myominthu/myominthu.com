import Image from "next/image";
import { headers } from "next/headers";
import {
  Award,
  Bot,
  BookOpen,
  ChevronDown,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  Laptop,
  Lightbulb,
  Lock,
  Megaphone,
  Monitor,
  School,
  Server,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import WroTrack from "@/components/WroTrack";
import WroGallery from "@/components/WroGallery";
import Briefing from "@/components/Briefing";
import HeroArt from "@/components/HeroArt";
import MobileNav from "@/components/MobileNav";
import {
  person,
  facts,
  roles,
  achievements,
  earlier,
  expertise,
  services,
  education,
  type Role,
} from "@/lib/content";
import portrait from "@/public/images/myo-min-thu-full.webp";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const roleIcon: Record<Role["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  school: School,
  platform: Laptop,
  robot: Bot,
  steam: Wrench,
  megaphone: Megaphone,
};

const serviceIcon: Record<string, typeof ShieldCheck> = {
  managed: Monitor,
  cloud: Cloud,
  lock: Lock,
  code: Code2,
  server: Server,
  idea: Lightbulb,
  school: School,
  users: Users,
  robot: Bot,
};

const eduIcon: Record<string, typeof ShieldCheck> = {
  certs: Award,
  state: Globe,
  degree: GraduationCap,
  teaching: BookOpen,
};

const nav = [
  { href: "#roles", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#robotics", label: "WRO" },
  { href: "#journey", label: "Journey" },
  { href: "#expertise", label: "Expertise" },
  { href: "#services", label: "Services" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.displayName,
  jobTitle: "Director of Information Technology & Cyber Security",
  url: person.website,
  sameAs: [person.linkedin],
  worksFor: { "@type": "Organization", name: "ILBC Holding Company Ltd." },
  address: { "@type": "PostalAddress", addressLocality: "Yangon", addressCountry: "MM" },
};

export default async function Home() {
  // Reading the nonce also makes this page render per request, which the CSP needs.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            Myo Min Thu <span className="brand-at">@ DJ</span>
          </a>
          <nav aria-label="Sections" className="nav-desktop">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <MobileNav items={nav} />
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <HeroArt />
          <div className="container hero-inner">
            <div className="hero-text">
              <h1 className="hero-name">{person.displayName}</h1>
              <p className="hero-tagline">{person.tagline}</p>
              <p className="hero-intro">{person.intro}</p>
              <div className="hero-actions">
                <a className="btn btn-white" href="#roles">
                  About Me
                </a>
                <a className="btn btn-outline" href="#services">
                  Go to Services
                </a>
              </div>
            </div>
            <div className="hero-photo">
              <Image
                src={portrait}
                alt="Myo Min Thu standing in a grey suit with arms crossed in a hotel lobby"
                priority
                placeholder="blur"
                sizes="(max-width: 860px) 280px, 360px"
              />
            </div>
          </div>
          <a className="hero-down" href="#roles" aria-label="Scroll to current roles">
            <ChevronDown size={28} />
          </a>
        </section>

        {/* Stats */}
        <section className="stats" aria-label="At a glance">
          <dl className="container stats-grid">
            {facts.map((f) => (
              <div key={f.label} className="stat">
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Current roles */}
        <section id="roles" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Current Roles</h2>
            <Briefing />
            <div className="cards cards-3">
              {roles.map((r) => {
                const Icon = roleIcon[r.icon];
                return (
                  <article key={r.title + r.org} className="card">
                    <span className="icon-circle">
                      <Icon size={22} />
                    </span>
                    <h3 className="card-title">{r.title}</h3>
                    <p className="card-org">{r.org}</p>
                    <p className="card-years">{r.years}</p>
                    <ul className="card-points">
                      {r.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key achievements */}
        <section id="achievements" className="section">
          <div className="container">
            <h2 className="section-title">Key Achievements</h2>
            <div className="cards cards-2">
              {achievements.map((a) => (
                <article key={a.title} className="card card-blue">
                  <h3 className="card-title card-title-blue">{a.title}</h3>
                  <p className="card-text">{a.text}</p>
                  <ul className="chips">
                    {a.chips.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Robotics */}
        <section id="robotics" className="section section-gray">
          <div className="container">
            <h2 className="section-title">World Robot Olympiad</h2>
            <p className="section-sub">
              National Coach of Myanmar&apos;s WRO team since 2018: three national championships
              and four International Finals. At ILBC, the robotics team also won Best Robot Design
              and second place at the Myanmar STEM Robot Competition 2018.
            </p>
            <div className="panel">
              <WroTrack />
            </div>
            <WroGallery />
          </div>
        </section>

        {/* Career journey */}
        <section id="journey" className="section">
          <div className="container container-narrow">
            <h2 className="section-title">Career Journey</h2>
            <ol className="journey">
              <li className="journey-item">
                <span className="journey-year">2026</span>
                <div className="card journey-card">
                  <h3 className="card-title">{roles[0].title}</h3>
                  <p className="card-org">{roles[0].org}</p>
                </div>
              </li>
              {earlier.map((e) => (
                <li key={e.title} className="journey-item">
                  <span className="journey-year">{e.years}</span>
                  <div className="card journey-card">
                    <h3 className="card-title">{e.title}</h3>
                    <p className="card-org">{e.org}</p>
                    <p className="card-text">{e.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Expertise */}
        <section id="expertise" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Areas of Expertise</h2>
            <div className="cards cards-4">
              {expertise.map((x) => (
                <article key={x.title} className="card">
                  <h3 className="card-title card-title-rule">{x.title}</h3>
                  <ul className="dot-list">
                    {x.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <div className="container">
            <h2 className="section-title">IT Services</h2>
            <p className="section-sub">
              Comprehensive IT solutions to help schools and businesses thrive in the digital age
            </p>
            <div className="cards cards-3">
              {services.map((s) => {
                const Icon = serviceIcon[s.icon] ?? Monitor;
                return (
                  <article key={s.name} className="card card-flat">
                    <span className="icon-circle">
                      <Icon size={22} />
                    </span>
                    <h3 className="card-title">{s.name}</h3>
                    <p className="card-text">{s.detail}</p>
                  </article>
                );
              })}
            </div>
            <div className="center">
              <a className="btn btn-blue" href={person.linkedin} target="_blank" rel="noopener">
                Discuss a project on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Education &amp; Certifications</h2>
            <div className="edu-grid">
              {education.map((g) => {
                const Icon = eduIcon[g.key] ?? Award;
                return (
                  <section key={g.key} className={`edu-group edu-${g.key}`} aria-label={g.title}>
                    <h3 className="edu-group-title">
                      <Icon size={20} aria-hidden="true" />
                      {g.title}
                    </h3>
                    <ul className="edu-items">
                      {g.items.map((e) => (
                        <li key={e.name} className="edu-item">
                          <span className="edu-year">{e.year}</span>
                          <div>
                            <p className="edu-name">{e.name}</p>
                            <p className="edu-from">{e.from}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="connect">
          <div className="container connect-inner">
            <h2 className="connect-title">Let&apos;s Connect</h2>
            <p className="connect-text">
              I am always open to collaborations, innovative projects, and networking with
              like-minded professionals in IT, cybersecurity, EdTech, cloud computing, and robotics.
            </p>
            <div className="connect-links">
              <a href={person.website} className="connect-chip">
                <Globe size={18} />
                myominthu.com
              </a>
              <a href={person.linkedin} target="_blank" rel="noopener" className="connect-chip">
                <LinkedinIcon size={18} />
                linkedin.com/in/myominthu
              </a>
            </div>
            <p className="connect-end">Let&apos;s build the future of technology together!</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} {person.displayName}. All rights reserved.
          </p>
          <p className="footer-tag">Technology Leader | IT Director | EdTech Innovator</p>
        </div>
      </footer>

      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
