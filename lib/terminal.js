// Interactive hero terminal. Plain JS so the same file runs in the
// Next.js site and in the standalone preview page.
//
// Markup it expects inside `root`:
//   .term-screen        lines are appended here (server renders the intro already)
//   form.term-form      with input.term-input
//   [data-run]          optional buttons that run a command
// Data on root: data-intro (JSON [[cmd, out], ...]) and data-commands (JSON {name: out}).

export function initTerminal(root) {
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  const screen = root.querySelector(".term-screen");
  const form = root.querySelector(".term-form");
  const input = root.querySelector(".term-input");
  let intro = [];
  let commands = {};
  try {
    intro = JSON.parse(root.dataset.intro || "[]");
    commands = JSON.parse(root.dataset.commands || "{}");
  } catch (_) {}

  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const scrollEnd = () => {
    screen.scrollTop = screen.scrollHeight;
  };

  function line(kind, text) {
    const el = document.createElement("div");
    el.className = "term-line term-" + kind;
    if (kind === "cmd") {
      const p = document.createElement("span");
      p.className = "term-prompt";
      p.textContent = "$ ";
      el.appendChild(p);
      el.appendChild(document.createElement("span"));
    } else {
      el.textContent = text;
    }
    screen.appendChild(el);
    scrollEnd();
    return el;
  }

  function cmdLine(text) {
    const el = line("cmd");
    el.lastChild.textContent = text;
    return el;
  }

  function run(raw) {
    const text = raw.trim();
    if (!text || root.classList.contains("is-typing")) return;
    cmdLine(text);
    const [name, ...args] = text.toLowerCase().split(/\s+/);

    if (name === "clear") {
      screen.textContent = "";
      return;
    }
    if (name === "cd") {
      const target = (args[0] || "").replace(/\/$/, "");
      const section = target && document.getElementById(target);
      if (section) {
        line("out", "Opening " + target + "/");
        section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      } else {
        line("err", "cd: no such section: " + (args[0] || "") + ". Try ls.");
      }
      return;
    }
    if (Object.prototype.hasOwnProperty.call(commands, name)) {
      line("out", commands[name]);
      return;
    }
    line("err", "command not found: " + name + ". Type help.");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
  });

  root.querySelectorAll("[data-run]").forEach((btn) => {
    btn.addEventListener("click", () => run(btn.getAttribute("data-run")));
  });

  // Clicking the screen focuses the prompt, but never steals focus on load.
  screen.addEventListener("click", () => {
    if (!window.getSelection || String(window.getSelection()) === "") input.focus();
  });

  if (reduce) return; // keep the server-rendered intro as is

  // Replay the intro with typing.
  (async () => {
    screen.textContent = "";
    root.classList.add("is-typing");
    for (const [cmd, out] of intro) {
      const el = line("cmd");
      const span = el.lastChild;
      for (const ch of cmd) {
        span.textContent += ch;
        await wait(38 + Math.random() * 40);
      }
      await wait(260);
      if (out) line("out", out);
      await wait(420);
    }
    root.classList.remove("is-typing");
  })();
}
