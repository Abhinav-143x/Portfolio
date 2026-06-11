import { useEffect, useMemo, useState } from "react";

const profileLinks = {
  github: "https://github.com/Abhinav-143x",
  linkedin: "https://www.linkedin.com/in/abhinav-gaur143/",
  email: "mailto:mrabhinav2k03@gmail.com",
  phone: "tel:+919335954937",
};

const featuredProjects = [
  {
    title: "FinWise",
    type: "Product",
    signal: "Decision engines",
    repo: "https://github.com/Abhinav-143x/FinWise",
    description:
      "A personal money decision assistant that helps users decide whether to buy, wait, protect a goal, or recover after an unexpected expense.",
    details: [
      "Six decision tools with SAFE / CAUTION / RISKY verdicts",
      "Django + DRF backend with JWT auth and PostgreSQL",
      "React + Vite frontend with shareable and guest flows",
    ],
    stack: ["React", "Vite", "Django", "DRF", "PostgreSQL", "JWT"],
  },
  {
    title: "Lumina",
    type: "AI product",
    signal: "6-service Docker system",
    repo: "https://github.com/Abhinav-143x/lumina",
    description:
      "An AI-powered second brain for notes, habits, calendar, reminders, and context-aware assistance.",
    details: [
      "API, worker, beat, frontend, Redis, and PostgreSQL services",
      "AI summarisation, tag suggestions, reminders, and habit analytics",
      "Developer guide, decision log, and deployment-oriented docs",
    ],
    stack: ["Django", "DRF", "React", "Celery", "Redis", "Docker"],
  },
  {
    title: "Real-Time Price Tracker",
    type: "Backend system",
    signal: "Live WebSocket updates",
    repo: "https://github.com/Abhinav-143x/Price-Tracker",
    description:
      "A monitoring system that scrapes product prices in background jobs and pushes live changes to connected clients.",
    details: [
      "Django Channels WebSocket stream for price updates",
      "Celery worker and beat scheduler for recurring checks",
      "Redis channel layer and PostgreSQL price history",
    ],
    stack: ["Django", "Channels", "Celery", "Redis", "PostgreSQL", "Docker"],
  },
  {
    title: "Django REST Boilerplate",
    type: "Backend starter",
    signal: "Production-minded API",
    repo: "https://github.com/Abhinav-143x/Django-Rest-BoilerPlate",
    description:
      "A reusable API starter with authentication, health checks, rate limiting, docs, and containerized services.",
    details: [
      "JWT authentication with register, login, logout, and refresh flows",
      "Redis-backed throttling and Docker Compose setup",
      "Swagger / ReDoc API documentation and health endpoint",
    ],
    stack: ["Django", "DRF", "SimpleJWT", "Redis", "PostgreSQL", "Swagger"],
  },
];

const labProjects = [
  {
    title: "PA-Agent",
    label: "Knowledge pipeline",
    description:
      "A Discord to GitHub Actions to LLM pipeline that classifies links, scores priority, routes digests, and keeps a Git-backed memory trail.",
    stack: ["Python", "Discord", "GitHub Actions", "LLM", "YAML"],
  },
  {
    title: "Multi-Agent Deliberation",
    label: "Agent reliability",
    description:
      "A vulnerability-assessment experiment using blind-first agent positions, anonymous rebuttal, immutable decisions, and deterministic conflict detection.",
    stack: ["Python", "Qwen", "SQLite", "Evaluation"],
  },
  {
    title: "Reporter / TF-Reporter",
    label: "Research operating system",
    description:
      "A security research memory system for scope checks, duplicate gates, proof ladders, evidence quality, status boards, and next-action routing.",
    stack: ["Next.js", "Docs", "Security research", "Workflow"],
  },
];

const capabilities = [
  {
    title: "Backend Systems",
    copy:
      "APIs, auth flows, data models, service health, docs, background jobs, and deployment paths that another developer can actually run.",
    tags: ["Django", "DRF", "Node.js", "Express", "JWT", "OpenAPI"],
  },
  {
    title: "Automation Pipelines",
    copy:
      "Scheduled workflows, Discord/GitHub loops, ingest routes, digest generation, and human-in-the-loop controls for messy repeated work.",
    tags: ["Python", "GitHub Actions", "Discord", "Schedulers", "Logs"],
  },
  {
    title: "AI Workflows",
    copy:
      "LLM-assisted systems with tools, memory, structure, failure handling, and explicit boundaries around what the model should decide.",
    tags: ["Agents", "Gemini", "Qwen", "Claude", "Vector search"],
  },
  {
    title: "Debugging Mindset",
    copy:
      "Root-cause notes, duplicate checks, proof ladders, evidence quality, and careful reporting before turning a weird behavior into a claim.",
    tags: ["Repro", "Logs", "Triage", "Security", "Docs"],
  },
];

