"use client";

import { useEffect, useRef } from "react";
import { initTerminal } from "@/lib/terminal.js";
import { terminalIntro, terminalCommands, terminalShortcuts } from "@/lib/content";

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initTerminal(ref.current);
  }, []);

  return (
    <div
      className="term"
      ref={ref}
      data-intro={JSON.stringify(terminalIntro)}
      data-commands={JSON.stringify(terminalCommands)}
    >
      <div className="term-bar">
        <span className="term-lock" aria-hidden="true" />
        <span>dj@myominthu: ~</span>
      </div>

      <div className="term-screen" role="log" aria-label="Terminal output" aria-live="polite">
        {terminalIntro.map(([cmd, out]) => (
          <div key={cmd}>
            <div className="term-line term-cmd">
              <span className="term-prompt">$ </span>
              <span>{cmd}</span>
            </div>
            {out ? <div className="term-line term-out">{out}</div> : null}
          </div>
        ))}
      </div>

      <form className="term-form" autoComplete="off">
        <label htmlFor="term-input" className="term-prompt">
          $<span className="sr-only"> Type a command</span>
        </label>
        <input
          id="term-input"
          className="term-input"
          type="text"
          spellCheck={false}
          autoCapitalize="none"
          placeholder="type help and press Enter"
        />
      </form>

      <div className="term-shortcuts" aria-label="Run a command">
        {terminalShortcuts.map((c) => (
          <button key={c} type="button" data-run={c}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
