// Mission briefing screen. Plain JS so the same file runs in the Next.js site
// and in the standalone preview page.
//
// Markup inside `root` (rendered in full by the server, so it reads fine without JS):
//   .brief-line > .brief-label + .brief-text     one per briefing line
//
// When the screen scrolls into view, the lines are typed out one by one (no sound).

export function initBriefing(root) {
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  const lines = [...root.querySelectorAll(".brief-line")].map((li) => ({
    li,
    label: li.querySelector(".brief-label"),
    text: li.querySelector(".brief-text"),
    labelFull: li.querySelector(".brief-label").textContent,
    textFull: li.querySelector(".brief-text").textContent,
  }));

  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Arm: hide the text until the screen is in view, then type it.
  root.classList.add("is-armed");
  lines.forEach((l) => {
    l.label.textContent = "";
    l.text.textContent = "";
  });

  async function type() {
    root.classList.remove("is-armed");
    root.classList.add("is-typing");
    for (const l of lines) {
      l.li.classList.add("is-active");
      l.label.textContent = l.labelFull;
      await wait(120);
      for (const ch of l.textFull) {
        l.text.textContent += ch;
        await wait(ch === " " ? 14 : 22 + Math.random() * 26);
      }
      l.li.classList.remove("is-active");
      await wait(260);
    }
    root.classList.remove("is-typing");
    root.classList.add("is-done");
  }

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        type();
      }
    },
    { threshold: 0.45 }
  );
  io.observe(root);
}
