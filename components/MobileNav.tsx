"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";

// Phone menu: a <details> dropdown that closes after a link is chosen.
export default function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <details className="nav-mobile" ref={ref}>
      <summary aria-label="Open menu">
        <Menu size={22} aria-hidden="true" />
      </summary>
      <nav aria-label="Sections">
        <ul>
          {items.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => ref.current?.removeAttribute("open")}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
