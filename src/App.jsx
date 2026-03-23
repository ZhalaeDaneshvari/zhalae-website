import { Fragment, useEffect, useState } from "react";

const ROLE_TITLES = ["Developer", "Designer"];
const NAME_TO_TYPE = "Zhalae Daneshvari";
const EXPERIENCES = [
  {
    company: "Johnson & Johnson",
    role: "Digital Measures & Biosensors Intern",
    period: "May 2026 - August 2026",
    dateMark: "Incoming",
    description:
      "Incoming Summer 2026. Focused on digital health measurement systems and biosensor-driven analytics workflows.",
    logoText: "J&J",
    logo: "/jnj.png",
    skills: ["Digital Health", "Biosensors", "Data Analytics"],
  },
  {
    company: "Cornell Bowers",
    role: "Teaching Assistant",
    period: "August 2024 - Present",
    dateMark: "Present",
    description:
      "Teaching web development and design across two courses, covering HTML, CSS, JavaScript, React, Express.js, MongoDB, and REST APIs while mentoring students on accessibility, UX/UI, and Git workflows.",
    logoText: "CB",
    logo: "/bowers.jpeg",
    skills: ["React", "Express.js", "MongoDB", "UX/UI", "Teaching"],
  },
  {
    company: "Virtual Embodiment Lab",
    role: "Research Assistant",
    period: "January 2025 - Present",
    dateMark: "",
    description:
      "Developing and designing advanced Unity-based VR systems for studies on embodiment, acute pain modulation, and altered self-perception in virtual spaces.",
    logoText: "VEL",
    logo: "/vel.jpeg",
    skills: ["Unity", "VR", "Experimental Design", "Human Perception"],
  },
  {
    company: "Design + Augmented Intelligence Lab",
    role: "Research Assistant",
    period: "August 2024 - January 2026",
    dateMark: "2025",
    description:
      "Researched environmental psychology in healthcare design and evaluated way-finding solutions in medical settings using VR, plus built Python automation scripts for behavioral data analysis.",
    logoText: "DAIL",
    logo: "/dail.png",
    skills: ["Python", "VR Research", "Healthcare UX", "Data Analysis"],
  },
  {
    company: "Johnson & Johnson",
    role: "Data Science Intern",
    period: "May 2025 - August 2025",
    dateMark: "",
    description:
      "Engineered and deployed an agentic AI system on Vertex AI ADK for real-time bidirectional reasoning between molecular structure and adverse event risk, with hybrid similarity modeling and GCP deployment for pharmacovigilance predictions.",
    logoText: "J&J",
    logo: "/jnj.png",
    skills: ["Agentic AI", "Vertex AI", "GCP", "Similarity Modeling"],
  },
  {
    company: "International Flavors & Fragrances",
    role: "Software Engineer Intern",
    period: "June 2024 - August 2024",
    dateMark: "2024",
    description:
      "Built Meta Quest 3 VR applications in Unity/C#, integrated LLM chatbots with LM Studio/Ollama, and developed full-stack tools with AngularJS and PostgreSQL including responsive visualizations.",
    logoText: "IFF",
    logo: "/iff.png",
    skills: ["Unity", "C#", "AngularJS", "PostgreSQL", "LLMs"],
  },
  {
    company: "Albers Lab - Mass General Hospital",
    role: "Research Assistant",
    period: "July 2022 - May 2023",
    dateMark: "2023",
    description:
      "Conducted EHR-driven Alzheimer's drug repurposing research and applied R/Python algorithms for computational biology analysis in collaboration with a PhD researcher.",
    logoText: "MGH",
    logo: "/mgh.jpeg",
    skills: ["R", "Python", "EHR Data", "Computational Biology"],
  },
];

const PORTFOLIO_CATEGORIES = [
  "Agentic AI",
  "UX / HCI",
  "Data Science",
];

const RESUME_LINK =
  "https://drive.google.com/file/d/1HpSQOGvpWFIShFzYyREy32gHvc1vmYNi/view?usp=sharing";

const BASE_URL = import.meta.env.BASE_URL || "/";
const BASE_PATH = BASE_URL === "/" ? "" : BASE_URL.replace(/\/$/, "");

function toAppPath(path) {
  if (path === "/") {
    return BASE_PATH || "/";
  }

  return `${BASE_PATH}${path}`;
}

function getRoutePath(pathname) {
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    const stripped = pathname.slice(BASE_PATH.length);
    return stripped || "/";
  }

  return pathname;
}

