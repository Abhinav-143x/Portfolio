import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --surface2: #181818;
    --border: #242424;
    --text: #e8e4dc;
    --muted: #5a5a5a;
    --accent: #f0a500;
    --accent-dim: rgba(240,165,0,0.12);
    --font-display: 'Playfair Display', Georgia, serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); }

  /* ── Nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.25rem 3rem;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
  }
  .nav.scrolled { border-color: var(--border); }
  .nav-logo {
    font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500;
    color: var(--accent); letter-spacing: 0.08em; text-decoration: none;
  }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono); font-size: 0.72rem; font-weight: 400;
    color: var(--muted); text-decoration: none; letter-spacing: 0.1em;
    text-transform: uppercase; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text); }

  /* ── Hero ── */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 3rem 5rem;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 30%, rgba(240,165,0,0.06) 0%, transparent 60%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 59px,
        rgba(255,255,255,0.018) 59px,
        rgba(255,255,255,0.018) 60px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 59px,
        rgba(255,255,255,0.018) 59px,
        rgba(255,255,255,0.018) 60px
      );
  }
  .hero-eyebrow {
    font-family: var(--font-mono); font-size: 0.72rem; font-weight: 400;
    color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase;
    margin-bottom: 1.5rem; position: relative; z-index: 1;
    opacity: 0; animation: fadeUp 0.7s 0.2s forwards;
  }
  .hero-name {
    font-family: var(--font-display); font-size: clamp(4rem, 10vw, 9rem);
    font-weight: 900; line-height: 0.92; letter-spacing: -0.02em;
    position: relative; z-index: 1;
    opacity: 0; animation: fadeUp 0.8s 0.4s forwards;
  }
  .hero-name em {
    font-style: italic; color: var(--accent);
    display: block;
  }
  .hero-sub {
    margin-top: 2rem;
    display: flex; align-items: center; gap: 2rem;
    position: relative; z-index: 1;
    opacity: 0; animation: fadeUp 0.8s 0.65s forwards;
  }
  .hero-sub-line { width: 48px; height: 1px; background: var(--accent); flex-shrink: 0; }
  .hero-sub-text {
    font-family: var(--font-body); font-size: 1.05rem; font-weight: 300;
    color: var(--muted); max-width: 480px;
  }
  .hero-sub-text strong { color: var(--text); font-weight: 400; }
  .hero-cta {
    margin-top: 3rem; display: flex; gap: 1rem;
    position: relative; z-index: 1;
    opacity: 0; animation: fadeUp 0.8s 0.85s forwards;
  }
  .btn-primary {
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    background: var(--accent); color: #0a0a0a;
    border: none; padding: 0.9rem 2rem; cursor: pointer;
    text-decoration: none; display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(240,165,0,0.3); }
  .btn-ghost {
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    background: transparent; color: var(--text);
    border: 1px solid var(--border); padding: 0.9rem 2rem; cursor: pointer;
    text-decoration: none; display: inline-block;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-ghost:hover { border-color: var(--text); }
  .hero-scroll {
    position: absolute; right: 3rem; bottom: 5rem; z-index: 1;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    opacity: 0; animation: fadeIn 1s 1.2s forwards;
  }
  .hero-scroll span {
    font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--muted);
    writing-mode: vertical-rl;
  }
  .scroll-line {
    width: 1px; height: 60px; background: var(--border);
    position: relative; overflow: hidden;
  }
  .scroll-line::after {
    content: ''; position: absolute; top: -100%; left: 0;
    width: 100%; height: 100%; background: var(--accent);
    animation: scrollDown 2s 1.5s infinite;
  }

  /* ── Section commons ── */
  section { padding: 7rem 3rem; position: relative; }
  .section-header {
    display: flex; align-items: baseline; gap: 1.5rem;
    margin-bottom: 4rem;
  }
  .section-num {
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.1em; padding-top: 0.25rem;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 700; line-height: 1;
  }
  .section-line {
    flex: 1; height: 1px; background: var(--border); margin-bottom: 0.4rem;
  }

  /* ── About ── */
  .about { background: var(--surface); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem;
    align-items: start;
  }
  .about-text p {
    font-size: 1rem; color: var(--muted); margin-bottom: 1.25rem; line-height: 1.8;
  }
  .about-text p strong { color: var(--text); font-weight: 400; }
  .about-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .stat {
    background: var(--surface2); padding: 2rem;
    transition: background 0.2s;
  }
  .stat:hover { background: var(--surface); }
  .stat-num {
    font-family: var(--font-display); font-size: 3rem; font-weight: 900;
    color: var(--accent); line-height: 1;
  }
  .stat-label {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted);
    letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem;
  }

  /* ── Skills ── */
  .skills-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .skill-group {
    background: var(--bg); padding: 2.5rem 2rem;
    transition: background 0.2s;
  }
  .skill-group:hover { background: var(--surface); }
  .skill-group-label {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1.5rem;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tag {
    font-family: var(--font-mono); font-size: 0.72rem; font-weight: 400;
    color: var(--text); background: var(--surface2);
    border: 1px solid var(--border); padding: 0.35rem 0.75rem;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .tag:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

  /* ── Projects ── */
  .projects { background: var(--surface); }
  .projects-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--border); border: 1px solid var(--border);
  }
  .project-card {
    background: var(--bg); padding: 2.5rem;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
    transition: background 0.3s;
    cursor: default;
  }
  .project-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: var(--accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .project-card:hover { background: var(--surface2); }
  .project-card:hover::before { transform: scaleX(1); }
  .project-num {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--border);
    letter-spacing: 0.1em; margin-bottom: 2rem;
    transition: color 0.3s;
  }
  .project-card:hover .project-num { color: var(--accent); }
  .project-title {
    font-family: var(--font-display); font-size: 1.4rem; font-weight: 700;
    line-height: 1.15; margin-bottom: 1rem;
  }
  .project-desc {
    font-size: 0.88rem; color: var(--muted); line-height: 1.7;
    flex: 1; margin-bottom: 2rem;
  }
  .project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
  .stack-tag {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--muted);
    border: 1px solid var(--border); padding: 0.2rem 0.6rem;
  }
  .project-links { display: flex; gap: 1rem; }
  .project-link {
    font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text); text-decoration: none;
    display: flex; align-items: center; gap: 0.4rem;
    transition: color 0.2s;
  }
  .project-link:hover { color: var(--accent); }
  .project-link svg { width: 12px; height: 12px; }

  /* ── Experience ── */
  .experience-timeline { position: relative; padding-left: 2rem; }
  .experience-timeline::before {
    content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
    width: 1px; background: var(--border);
  }
  .exp-item {
    position: relative; padding: 0 0 3.5rem 2.5rem;
  }
  .exp-item::before {
    content: ''; position: absolute; left: -2rem; top: 8px;
    width: 7px; height: 7px;
    border: 1px solid var(--accent); background: var(--bg);
    transform: rotate(45deg);
  }
  .exp-meta {
    display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }
  .exp-period {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent);
    letter-spacing: 0.08em;
  }
  .exp-divider { width: 20px; height: 1px; background: var(--border); }
  .exp-company {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted);
    letter-spacing: 0.08em;
  }
  .exp-role {
    font-family: var(--font-display); font-size: 1.5rem; font-weight: 700;
    margin-bottom: 1.25rem;
  }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    font-size: 0.9rem; color: var(--muted); line-height: 1.7;
    padding-left: 1.25rem; position: relative; margin-bottom: 0.5rem;
  }
  .exp-bullets li::before {
    content: '→'; position: absolute; left: 0;
    color: var(--accent); font-size: 0.8rem;
  }
  .exp-bullets li strong { color: var(--text); font-weight: 400; }

  /* ── Contact ── */
  .contact { background: var(--surface); overflow: hidden; }
  .contact-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .contact-heading {
    font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 900; line-height: 0.95; letter-spacing: -0.02em;
  }
  .contact-heading em { font-style: italic; color: var(--accent); display: block; }
  .contact-tagline {
    font-size: 0.95rem; color: var(--muted); margin-top: 1.5rem; max-width: 340px;
  }
  .contact-links { display: flex; flex-direction: column; gap: 0.5rem; }
  .contact-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--border);
    text-decoration: none; color: var(--text);
    transition: border-color 0.2s, background 0.2s;
  }
  .contact-link:hover { border-color: var(--accent); background: var(--accent-dim); }
  .contact-link-label {
    font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 0.2rem;
  }
  .contact-link-val { font-size: 0.9rem; }
  .contact-link-arrow {
    font-size: 1.2rem; color: var(--muted);
    transition: transform 0.2s, color 0.2s;
  }
  .contact-link:hover .contact-link-arrow { transform: translate(3px,-3px); color: var(--accent); }

  /* ── Footer ── */
  .footer {
    padding: 2rem 3rem; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--muted);
    letter-spacing: 0.08em;
  }
  .footer-copy span { color: var(--accent); }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes scrollDown {
    0%   { top: -100%; }
    100% { top: 100%; }
  }
  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    section, .hero, .footer { padding-left: 1.5rem; padding-right: 1.5rem; }
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .about-grid, .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
    .skills-grid, .projects-grid { grid-template-columns: 1fr; }
    .hero-scroll { display: none; }
  }
