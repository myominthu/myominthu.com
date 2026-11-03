// Mission briefing screen. Plain JS so the same file runs in the Next.js site
// and in the standalone preview page.
//
// Markup inside `root` (rendered in full by the server, so it reads fine without JS):
//   .brief-line > .brief-label + .brief-text     one per briefing line
//   button.brief-sound                            sound control
//
// When the screen scrolls into view, the lines are typed out one by one, with a
// soft keyboard click per character for the first 5 seconds. Browsers only allow
// sound after the visitor has clicked or pressed a key on the page, so the clicks
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

  // Soft keyboard click: a very short burst of filtered noise.
  // Sound plays only for the first SOUND_MS of each typing run.
  const SOUND_MS = 5000;
  let soundStart = 0;
  let noise = null;

  function click(ch) {
    if (!soundOn || !ctx || ctx.state !== "running") return;
    if (performance.now() - soundStart > SOUND_MS) {
      root.classList.remove("is-sounding");
      return;
    }
    if (!noise) {
      const len = Math.floor(ctx.sampleRate * 0.03);
      noise = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.playbackRate.value = 0.85 + Math.random() * 0.3;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = ch === " " ? 1400 : 2600 + Math.random() * 900;
    band.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.value = ch === " " ? 0.18 : 0.26;
    src.connect(band).connect(gain).connect(ctx.destination);
    src.start(t);
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
    soundStart = performance.now();
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
        click(ch);
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
