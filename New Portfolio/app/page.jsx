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
  "Third-year Cybersecurity student with a strong interest in cybersecurity, artificial intelligence, and software development. Skilled in Python, network security, and threat analysis, with hands-on experience building phishing detection and malicious-traffic monitoring projects.";

const profileCards = [
  {
    title: "About Me",
    body: "Passionate about solving real-world security challenges, learning emerging technologies, and building practical solutions that combine cybersecurity with AI-driven systems.",
  },
  {
    title: "Education",
    body: "B.E. Cyber Security at SRM Valliammai Engineering College (2023-2027) with a 7.55 CGPA, plus XII at Jeeva Montessori Matric Hr. Sec. School with 81%.",
  },
  {
    title: "Core Strengths",
    body: "Python, network security, threat analysis, Wireshark, Burp Suite Basics, Linux Basics, browser developer tools, and TCP/IP, DNS, HTTP/HTTPS fundamentals.",
  },
];

const highlights = [
  { value: "3", label: "Projects" },
  { value: "7.55", label: "College CGPA" },
  { value: "2", label: "Certifications" },
  { value: "1st", label: "Best CTF Finish" },
];

const focusAreas = [
  "Cybersecurity",
  "Artificial Intelligence",
  "Software Development",
  "Threat Analysis",
  "Network Security",
  "Phishing Detection",
];

const education = [
  {
    title: "SRM Valliammai Engineering College",
    subtitle: "B.E. Cyber Security",
    meta: "2023-2027",
    detail: "7.55 CGPA",
  },
  {
    title: "Jeeva Montessori Matric Hr. Sec. School",
    subtitle: "XII",
    meta: "2023",
    detail: "81%",
  },
];

const projects = [
  {
    title: "PhishGuard",
    subtitle: "AI-Based Browser Anti-Phishing Extension",
    tag: "Phishing Detection",
    image: "/assets/images/project-threat.png",
    description:
      "An AI-powered browser extension for real-time phishing website detection using machine-learning-based URL and webpage analysis, with an alert system that warns users about malicious sites.",
    github: "https://github.com/manojprasad-dot/anti-phishing-detection",
    demo: "https://phishguard26.netlify.app",
  },
  {
    title: "Hustlefy",
    subtitle: "Job Matching Platform",
    tag: "Software Development",
    image: "/assets/images/project-pentest.png",
    description:
      "A hyperlocal gig marketplace connecting workers with on-demand job opportunities through an efficient job-matching system based on skills and location.",
  },
  {
    title: "KovirX",
    subtitle: "Cybersecurity & Botnet Detection Platform",
    tag: "Threat Analysis",
    image: "/assets/images/project-soc.png",
    description:
      "An AI-powered cybersecurity platform for real-time botnet and malicious traffic detection using automated monitoring, alerts, and network traffic analysis.",
  },
];

const skills = [
  "Python Programming",
  "Linux Basics",
  "Wireshark",
  "Burp Suite Basics",
  "Browser Developer Tools",
  "TCP/IP",
  "DNS",
  "HTTP/HTTPS",
];

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Next24tech",
    image: "/assets/images/blog-3.png",
    href: null,
  },
  {
    title: "Generative AI Foundations Training Badge",
    issuer: "AWS Academy Graduate",
    image: "/assets/images/blog-2.png",
    href: "https://www.credly.com/badges/62cfddb4-44d3-4c81-b9e9-816869e02a4c",
  },
];

const achievements = [
  "Winner in CTF at Sai Ram Engineering College (2025) - 1st",
  "Participated in CTF at Rajalakshmi Engineering College (2026) - 7th",
  "Participated in WTF 3.0 - Hack The Box Chennai x SRM IST (2026) - 8th",
];

const languages = ["Tamil", "English"];

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
          <Link
            href="/running"
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/20"
          >
            Running Dashboard
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            <Shield size={14} />
            Third-Year Cybersecurity Student
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
              href="/resume4pdf.pdf"
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

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[2rem] border border-orange-500/20 bg-gradient-to-r from-orange-500/12 via-white/[0.03] to-blue-500/12 p-8 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
              Beyond The Resume
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl">
              Running dashboard as a discipline lens
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              The running page still adds a personal dimension to the portfolio by showing consistency, endurance, and how progress is measured over time outside academics and projects.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Link
              href="/running"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
            >
              Open Running Page
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
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
