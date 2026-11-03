// All site content lives here.

export const person = {
  name: "Myo Min Thu",
  nickname: "DJ",
  displayName: "Myo Min Thu @ DJ",
  tagline:
    "IT Director, Cyber Security | Technology Leader | EdTech Innovator | Full-Stack Developer | Cloud & DevOps Expert | WRO Coach",
  intro:
    "An IT professional with 19 years of experience in IT management, cybersecurity, cloud computing, software development, digital transformation, and STEM education. Today I lead IT and cybersecurity for three international schools in Myanmar, Thailand and Singapore.",
  location: "Yangon, Myanmar",
  linkedin: "https://www.linkedin.com/in/myominthu/",
  website: "https://myominthu.com",
};

export const facts: { value: string; label: string }[] = [
  { value: "19 years", label: "in IT and cybersecurity" },
  { value: "3 schools", label: "across Myanmar, Thailand and Singapore" },
  { value: "500,000+", label: "people reached by ACCTC Myanmar" },
  { value: "4 finals", label: "at the WRO International Finals" },
];

export type Role = {
  icon: "shield" | "school" | "platform" | "robot" | "steam" | "megaphone";
  title: string;
  org: string;
  years: string;
  points: string[];
};

export const roles: Role[] = [
  {
    icon: "shield",
    title: "IT Director in charge of Cyber Security",
    org: "ILBC Holding Company Limited",
    years: "2026 to present",
    points: [
      "Promoted to manage IT and cybersecurity for three schools across Myanmar, Thailand and Singapore.",
      "Designed the digital architecture of Singapore Global International School (SGIS), connecting parent submissions through the CRM to the admissions platform. Approved by school management and now in use.",
    ],
  },
  {
    icon: "school",
    title: "IT Director and Head of Cyber Security Team",
    org: "ILBC International School, Myanmar",
    years: "2008 to present",
    points: [
      "Lead the IT department at the largest international school in Myanmar.",
      "Built an internal cybersecurity team, upgraded firewalls, and introduced vulnerability assessments and penetration tests, written into the school's IT policy and SOP.",
    ],
  },
  {
    icon: "platform",
    title: "Technology Manager",
    org: "Saungpokki Online Learning Platform",
    years: "2023 to present",
    points: [
      "Lead development of the EdTech platform with a local and Singapore-based team of developers, designers and engineers.",
      "Security-tested the apps and web platform before launch. Used by schools in Thailand since 2024.",
    ],
  },
  {
    icon: "robot",
    title: "National Coach",
    org: "Myanmar's World Robot Olympiad (WRO) Team",
    years: "2018 to present",
    points: [
      "Coached teams to three national championships and four WRO International Finals.",
    ],
  },
  {
    icon: "steam",
    title: "STEAM Coordinator",
    org: "ILBC",
    years: "Ongoing",
    points: ["Promote STEM, robotics and coding in the classroom."],
  },
  {
    icon: "megaphone",
    title: "Founder",
    org: "ACCTC Myanmar (YSEALI TechCamp grant)",
    years: "2018 to present",
    points: [
      "Awareness campaign on cybercrime, transnational crime and fake news, reaching over 500,000 people.",
    ],
  },
];

// ---------- Key achievements (old site + CV) ----------
export const achievements: { title: string; text: string; chips: string[] }[] = [
  {
    title: "Cyber Security Leadership",
    text: "Built ILBC's internal cybersecurity team, upgraded firewalls, and introduced vulnerability assessments and penetration tests. The findings and required controls are written into the school's IT policy and SOP.",
    chips: ["VAPT", "Firewall upgrades", "IT policy & SOP"],
  },
  {
    title: "Digital Transformation Leader",
    text: "Led the move from traditional classrooms to virtual learning during the COVID-19 pandemic, implementing Technology-Integrated Learning (TIL) within two months for over 8,000 students and 2,000 teachers. No successful cyberattacks since.",
    chips: ["Microsoft Education Solutions", "TIL"],
  },
  {
    title: "Robotics Coaching Excellence",
    text: "Coached teams that won three national championships in WRO Myanmar and represented the country at four WRO International Finals.",
    chips: [
      "WRO 2025 - Singapore",
      "WRO 2024 - Izmir, Türkiye",
      "WRO 2019 - Budapest, Hungary",
      "WRO 2018 - Chiang Mai, Thailand",
    ],
  },
  {
    title: "EdTech Platform Development",
    text: "Led the development of Saungpokki.com.sg, an EdTech online learning platform, managing a local and Singapore-based team. Security-tested before launch and used by schools in Thailand since 2024.",
    chips: ["Full-Stack Development", "Project Management"],
  },
  {
    title: "Large-Scale IT Management",
    text: "Oversees more than 32,000 users in Microsoft 365 administration and expanded the TIL system by integrating multiple educational tools with single sign-on.",
    chips: ["MS Teams (LMS)", "SORA e-Library", "Dugga", "Fedena ERP", "CodeMonkey"],
  },
  {
    title: "SGIS Digital Architecture",
    text: "Designed the digital architecture of Singapore Global International School, connecting parent submissions through the CRM to the admissions platform. Approved by school management and now in use.",
    chips: ["CRM", "Admissions", "Integration"],
  },
  {
    title: "Community Cyber Awareness",
    text: "Founded ACCTC Myanmar with a YSEALI TechCamp grant: a public campaign on cybercrime, transnational crime and fake news at the American Center, youth and district events, and on Mandalay FM talk shows.",
    chips: ["500,000+ people reached", "Mandalay FM"],
  },
  {
    title: "YSEALI Leadership",
    text: "YSEALI alumnus and mentor, coach and leader in YSEALI projects in Myanmar.",
    chips: ["TechCamp ASEAN 2017, Jakarta", "TechCamp Reconnect 2018, Bangkok", "A Generation of Advocates 2017"],
  },
];

