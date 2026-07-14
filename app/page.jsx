"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trophy,
} from "lucide-react";

const summary =
  "Cybersecurity student with hands-on experience building secure applications, APIs, and real-world security projects. Skilled in Python, backend development, authentication, vulnerability assessment, and threat detection, with practical exposure to OWASP Top 10 risks, penetration testing tools, and incident response workflows. Strong interest in solving real-world cybersecurity challenges.";

const profileCards = [
  {
    title: "About Me",
    body: "Cybersecurity student with hands-on experience in application security, API security, and threat detection. Strong interest in solving real-world cybersecurity challenges with practical exposure to penetration testing and incident response.",
  },
  {
    title: "Education",
    body: "B.E. Cyber Security at SRM Valliammai Engineering College (2023-2027) with a 7.24 CGPA.",
  },
  {
    title: "Core Strengths",
    body: "Python, backend development (FastAPI, Node.js, Express.js), authentication, OWASP Top 10, vulnerability assessment, penetration testing tools (Burp Suite, Nmap, Wireshark), Docker, and incident response workflows.",
  },
];

const highlights = [
  { value: "3", label: "Projects" },
  { value: "7.24", label: "College CGPA" },
  { value: "3", label: "Certifications" },
  { value: "1st", label: "Best CTF Finish" },
];

const focusAreas = [
  "Application Security",
  "Vulnerability Assessment",
  "Threat Detection",
  "Backend Development",
  "API Security",
  "Penetration Testing",
];

const education = [
  {
    title: "SRM Valliammai Engineering College",
    subtitle: "B.E. Cyber Security",
    meta: "2023-2027",
    detail: "7.24 CGPA",
  },
];

const projects = [
  {
    title: "KovirX",
    subtitle: "Threat Detection & Security Operations Platform",
    tag: "Threat Detection",
    image: "/assets/images/kovirx.png",
    description:
      "Full-stack cybersecurity platform for real-time threat monitoring and incident management. Implemented secure JWT authentication, role-based access control, rate limiting, intrusion logging, and interactive dashboards for security alerts and threat analysis.",
    demo: "https://kovirx.vercel.app/",
    tech: "React, Node.js, Express, MongoDB, JWT, Docker",
  },
  {
    title: "Hustlefy",
    subtitle: "Job Matching Platform",
    tag: "Backend Development",
    image: "/assets/images/hustlefy.png",
    description:
      "MSME-registered hyperlocal gig marketplace with secure authentication, JWT middleware, email verification, real-time dashboards, and cross-platform Android deployment using Capacitor.",
    demo: "https://www.thehustlefy.app/",
    tech: "Node.js, Express, React, MongoDB, Firebase, Capacitor",
  },
  {
    title: "Phishguard",
    subtitle: "Anti-Phishing Extension",
    tag: "Application Security",
    image: "/assets/images/phishguard.png",
    description:
      "Browser extension combining machine learning with URL analysis to identify suspicious links and malicious patterns. Built with secure Flask backend featuring API protection, rate limiting, and CORS controls.",
    github: "https://github.com/manojprasad-dot/anti-phishing-detection",
    demo: "https://phishguard26.netlify.app/",
    tech: "Python, Flask, JavaScript, Chrome Extension, Random Forest",
  },
];

const skills = [
  "Python, HTML/CSS",
  "Burp Suite, Nmap, Wireshark",
  "Git & Docker",
  "FastAPI, Node.js, Express.js",
  "MySQL Database",
  "Kali Linux & Windows",
  "OWASP Top 10 & Vulnerability Assessment",
  "Penetration Testing & Threat Detection",
  "Incident Response & Network Security",
  "API Security & Role-Based Access Control",
  "Authentication, Authorization & Encryption",
];

const certifications = [
  {
    title: "Penetration Testing",
    issuer: "SRM Valliammai Engineering College (Value Added Course)",
    image: "/assets/images/cert-pentest.png",
    href: null,
  },
  {
    title: "Generative AI Foundations Training Badge",
    issuer: "AWS Academy",
    image: "/assets/images/cert-aws-ai.png",
    href: "https://www.credly.com/badges/62cfddb4-44d3-4c81-b9e9-816869e02a4c",
  },
  {
    title: "Networking",
    issuer: "Cisco Networking Academy",
    image: "/assets/images/cert-networking.png",
    href: null,
  },
];

const achievements = [
  "Winner, INFYRA CTF'25 – National Level Cybersecurity Competition - 1st",
  "4th Place, 0xTi CTF – 24-hour National Level Cybersecurity Competition",
  "10th Place, Kalachakra CTF – 24-hour National Cybersecurity Competition (10th of 250 teams)",
  "5th Place, WTF CTF 3.0 – Inter-College Cybersecurity Competition",
  "5th Place, OSDHack 2026 – National-level Applied AI & Machine Learning Hackathon",
];