const timeline = [
  {
    date: "2025",
    title: "Software Developer Intern",
    place: "Bit Marvels LLP",
    body:
      "Built dashboards and backend modules, automated repetitive workflow steps, and worked with Django, Node.js, MongoDB, and MySQL.",
  },
  {
    date: "2026",
    title: "Open-source debugging",
    place: "npm CLI",
    body:
      "Contributed a fix for registry path validation behavior in npm Arborist's allow-remote enforcement.",
    link: "https://github.com/npm/cli/pull/9473",
  },
  {
    date: "Now",
    title: "Builder-investigator mode",
    place: "Products, agents, and research systems",
    body:
      "Sharpening backend-heavy product work while building automation and research workflows that preserve state, evidence, and decisions.",
  },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,650;9..144,800&family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;650;760&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #080908; color: #f0efe7; font-family: "Manrope", sans-serif; overflow-x: hidden; }
  button, a { font: inherit; }
  ::selection { background: rgba(196, 167, 94, 0.35); color: inherit; }

  .portfolio {
    --bg: #080908;
    --paper: #101210;
    --paper-2: #151814;
    --ink: #f2efe6;
    --muted: #9da49b;
    --quiet: #656d64;
    --line: #2c332d;
    --accent: #d6b35f;
    --cyan: #7ac6bf;
    --green: #8fbd76;
    --danger: #d98771;
    --shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
    min-height: 100vh;
    color: var(--ink);
    background:
      linear-gradient(90deg, rgba(122, 198, 191, 0.035) 1px, transparent 1px),
      linear-gradient(0deg, rgba(214, 179, 95, 0.035) 1px, transparent 1px),
      var(--bg);
    background-size: 44px 44px;
    transition: background 700ms ease, color 500ms ease;
  }

  .portfolio.light {
    --bg: #f5f7f2;
    --paper: #ffffff;
    --paper-2: #edf1ea;
    --ink: #1d231f;
    --muted: #556159;
    --quiet: #78827a;
    --line: #d7ded6;
    --accent: #8c6a17;
    --cyan: #227a78;
    --green: #547e33;
    --danger: #9f513c;
    --shadow: 0 24px 60px rgba(36, 46, 38, 0.12);
    background:
      linear-gradient(90deg, rgba(34, 122, 120, 0.05) 1px, transparent 1px),
      linear-gradient(0deg, rgba(140, 106, 23, 0.05) 1px, transparent 1px),
      var(--bg);
    background-size: 44px 44px;
  }

  .grain {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 0;
    opacity: 0.18;
    background-image:
      repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px),
      repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 6px);
    mix-blend-mode: soft-light;
  }

  .cursor-dot, .cursor-ring {
    position: fixed;
    z-index: 200;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: opacity 200ms ease;
  }
  .cursor-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
  .cursor-ring {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(214, 179, 95, 0.55);
    border-radius: 50%;
    transition: width 180ms ease, height 180ms ease, border-color 180ms ease, opacity 200ms ease;
  }
  .cursor-ring.active { width: 48px; height: 48px; border-color: var(--cyan); }

  .scroll-track {
    position: fixed;
    right: 24px;
    top: 96px;
    bottom: 96px;
    width: 1px;
    background: var(--line);
    z-index: 70;
  }
  .scroll-fill {
    width: 100%;
    background: linear-gradient(var(--accent), var(--cyan), var(--green));
    transform-origin: top;
    transition: height 120ms linear;
  }
  .scroll-chip {
    position: fixed;
    right: 12px;
    bottom: 32px;
    z-index: 70;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.7rem;
    color: var(--quiet);
    writing-mode: vertical-rl;
  }

  .nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px clamp(18px, 4vw, 54px);
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid transparent;
    transition: border-color 250ms ease, background 350ms ease;
  }
  .nav.scrolled { border-bottom-color: var(--line); }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--ink);
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
  }
  .brand-mark {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid var(--line);
    background: var(--paper);
    color: var(--accent);
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .nav-links a, .theme-toggle {
    color: var(--muted);
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
    border: 0;
    background: transparent;
    padding: 8px 0;
    cursor: pointer;
  }
  .nav-links a:hover, .theme-toggle:hover { color: var(--ink); }
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border: 1px solid var(--line);
    background: var(--paper);
  }
  .theme-toggle::before {
    content: "";
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 18px var(--accent);
  }

  main { position: relative; z-index: 1; }
  section { padding: clamp(72px, 10vw, 130px) clamp(18px, 5vw, 72px); }
  .section-kicker {
    display: flex;
    align-items: center;
    gap: 14px;
    color: var(--accent);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
    margin-bottom: 22px;
  }
  .section-kicker::after {
    content: "";
    height: 1px;
    flex: 1;
    background: var(--line);
  }
  .section-title {
    margin: 0 0 34px;
    font-family: "Fraunces", serif;
    font-size: clamp(2.1rem, 5vw, 4.5rem);
    line-height: 0.98;
    font-weight: 800;
  }
  .section-copy {
    max-width: 760px;
    color: var(--muted);
    font-size: clamp(1rem, 1.5vw, 1.12rem);
    line-height: 1.8;
  }

  .hero {
    position: relative;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.7fr);
    gap: clamp(28px, 5vw, 72px);
    align-items: end;
    padding-top: 120px;
  }
  .hero-copy { padding-bottom: clamp(30px, 7vw, 82px); }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--accent);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.82rem;
    margin-bottom: 24px;
  }
  .eyebrow::before {
    content: "";
    width: 22px;
    height: 1px;
    background: var(--accent);
  }
  .hero h1 {
    margin: 0;
    font-family: "Fraunces", serif;
    font-size: clamp(4.2rem, 12vw, 11rem);
    line-height: 0.86;
    font-weight: 800;
  }
  .hero h1 span {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1px var(--accent);
  }
  .hero-lede {
    margin: 28px 0 0;
    max-width: 720px;
    color: var(--muted);
    font-size: clamp(1.06rem, 1.8vw, 1.32rem);
    line-height: 1.65;
  }
  .hero-lede strong { color: var(--ink); font-weight: 650; }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 34px;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 0 18px;
    color: var(--ink);
    text-decoration: none;
    border: 1px solid var(--line);
    background: var(--paper);
    box-shadow: none;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
  }
  .btn.primary {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
    font-weight: 760;
  }
  .btn:hover { transform: translateY(-2px); border-color: var(--accent); }

  .pipeline-panel {
    position: relative;
    margin-bottom: clamp(20px, 7vw, 82px);
    border: 1px solid var(--line);
    background: color-mix(in srgb, var(--paper) 86%, transparent);
    box-shadow: var(--shadow);
    padding: 22px;
    overflow: hidden;
  }
  .pipeline-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent 0, color-mix(in srgb, var(--cyan) 18%, transparent) 50%, transparent 100%);
    transform: translateX(-100%);
    animation: sweep 5.8s ease-in-out infinite;
    opacity: 0.35;
  }
  .panel-head, .pipe-node, .signal-row { position: relative; z-index: 1; }
  .panel-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    color: var(--quiet);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.76rem;
    margin-bottom: 22px;
  }
  .pipe {
    display: grid;
    gap: 12px;
  }
  .pipe-node {
    display: grid;
    grid-template-columns: 34px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--line);
    background: var(--bg);
  }
  .node-dot {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    color: var(--accent);
    font-family: "IBM Plex Mono", monospace;
  }
  .node-title {
    font-weight: 760;
  }
  .node-sub {
    color: var(--quiet);
    font-size: 0.82rem;
    margin-top: 2px;
  }
  .node-pulse {
    width: 9px;
    height: 9px;
    background: var(--green);
    border-radius: 50%;
    box-shadow: 0 0 18px var(--green);
    animation: pulse 1.9s ease-in-out infinite;
  }
  .signal-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    margin-top: 18px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .signal {
    background: var(--paper-2);
    padding: 14px;
  }
  .signal strong {
    display: block;
    font-family: "Fraunces", serif;
    font-size: 1.5rem;
    color: var(--accent);
  }
  .signal span {
    display: block;
    margin-top: 4px;
    color: var(--quiet);
    font-size: 0.76rem;
  }

  .about-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(24px, 5vw, 70px);
  }
  .principles {
    display: grid;
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .principle {
    background: var(--paper);
    padding: 22px;
  }
  .principle strong {
    display: block;
    color: var(--ink);
    margin-bottom: 6px;
  }
  .principle span { color: var(--muted); line-height: 1.7; }

  .capability-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .cap-card {
    background: var(--paper);
    padding: 24px;
    min-height: 260px;
  }
  .cap-card h3 {
    margin: 0 0 12px;
    font-family: "Fraunces", serif;
    font-size: 1.45rem;
  }
  .cap-card p {
    margin: 0 0 22px;
    color: var(--muted);
    line-height: 1.7;
    font-size: 0.94rem;
  }
  .tag-row { display: flex; flex-wrap: wrap; gap: 7px; }
  .tag {
    border: 1px solid var(--line);
    color: var(--muted);
    background: var(--paper-2);
    padding: 5px 8px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.72rem;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .project-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 390px;
    padding: 26px;
    border: 1px solid var(--line);
    background: var(--paper);
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .project-card::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--cyan), var(--green));
    transform: scaleX(0.18);
    transform-origin: left;
    transition: transform 250ms ease;
  }
  .project-card:hover::after { transform: scaleX(1); }
  .project-meta {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    color: var(--quiet);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.74rem;
    margin-bottom: 20px;
  }
  .project-card h3 {
    margin: 0 0 10px;
    font-family: "Fraunces", serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    line-height: 1;
  }
  .project-card p {
    margin: 0 0 18px;
    color: var(--muted);
    line-height: 1.7;
  }
  .detail-list {
    margin: 0 0 22px;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }
  .detail-list li {
    color: var(--muted);
    line-height: 1.5;
    padding-left: 18px;
    position: relative;
  }
  .detail-list li::before {
    content: ">";
    position: absolute;
    left: 0;
    color: var(--accent);
    font-family: "IBM Plex Mono", monospace;
  }
  .project-footer {
    margin-top: auto;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 18px;
  }
  .project-link {
    color: var(--ink);
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.82rem;
    border-bottom: 1px solid var(--accent);
  }

  .lab-strip {
    margin-top: 22px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }
  .lab-card {
    border: 1px solid var(--line);
    background: color-mix(in srgb, var(--paper) 82%, transparent);
    padding: 20px;
  }
  .lab-label {
    color: var(--accent);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.74rem;
    margin-bottom: 12px;
  }
  .lab-card h3 {
    margin: 0 0 10px;
    font-family: "Fraunces", serif;
    font-size: 1.45rem;
  }
  .lab-card p {
    color: var(--muted);
    line-height: 1.65;
    margin: 0 0 16px;
    font-size: 0.92rem;
  }

  .timeline {
    display: grid;
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .time-item {
    display: grid;
    grid-template-columns: 110px minmax(0, 1fr) auto;
    gap: 20px;
    align-items: start;
    background: var(--paper);
    padding: 22px;
  }
  .time-date {
    font-family: "IBM Plex Mono", monospace;
    color: var(--accent);
  }
  .time-title {
    margin: 0;
    font-family: "Fraunces", serif;
    font-size: 1.5rem;
  }
  .time-place {
    color: var(--quiet);
    margin-top: 3px;
  }
  .time-body {
    color: var(--muted);
    line-height: 1.65;
    margin-top: 10px;
  }
  .time-link {
    color: var(--ink);
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.8rem;
    border-bottom: 1px solid var(--accent);
  }

  .contact {
    padding-bottom: 56px;
  }
  .contact-box {
    border: 1px solid var(--line);
    background: var(--paper);
    box-shadow: var(--shadow);
    padding: clamp(28px, 6vw, 62px);
    display: grid;
    grid-template-columns: 1fr 0.8fr;
    gap: 32px;
  }
  .contact h2 {
    margin: 0;
    font-family: "Fraunces", serif;
    font-size: clamp(2.6rem, 7vw, 6rem);
    line-height: 0.94;
  }
  .contact p {
    color: var(--muted);
    max-width: 620px;
    line-height: 1.75;
  }
  .contact-links {
    display: grid;
    gap: 10px;
  }
  .contact-link {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    color: var(--ink);
    text-decoration: none;
    border: 1px solid var(--line);
    background: var(--bg);
    padding: 14px 16px;
  }
  .contact-link span:first-child {
    color: var(--quiet);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
  }
  .footer {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 18px;
    padding: 22px clamp(18px, 5vw, 72px);
    border-top: 1px solid var(--line);
    color: var(--quiet);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.76rem;
  }

  .reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 650ms ease, transform 650ms ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.55); opacity: 0.45; }
  }
  @keyframes sweep {
    0%, 32% { transform: translateX(-105%); }
    62%, 100% { transform: translateX(105%); }
  }

  @media (max-width: 1020px) {
    .hero, .about-grid, .contact-box { grid-template-columns: 1fr; }
    .pipeline-panel { margin-bottom: 0; }
    .capability-grid, .project-grid, .lab-strip { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 720px) {
    .cursor-dot, .cursor-ring, .scroll-track, .scroll-chip { display: none; }
    .nav-links a { display: none; }
    .hero { min-height: auto; padding-top: 110px; }
    .capability-grid, .project-grid, .lab-strip, .signal-row { grid-template-columns: 1fr; }
    .time-item { grid-template-columns: 1fr; }
    .project-card { min-height: auto; }
    .project-footer { align-items: start; flex-direction: column; }
    .footer { flex-direction: column; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
    }
  }
`;

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { progress, scrolled };
}

function useCursor() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });

  useEffect(() => {
    const move = (event) => {
      const target = event.target;
      const active = Boolean(target.closest("a, button"));
      setCursor({ x: event.clientX, y: event.clientY, active });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return cursor;
}

function ProjectCard({ project }) {
  return (
    <article className="project-card reveal">
      <div className="project-meta">
        <span>{project.type}</span>
        <span>{project.signal}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="detail-list">
        {project.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <div className="project-footer">
        <div className="tag-row">
          {project.stack.map((item) => (
            <span className="tag" key={item}>{item}</span>
          ))}
        </div>
        <a className="project-link" href={project.repo} target="_blank" rel="noreferrer">
          repo
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { progress, scrolled } = useScrollProgress();
  const cursor = useCursor();
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const pipeNodes = useMemo(
    () => [
      ["01", "capture", "messy workflow, logs, data, ideas"],
      ["02", "model", "states, failure modes, contracts"],
      ["03", "ship", "APIs, agents, dashboards, docs"],
      ["04", "learn", "evidence, feedback, next iteration"],
    ],
    []
  );

  return (
    <>
      <style>{style}</style>
      <div className={`portfolio ${theme}`}>
        <div className="grain" />
        <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
        <div className={`cursor-ring${cursor.active ? " active" : ""}`} style={{ left: cursor.x, top: cursor.y }} />
        <div className="scroll-track">
          <div className="scroll-fill" style={{ height: `${progress * 100}%` }} />
        </div>
        <div className="scroll-chip">pipeline {Math.round(progress * 100)}%</div>

        <nav className={`nav${scrolled ? " scrolled" : ""}`}>
          <a href="#top" className="brand">
            <span className="brand-mark">AG</span>
            <span>Abhinav</span>
          </a>
          <div className="nav-links">
            <a href="#work">work</a>
            <a href="#labs">labs</a>
            <a href="#timeline">log</a>
            <a href="#contact">contact</a>
            <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "light" : "dark"}
            </button>
          </div>
        </nav>

        <main id="top">
          <section className="hero">
            <div className="hero-copy reveal">
              <div className="eyebrow">full-stack systems / agents / debugging</div>
              <h1>
                Abhinav
                <span>Gaur</span>
              </h1>
              <p className="hero-lede">
                I build <strong>backend-heavy products</strong>, automation pipelines, and AI-assisted workflows that are useful, documented, and designed to survive the first weird failure.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#work">view work</a>
                <a className="btn" href={profileLinks.github} target="_blank" rel="noreferrer">github</a>
                <a className="btn" href="#contact">contact</a>
              </div>
            </div>

            <aside className="pipeline-panel reveal">
              <div className="panel-head">
                <span>operator loop</span>
                <span>status: building</span>
              </div>
              <div className="pipe">
                {pipeNodes.map(([num, title, sub]) => (
                  <div className="pipe-node" key={title}>
                    <span className="node-dot">{num}</span>
                    <span>
                      <span className="node-title">{title}</span>
                      <span className="node-sub">{sub}</span>
                    </span>
                    <span className="node-pulse" />
                  </div>
                ))}
              </div>
              <div className="signal-row">
                <div className="signal"><strong>6</strong><span>Lumina services</span></div>
                <div className="signal"><strong>12h</strong><span>PA-Agent cycle</span></div>
                <div className="signal"><strong>1</strong><span>npm fix merged</span></div>
              </div>
            </aside>
          </section>

          <section id="about">
            <div className="section-kicker reveal">01 / signal</div>
            <div className="about-grid">
              <div>
                <h2 className="section-title reveal">Builder with a failure-map habit.</h2>
                <p className="section-copy reveal">
                  My work sits at the intersection of product engineering, backend systems, AI workflows, and security-minded debugging. I like projects where the architecture matters: APIs, workers, queues, data models, logs, docs, and the tiny operational details that make a system understandable.
                </p>
              </div>
              <div className="principles reveal">
                <div className="principle">
                  <strong>Build the useful core first.</strong>
                  <span>Decision engines, API contracts, dashboards, background jobs, and real data flows before decorative complexity.</span>
                </div>
                <div className="principle">
                  <strong>Keep evidence around.</strong>
                  <span>When something fails, I want the log, the reason, the next action, and the lesson recorded before it becomes fog.</span>
                </div>
                <div className="principle">
                  <strong>Use AI inside workflows.</strong>
                  <span>Agents should ingest, route, remember, call tools, and hand back useful work with boundaries.</span>
                </div>
              </div>
            </div>
          </section>

          <section id="capabilities">
            <div className="section-kicker reveal">02 / stack</div>
            <h2 className="section-title reveal">Capabilities</h2>
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article className="cap-card reveal" key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                  <div className="tag-row">
                    {capability.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="work">
            <div className="section-kicker reveal">03 / shipped work</div>
            <h2 className="section-title reveal">Selected projects</h2>
            <div className="project-grid">
              {featuredProjects.map((project) => (
                <ProjectCard project={project} key={project.title} />
              ))}
            </div>
          </section>

          <section id="labs">
            <div className="section-kicker reveal">04 / labs</div>
            <h2 className="section-title reveal">Agents, memory, and research loops</h2>
            <p className="section-copy reveal">
              Some of my favorite work is not a classic app. It is process infrastructure: pipelines that remember, agents that route work, and research systems that keep track of proof, duplicates, blockers, and next actions.
            </p>
            <div className="lab-strip">
              {labProjects.map((project) => (
                <article className="lab-card reveal" key={project.title}>
                  <div className="lab-label">{project.label}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.stack.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="timeline">
            <div className="section-kicker reveal">05 / log</div>
            <h2 className="section-title reveal">Timeline</h2>
            <div className="timeline">
              {timeline.map((item) => (
                <article className="time-item reveal" key={item.title}>
                  <div className="time-date">{item.date}</div>
                  <div>
                    <h3 className="time-title">{item.title}</h3>
                    <div className="time-place">{item.place}</div>
                    <div className="time-body">{item.body}</div>
                  </div>
                  {item.link ? <a className="time-link" href={item.link} target="_blank" rel="noreferrer">proof</a> : <span />}
                </article>
              ))}
            </div>
          </section>

          <section className="contact" id="contact">
            <div className="contact-box reveal">
              <div>
                <div className="section-kicker">06 / contact</div>
                <h2>Let's build the next useful thing.</h2>
                <p>
                  Open to full-stack, backend, AI workflow, and support/debugging-heavy engineering roles. I am happiest around systems that need both product sense and root-cause patience.
                </p>
              </div>
              <div className="contact-links">
                <a className="contact-link" href={profileLinks.email}><span>email</span><strong>mrabhinav2k03@gmail.com</strong></a>
                <a className="contact-link" href={profileLinks.linkedin} target="_blank" rel="noreferrer"><span>linkedin</span><strong>abhinav-gaur143</strong></a>
                <a className="contact-link" href={profileLinks.github} target="_blank" rel="noreferrer"><span>github</span><strong>Abhinav-143x</strong></a>
                <a className="contact-link" href={profileLinks.phone}><span>phone</span><strong>+91 93359 54937</strong></a>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span>Abhinav Gaur / built with React</span>
          <span>Noida, India / 2026</span>
        </footer>
      </div>
    </>
  );
}
