// All site content lives here. Update this file when the CV changes.

export const person = {
  name: "Myo Min Thu",
  nickname: "DJ",
  title: "IT Director, Cyber Security",
  focus: "EdTech and robotics",
  location: "Yangon, Myanmar",
  intro:
    "I run IT and cybersecurity for three international schools in Myanmar, Thailand and Singapore. I started as a programmer in 2007, and I still build, test and coach: platforms for schools, security programmes for families' data, and robotics teams for the world stage.",
  email: "dj.myominthu@gmail.com",
  phone: "+959976803816",
  linkedin: "https://www.linkedin.com/in/myominthu/",
  website: "https://myominthu.com",
  cv: "/files/Myo_Min_Thu_CV.pdf",
};

export const facts: { value: string; label: string }[] = [
  { value: "19 years", label: "in IT and cybersecurity" },
  { value: "3 schools", label: "across Myanmar, Thailand and Singapore" },
  { value: "500,000+", label: "people reached by ACCTC Myanmar" },
  { value: "4 finals", label: "at the WRO International Finals" },
];

export type Role = {
  title: string;
  org: string;
  years: string;
  points: string[];
};

export const roles: Role[] = [
  {
    title: "IT Director in charge of Cyber Security",
    org: "ILBC Holding Company Limited",
    years: "2026 to present",
    points: [
      "Promoted to manage IT and cybersecurity for three schools across Myanmar, Thailand and Singapore.",
      "Designed the digital architecture of Singapore Global International School (SGIS), connecting parent submissions through the CRM to the admissions platform. Approved by school management and now in use.",
      "Responsible for data protection of admissions and family data.",
    ],
  },
  {
    title: "IT Director and Head of Cyber Security Team",
    org: "International Language and Business Centre (ILBC), Myanmar",
    years: "2008 to present",
    points: [
      "Lead the IT department at the largest international school in Myanmar.",
      "Built an internal cybersecurity team, upgraded firewalls, and introduced vulnerability assessments and penetration tests. Wrote the findings and required controls into the school's IT policy and SOP.",
      "In 2020, moved the school system online within two months for over 8,000 students and 2,000 teachers. No successful cyberattacks since.",
      "STEAM Coordinator, bringing robotics and coding into the classroom.",
    ],
  },
  {
    title: "Technology Manager",
    org: "Saungpokki Company Limited",
    years: "2023 to present",
    points: [
      "Led the Saungpokki Online Learning Platform: building apps and leading developers, the product owner, stakeholders and cross-functional departments.",
      "Security-tested the apps and web platform before launch. Used by schools in Thailand since 2024.",
    ],
  },
  {
    title: "Founder, ACCTC Myanmar",
    org: "Awareness Campaign of Cyber Crime and Transnational Crime (YSEALI TechCamp grant)",
    years: "2018 to present",
    points: [
      "Ran a public campaign on cybercrime, transnational crime and fake news, online and in person at the American Center, youth events and district events.",
      "Spoke on Mandalay FM talk shows. The campaign reached over 500,000 people.",
    ],
  },
  {
    title: "National Coach",
    org: "Myanmar World Robot Olympiad (WRO) Team",
    years: "2018 to present",
    points: [
      "Guided teams to three national championships and four WRO International Finals: WRO 2018 - Chiang Mai, Thailand; WRO 2019 - Budapest, Hungary; WRO 2024 - Izmir, Türkiye; WRO 2025 - Singapore.",
    ],
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

export const skills: { group: string; items: string }[] = [
  {
    group: "Cybersecurity",
    items:
      "Vulnerability assessment, penetration testing, firewall and endpoint security, data protection, IT policy and SOP, awareness training",
  },
  {
    group: "Cloud and DevOps",
    items:
      "AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform, Ansible, CI/CD with GitHub Actions, Jenkins and Azure DevOps",
  },
  {
    group: "AI and robotics",
    items: "AI automation, custom AI solutions, robotics coaching and classroom robotics",
  },
  {
    group: "Software and web",
    items:
      "PHP, ASP.NET, C#, JavaScript, React, Next.js, WordPress, SQL Server, MySQL, Oracle, SEO",
  },
  {
    group: "Leadership",
    items:
      "Project and stakeholder management, digital transformation, coaching, public speaking",
  },
];

export const services: { name: string; detail: string }[] = [
  {
    name: "Security assessments",
    detail: "Vulnerability assessment and penetration testing, with findings written into policy you can act on.",
  },
  {
    name: "School and EdTech systems",
    detail: "Admissions, CRM, LMS and single sign-on, designed so data moves safely between them.",
  },
  {
    name: "Cloud and infrastructure",
    detail: "Migration, backup, disaster recovery and network setup on AWS, Azure or Google Cloud.",
  },
  {
    name: "Software development",
    detail: "Web and mobile apps, system integration and APIs, security-tested before launch.",
  },
  {
    name: "Awareness training",
    detail: "Cybersecurity and online safety sessions for staff, students, parents and communities.",
  },
  {
    name: "Robotics and coding programmes",
    detail: "STEAM curriculum, competition coaching and robotics labs for schools.",
  },
];

export const education: { year: string; name: string; from: string }[] = [
  { year: "2025", name: "Full-Stack Software Engineer", from: "IBM" },
  { year: "2024", name: "Foundations of Project Management", from: "Google" },
  { year: "2018", name: "YSEALI TechCamp Reconnect, Bangkok", from: "YSEALI / U.S. Department of State" },
  { year: "2017", name: "YSEALI TechCamp ASEAN, Jakarta", from: "YSEALI / U.S. Department of State" },
  { year: "2017", name: "A Generation of Advocates (certificate)", from: "U.S. Department of State" },
  { year: "2016", name: "English for Career Development", from: "University of Pennsylvania" },
  { year: "2015", name: "Cyberwar, Surveillance, and Security", from: "University of Adelaide (edX)" },
  { year: "2011", name: "Instructor, IT Engineers Examination (ITEE)", from: "AOTS Japan and Myanmar Computer Federation" },
  { year: "2007", name: "Third Prize, Programmer Challenge", from: "Yatanarpon Teleport opening ceremony" },
  { year: "2007", name: "Bachelor of Computer Science", from: "University of Computer Studies, Mandalay" },
];