`;

const projects = [
  {
    num: "01",
    title: "E-Commerce Discussion Platform",
    desc: "Full-stack platform for product discussions and real-time reviews. 12+ secure REST APIs, WebSocket-based live notifications, and a Node.js price-tracking microservice.",
    stack: ["Django", "Angular", "JWT", "WebSockets", "Node.js", "PostgreSQL"],
    github: "https://github.com/abhinav-gaur143",
  },
  {
    num: "02",
    title: "Real-Time Price Tracker",
    desc: "Monitors product prices across e-commerce sites using scheduled Celery scraping. Live alerts pushed to the browser via Django Channels and Redis channel layer.",
    stack: ["Django", "Celery", "Redis", "Channels", "BeautifulSoup", "Docker"],
    github: "https://github.com/abhinav-gaur143",
  },
  {
    num: "03",
    title: "Document Classifier API",
    desc: "BERT-based NLP pipeline achieving 85% classification accuracy. Optimised preprocessing cut runtime by 40%. Containerised with Docker, deployed on AWS EC2.",
    stack: ["FastAPI", "HuggingFace", "BERT", "Docker", "AWS EC2", "React"],
    github: "https://github.com/abhinav-gaur143",
  },
];

const skills = [
  {
    label: "Languages",
    tags: ["Python", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks",
    tags: ["Django", "DRF", "Node.js", "Express.js", "React.js", "Angular", "FastAPI"],
  },
  {
    label: "Databases",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "DevOps & Tools",
    tags: ["Docker", "AWS EC2", "Git", "Linux", "Celery", "WebSockets"],
  },
  {
    label: "Core CS",
    tags: ["Data Structures", "Algorithms", "OOP", "DBMS", "REST APIs", "System Design"],
  },
  {
    label: "ML / AI",
    tags: ["Scikit-learn", "TensorFlow", "HuggingFace", "NLP", "BERT"],
  },
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{style}</style>

      {/* ── Nav ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">AG.dev</a>
        <ul className="nav-links">
          {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-eyebrow">Backend & Full-Stack Engineer · Graduating 2026</div>
        <h1 className="hero-name">
          Abhinav<em>Gaur.</em>
        </h1>
        <div className="hero-sub">
          <div className="hero-sub-line" />
          <p className="hero-sub-text">
            Building <strong>backend systems that scale</strong> — REST APIs, real-time pipelines,
            and NLP services. Python, Django, Node.js, Docker, AWS.
          </p>
        </div>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about" id="about">
        <div className="section-header reveal">
          <span className="section-num">01</span>
          <h2 className="section-title">About</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm a final-year B.Tech student at <strong>Noida Institute of Engineering & Technology</strong>,
              specialising in Computer Science with a focus on Artificial Intelligence.
            </p>
            <p>
              My internship at <strong>Bit Marvels LLP</strong> had me shipping backend features in
              Django and Node.js, designing database schemas, and cutting manual reporting effort by 35%.
              I move fast in Agile teams and hit deadlines — 95% on-time across all sprints.
            </p>
            <p>
              Outside work I led a 4-member team to build a <strong>BERT document classifier</strong> for
              Smart India Hackathon 2023 — deployed live on AWS during judging. That project is what
              made me fall in love with the intersection of backend engineering and ML systems.
            </p>
          </div>
          <div className="about-stats reveal reveal-delay-2">
            <div className="about-stats">
              {[
                { num: "35%", label: "Reporting effort reduced" },
                { num: "95%", label: "Sprint on-time rate" },
                { num: "85%", label: "NLP classifier accuracy" },
                { num: "40%", label: "Preprocessing speedup" },
              ].map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills">
        <div className="section-header reveal">
          <span className="section-num">02</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid reveal">
          {skills.map((g, i) => (
            <div className="skill-group" key={g.label}>
              <div className="skill-group-label">{g.label}</div>
              <div className="skill-tags">
                {g.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="projects" id="projects">
        <div className="section-header reveal">
          <span className="section-num">03</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className={`project-card reveal reveal-delay-${i + 1}`} key={p.num}>
              <div className="project-num">{p.num} / 03</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
              </div>
              <div className="project-links">
                <a href={p.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience">
        <div className="section-header reveal">
          <span className="section-num">04</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="experience-timeline">
          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-period">May 2025 — Aug 2025</span>
              <div className="exp-divider" />
              <span className="exp-company">Bit Marvels LLP · Pune</span>
            </div>
            <div className="exp-role">Software Developer Intern</div>
            <ul className="exp-bullets">
              <li>Built <strong>5+ business dashboards</strong> improving reporting visibility and reducing manual effort by <strong>35%</strong>.</li>
              <li>Developed backend features in <strong>Python, Django, and Node.js</strong>, automating workflows and cutting repetitive steps by 30%.</li>
              <li>Designed and optimised <strong>MongoDB/MySQL schemas</strong>, improving data retrieval speed by 25%.</li>
              <li>Delivered sprint tasks in an Agile environment with a <strong>95% on-time completion rate</strong>.</li>
              <li>Collaborated on bug resolution and feature deployments, reducing turnaround time by 20%.</li>
            </ul>
          </div>
          <div className="exp-item reveal reveal-delay-1">
            <div className="exp-meta">
              <span className="exp-period">2023</span>
              <div className="exp-divider" />
              <span className="exp-company">Smart India Hackathon · SIH-1383</span>
            </div>
            <div className="exp-role">Team Lead — NLP Track</div>
            <ul className="exp-bullets">
              <li>Led a 4-member team to design a <strong>BERT-based document classification pipeline</strong> achieving 85% accuracy.</li>
              <li>Reduced preprocessing runtime by <strong>40%</strong> through optimised text cleaning, batching, and tokenisation.</li>
              <li>Containerised the application with <strong>Docker</strong> and deployed on <strong>AWS EC2</strong> for the live judging round.</li>
              <li>Managed task delegation, integration, and deployment under strict hackathon deadlines.</li>
            </ul>
          </div>
          <div className="exp-item reveal reveal-delay-2">
            <div className="exp-meta">
              <span className="exp-period">2022 — 2026</span>
              <div className="exp-divider" />
              <span className="exp-company">NIET Greater Noida</span>
            </div>
            <div className="exp-role">B.Tech — CS & AI</div>
            <ul className="exp-bullets">
              <li>Specialisation in <strong>Artificial Intelligence</strong> within Computer Science & Engineering.</li>
              <li>Relevant coursework: Data Structures, DBMS, Operating Systems, Machine Learning, System Design.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact" id="contact">
        <div className="section-header reveal">
          <span className="section-num">05</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
        </div>
        <div className="contact-inner">
          <div className="reveal">
            <h2 className="contact-heading">Let's<em>work.</em></h2>
            <p className="contact-tagline">
              Open to SDE-1, Backend, and Full-Stack roles. Currently available from mid-2026.
              Always happy to talk systems, APIs, or good coffee.
            </p>
          </div>
          <div className="contact-links reveal reveal-delay-1">
            {[
              { label: "Email", val: "mrabhinav2k03@gmail.com", href: "mailto:mrabhinav2k03@gmail.com" },
              { label: "LinkedIn", val: "linkedin.com/in/abhinav-gaur143", href: "https://linkedin.com/in/abhinav-gaur143" },
              { label: "GitHub", val: "github.com/abhinav-gaur143", href: "https://github.com/abhinav-gaur143" },
              { label: "Phone", val: "+91 93359 54937", href: "tel:+919335954937" },
            ].map((c) => (
              <a key={c.label} className="contact-link" href={c.href} target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="contact-link-label">{c.label}</div>
                  <div className="contact-link-val">{c.val}</div>
                </div>
                <span className="contact-link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-copy">© 2026 <span>Abhinav Gaur</span>. Built with React.</span>
        <span className="footer-copy">Greater Noida, India</span>
      </footer>
    </>
  );
}