export const earlier: { years: string; title: string; org: string; note: string }[] = [
  {
    years: "2015",
    title: "Department Head, Web Development and Cyber Security Section",
    org: "ILBC",
    note: "Led the section, built school websites, trained junior staff and taught teachers new IT skills.",
  },
  {
    years: "2011",
    title: "Database Application Developer",
    org: "ILBC",
    note: "Built student information, exam reporting, HR, accounting and fingerprint attendance systems for branches nationwide.",
  },
  {
    years: "2008",
    title: "Assistant Database Programmer",
    org: "ILBC",
    note: "Ran student information and exam reporting systems; supported hardware, software and networks.",
  },
  {
    years: "2007",
    title: "Junior Programmer",
    org: "Evolva Software House, Mandalay",
    note: "Requirements analysis, database design and a point-of-sale system.",
  },
];

// Label format: "WRO 2018 - Chiang Mai, Thailand"
export const wroFinals = [
  { year: "2018", place: "Chiang Mai, Thailand" },
  { year: "2019", place: "Budapest, Hungary" },
  { year: "2024", place: "Izmir, Türkiye" },
  { year: "2025", place: "Singapore" },
];

export const wroLabel = (f: { year: string; place: string }) =>
  `WRO ${f.year} - ${f.place}`;

// Photos per final, newest first. Files live in public/images/wro/.
// To add 2018 or 2019 photos, drop the files in that folder and add entries here.
export const wroPhotos: {
  year: string;
  src: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
}[] = [
  {
    year: "2025",
    src: "/images/wro/wro-2025-opening-ceremony.webp",
    width: 1050,
    height: 1400,
    caption: "Opening ceremony, 26 November 2025",
    alt: "Audience facing the stage screen reading Opening Ceremony, WRO International Final 2025, Singapore",
  },
  {
    year: "2025",
    src: "/images/wro/wro-2025-team-hcb-homecare-bot.webp",
    width: 1050,
    height: 1400,
    caption: "Team HCB with HomeCare Bot, Future Innovators Senior",
    alt: "Three Myanmar students giving thumbs up beside their HomeCare Bot robot and waste analyser at their booth",
  },
  {
    year: "2025",
    src: "/images/wro/wro-2025-team-hcb-booth.webp",
    width: 1400,
    height: 1050,
    caption: "Team HCB and friends at the Myanmar booth",
    alt: "A group of students and coaches posing in front of the Team HCB HomeCare Bot booth",
  },
  {
    year: "2024",
    src: "/images/wro/wro-2024-flag-ceremony.webp",
    width: 1400,
    height: 788,
    caption: "Flag ceremony, Myanmar on stage",
    alt: "Students on stage holding national flags while the screen shows Myanmar at WRO Türkiye 2024",
  },
  {
    year: "2024",
    src: "/images/wro/wro-2024-ilbc-ascendants.webp",
    width: 1050,
    height: 1400,
    caption: "ILBC Ascendants, Future Innovators Senior",
    alt: "Four ILBC Ascendants team members standing with their humanoid robot at their booth",
  },
];

export const expertise: { title: string; items: string[] }[] = [
  {
    title: "IT Leadership & Cyber Security",
    items: [
      "IT Infrastructure Management",
      "Digital Transformation Strategy",
      "Microsoft 365 & Azure AD Management",
      "Vulnerability Assessment & Penetration Testing",
      "Firewall, Endpoint & Network Security",
      "IT Policy, SOP & Data Protection",
      "Team Leadership & Project Management",
    ],
  },
  {
    title: "Cloud Computing & DevOps",
    items: [
      "AWS, Azure, Google Cloud",
      "Docker, Kubernetes, Terraform, Ansible",
      "CI/CD: GitHub Actions, Jenkins, Azure DevOps",
      "Infrastructure as Code (IaC)",
      "Backup & Disaster Recovery",
    ],
  },
  {
    title: "Full-Stack Development",
    items: [
      "React.js, Next.js, JavaScript",
      "Node.js, Express.js, PHP, ASP.Net, C#",
      "MySQL, MSSQL, Oracle, Firebase",
      "WordPress, Joomla, Drupal",
      "Responsive Web Design & SEO",
    ],
  },
  {
    title: "AI, Robotics & STEAM",
    items: [
      "AI Automation & Custom AI Solutions",
      "Robotics Coaching (WRO)",
      "STEAM Curriculum & Coding",
      "Digital Marketing & Video Production",
      "Public Speaking & Training",
    ],
  },
];

