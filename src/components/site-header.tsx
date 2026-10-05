"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

const links = [
  ["Platform", "#platform"],
  ["Simulation", "#simulation"],
  ["Privacy", "#privacy"],
  ["Origin", "#origin"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  function closeMenu() {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  return (
    <header className="site-header">
      <a href="#top" className="logo-link" aria-label="JakSambung home">
        <BrandMark />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-cta" href="#contact">Discuss a pilot</a>
      <button
        ref={buttonRef}
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true">{open ? "×" : "≡"}</span>
      </button>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <a
              ref={index === 0 ? firstLinkRef : undefined}
              key={href}
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}<span aria-hidden="true">↘</span>
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>Discuss a pilot<span aria-hidden="true">↘</span></a>
          <button type="button" onClick={closeMenu}>Close menu</button>
        </nav>
      )}
    </header>
  );
}
