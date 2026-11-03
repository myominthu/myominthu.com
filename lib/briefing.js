// Mission briefing screen. Plain JS so the same file runs in the Next.js site
// and in the standalone preview page.
//
// Markup inside `root` (rendered in full by the server, so it reads fine without JS):
//   .brief-line > .brief-label + .brief-text     one per briefing line
//   button.brief-sound                            sound control
//
// When the screen scrolls into view, the lines are typed out one by one, with a
// short computer "ti" beep per character (film-terminal style). Browsers only allow
// sound after the visitor has clicked or pressed a key on the page, so the beeps
// play once the page is unlocked; the button replays the briefing with sound.

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

  const btn = root.querySelector(".brief-sound");
  const btnLabel = btn && btn.querySelector(".brief-sound-label");

  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    if (btn) btn.hidden = true;
    return;
  }

  // ---------- sound ----------
  const AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let soundOn = true;

  function unlock() {
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume().then(updateButton, () => {});
  }
  // Any click, tap or key press on the page unlocks audio.
  ["pointerdown", "keydown"].forEach((ev) =>
    window.addEventListener(ev, unlock, { once: true, capture: true })
  );

  function beep(ch) {
    if (!soundOn || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    // high "ti" per character, a lower blip for spaces
    osc.frequency.value = ch === " " ? 900 : 1700 + Math.random() * 600;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.035, t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.035);
  }

  // ---------- typing ----------
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let run = 0;
  let typing = false;

  function clear() {
    lines.forEach((l) => {
      l.label.textContent = "";
      l.text.textContent = "";
      l.li.classList.remove("is-active");
    });
  }

  async function type() {
    const id = ++run;
    typing = true;
    clear();
    root.classList.remove("is-armed", "is-done");
    root.classList.add("is-typing");
    updateButton();
    for (const l of lines) {
      if (id !== run) return;
      l.li.classList.add("is-active");
      l.label.textContent = l.labelFull;
      await wait(120);
      for (const ch of l.textFull) {
        if (id !== run) return;
        l.text.textContent += ch;
        beep(ch);
        await wait(ch === " " ? 14 : 22 + Math.random() * 26);
      }
      l.li.classList.remove("is-active");
      await wait(260);
    }
    typing = false;
    root.classList.remove("is-typing");
    root.classList.add("is-done");
    updateButton();
  }

  function updateButton() {
    if (!btn) return;
    const sounding = typing && soundOn && ctx && ctx.state === "running";
    root.classList.toggle("is-sounding", !!sounding);
    btn.setAttribute("aria-pressed", soundOn ? "true" : "false");
    if (!btnLabel) return;
    if (typing) btnLabel.textContent = soundOn ? "Mute" : "Sound on";
    else btnLabel.textContent = "Replay with sound";
  }

  if (btn) {
    if (!AC) btn.hidden = true;
    btn.addEventListener("click", () => {
      unlock();
      if (typing) {
        soundOn = !soundOn;
        updateButton();
        return;
      }
      soundOn = true;
      type();
    });
  }

  // Arm: hide the text until the screen is in view, then type it.
  root.classList.add("is-armed");
  clear();
  updateButton();

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
