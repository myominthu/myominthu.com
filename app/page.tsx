import Image from "next/image";
import WroTrack from "@/components/WroTrack";
import WroGallery from "@/components/WroGallery";
import {
  person,
  facts,
  roles,
  earlier,
  skills,
  services,
  education,
} from "@/lib/content";
import portrait from "@/public/images/myo-min-thu.webp";

const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#robotics", label: "Robotics" },
  { href: "#services", label: "Services" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.nickname,
  jobTitle: person.title,
  url: person.website,
  email: `mailto:${person.email}`,
  sameAs: [person.linkedin],
  worksFor: { "@type": "Organization", name: "ILBC Holding Company Limited" },
  address: { "@type": "PostalAddress", addressLocality: "Yangon", addressCountry: "MM" },
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="brand">
            Myo Min Thu
          </a>
          <nav aria-label="Sections">
            <ul className="nav-list">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn-small" href={person.cv} download>
            Download CV
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="hero wrap">
          <div className="hero-text">
            <h1 className="hero-name">
              Myo Min Thu
              <span className="hero-nick">DJ</span>
            </h1>
            <p className="hero-role">
              {person.title}
              <br />
              <span className="muted">
                {person.focus}, {person.location}
              </span>
            </p>
            <p className="hero-intro">{person.intro}</p>
            <div className="hero-actions">
              <a className="btn" href={`mailto:${person.email}`}>
                Email me
              </a>
              <a className="btn btn-ghost" href={person.cv} download>
                Download CV (PDF)
              </a>
              <a className="text-link" href={person.linkedin} rel="noopener" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>

          <figure className="hero-photo">
            <Image
              src={portrait}
              alt="Myo Min Thu standing in a hotel lobby in a grey suit, arms crossed"
              priority
              placeholder="blur"
              sizes="(max-width: 860px) 90vw, 420px"
            />
            <figcaption>Bangkok, October 2026</figcaption>
          </figure>
        </section>

        <section className="facts-band" aria-label="At a glance">
          <dl className="wrap facts">
            {facts.map((f) => (
              <div key={f.label} className="fact">
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Current roles */}
        <section id="experience" className="section wrap">
          <h2 className="section-title">What I do now</h2>
          <div className="roles">
            {roles.map((r) => (
              <article key={r.title} className="role">
                <div className="role-meta">
                  <p className="role-years">{r.years}</p>
                </div>
                <div>
                  <h3 className="role-title">{r.title}</h3>
                  <p className="role-org">{r.org}</p>
                  <ul className="role-points">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <h3 className="sub-title">How I got here</h3>
          <ol className="path">
            {earlier.map((e) => (
              <li key={e.title}>
                <span className="path-year">{e.years}</span>
                <div>
                  <p className="path-title">
                    {e.title}, <span className="muted">{e.org}</span>
                  </p>
                  <p className="path-note">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Robotics */}
        <section id="robotics" className="robotics">
          <div className="wrap">
            <h2 className="section-title">Four world finals with Myanmar&apos;s robotics team</h2>
            <p className="lede">
              As National Coach of Myanmar&apos;s World Robot Olympiad team since 2018, I&apos;ve
              guided teams to three national championships and to the International Finals four
              times. At ILBC, the robotics team also won Best Robot Design and second place at the
              Myanmar STEM Robot Competition 2018.
            </p>
            <WroTrack />
            <WroGallery />
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section wrap">
          <h2 className="section-title">Skills</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skill-row">
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Services */}
        <section id="services" className="section section-tint">
          <div className="wrap">
            <h2 className="section-title">How I can help your school or business</h2>
            <p className="lede">
              Consulting built on the systems I run every day across three schools in three
              countries.
            </p>
            <ul className="services">
              {services.map((s) => (
                <li key={s.name}>
                  <h3>{s.name}</h3>
                  <p>{s.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="section wrap">
          <h2 className="section-title">Education and certifications</h2>
          <div className="table-wrap">
            <table className="edu">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Institution</th>
                </tr>
              </thead>
              <tbody>
                {education.map((e) => (
                  <tr key={e.name}>
                    <td className="edu-year">{e.year}</td>
                    <td>{e.name}</td>
                    <td className="muted">{e.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote">
            Also: mentor, coach and leader in YSEALI projects in Myanmar. Languages: Burmese and
            English.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="contact">
          <div className="wrap contact-inner">
            <h2 className="contact-title">Let&apos;s talk</h2>
            <p className="contact-lede">
              I&apos;m open to collaborations, consulting, speaking and mentoring in cybersecurity,
              EdTech and robotics.
            </p>
            <dl className="contact-list">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${person.phone}`}>+95 9 976 803 816</a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href={person.linkedin} target="_blank" rel="noopener">
                    linkedin.com/in/myominthu
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>© {new Date().getFullYear()} Myo Min Thu</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