function getRouteFromLocation() {
  const hash = window.location.hash;

  if (hash.startsWith("#/")) {
    return hash.slice(1);
  }

  return getRoutePath(window.location.pathname);
}

function toHashRoute(path) {
  return `${toAppPath("/")}#${path}`;
}

function toAssetPath(path) {
  if (!path) {
    return path;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const trimmedBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${trimmedBase}${normalizedPath}`;
}

const AGENTIC_PROJECTS = [
  {
    title: "Molecular Data Chatbot",
    date: "May 2025",
    clientTag: "Johnson & Johnson",
    summary:
      "Architected an agentic AI system for pharmacovigilance that reasons in both directions: from molecular structure to adverse-event risk, and from safety targets back to candidate analogs. The pipeline blends vector embeddings, Tanimoto fingerprint similarity, and regression-based ranking to surface low-risk alternatives from SMILES input.",
    details:
      "Integrated ChEMBL, PubChem, and FAERS through API orchestration and data extraction workflows, then used RDKit, BigQuery, and Pandas for descriptor engineering and molecular fingerprints. Deployed cloud-native inference on GCP (Cloud Functions + GCS) with a public HTTP endpoint for real-time product integration.",
    skills: [
      "Agentic AI",
      "Vertex AI ADK",
      "RDKit",
      "BigQuery",
      "Pandas",
      "Cloud Functions",
      "Pharmacovigilance",
    ],
    images: [
      "/molecular/molecular%201.jpg",
      "/molecular/molecular%202.jpg",
      "/molecular/molecular%203.jpg",
    ],
  },
  {
    title: "Career Concierge",
    date: "December 2025",
    clientTag: "Cornell",
    summary:
      "Built an interactive career co-pilot that helps students move from resume upload to application-ready materials in a single guided flow. Users receive a role-fit score, evidence-backed alignment summary, skill-gap analysis, tailored cover letter draft, and contextual advising via an interactive assistant.",
    details:
      "Designed for trust and speed: all analysis is session-scoped with no persistent data storage. The experience prioritizes clarity, immediate feedback loops, and actionable next steps so users can iterate quickly on applications with confidence.",
    skills: [
      "NLP",
      "Resume Parsing",
      "Prompt Engineering",
      "Product UX",
      "Interactive Chat",
      "Privacy by Design",
    ],
    images: [
      "/concierge/career1.png",
      "/concierge/career2.png",
      "/concierge/career3.png",
      "/concierge/career4.png",
      "/concierge/career5.png",
    ],
  },
  {
    title: "Cornell Trivia",
    date: "Spring 2026",
    clientTag: "Cornell",
    summary:
      "Built a Cornell-themed trivia application powered by a local LLM that generates campus-focused questions and adaptive prompts.",
    details:
      "Players earn coins for correct answers, unlock new trivia categories over time, and progress through a game loop designed for replayability. The project ships as a downloadable Vue app and is deployed on GitHub Pages.",
    skills: [
      "Local LLM",
      "Vue.js",
      "Game Mechanics",
      "Prompt Design",
      "Front-End Development",
    ],
    images: ["/trivia/trivia1.png", "/trivia/triva2.png", "/trivia/trivia3.png"],
    appLink: "https://cornell-info4340-2026sp.github.io/zwd3-hw5/",
    appCta: "Open downloadable app",
  },
];

const DATA_SCIENCE_PAPERS = [
  {
    title: "Mapping the Payoff: How Major, College, and Region Shape Career Salaries",
    date: "May 2025",
    clientTag: "Research Paper",
    summary:
      "This paper examines what drives salary outcomes 10 years after graduation, comparing the influence of major, college, and region using PayScale data reported by The Wall Street Journal.",
    details:
      "The analysis investigates long-term salary trajectories across growth-oriented vs. starting-salary majors, institutional context, and geography to better understand how early academic decisions shape mid-career earnings.",
    questions: [
      "How strongly do region and college selection influence mid-career salary outcomes?",
      "How do growth-focused majors compare with majors optimized for strong starting salaries?",
    ],
    skills: ["Data Analysis", "Statistical Modeling", "Economic Research", "Data Storytelling"],
    paperLink: "https://drive.google.com/file/d/1v1p3aKT06gCFtwVlmwllphqxXPmSwEyB/view",
  },
  {
    title: "Food Access and Equity: Socioeconomic Patterns in New York's Grocery Landscape",
    date: "December 2024",
    clientTag: "Research Paper",
    summary:
      "This project studies grocery store accessibility across New York State census tracts and evaluates how access patterns align with income levels and racial composition.",
    details:
      "The goal is to identify potential food access disparities and quantify whether socioeconomic factors are associated with systematically different levels of grocery availability.",
    questions: [
      "How does grocery accessibility vary across income brackets in New York census tracts?",
      "Are there significant disparities in store access across different racial groups?",
    ],
    skills: ["Geospatial Analysis", "Socioeconomic Data", "Equity Research", "Policy-Oriented Analytics"],
    paperLink: "https://drive.google.com/file/d/1oiE8DfdLMhOMyO07Z-zN5zF85gkssIKS/view",
  },
];

const HCI_VR_PROJECTS = [
  {
    title: "Enhancing Bimodal Communication with AI-Powered Glasses for English and ASL",
    date: "May 2025",
    clientTag: "HCI Research",
    summary:
      "A smart-glasses communication system designed to improve real-time interactions between Deaf and Hard-of-Hearing individuals and non-signers in dynamic settings.",
    details:
      "The system integrates speech recognition with LLM-assisted language support to enable responsive ASL-English communication workflows in two directions.",
    tools: ["HCI Research", "Speech Recognition", "LLMs", "Assistive AI", "ASL-English UX"],
    media: [
      {
        type: "paper",
        label: "Research Paper",
        link: "https://drive.google.com/file/d/1awgh9TZpuktGHnLq0IdYjsCudAaVMGnM/view",
      },
      {
        type: "video",
        label: "Prototype Demo Video 1",
        link: "https://youtu.be/tUS1OrU_qn8",
      },
      {
        type: "video",
        label: "Prototype Demo Video 2",
        link: "https://youtu.be/tUS1OrU_qn8",
      },
    ],
  },
  {
    title: "IFF Interactive House",
    date: "July 2024",
    clientTag: "Company: IFF",
    summary:
      "An interactive VR house for the IFF Sales team, built with leadership partners to communicate product innovations in an immersive format.",
    details:
      "Users explore a realistic log cabin environment, trigger innovation hotspots, and move through teleported scenes to view USP-aligned content and video storytelling moments.",
    tools: ["Unity", "Blender", "C#", "Meta Quest 3", "Immersive Product Storytelling"],
    media: [
      {
        type: "video",
        label: "Project Walkthrough",
        link: "https://youtu.be/GeEoqTAGlDc",
      },
    ],
  },
  {
    title: "Low Poly World",
    date: "July 2024",
    clientTag: "Virtual Reality",
    summary:
      "A first independently built VR world featuring traversable terrain, interactive objects, mini-games, and environment-driven exploration.",
    details:
      "Created during Summer 2024 at International Flavors & Fragrances, this project combines low-poly scene design with interaction mechanics such as tools, target-hitting tasks, and bowling.",
    tools: ["Unity", "Blender", "C#", "Interaction Design", "Environment Design"],
    media: [
      {
        type: "video",
        label: "Gameplay Demo",
        link: "https://youtu.be/zI_AZu5-kAs",
      },
    ],
  },
];

function toGoogleDrivePreviewUrl(url) {
  const match = url.match(/\/file\/d\/([^/]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
}

function getYouTubeVideoId(url) {
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  const longMatch = url.match(/[?&]v=([^?&/]+)/);
  if (longMatch) {
    return longMatch[1];
  }

  return "";
}

function toYouTubeEmbedUrl(url, { autoplay = false, muted = true } = {}) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    return url;
  }

  const params = new URLSearchParams({
    rel: "0",
    iv_load_policy: "3",
    fs: "1",
    disablekb: "0",
    controls: "1",
    playsinline: "1",
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function TypewriterText({ text, className, speed = 22, startDelay = 140 }) {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setRendered(text);
      return undefined;
    }

    let index = 0;
    let timeoutId;

    const typeNext = () => {
      setRendered(text.slice(0, index));

      if (index < text.length) {
        index += 1;
        timeoutId = window.setTimeout(typeNext, speed);
      }
    };

    timeoutId = window.setTimeout(typeNext, startDelay);

    return () => window.clearTimeout(timeoutId);
  }, [text, speed, startDelay]);

  return (
    <p className={className}>
      {rendered}
      <span className="typing-inline-cursor" aria-hidden="true"></span>
    </p>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Agentic AI");
  const [hoveredVideoKey, setHoveredVideoKey] = useState("");
  const [routePath, setRoutePath] = useState(() => getRouteFromLocation());
  const isExperiencePage = routePath.startsWith("/experience");
  const isPortfolioPage = routePath.startsWith("/portfolio");
  const isResumePage = routePath.startsWith("/resume");

  useEffect(() => {
    const syncRoute = () => setRoutePath(getRouteFromLocation());

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLE_TITLES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isCarouselPaused || isExperiencePage || isPortfolioPage) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % EXPERIENCES.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [isCarouselPaused, isExperiencePage, isPortfolioPage]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTypedName(NAME_TO_TYPE);
      return undefined;
    }

    let index = 0;
    let timeoutId;

    const typeNext = () => {
      setTypedName(NAME_TO_TYPE.slice(0, index));

      if (index < NAME_TO_TYPE.length) {
        index += 1;
        timeoutId = window.setTimeout(typeNext, 95);
      }
    };

    timeoutId = window.setTimeout(typeNext, 320);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isExperiencePage, isPortfolioPage, isResumePage, selectedCategory]);

  useEffect(() => {
    if (!activeImage) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  const themeIcon = theme === "dark" ? "☀" : "◐";
  const activeExperience = EXPERIENCES[carouselIndex];
  const nextExperience = EXPERIENCES[(carouselIndex + 1) % EXPERIENCES.length];

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-a"></span>
        <span className="orb orb-b"></span>
        <span className="orb orb-c"></span>
      </div>

      <header className="topbar">
        <a
          className="brand"
          href={isExperiencePage || isPortfolioPage || isResumePage ? toAppPath("/") : "#home"}
        >
          ZD
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a
                href={
                  isExperiencePage || isPortfolioPage || isResumePage
                    ? `${toAppPath("/")}#home`
                    : "#home"
                }
              >
                Home
              </a>
            </li>
            <li>
              <a href={toHashRoute("/portfolio")}>Portfolio</a>
            </li>
            <li>
              <a href={toHashRoute("/experience")}>Experience</a>
            </li>
            <li>
              <a href={toHashRoute("/resume")}>Resume</a>
            </li>
          </ul>
        </nav>
        <div className="topbar-actions">
          <a
            className="icon-link"
            href="https://www.linkedin.com/in/zhalae-daneshvari-9890a3241/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M6.94 8.55A1.56 1.56 0 1 1 6.94 5.42a1.56 1.56 0 0 1 0 3.13ZM5.58 9.8H8.3V18H5.58V9.8Zm4.29 0H12.5v1.12h.03c.37-.7 1.28-1.43 2.63-1.43 2.81 0 3.33 1.85 3.33 4.25V18h-2.72v-3.84c0-.92-.02-2.1-1.28-2.1-1.28 0-1.47 1-1.47 2.04V18H9.87V9.8Z"
              />
            </svg>
          </a>
          <a
            className="icon-link"
            href="https://github.com/ZhalaeDaneshvari"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M12 2C6.47 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.73c-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.14-1.5-1.14-1.5-.91-.64.1-.64.1-.64 1 .07 1.55 1.06 1.55 1.06.9 1.57 2.32 1.12 2.91.86.09-.67.36-1.12.64-1.38-2.23-.26-4.55-1.13-4.55-5.06 0-1.12.4-2.04 1.04-2.76-.09-.26-.45-1.31.1-2.72 0 0 .86-.29 2.82 1.05A9.6 9.6 0 0 1 12 6.4c.86 0 1.73.12 2.55.36 1.96-1.34 2.82-1.05 2.82-1.05.54 1.41.18 2.46.09 2.72.64.72 1.05 1.64 1.05 2.76 0 3.93-2.32 4.79-4.55 5.05.37.33.68.95.68 1.93v2.86c0 .28.18.6.68.5A10.31 10.31 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
              />
            </svg>
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            <span className="theme-icon" aria-hidden="true">
              {themeIcon}
            </span>
          </button>
        </div>
      </header>

      {!isExperiencePage && !isPortfolioPage && !isResumePage && (
        <main id="home">
          <section className="hero reveal">
            <p className="eyebrow">Personal Website</p>
            <h1 aria-label="Zhalae Daneshvari, Developer and Designer">
              <span className="typing-line">
                <span className="typing-prefix">...</span>
                <span id="typed-name">{typedName}</span>
                <span className="typing-cursor" aria-hidden="true"></span>
              </span>
              <span className="title-rotator" aria-label="Role rotating text">
                {ROLE_TITLES.map((title, index) => (
                  <span key={title} className={`title ${index === roleIndex ? "active" : ""}`}>
                    {title}
                  </span>
                ))}
              </span>
            </h1>
            <p className="subtitle">
              Developer building elegant digital experiences at Cornell University with a focus on
              creative engineering and thoughtful design.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={toHashRoute("/portfolio")}>
                View Portfolio
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get In Touch
              </a>
            </div>
          </section>

          <section id="about" className="panel reveal">
            <h2>About Me</h2>
            <p>
              I am Zhalae, a developer and designer at Cornell University focused on data
              science, UX, and interactive technology. I completed my Bachelor&apos;s in
              Information Science in May 2026 and I am currently finishing my Master&apos;s in
              Information Science in December 2026.
            </p>
            <p>
              My work spans agentic AI for molecular risk analysis, cloud-native machine
              learning systems, and VR healthcare simulations shaped by behavioral research.
              I am especially interested in biotechnology and building products where advanced
              modeling meets real human impact.
            </p>
            <div className="chips">
              <span>Agentic AI</span>
              <span>Data Science</span>
              <span>Machine Learning</span>
              <span>UX Design</span>
              <span>Biotech Applications</span>
            </div>
            <a
              className="repo-link"
              href="https://github.com/ZhalaeDaneshvari/zhalae-website"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M12 2C6.47 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.73c-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.14-1.5-1.14-1.5-.91-.64.1-.64.1-.64 1 .07 1.55 1.06 1.55 1.06.9 1.57 2.32 1.12 2.91.86.09-.67.36-1.12.64-1.38-2.23-.26-4.55-1.13-4.55-5.06 0-1.12.4-2.04 1.04-2.76-.09-.26-.45-1.31.1-2.72 0 0 .86-.29 2.82 1.05A9.6 9.6 0 0 1 12 6.4c.86 0 1.73.12 2.55.36 1.96-1.34 2.82-1.05 2.82-1.05.54 1.41.18 2.46.09 2.72.64.72 1.05 1.64 1.05 2.76 0 3.93-2.32 4.79-4.55 5.05.37.33.68.95.68 1.93v2.86c0 .28.18.6.68.5A10.31 10.31 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
                />
              </svg>
              View this website's source code
            </a>
          </section>

          <section id="experience" className="panel reveal">
            <div className="experience-header">
              <h2>Experience</h2>
              <a className="see-more-link" href={toHashRoute("/experience")}>
                See More
              </a>
            </div>
            <div
              className="experience-carousel-shell"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <button
                className="carousel-arrow"
                type="button"
                aria-label="Previous experience"
                onClick={() =>
                  setCarouselIndex((current) =>
                    (current - 1 + EXPERIENCES.length) % EXPERIENCES.length
                  )
                }
              >
                ←
              </button>

              <div className="experience-carousel-window">
                <article className="experience-carousel">
                  <div className="experience-logo" aria-hidden="true">
                    {activeExperience.logo ? (
                      <img
                        src={toAssetPath(activeExperience.logo)}
                        alt={`${activeExperience.company} logo`}
                      />
                    ) : (
                      activeExperience.logoText
                    )}
                  </div>
                  <div className="experience-carousel-content">
                    <p className="experience-role">{activeExperience.role}</p>
                    <p className="experience-company">{activeExperience.company}</p>
                    <p className="experience-time">{activeExperience.period}</p>
                    <p className="experience-note">{activeExperience.description}</p>
                    <div className="experience-skills">
                      {activeExperience.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="experience-preview" aria-hidden="true">
                  <div className="experience-logo">
                    {nextExperience.logo ? (
                      <img
                        src={toAssetPath(nextExperience.logo)}
                        alt={`${nextExperience.company} logo`}
                      />
                    ) : (
                      nextExperience.logoText
                    )}
                  </div>
                  <div className="experience-carousel-content">
                    <p className="experience-role">{nextExperience.role}</p>
                    <p className="experience-company">{nextExperience.company}</p>
                    <p className="experience-time">{nextExperience.period}</p>
                  </div>
                </article>
              </div>

              <button
                className="carousel-arrow"
                type="button"
                aria-label="Next experience"
                onClick={() =>
                  setCarouselIndex((current) => (current + 1) % EXPERIENCES.length)
                }
              >
                →
              </button>
            </div>
            <div className="carousel-progress">
              <div className="carousel-dots" aria-label="Experience carousel controls">
                {EXPERIENCES.map((item, index) => (
                  <button
                    key={`${item.company}-${item.role}-${item.period}`}
                    type="button"
                    className={`carousel-dot ${index === carouselIndex ? "active" : ""}`}
                    aria-label={`Show ${item.company}`}
                    onClick={() => setCarouselIndex(index)}
                  ></button>
                ))}
              </div>
              <span className="carousel-count" aria-live="polite">
                {carouselIndex + 1}/{EXPERIENCES.length}
              </span>
            </div>
          </section>

          <section id="contact" className="panel reveal">
            <h2>Contact</h2>
            <p>Open to collaborations, research opportunities, and creative projects.</p>
            <a className="email-link" href="mailto:zhalae15@gmail.com">
              zhalae15@gmail.com
            </a>
            <div className="social-links">
              <a
                className="social-link"
                href="https://www.linkedin.com/in/zhalae-daneshvari-9890a3241/"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M6.94 8.55A1.56 1.56 0 1 1 6.94 5.42a1.56 1.56 0 0 1 0 3.13ZM5.58 9.8H8.3V18H5.58V9.8Zm4.29 0H12.5v1.12h.03c.37-.7 1.28-1.43 2.63-1.43 2.81 0 3.33 1.85 3.33 4.25V18h-2.72v-3.84c0-.92-.02-2.1-1.28-2.1-1.28 0-1.47 1-1.47 2.04V18H9.87V9.8Z"
                  />
                </svg>
                LinkedIn
              </a>
              <a
                className="social-link"
                href="https://github.com/ZhalaeDaneshvari"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M12 2C6.47 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.73c-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.14-1.5-1.14-1.5-.91-.64.1-.64.1-.64 1 .07 1.55 1.06 1.55 1.06.9 1.57 2.32 1.12 2.91.86.09-.67.36-1.12.64-1.38-2.23-.26-4.55-1.13-4.55-5.06 0-1.12.4-2.04 1.04-2.76-.09-.26-.45-1.31.1-2.72 0 0 .86-.29 2.82 1.05A9.6 9.6 0 0 1 12 6.4c.86 0 1.73.12 2.55.36 1.96-1.34 2.82-1.05 2.82-1.05.54 1.41.18 2.46.09 2.72.64.72 1.05 1.64 1.05 2.76 0 3.93-2.32 4.79-4.55 5.05.37.33.68.95.68 1.93v2.86c0 .28.18.6.68.5A10.31 10.31 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
                  />
                </svg>
                GitHub
              </a>
            </div>
          </section>
        </main>
      )}

      {isExperiencePage && (
        <main className="experience-page">
          <section className="experience-hero reveal">
            <p className="eyebrow">Experience Timeline</p>
            <h1>Professional Experience</h1>
            <TypewriterText
              className="subtitle"
              text="A detailed look at internships, research, and product work across machine learning, UX, and interactive technology."
              speed={18}
            />
            <div className="experience-hero-actions">
              <a className="btn btn-primary" href={toAppPath("/")}>
                Back To Home
              </a>
              <a
                className="btn btn-linkedin"
                href="https://www.linkedin.com/in/zhalae-daneshvari-9890a3241/"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M6.94 8.55A1.56 1.56 0 1 1 6.94 5.42a1.56 1.56 0 0 1 0 3.13ZM5.58 9.8H8.3V18H5.58V9.8Zm4.29 0H12.5v1.12h.03c.37-.7 1.28-1.43 2.63-1.43 2.81 0 3.33 1.85 3.33 4.25V18h-2.72v-3.84c0-.92-.02-2.1-1.28-2.1-1.28 0-1.47 1-1.47 2.04V18H9.87V9.8Z"
                  />
                </svg>
                LinkedIn
              </a>
            </div>
          </section>

          <section className="timeline reveal">
            {EXPERIENCES.map((item, index) => (
              <Fragment key={`${item.company}-${item.role}-${item.period}`}>
                <article className={`timeline-item reveal ${index % 2 === 0 ? "left" : "right"}`}>
                  {item.dateMark && <p className="timeline-marker">{item.dateMark}</p>}
                  <div className="timeline-node" aria-hidden="true">
                    {item.logo ? (
                      <img src={toAssetPath(item.logo)} alt={`${item.company} logo`} />
                    ) : (
                      item.logoText
                    )}
                  </div>
                  <div className="timeline-card">
                    <p className="timeline-time">{item.period}</p>
                    <h3>{item.role}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p>{item.description}</p>
                    <div className="experience-skills timeline-skills">
                      {item.skills.map((skill) => (
                        <span key={`${item.company}-${skill}`} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </article>
                {index < EXPERIENCES.length - 1 && (
                  <div className={`timeline-arrow ${index % 2 === 0 ? "right" : "left"}`} aria-hidden="true">
                    {index % 2 === 0 ? "↘" : "↙"}
                  </div>
                )}
              </Fragment>
            ))}
          </section>
        </main>
      )}

      {isPortfolioPage && (
        <main className="portfolio-page">
          <section className="portfolio-hero reveal">
            <p className="eyebrow">Selected Work</p>
            <h1>Portfolio</h1>
            <TypewriterText
              className="subtitle"
              text="A cross-disciplinary project archive spanning agentic AI, data science, UX, and immersive computing."
              speed={18}
            />
            <div className="portfolio-categories">
              {PORTFOLIO_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-pill ${category === selectedCategory ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={category === selectedCategory}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {selectedCategory === "Agentic AI" && (
            <section className="portfolio-section reveal category-switch-enter">
              <div className="portfolio-section-header">
                <h2>Agentic AI ({AGENTIC_PROJECTS.length} Projects)</h2>
              </div>

              <div className="project-grid">
                {AGENTIC_PROJECTS.map((project) => (
                  <div key={project.title} className="project-card-wrap reveal">
                    <article className="project-card">
                      <div className="project-meta">
                        <p className="project-date">{project.date}</p>
                        <div className="project-title-row">
                          <h3>{project.title}</h3>
                          {project.clientTag && (
                            <span className="project-client-pill">{project.clientTag}</span>
                          )}
                        </div>
                      </div>
                      <p className="project-summary">{project.summary}</p>
                      <p className="project-details">{project.details}</p>
                      {project.appLink && (
                        <div className="project-link-row">
                          <a
                            className="paper-link project-app-link"
                            href={project.appLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                              <path
                                fill="currentColor"
                                d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 3.99a1 1 0 0 1-1.4 0l-4-3.99a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 12a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z"
                              />
                            </svg>
                            {project.appCta || "Open app"}
                          </a>
                        </div>
                      )}
                      <div className="project-skills">
                        {project.skills.map((skill) => (
                          <span key={`${project.title}-${skill}`} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                      {project.images && project.images.length > 0 && (
                        <div className="project-gallery">
                          {project.images.map((imagePath, index) => (
                            <figure key={`${project.title}-${imagePath}`} className="project-shot">
                              <button
                                type="button"
                                className="project-shot-btn"
                                onClick={() =>
                                  setActiveImage({
                                    src: toAssetPath(imagePath),
                                    alt: `${project.title} screenshot ${index + 1}`,
                                  })
                                }
                              >
                                <img
                                  src={toAssetPath(imagePath)}
                                  alt={`${project.title} screenshot ${index + 1}`}
                                  loading="lazy"
                                />
                              </button>
                            </figure>
                          ))}
                        </div>
                      )}
                    </article>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedCategory === "Data Science" && (
            <section className="portfolio-section reveal category-switch-enter">
              <div className="portfolio-section-header">
                <h2>Data Science (2 Papers)</h2>
              </div>

              <div className="project-grid">
                {DATA_SCIENCE_PAPERS.map((paper) => (
                  <div key={paper.title} className="project-card-wrap reveal">
                    <article className="project-card">
                      <div className="project-meta">
                        <p className="project-date">{paper.date}</p>
                        <div className="project-title-row">
                          <h3>{paper.title}</h3>
                          <span className="project-client-pill">{paper.clientTag}</span>
                        </div>
                      </div>
                      <p className="project-summary">{paper.summary}</p>
                      <p className="project-details">{paper.details}</p>
                      <ul className="paper-questions">
                        {paper.questions.map((question) => (
                          <li key={`${paper.title}-${question}`}>{question}</li>
                        ))}
                      </ul>
                      <div className="project-skills">
                        {paper.skills.map((skill) => (
                          <span key={`${paper.title}-${skill}`} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="pdf-preview-wrap">
                        <iframe
                          src={toGoogleDrivePreviewUrl(paper.paperLink)}
                          title={`${paper.title} PDF preview`}
                          className="pdf-preview"
                          loading="lazy"
                          allow="autoplay"
                        ></iframe>
                      </div>

                      <div className="paper-links-row">
                        <a
                          className="paper-link"
                          href={paper.paperLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open full paper
                        </a>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedCategory === "UX / HCI" && (
            <section className="portfolio-section reveal category-switch-enter">
              <div className="portfolio-section-header">
                <h2>UX / HCI (3 Projects)</h2>
              </div>

              <div className="project-grid">
                {HCI_VR_PROJECTS.map((project, projectIndex) => (
                  <div key={project.title} className="project-card-wrap reveal">
                    <article className="project-card">
                      <div className="project-meta">
                        <p className="project-date">{project.date}</p>
                        <div className="project-title-row">
                          <h3>{project.title}</h3>
                          <span className="project-client-pill">{project.clientTag}</span>
                        </div>
                      </div>

                      <p className="project-summary">{project.summary}</p>
                      <p className="project-details">{project.details}</p>

                      <div className="project-skills">
                        {project.tools.map((tool) => (
                          <span key={`${project.title}-${tool}`} className="skill-tag">
                            {tool}
                          </span>
                        ))}
                      </div>

                      <div className="immersive-media-grid">
                        {project.media.map((item, mediaIndex) => {
                          const mediaKey = `${project.title}-${item.label}-${mediaIndex}`;
                          const isVideo = item.type === "video";
                          const isAutoVideo = projectIndex === 0 && mediaIndex === 1;
                          const shouldAutoPlay = isVideo && (hoveredVideoKey === mediaKey || isAutoVideo);

                          return (
                            <article
                              key={mediaKey}
                              className={`media-card ${isVideo ? "media-card-video" : "media-card-paper"}`}
                              onMouseEnter={() => {
                                if (isVideo) {
                                  setHoveredVideoKey(mediaKey);
                                }
                              }}
                              onMouseLeave={() => {
                                if (isVideo) {
                                  setHoveredVideoKey("");
                                }
                              }}
                            >
                              <div className="media-card-header">
                                <p>{item.label}</p>
                                {isVideo && <span className="media-hint">Hover to play</span>}
                              </div>

                              <div className="media-frame-wrap">
                                {isVideo ? (
                                  <iframe
                                    src={toYouTubeEmbedUrl(item.link, {
                                      autoplay: shouldAutoPlay,
                                      muted: true,
                                    })}
                                    title={`${project.title} ${item.label}`}
                                    className="media-frame"
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                ) : (
                                  <iframe
                                    src={toGoogleDrivePreviewUrl(item.link)}
                                    title={`${project.title} ${item.label}`}
                                    className="media-frame"
                                    loading="lazy"
                                    allow="autoplay"
                                  ></iframe>
                                )}
                              </div>

                              <div className="paper-links-row">
                                <a
                                  className="paper-link"
                                  href={item.link}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {isVideo ? "Open video" : "Open paper"}
                                </a>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      )}

      {isResumePage && (
        <main className="resume-page">
          <section className="resume-hero reveal">
            <p className="eyebrow">Resume</p>
            <h1>Resume Preview</h1>
            <TypewriterText className="subtitle" text="View my latest resume below." speed={18} />
            <div className="resume-actions">
              <a className="btn btn-primary" href={RESUME_LINK} target="_blank" rel="noreferrer">
                Open Resume
              </a>
              <a className="btn btn-ghost" href={toAppPath("/")}>
                Back To Home
              </a>
            </div>
          </section>

          <section className="panel reveal">
            <div className="resume-preview-wrap">
              <iframe
                src={toGoogleDrivePreviewUrl(RESUME_LINK)}
                title="Resume preview"
                className="resume-preview-frame"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </section>
        </main>
      )}

      {activeImage && (
        <div className="image-modal" role="dialog" aria-modal="true" aria-label="Expanded project image">
          <button
            type="button"
            className="image-modal-backdrop"
            aria-label="Close image preview"
            onClick={() => setActiveImage(null)}
          ></button>
          <div className="image-modal-content">
            <img src={activeImage.src} alt={activeImage.alt} />
            <button
              type="button"
              className="image-modal-close"
              aria-label="Close image preview"
              onClick={() => setActiveImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <footer className="site-footer reveal">
        <span className="footer-copy">©</span> Coded and designed by Zhalae Daneshvari
        <span className="footer-easter" aria-label="Reveal coding assistant">
          ...
          <span className="footer-easter-tooltip" role="note">
            and Copilot ;)
          </span>
        </span>
      </footer>
    </>
  );
}

export default App;