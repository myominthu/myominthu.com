// Mission briefing screen. Plain JS so the same file runs in the Next.js site
// and in the standalone preview page.
//
// Markup inside `root` (rendered in full by the server, so it reads fine without JS):
//   .brief-line > .brief-label + .brief-text     one per briefing line
//   button.brief-play                            optional spoken briefing
//
// When the screen scrolls into view, the lines are typed out one by one.
// The play button reads the briefing aloud with the browser's speech voice.

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

  setupVoice(root, lines);

  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  // Arm: hide the text until the screen is in view, then type it.
  root.classList.add("is-armed");
  lines.forEach((l) => {
    l.label.textContent = "";
    l.text.textContent = "";
  });

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function type() {
    root.classList.remove("is-armed");
    root.classList.add("is-typing");
    for (const l of lines) {
      l.li.classList.add("is-active");
      l.label.textContent = l.labelFull;
      await wait(120);
      for (const ch of l.textFull) {
        l.text.textContent += ch;
        await wait(ch === " " ? 10 : 14 + Math.random() * 20);
      }
      l.li.classList.remove("is-active");
      await wait(240);
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

function setupVoice(root, lines) {
  const btn = root.querySelector(".brief-play");
  if (!btn) return;
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    btn.hidden = true;
    return;
  }

  const label = btn.querySelector(".brief-play-label");
  const script = lines
    .map((l) => `${l.labelFull.toLowerCase()}. ${l.textFull}`)
    .join(" ... ");

  function pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    const prefer = ["Google US English", "Daniel", "Alex", "Samantha", "Microsoft Guy", "Microsoft David"];
    for (const name of prefer) {
      const v = voices.find((x) => x.name.includes(name));
      if (v) return v;
    }
    return voices.find((v) => /^en(-|_)US/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang));
  }

  function setPlaying(on) {
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    root.classList.toggle("is-speaking", on);
    if (label) label.textContent = on ? "Stop briefing" : "Play audio briefing";
  }

  btn.addEventListener("click", () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(script);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || "en-US";
    u.rate = 0.92;
    u.pitch = 0.82;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    setPlaying(true);
    synth.speak(u);
  });
}