export const services: { icon: string; name: string; detail: string }[] = [
  { icon: "managed", name: "Managed IT Services", detail: "Continuous monitoring and maintenance of IT systems with proactive troubleshooting and technical support." },
  { icon: "cloud", name: "Cloud Computing Solutions", detail: "Cloud migration, deployment, data backup, disaster recovery planning, and secure cloud storage." },
  { icon: "lock", name: "Cybersecurity Services", detail: "Vulnerability assessment and penetration testing (VAPT), firewalls, encryption, and security policy you can act on." },
  { icon: "code", name: "Software Development", detail: "Custom web and mobile apps, system integration and API connectivity, security-tested before launch." },
  { icon: "server", name: "IT Infrastructure Management", detail: "Server and network setup, LAN and Wi-Fi, VPN and VoIP, optimisation, and IT asset lifecycle management." },
  { icon: "idea", name: "Technology Consulting", detail: "IT roadmaps, digital transformation strategy, and advice on emerging technologies." },
  { icon: "school", name: "School & EdTech Systems", detail: "Admissions, CRM, LMS and single sign-on, designed so data moves safely between them." },
  { icon: "users", name: "Security Awareness Training", detail: "Cybersecurity and online safety sessions for staff, students, parents and communities." },
  { icon: "robot", name: "Robotics & Coding Programmes", detail: "STEAM curriculum, competition coaching and robotics labs for schools." },
];

// Education grouped by kind; each group gets its own colour on the page.
export type EduGroup = {
  key: "certs" | "state" | "degree" | "teaching";
  title: string;
  items: { year: string; name: string; from: string }[];
};

export const education: EduGroup[] = [
  {
    key: "certs",
    title: "Professional certificates",
    items: [
      { year: "2025", name: "Full-Stack Software Engineer", from: "IBM" },
      { year: "2024", name: "Foundations of Project Management", from: "Google" },
      { year: "2016", name: "English for Career Development", from: "University of Pennsylvania" },
      { year: "2015", name: "Cyberwar, Surveillance, and Security", from: "University of Adelaide (edX)" },
    ],
  },
  {
    key: "state",
    title: "YSEALI and U.S. Department of State",
    items: [
      { year: "2018", name: "YSEALI TechCamp Reconnect, Bangkok", from: "YSEALI / U.S. Department of State" },
      { year: "2017", name: "YSEALI TechCamp ASEAN, Jakarta", from: "YSEALI / U.S. Department of State" },
      { year: "2017", name: "A Generation of Advocates (certificate)", from: "U.S. Department of State" },
    ],
  },
  {
    key: "degree",
    title: "Degree and awards",
    items: [
      { year: "2007", name: "Bachelor of Computer Science (B.C.Sc)", from: "University of Computer Studies, Mandalay" },
      { year: "2007", name: "Third Prize, Programmer Challenge (car parking system software)", from: "Yatanarpon Teleport opening ceremony" },
    ],
  },
  {
    key: "teaching",
    title: "Coaching and teaching",
    items: [
      { year: "2025", name: "WRO Coach Certificate, WRO 2025 - Singapore", from: "World Robot Olympiad Association" },
      { year: "2024", name: "WRO Coach Certificate, WRO 2024 - Izmir, Türkiye", from: "World Robot Olympiad Association" },
      { year: "2019", name: "WRO Coach Certificate, WRO 2019 - Budapest, Hungary", from: "World Robot Olympiad Association" },
      { year: "2018", name: "WRO Coach Certificate, WRO 2018 - Chiang Mai, Thailand", from: "World Robot Olympiad Association" },
      { year: "2011", name: "Instructor, IT Engineers Examination (ITEE)", from: "AOTS Japan and Myanmar Computer Federation" },
    ],
  },
];

// ---------- Mission briefing: current position titles ----------
// Typed out on screen like a mission control console, with typing beeps.
export const briefing: { label: string; text: string }[] = [
  { label: "POSITION", text: "IT Director and Head of Cyber Security Team, ILBC International School" },
  { label: "POSITION", text: "Technology Manager, Saungpokki Online Learning Platform" },
  { label: "POSITION", text: "National Coach, Myanmar World Robot Olympiad (WRO) Team" },
  { label: "POSITION", text: "STEAM Coordinator, ILBC" },
  { label: "POSITION", text: "Founder, ACCTC Myanmar" },
  { label: "STATUS", text: "All systems go." },
];