const leadership = [
  {
    role: "Project Lead, Hustlefy",
    description:
      "Led the development of an MSME-registered hyperlocal gig marketplace from idea to prototype.",
  },
  {
    role: "Team Leader, 0xTi CTF",
    description:
      "Led a team during a 24-hour CTF at Rajalakshmi Engineering College.",
  },
  {
    role: "Member, Whitehatians Club",
    description: "Active participant in cybersecurity-focused club activities.",
  },
];

const languages = ["Tamil", "English"];

// Interactive cybersecurity terminal simulation
function Terminal() {
  const [history, setHistory] = useState([
    "MANOJ PRASAD CYBERSECURITY SANDBOX [Version 1.0.4]",
    "(c) 2026 Manoj Prasad. All rights reserved.",
    "",
    "Type 'help' to see the list of available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    const newHistory = [...history, `manojprasad@sandbox:~$ ${trimmed}`];
    setHistory(newHistory);
    setInput("");

    const parts = trimmed.toLowerCase().split(" ");
    const command = parts[0];

    if (command === "help") {
      setHistory(prev => [
        ...prev,
        "Available commands:",
        "  help      - Display this help message",
        "  scan      - Run vulnerability & port scanner simulation",
        "  alerts    - Fetch simulated real-time threat detection logs",
        "  clear     - Clear the terminal screen",
        ""
      ]);
    } else if (command === "clear") {
      setHistory([]);
    } else if (command === "scan") {
      if (isScanning) {
        setHistory(prev => [...prev, "[-] A scan is already in progress.", ""]);
        return;
      }
      setIsScanning(true);
      setHistory(prev => [...prev, "[~] Initializing Network Port Scan...", ""]);
      
      const scanLines = [
        "[~] Probing active endpoints on subnet 192.168.1.0/24...",
        "[+] Host detected: 192.168.1.45 (Linux SOC Server)",
        "[~] Scanning top 1000 TCP ports...",
        "[!] Warning: Port 22 (SSH) open - Version: OpenSSH 8.2p1",
        "[!] Warning: Port 80 (HTTP) open - Version: Apache httpd 2.4.41",
        "[+] Scan complete. 2 security warnings found.",
        ""
      ];

      for (let i = 0; i < scanLines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setHistory(prev => [...prev, scanLines[i]]);
      }
      setIsScanning(false);
    } else if (command === "alerts") {
      setHistory(prev => [
        ...prev,
        `[SOC ALERT] ${new Date().toLocaleTimeString()} - Malicious payload signature detected in HTTP POST body.`,
        `[SOC ALERT] ${new Date().toLocaleTimeString()} - Blocked potential SQL injection attempt from 185.220.101.4.`,
        `[SOC ALERT] ${new Date().toLocaleTimeString()} - SSH login brute-force attempt blocked on host 192.168.1.45.`,
        ""
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        `Command not found: '${trimmed}'. Type 'help' for assistance.`,
        ""
      ]);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between bg-zinc-900/80 px-4 py-2 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs font-mono text-zinc-400">manojprasad@cyber-sandbox:~</span>
        <div className="w-12" />
      </div>
      <div 
        ref={containerRef}
        className="h-72 overflow-y-auto p-5 font-mono text-xs text-blue-400 bg-black/40 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={
              line.startsWith("manojprasad@sandbox") 
                ? "text-white" 
                : line.startsWith("[+") 
                ? "text-emerald-400" 
                : line.startsWith("[!") || line.startsWith("[SOC ALERT]")
                ? "text-amber-400"
                : line.startsWith("[-")
                ? "text-rose-400"
                : "text-zinc-300"
            }
          >
            {line}
          </div>
        ))}
        {!isScanning && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="flex items-center gap-1 mt-2 text-white"
          >
            <span className="text-blue-400">manojprasad@sandbox:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 font-mono text-xs text-white"
              autoFocus
              placeholder="type commands..."
            />
          </form>
        )}
        {isScanning && (
          <div className="text-zinc-500 animate-pulse mt-2 font-mono text-xs">
            Scanning in progress...
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-[-6rem] h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-200"
          >
            <Image
              src="/assets/images/logo-removebg-preview.png"
              alt="Manoj logo"
              width={34}
              height={34}
              className="h-9 w-9 object-contain"
            />
            Manoj Prasad A
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#skills" className="transition hover:text-white">
              Skills
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
          <a
            href="/manoj_2_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/20"
          >
            View Resume
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            <Shield size={14} />
            Cybersecurity Analyst
          </div>
          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-7xl">
            Cybersecurity,
            <span className="block bg-gradient-to-r from-blue-300 via-white to-orange-300 bg-clip-text text-transparent">
              AI, and practical
            </span>
            software building.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">{summary}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="/manoj_2_resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-200 transition hover:border-orange-400 hover:text-white"
            >
              Open New Resume
              <ExternalLink size={16} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-transparent to-orange-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Current Focus
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Cybersecurity + AI
                </p>
              </div>
              <BrainCircuit className="text-orange-400" size={24} />
            </div>
            <Image
              src="/assets/images/hero-portrait.png"
              alt="Manoj Prasad portrait"
              width={900}
              height={1100}
              priority
              className="h-auto w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-4 md:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
            >
              <p className="text-4xl font-black text-white">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            About
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-5xl">
            Profile built for
            <span className="block text-zinc-500">real-world security work</span>
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {profileCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7"
            >
              <h3 className="text-2xl font-bold text-white">{card.title}</h3>
              <p className="mt-4 leading-7 text-zinc-400">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {education.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Education
              </p>
              <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-orange-300">
                {item.subtitle}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm">
                <span className="text-zinc-400">{item.meta}</span>
                <span className="font-semibold text-white">{item.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Projects
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-5xl">
            Work spanning
            <span className="block text-zinc-500">
              phishing, platforms, and botnet defense
            </span>
          </h2>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={760}
                className="h-56 w-full object-cover"
              />
              <div className="p-7">
                <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                  {project.tag}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-orange-300">
                  {project.subtitle}
                </p>
                <p className="mt-4 leading-7 text-zinc-400">{project.description}</p>
                {(project.github || project.demo) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-white/30"
                      >
                        <ArrowRight size={16} />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} live demo website`}
                        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
                      >
                        Live Demo
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[2rem] border border-orange-500/20 bg-gradient-to-r from-orange-500/12 via-white/[0.03] to-blue-500/12 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
            Skills
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl">
            Technical toolkit for hands-on work
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Certifications
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-5xl">
            Learning backed by
            <span className="block text-zinc-500">practical upskilling</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={900}
                height={620}
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-orange-300">
                  <Award size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {item.issuer}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-blue-100"
                  >
                    View Credential
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="mt-5 text-sm text-zinc-500">
                    Included in the updated resume and portfolio profile.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Achievements
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white">
              Competitive milestones
            </h2>
            <div className="mt-8 space-y-4">
              {achievements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Languages
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white">
              Communication
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {languages.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200"
                >
                  {language}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="leadership" className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[2rem] border border-blue-500/20 bg-gradient-to-r from-blue-500/12 via-white/[0.03] to-blue-500/12 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">
            Leadership & Event Organization
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl">
            Initiative & Team Coordination
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {leadership.map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <h3 className="text-lg font-bold text-white">{item.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sandbox" className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Interactive Sandbox
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-5xl">
            Cybersecurity Terminal <span className="text-zinc-500">Simulation</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-zinc-400">
            Simulate a vulnerability scan, check network alerts, or query host information. Use commands like <strong>scan</strong> or <strong>alerts</strong> to interact.
          </p>
        </div>
        <Terminal />
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-5xl">
            Ready to collaborate
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            Seeking opportunities to apply technical skills, gain industry experience in cybersecurity, and grow through AI-driven and software-focused work.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <a
              href="mailto:manojprasadannamalai@gmail.com"
              className="rounded-2xl border border-white/10 p-5 transition hover:border-orange-400/40"
            >
              <Mail className="text-orange-300" size={18} />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-zinc-500">Email</p>
              <p className="mt-2 text-sm text-white">manojprasadannamalai@gmail.com</p>
            </a>
            <a
              href="tel:+918778911669"
              className="rounded-2xl border border-white/10 p-5 transition hover:border-orange-400/40"
            >
              <Phone className="text-orange-300" size={18} />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-zinc-500">Phone</p>
              <p className="mt-2 text-sm text-white">+91 8778911669</p>
            </a>
            <a
              href="https://github.com/manojprasad-dot"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 p-5 transition hover:border-orange-400/40"
            >
              <ArrowRight className="text-orange-300" size={18} />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-zinc-500">GitHub</p>
              <p className="mt-2 text-sm text-white">github.com/manojprasad-dot</p>
            </a>
            <a
              href="https://linkedin.com/in/manoj-prasad-92b2322b7"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 p-5 transition hover:border-orange-400/40"
            >
              <Trophy className="text-orange-300" size={18} />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-zinc-500">
                LinkedIn
              </p>
              <p className="mt-2 text-sm text-white">manoj-prasad-92b2322b7</p>
            </a>
            <a
              href="https://manojprasad.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 p-5 transition hover:border-orange-400/40"
            >
              <MapPin className="text-orange-300" size={18} />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-zinc-500">Website</p>
              <p className="mt-2 text-sm text-white">manojprasad.vercel.app</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
