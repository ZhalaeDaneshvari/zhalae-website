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
    filters: ["Data Science"],
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
    filters: ["UX"],
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
    filters: ["UX"],
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
    filters: ["Data Science", "UX"],
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
    filters: ["Data Science"],
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
    filters: ["UX"],
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
    filters: ["Data Science"],
  },
];

const PORTFOLIO_CATEGORIES = [
  "All Projects",
  "Agentic AI",
  "UX / HCI",
  "Data Science",
];

const RESUME_LINK =
  "https://drive.google.com/file/d/1wJXdz9DhP-0oiM1rDmjpX38l3BMESqjj/view?usp=sharing";

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
    anchorId: "molecular-data-chatbot",
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
    anchorId: "pantrypal",
    title: "PantryPal",
    date: "May 2026",
    clientTag: "Personal Project",
    summary:
      "Ever stare into your fridge with absolutely no idea what to cook? PantryPal is here to save the day. Just tell it what you've got, and let Chef (your AI sous chef) work some magic. Turning random pantry items into meals you actually want to eat.",
    details:
      "PantryPal features intelligent inventory management across pantry, fridge, and freezer with smart quantity suggestions and automated expiry tracking. The AI Chef, powered by Google Gemini Pro, analyzes your current inventory to generate creative, nutritious recipes on demand. Recipes are automatically tagged for dietary needs including 'Healthier Choice,' 'PCOS Friendly,' and 'Low-GI.' The app supports collaborative households for real-time pantry syncing, seamless Grocery integration for missing ingredients, and provides detailed nutritional transparency with macros and prep difficulty. Built with a meticulously crafted editorial UI featuring smooth transitions and premium responsive design.",
    skills: [
      "Full-Stack Development",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Firebase Firestore",
      "Firebase Auth",
      "Google Gemini Pro",
      "AI Integration",
      "Real-time Sync",
    ],
    video: "/pantrypal/pantrypal-demo.mp4",
    images: [
      "/pantrypal/pantrypal-screenshot-01.png",
      "/pantrypal/pantrypal-screenshot-02.png",
      "/pantrypal/pantrypal-screenshot-03.png",
      "/pantrypal/pantrypal-screenshot-04.png",
      "/pantrypal/pantrypal-screenshot-05.png",
      "/pantrypal/pantrypal-screenshot-06.png",
      "/pantrypal/pantrypal-screenshot-07.png",
    ],
  },
  {
    title: "Reframe",
    date: "Spring 2026",
    clientTag: "Personal Project",
    summary:
      "A personal reflection app for students who are carrying a lot mentally but don't always feel ready to talk to someone else. Reframe gives users a private, low-pressure space to pause, reflect, and better understand what they're feeling.",
    details:
      "Users start a session, select an emotional focus (stressed, anxious, overwhelmed, or sad), then reflect via voice or text. The app generates a personalized emotional reflection that helps users process their thoughts, recognize what may be driving those emotions, and reframe them in a more grounded way. Reflections are saved across sessions, and after multiple entries the app unlocks long-term insights surfacing emotional patterns, repeated thought loops, and trends over time. Deployed as a Progressive Web App (PWA) on GitHub Pages.",
    skills: [
      "Agentic AI",
      "PWA",
      "Voice Input",
      "Emotional Intelligence",
      "Long-Term Insights",
      "GitHub Pages",
    ],
    video: "/reframe/reframe-demo.mp4",
    images: [
      "/reframe/reframe-1.png",
      "/reframe/reframe-2.png",
      "/reframe/reframe-3.png",
      "/reframe/reframe-4.png",
      "/reframe/reframe-5.png",
      "/reframe/reframe-6.png",
      "/reframe/reframe-7.png",
      "/reframe/reframe-8.png",
      "/reframe/reframe-9.png",
      "/reframe/reframe-10.png",
    ],
    appLink: "https://zhalaedaneshvari.github.io/reframe/",
    appCta: "Open app",
    githubLink: "https://github.com/ZhalaeDaneshvari/reframe",
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
        type: "video",
        label: "Prototype Demo Video 1",
        link: "https://youtu.be/tUS1OrU_qn8",
      },
      {
        type: "video",
        label: "Prototype Demo Video 2",
        link: "https://youtu.be/aULpH_YSJWo",
      },
      {
        type: "paper",
        label: "Research Paper",
        link: "https://drive.google.com/file/d/1awgh9TZpuktGHnLq0IdYjsCudAaVMGnM/view",
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
  {
    title: "This Personal Website (Yes, This One)",
    date: "March 2026",
    clientTag: "Personal Project",
    summary:
      "A personal website that is part portfolio, part playground, and part proof that I learned something in my undergrad.",
    details:
      "Designed and built this site to showcase work across AI, UX/HCI, and research while keeping the experience fast, responsive, and a little playful.",
    tools: ["React", "Vite", "JavaScript", "CSS", "Responsive Design", "GitHub Pages"],
    repoLink: "https://github.com/ZhalaeDaneshvari/zhalae-website",
    previewImage: "/portfolio/website-home.png",
    media: [],
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

function toYouTubeThumbnailUrl(url) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
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

    return "dark";
  });
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [routePath, setRoutePath] = useState(() => getRouteFromLocation());
  const [routePathname, routeQuery = ""] = routePath.split("?");
  const isExperiencePage = routePathname.startsWith("/experience");
  const isPortfolioPage = routePathname.startsWith("/portfolio");
  const isResumePage = routePathname.startsWith("/resume");

  const goToHomeAnchor = (anchor) => {
    window.location.assign(`${toAppPath("/")}#${anchor}`);
  };

  const goToRoute = (path) => {
    window.location.assign(toHashRoute(path));
  };

  const commandActions = [
    {
      label: "Go To Home",
      keywords: "landing intro",
      run: () => goToHomeAnchor("home"),
    },
    {
      label: "Open Portfolio",
      keywords: "projects work",
      run: () => goToRoute("/portfolio"),
    },
    {
      label: "Open Experience",
      keywords: "timeline jobs internships",
      run: () => goToRoute("/experience"),
    },
    {
      label: "Open Resume",
      keywords: "cv",
      run: () => goToRoute("/resume"),
    },
    {
      label: "Show All Portfolio Projects",
      keywords: "portfolio category all",
      run: () => {
        setSelectedCategory("All Projects");
        goToRoute("/portfolio");
      },
    },
    {
      label: "Show Agentic AI Projects",
      keywords: "portfolio category",
      run: () => {
        setSelectedCategory("Agentic AI");
        goToRoute("/portfolio");
      },
    },
    {
      label: "Show UX / HCI Projects",
      keywords: "portfolio category",
      run: () => {
        setSelectedCategory("UX / HCI");
        goToRoute("/portfolio");
      },
    },
    {
      label: "Show Data Science Projects",
      keywords: "portfolio category papers",
      run: () => {
        setSelectedCategory("Data Science");
        goToRoute("/portfolio");
      },
    },
    {
      label: `Switch To ${theme === "dark" ? "Light" : "Dark"} Mode`,
      keywords: "theme appearance",
      run: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    },
    {
      label: "Contact Section",
      keywords: "reach out email",
      run: () => goToHomeAnchor("contact"),
    },
    {
      label: "Open GitHub",
      keywords: "code repo",
      run: () => window.open("https://github.com/ZhalaeDaneshvari", "_blank", "noopener,noreferrer"),
    },
    {
      label: "Open LinkedIn",
      keywords: "social profile",
      run: () =>
        window.open(
          "https://www.linkedin.com/in/zhalae-daneshvari-9890a3241/",
          "_blank",
          "noopener,noreferrer"
        ),
    },
  ];

  const normalizedPaletteQuery = paletteQuery.trim().toLowerCase();
  const filteredPaletteActions = commandActions.filter((action) => {
    const haystack = `${action.label} ${action.keywords}`.toLowerCase();
    return !normalizedPaletteQuery || haystack.includes(normalizedPaletteQuery);
  });

  const executePaletteAction = (action) => {
    if (!action) {
      return;
    }

    setIsPaletteOpen(false);
    setPaletteQuery("");
    setPaletteIndex(0);
    action.run();
  };

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
    const params = new URLSearchParams(routeQuery);
    const categoryParam = params.get("category");

    if (categoryParam && PORTFOLIO_CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [routeQuery]);

  useEffect(() => {
    const params = new URLSearchParams(routeQuery);
    const focusId = params.get("focus");

    if (!focusId) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById(focusId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [routeQuery, selectedCategory]);

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
  }, [isExperiencePage, isPortfolioPage, isResumePage, selectedCategory, expandedProject]);

  useEffect(() => {
    setDetailImageIndex(0);
  }, [expandedProject?.title]);

  useEffect(() => {
    const slideCount = (expandedProject?.video ? 1 : 0) + (expandedProject?.images?.length || 0);

    if (!isPortfolioPage || !expandedProject || slideCount <= 1 || activeImage || isPaletteOpen) {
      return undefined;
    }

    const handleCarouselKeys = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDetailImageIndex((current) => (current + 1) % slideCount);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDetailImageIndex((current) => (current - 1 + slideCount) % slideCount);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setDetailImageIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setDetailImageIndex(slideCount - 1);
      }
    };

    window.addEventListener("keydown", handleCarouselKeys);

    return () => window.removeEventListener("keydown", handleCarouselKeys);
  }, [activeImage, expandedProject, isPaletteOpen, isPortfolioPage]);

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

  useEffect(() => {
    setPaletteIndex(0);
  }, [paletteQuery, isPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setIsPaletteOpen(true);
        return;
      }

      if (!isPaletteOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setIsPaletteOpen(false);
        return;
      }

      if (!filteredPaletteActions.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setPaletteIndex((current) => (current + 1) % filteredPaletteActions.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setPaletteIndex((current) =>
          (current - 1 + filteredPaletteActions.length) % filteredPaletteActions.length
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        executePaletteAction(filteredPaletteActions[paletteIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredPaletteActions, isPaletteOpen, paletteIndex]);

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
          <button
            className="command-launch"
            type="button"
            aria-label="Open command palette"
            onClick={() => setIsPaletteOpen(true)}
          >
            Ctrl+K
          </button>
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

      {isPaletteOpen && (
        <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
          <button
            type="button"
            className="command-palette-backdrop"
            aria-label="Close command palette"
            onClick={() => setIsPaletteOpen(false)}
          ></button>

          <div className="command-palette-panel">
            <div className="command-palette-header">
              <input
                className="command-palette-input"
                type="text"
                autoFocus
                value={paletteQuery}
                onChange={(event) => setPaletteQuery(event.target.value)}
                placeholder="Search actions..."
                aria-label="Search commands"
              />
              <span className="command-palette-shortcut">Esc</span>
            </div>

            <div className="command-palette-list" role="listbox" aria-label="Command results">
              {filteredPaletteActions.length ? (
                filteredPaletteActions.map((action, index) => (
                  <button
                    key={action.label}
                    type="button"
                    className={`command-palette-item ${index === paletteIndex ? "active" : ""}`}
                    onMouseEnter={() => setPaletteIndex(index)}
                    onClick={() => executePaletteAction(action)}
                  >
                    <span>{action.label}</span>
                    <span className="command-palette-item-hint">Enter</span>
                  </button>
                ))
              ) : (
                <p className="command-palette-empty">No commands found.</p>
              )}
            </div>
          </div>
        </div>
      )}

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
              Developer and designer building digital experiences at Cornell University with a focus on
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
            <h2>About Me.</h2>
            <p>
              I am Zhalae, a developer and designer at Cornell University focused on data
              science, UX, and interactive technology. I will complete my Bachelor&apos;s in
              Information Science in May 2026 and finish my Master&apos;s in
              Information Science in December 2026.
            </p>
            <p>
              My work spans agentic AI for molecular risk analysis, cloud-native machine
              learning systems, VR healthcare simulations shaped by behavioral research, and more.
              I am especially interested in biotechnology and building products where advanced
              modeling meets real human impact.
            </p>
            <div className="chips">
              <a href={toHashRoute("/portfolio?category=Agentic%20AI&focus=agentic-ai-section")}>
                Agentic AI
              </a>
              <a href={toHashRoute("/portfolio?category=Data%20Science&focus=data-science-section")}>
                Data Science
              </a>
              <a href={toHashRoute("/portfolio?category=Data%20Science&focus=data-science-section")}>
                Machine Learning
              </a>
              <a href={toHashRoute("/portfolio?category=UX%20%2F%20HCI&focus=ux-hci-section")}>
                UX Design
              </a>
              <a
                href={toHashRoute(
                  "/portfolio?category=Agentic%20AI&focus=molecular-data-chatbot"
                )}
              >
                Biotech Applications
              </a>
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

          <section id="featured-project" className="panel featured-app reveal">
            <div className="featured-app-header">
              <a
                className="featured-app-icon-and-title featured-app-link"
                href="https://pantrypal-252908779850.us-central1.run.app/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={toAssetPath("/pantrypal/pantrypalicon.png")}
                  alt="PantryPal icon"
                  className="featured-app-icon"
                />
                <div>
                  <p className="eyebrow">Check Out My New App</p>
                  <h2>PantryPal</h2>
                </div>
              </a>
              <div className="featured-app-actions">
                <a
                  className="btn btn-primary"
                  href="https://pantrypal-252908779850.us-central1.run.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  View App
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://github.com/ZhalaeDaneshvari/pantry-pal"
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                </a>
              </div>
            </div>
            <p className="featured-app-subtitle">
              Your AI-Powered Kitchen Companion
            </p>
            <p>
              Ever stare into your fridge with absolutely no idea what to cook? PantryPal is here to save the day. Just tell it what you've got, and let Chef (your AI sous chef) work some magic. Turning random pantry items into meals you actually want to eat.
            </p>
            <div className="featured-app-highlights">
              <div className="highlight">
                <h3>Intelligent Inventory Management</h3>
                <p>Track your pantry, fridge, and freezer items with smart quantity suggestions and automated expiry date tracking.</p>
              </div>
              <div className="highlight">
                <h3>AI Chef (Gemini Powered)</h3>
                <p>Our custom AI "Chef Bot" analyzes your inventory to generate creative, nutritious recipes while identifying what's missing.</p>
              </div>
              <div className="highlight">
                <h3>Smart Categorization</h3>
                <p>Recipes automatically tagged for dietary needs: "Healthier Choice," "PCOS Friendly," "Low-GI," and more.</p>
              </div>
            </div>
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
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M15 5L8 12L15 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M9 5L16 12L9 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                    {index % 2 === 0 ? (
                      <svg viewBox="0 0 24 24" className="timeline-arrow-icon" focusable="false">
                        <path
                          d="M5 8H15V18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 14L15 18L19 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="timeline-arrow-icon" focusable="false">
                        <path
                          d="M19 8H9V18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 14L9 18L5 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </section>
        </main>
      )}

      {isPortfolioPage && (
        <main className="portfolio-page">
          {!expandedProject && (
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
                    onClick={() => {
                      setSelectedCategory(category);
                      setExpandedProject(null);
                    }}
                    aria-pressed={category === selectedCategory}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>
          )}

          {expandedProject && (
            <section className="project-detail-page">
              <div className="project-detail-topbar">
                <button
                  type="button"
                  className="paper-link project-detail-back"
                  onClick={() => setExpandedProject(null)}
                >
                  ← Back to {selectedCategory}
                </button>
              </div>

              <div className="project-detail-layout">
                <aside className="project-detail-copy">
                  <p className="project-date">{expandedProject.date}</p>
                  <div className="project-title-row">
                    <h2>{expandedProject.title}</h2>
                    {expandedProject.clientTag && (
                      <span className="project-client-pill">{expandedProject.clientTag}</span>
                    )}
                  </div>
                  <p className="project-summary">{expandedProject.summary}</p>
                  {expandedProject.details && (
                    <p className="project-details">{expandedProject.details}</p>
                  )}

                  {expandedProject.questions && expandedProject.questions.length > 0 && (
                    <ul className="paper-questions">
                      {expandedProject.questions.map((question) => (
                        <li key={`${expandedProject.title}-${question}`}>{question}</li>
                      ))}
                    </ul>
                  )}

                  {(expandedProject.appLink || expandedProject.githubLink || expandedProject.paperLink || expandedProject.repoLink) && (
                    <div className="project-link-row">
                      {expandedProject.appLink && (
                        <a className="paper-link project-app-link" href={expandedProject.appLink} target="_blank" rel="noreferrer">
                          {expandedProject.appCta || "Open app"}
                        </a>
                      )}
                      {expandedProject.githubLink && (
                        <a className="paper-link project-app-link" href={expandedProject.githubLink} target="_blank" rel="noreferrer">
                          View on GitHub
                        </a>
                      )}
                      {expandedProject.paperLink && (
                        <a className="paper-link project-app-link" href={expandedProject.paperLink} target="_blank" rel="noreferrer">
                          Open full paper
                        </a>
                      )}
                      {expandedProject.repoLink && (
                        <a className="paper-link project-app-link" href={expandedProject.repoLink} target="_blank" rel="noreferrer">
                          Open GitHub repo
                        </a>
                      )}
                    </div>
                  )}

                  <div className="project-skills">
                    {(expandedProject.skills || []).map((skill) => (
                      <span key={`${expandedProject.title}-${skill}`} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </aside>

                <div className="project-detail-media">
                  {expandedProject.paperLink && (
                    <figure className="project-shot project-shot--video project-shot--lead">
                      <iframe
                        src={toGoogleDrivePreviewUrl(expandedProject.paperLink)}
                        title={`${expandedProject.title} PDF preview`}
                        className={`pdf-preview ${expandedProject.category === "Data Science" ? "pdf-preview--long" : ""}`}
                        loading="lazy"
                        allow="autoplay"
                      ></iframe>
                    </figure>
                  )}

                  {expandedProject.media && expandedProject.media.length > 0 && (
                    <div className="immersive-media-grid project-detail-immersive">
                      {expandedProject.media.map((item, mediaIndex) => {
                        const isVideo = item.type === "video";

                        return (
                          <article
                            key={`${expandedProject.title}-${item.label}-${mediaIndex}`}
                            className={`media-card ${isVideo ? "media-card-video" : "media-card-paper"}`}
                          >
                            <div className="media-card-header">
                              <p>{item.label}</p>
                            </div>

                            <div className="media-frame-wrap">
                              {isVideo ? (
                                <iframe
                                  src={toYouTubeEmbedUrl(item.link, {
                                    autoplay: mediaIndex === 0,
                                    muted: true,
                                  })}
                                  title={`${expandedProject.title} ${item.label}`}
                                  className="media-frame"
                                  loading="lazy"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                              ) : (
                                <iframe
                                  src={toGoogleDrivePreviewUrl(item.link)}
                                  title={`${expandedProject.title} ${item.label}`}
                                  className="media-frame"
                                  loading="lazy"
                                  allow="autoplay"
                                ></iframe>
                              )}
                            </div>

                            <div className="paper-links-row">
                              <a className="paper-link" href={item.link} target="_blank" rel="noreferrer">
                                {isVideo ? "Open video" : "Open paper"}
                              </a>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  {(() => {
                    const detailSlides = [
                      ...(expandedProject.video
                        ? [{ type: "video", src: expandedProject.video, label: "Demo video" }]
                        : []),
                      ...((expandedProject.images || []).map((imagePath, index) => ({
                        type: "image",
                        src: imagePath,
                        label: `Screenshot ${index + 1}`,
                      }))),
                    ];

                    if (!detailSlides.length) {
                      return null;
                    }

                    const activeSlide = detailSlides[detailImageIndex] || detailSlides[0];

                    return (
                      <section className="project-carousel" aria-label={`${expandedProject.title} media carousel`}>
                        <figure className="project-shot project-shot--carousel-main">
                          {activeSlide.type === "video" ? (
                            <video
                              src={toAssetPath(activeSlide.src)}
                              controls
                              autoPlay
                              muted
                              playsInline
                              className="project-video project-video--carousel"
                            />
                          ) : (
                            <button
                              type="button"
                              className="project-shot-btn"
                              onClick={() =>
                                setActiveImage({
                                  src: toAssetPath(activeSlide.src),
                                  alt: `${expandedProject.title} ${activeSlide.label.toLowerCase()}`,
                                })
                              }
                            >
                              <img
                                src={toAssetPath(activeSlide.src)}
                                alt={`${expandedProject.title} ${activeSlide.label.toLowerCase()}`}
                                loading="lazy"
                              />
                            </button>
                          )}

                          {detailSlides.length > 1 && (
                            <>
                              <button
                                type="button"
                                className="carousel-nav carousel-nav--prev"
                                onClick={() =>
                                  setDetailImageIndex((current) =>
                                    current === 0 ? detailSlides.length - 1 : current - 1
                                  )
                                }
                                aria-label="Previous slide"
                              >
                                ‹
                              </button>
                              <button
                                type="button"
                                className="carousel-nav carousel-nav--next"
                                onClick={() =>
                                  setDetailImageIndex((current) =>
                                    current === detailSlides.length - 1 ? 0 : current + 1
                                  )
                                }
                                aria-label="Next slide"
                              >
                                ›
                              </button>
                            </>
                          )}
                        </figure>

                        {detailSlides.length > 1 && (
                          <div className="project-carousel-thumbs" role="tablist" aria-label="Choose media slide">
                            {detailSlides.map((slide, index) => (
                              <button
                                key={`thumb-${expandedProject.title}-${slide.type}-${slide.src}`}
                                type="button"
                                className={`project-thumb ${index === detailImageIndex ? "active" : ""}`}
                                onClick={() => setDetailImageIndex(index)}
                                aria-label={`Show ${slide.label.toLowerCase()}`}
                                aria-pressed={index === detailImageIndex}
                              >
                                {slide.type === "video" ? (
                                  <span className="project-thumb-video">▶ Video</span>
                                ) : (
                                  <img
                                    src={toAssetPath(slide.src)}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </section>
                    );
                  })()}
                </div>
              </div>
            </section>
          )}

          {!expandedProject && (selectedCategory === "Agentic AI" || selectedCategory === "All Projects") && (
            <section id="agentic-ai-section" className="portfolio-section reveal category-switch-enter">
              <div className="portfolio-section-header">
                <h2>Agentic AI ({AGENTIC_PROJECTS.length} Projects)</h2>
              </div>

              <div className="project-grid">
                {AGENTIC_PROJECTS.map((project) => (
                  <div
                    key={project.title}
                    id={project.anchorId || undefined}
                    className="project-card-wrap"
                  >
                    <button
                      type="button"
                      className="project-card project-card--preview project-card--agentic"
                      onClick={() =>
                        setExpandedProject({
                          ...project,
                          category: "Agentic AI",
                          skills: project.skills || [],
                        })
                      }
                      aria-label={`View details for ${project.title}`}
                    >
                      {(project.video || (project.images && project.images.length > 0)) && (
                        <div className="project-card-thumb">
                          {project.video ? (
                            <video
                              src={toAssetPath(project.video)}
                              poster={toAssetPath(project.images?.[0] || "/pantrypal/pantrypalicon.png")}
                              muted
                              playsInline
                              loop
                              autoPlay
                              className="project-card-video-preview"
                            />
                          ) : (
                            <img
                              src={toAssetPath(project.images[0])}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                            />
                          )}
                          {project.video && (
                            <span className="project-card-video-badge">▶ Video</span>
                          )}
                        </div>
                      )}
                      <div className="project-card-body">
                        <div className="project-meta">
                          <p className="project-date">{project.date}</p>
                          <div className="project-title-row">
                            <h3>{project.title}</h3>
                            {project.clientTag && (
                              <span className="project-client-pill">{project.clientTag}</span>
                            )}
                          </div>
                        </div>
                        <p className="project-summary project-summary--clamp">{project.summary}</p>
                        <div className="project-skills">
                          {project.skills.slice(0, 4).map((skill) => (
                            <span key={`${project.title}-${skill}`} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                          {project.skills.length > 4 && (
                            <span className="skill-tag skill-tag--more">+{project.skills.length - 4}</span>
                          )}
                        </div>
                        <span className="project-card-cta">View project →</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {!expandedProject && (selectedCategory === "Data Science" || selectedCategory === "All Projects") && (
            <section id="data-science-section" className="portfolio-section reveal category-switch-enter">
              <div className="portfolio-section-header">
                <h2>Data Science (2 Papers)</h2>
              </div>

              <div className="project-grid">
                {DATA_SCIENCE_PAPERS.map((paper) => (
                  <div key={paper.title} className="project-card-wrap">
                    <button
                      type="button"
                      className="project-card project-card--preview"
                      onClick={() =>
                        setExpandedProject({
                          ...paper,
                          category: "Data Science",
                          skills: paper.skills || [],
                        })
                      }
                      aria-label={`View details for ${paper.title}`}
                    >
                      <div className="project-card-thumb project-card-thumb--paper">
                        <iframe
                          src={toGoogleDrivePreviewUrl(paper.paperLink)}
                          title={`${paper.title} preview`}
                          className="project-card-paper-frame"
                          loading="lazy"
                          allow="autoplay"
                        ></iframe>
                      </div>
                      <div className="project-card-body">
                        <div className="project-meta">
                          <p className="project-date">{paper.date}</p>
                          <div className="project-title-row">
                            <h3>{paper.title}</h3>
                            <span className="project-client-pill">{paper.clientTag}</span>
                          </div>
                        </div>
                        <p className="project-summary project-summary--clamp">{paper.summary}</p>
                        <div className="project-skills">
                          {paper.skills.slice(0, 4).map((skill) => (
                            <span key={`${paper.title}-${skill}`} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                          {paper.skills.length > 4 && (
                            <span className="skill-tag skill-tag--more">+{paper.skills.length - 4}</span>
                          )}
                        </div>
                        <span className="project-card-cta">Read paper details →</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {!expandedProject && (selectedCategory === "UX / HCI" || selectedCategory === "All Projects") && (
            <section id="ux-hci-section" className="portfolio-section reveal category-switch-enter">
              <div className="portfolio-section-header">
                <h2>UX / HCI ({HCI_VR_PROJECTS.length} Projects)</h2>
              </div>

              <div className="project-grid">
                {HCI_VR_PROJECTS.map((project) => (
                  <div key={project.title} className="project-card-wrap">
                    <button
                      type="button"
                      className="project-card project-card--preview"
                      onClick={() =>
                        setExpandedProject({
                          ...project,
                          category: "UX / HCI",
                          skills: project.tools || [],
                        })
                      }
                      aria-label={`View details for ${project.title}`}
                    >
                      <div className="project-card-thumb">
                        {project.media && project.media[0]?.type === "video" ? (
                          <>
                            <img
                              src={toYouTubeThumbnailUrl(project.media[0].link)}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                            />
                            <span className="project-card-video-badge">▶ Video</span>
                          </>
                        ) : project.media && project.media[0]?.type === "paper" ? (
                          <iframe
                            src={toGoogleDrivePreviewUrl(project.media[0].link)}
                            title={`${project.title} preview`}
                            className="project-card-paper-frame"
                            loading="lazy"
                            allow="autoplay"
                          ></iframe>
                        ) : project.previewImage ? (
                          <img
                            src={toAssetPath(project.previewImage)}
                            alt={`${project.title} homepage preview`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="project-card-fallback">Project Preview</div>
                        )}
                      </div>

                      <div className="project-card-body">
                        <div className="project-meta">
                          <p className="project-date">{project.date}</p>
                          <div className="project-title-row">
                            <h3>{project.title}</h3>
                            <span className="project-client-pill">{project.clientTag}</span>
                          </div>
                        </div>

                        <p className="project-summary project-summary--clamp">{project.summary}</p>
                        <div className="project-skills">
                          {project.tools.slice(0, 4).map((tool) => (
                            <span key={`${project.title}-${tool}`} className="skill-tag">
                              {tool}
                            </span>
                          ))}
                          {project.tools.length > 4 && (
                            <span className="skill-tag skill-tag--more">+{project.tools.length - 4}</span>
                          )}
                        </div>
                        <span className="project-card-cta">Explore project →</span>
                      </div>
                    </button>
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