import {
  BrainCircuit,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  Fingerprint,
  GitBranch,
  Infinity as InfinityIcon,
  Lock,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Wifi,
} from "lucide-react";
import type { CSSProperties } from "react";

// Decorative background for the hero: outline icons for cloud, AI, cybersecurity,
// software development, networking and DevOps, a faint network graph, and code lines.
// Kept to the edges so the name, text and photo stay clear.

type Item = {
  Icon: typeof Cloud;
  size: number;
  pos: CSSProperties;
  rotate?: number;
  small?: boolean; // hidden on phones
};

const ICONS: Item[] = [
  { Icon: Cloud, size: 96, pos: { top: "7%", left: "3%" } },
  { Icon: GitBranch, size: 46, pos: { top: "5%", left: "27%" }, small: true },
  { Icon: ShieldCheck, size: 70, pos: { top: "9%", left: "48%" } },
  { Icon: Network, size: 92, pos: { top: "5%", right: "3%" } },
  { Icon: Terminal, size: 52, pos: { top: "38%", left: "1.5%" }, small: true },
  { Icon: Lock, size: 50, pos: { top: "47%", left: "52%" }, small: true },
  { Icon: Server, size: 60, pos: { top: "44%", right: "2%" }, small: true },
  { Icon: Code2, size: 78, pos: { bottom: "9%", left: "4%" } },
  { Icon: Cpu, size: 54, pos: { bottom: "6%", left: "29%" }, small: true },
  { Icon: BrainCircuit, size: 84, pos: { bottom: "16%", left: "47%" } },
  { Icon: InfinityIcon, size: 92, pos: { bottom: "1.5%", right: "36%" }, rotate: -6 },
  { Icon: Database, size: 56, pos: { bottom: "20%", right: "3%" }, small: true },
  { Icon: Fingerprint, size: 44, pos: { top: "28%", right: "4%" }, small: true },
  { Icon: Container, size: 46, pos: { top: "58%", left: "1.5%" }, small: true },
  { Icon: Wifi, size: 42, pos: { top: "60%", left: "54%" }, small: true },
];

const CODE: { text: string; pos: CSSProperties }[] = [
  { text: "$ terraform apply -auto-approve", pos: { top: "3.5%", left: "34%" } },
  { text: "kubectl rollout status deploy/web", pos: { bottom: "3%", left: "6%" } },
  { text: "nmap -sV --script vuln 10.0.0.0/24", pos: { top: "2%", left: "60%" } },
  { text: "git commit -m \"secure by design\"", pos: { bottom: "3%", right: "3%" } },
  { text: "const model = await ai.train(data);", pos: { top: "86%", left: "36%" } },
];

// Network graph: nodes in a 100 x 100 frame, stretched across the hero.
const NODES: [number, number][] = [
  [6, 18], [18, 8], [30, 22], [44, 10], [58, 20], [72, 8], [88, 16], [96, 34],
  [84, 52], [94, 74], [76, 90], [60, 78], [46, 92], [30, 84], [14, 92], [4, 66],
  [12, 44], [52, 50], [66, 40],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 0], [2, 16],
  [4, 18], [18, 8], [17, 18], [17, 11], [17, 3], [16, 17], [13, 17], [6, 18],
];

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg className="hero-net" viewBox="0 0 100 100" preserveAspectRatio="none">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.45" />
        ))}
      </svg>

      {ICONS.map(({ Icon, size, pos, rotate, small }, i) => (
        <span
          key={i}
          className={`hero-icon${small ? " hero-icon-sm" : ""}`}
          style={{ ...pos, transform: rotate ? `rotate(${rotate}deg)` : undefined, animationDelay: `${(i % 6) * -1.3}s` }}
        >
          <Icon size={size} strokeWidth={1.1} />
        </span>
      ))}

      {CODE.map((c) => (
        <span key={c.text} className="hero-code" style={c.pos}>
          {c.text}
        </span>
      ))}
    </div>
  );
}
