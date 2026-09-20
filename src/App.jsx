import documentPages from "./documents.json";
import { Fragment, useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const ROLE_TITLES = ["Developer", "Designer"];
const NAME_TO_TYPE = "Zhalae Daneshvari";
const EXPERIENCES = [
  {
    company: "Virtual Embodiment Lab",
    role: "Graduate Researcher",
    period: "August 2026 - Present",
    dateMark: "Present",
    description: "Leading research on VR-based sensory remapping as a potential therapeutic intervention for phantom limb pain with Weill Cornell Medical School. Co-authored an ACM CHI ’27 submission examining how asymmetric transformations of avatar movement shape social behavior and perception in multi-user VR.",
    logo: "/vel.jpeg", logoText: "VEL",
    skills: ["Virtual Reality", "Sensory Remapping", "Human Perception", "HCI Research"],
    filters: ["UX"],
  },
  {
    company: "Cornell Bowers",
    role: "Graduate Teaching Assistant",
    period: "August 2026 - Present",
    dateMark: "Present",
    description:
      "Teaching INFO 4340: App Prototyping and Design, supporting students in building apps with Vue.js, agentic AI, and LLM integration through WebLLMs and APIs.",
    logoText: "CB",
    logo: "/bowers.jpeg",
    skills: ["Vue.js", "Agentic AI", "WebLLMs", "API Integration", "Teaching"],
    filters: ["UX"],
  },
  {
    company: "Virtual Embodiment Lab",
    role: "Research Assistant",
    period: "January 2025 - August 2026",
    dateMark: "",
    description:
      "Developed and designed advanced Unity-based VR systems for studies on embodiment, acute pain modulation, and altered self-perception in virtual spaces.",
    logoText: "VEL",
    logo: "/vel.jpeg",
    skills: ["Unity", "VR", "Experimental Design", "Human Perception"],
    filters: ["UX"],
  },
  {
    company: "Johnson & Johnson",
    role: "Digital Measures & Biosensors Intern",
    period: "May 2026 - August 2026",
    dateMark: "2026",
    description:
      "Spearheaded the technical evaluation and strategic implementation planning of novel digital health technologies, including biosensors, wearables, and functional vision endpoints, generating evidence that informed clinical trial design, de-risked technology adoption, and accelerated the development of scalable digital measurement capabilities across different therapeutic areas.",
    logoText: "J&J",
    logo: "/jnj.png",
    skills: ["Digital Health", "Biosensors", "Clinical Trials", "Data Analytics"],
    filters: ["Data Science"],
  },
  {
    company: "Cornell Bowers",
    role: "Undergraduate Teaching Assistant",
    period: "August 2024 - May 2026",
    dateMark: "",
    description:
      "Teaching web development and design across two courses, covering HTML, CSS, JavaScript, React, Express.js, MongoDB, and REST APIs while mentoring students on accessibility, UX/UI, and Git workflows.",
    logoText: "CB",
    logo: "/bowers.jpeg",
    skills: ["React", "Express.js", "MongoDB", "UX/UI", "Teaching"],
    filters: ["UX"],
  },
  {
    company: "Design + Augmented Intelligence Lab",
    role: "Research Assistant",
    period: "August 2024 - January 2026",
    dateMark: "",
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
    dateMark: "2025",
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

function slugify(text) {
  return (
    (text || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
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

const RESUME_LINK = toAssetPath("/documents/resume.pdf");

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
    previewImage: documentPages["career-salaries"][0],
    paperLink: toAssetPath("/documents/career-salaries.pdf"),
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
    previewImage: documentPages["food-access"][0],
    paperLink: toAssetPath("/documents/food-access.pdf"),
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
        link: toAssetPath("/documents/asl-glasses.pdf"),
      },
    ],
  },
  {
    title: "SecondThought",
    date: "Spring 2026",
    clientTag: "Cornell",
    summary:
      "UX research on how upper-level Cornell STEM students use ChatGPT, Claude, and Gemini during real-world programming workflows.",
    details:
      "Through contextual interviews and a 3-day diary study, we investigated when students turn to AI, how they trust and verify outputs, and how emotions like frustration, confidence, convenience, and dependence shape behavior. We found students relied on AI during uncertainty, debugging, and time pressure, often prioritizing speed and momentum over deeper conceptual understanding. To explore how awareness might reshape these habits, I led the prototype and design of SecondThought, a reflective browser-extension prototype that introduces contextual reflection prompts and long-term usage insights for more mindful AI-assisted programming learning.",
    tools: [
      "UX Research",
      "Conversational AI",
      "Diary Study",
      "Autobiographical Design",
      "Reflective UX",
      "Browser Extension Prototype",
    ],
    previewImage: "/secondthought/secondthought-02.png",
    appLink: "https://ai.studio/apps/7b45178d-b4d0-48e7-a2ef-2f902bf1dff5?fullscreenApplet=true",
    appCta: "Open prototype",
    media: [
      {
        type: "video",
        label: "Project Walkthrough",
        link: "https://www.youtube.com/watch?v=TedcsgiGx38",
      },
    ],
    images: [
      "/secondthought/secondthought-01.png",
      "/secondthought/secondthought-02.png",
      "/secondthought/secondthought-03.png",
      "/secondthought/secondthought-04.png",
      "/secondthought/secondthought-05.png",
      "/secondthought/secondthought-06.png",
      "/secondthought/secondthought-07.png",
      "/secondthought/secondthought-08.png",
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

function DocumentPreview({ url, title }) {
  const [page, setPage] = useState(0);
  const key = url.split("/").pop().replace(".pdf", "");
  const pages = documentPages[key] || [];
  useEffect(() => setPage(0), [url]);
  const currentPage = Math.min(page, Math.max(0, pages.length - 1));
  return <section className="document-viewer" aria-label={title}>
    <div className="document-toolbar">
      <a href={url} target="_blank" rel="noreferrer">Open PDF ↗</a>
      <a href={url} download>Download</a>
      {pages.length > 1 && <div className="document-pagination"><button type="button" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)} aria-label="Previous PDF page">←</button><span role="status">Page {currentPage + 1} of {pages.length}</span><button type="button" disabled={currentPage === pages.length - 1} onClick={() => setPage(currentPage + 1)} aria-label="Next PDF page">→</button></div>}
    </div>
    <p className="document-hint">Page preview. Open the PDF for selectable text, search, and zoom.</p>
    {pages[currentPage] && <a className="document-page" href={url} target="_blank" rel="noreferrer" aria-label={`Open ${title} as PDF`}><img src={toAssetPath(pages[currentPage])} alt={`${title}, page ${currentPage + 1}. Open the PDF to read the document text.`} /></a>}
  </section>;
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

// Animation Components
function ScrollRevealWrapper({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    up: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants[direction] || variants.up}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, offset = 50 }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {typeof src === "string" ? <img src={src} alt="parallax" /> : src}
    </motion.div>
  );
}

function AnimatedSkillBadge({ skill, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className="skill-tag"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 12px rgba(50, 205, 50, 0.5)",
      }}
    >
      {skill}
    </motion.span>
  );
}

function Card3D({ children, className = "" }) {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = -(e.clientX - rect.left - rect.width / 2) / 20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 60 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TimelineComponent({ experiences }) {
  const groupedByYear = {};
  experiences.forEach((exp) => {
    const year = exp.dateMark || "Other";
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(exp);
  });

  const years = ["Present", "2026", "2025", "2024", "2023"].filter((y) => groupedByYear[y]);

  return (
    <div className="timeline-container">
      {years.map((year, yearIndex) => (
        <div key={year} className="timeline-section">
          <motion.div
            className="timeline-year-marker"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: yearIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <span className="timeline-year">{year}</span>
            <div className="timeline-connector" />
          </motion.div>

          <div className="timeline-items">
            {groupedByYear[year].map((exp, index) => (
              <ScrollRevealWrapper key={`${year}-${index}`} delay={yearIndex * 0.1 + index * 0.05}>
                <article className="timeline-card">
                  <div className="timeline-card-dot" />
                  <div className="timeline-card-content">
                    <div className="timeline-card-header">
                      <img src={toAssetPath(exp.logo)} alt={exp.company} className="timeline-card-logo" />
                      <div>
                        <h3 className="timeline-card-role">{exp.role}</h3>
                        <p className="timeline-card-company">{exp.company}</p>
                      </div>
                    </div>
                    <p className="timeline-card-period">{exp.period}</p>
                    <p className="timeline-card-description">{exp.description}</p>
                    <div className="timeline-skills">
                      {exp.skills.map((skill, skillIndex) => (
                        <AnimatedSkillBadge key={skill} skill={skill} index={skillIndex} />
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypewriterText({ text, className }) {
  return <p className={className}>{text}</p>;
}

function EnhancedHero({ roleTitles, typedName, onThemeToggle, theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      return () => element.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section className="hero reveal" ref={heroRef}>
      <div className="hero-gradient-overlay">
        <motion.div
          className="hero-gradient-blob"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-name">
          <span className="hero-greeting">Hey, I'm</span>
          <br />
          <span className="hero-typed">{typedName}</span>
          <span className="typing-inline-cursor hero-cursor" aria-hidden="true"></span>
        </h1>

        <motion.div
          className="hero-roles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="hero-role-text">
            <span>{roleTitles}</span>
          </p>
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Building AI systems, immersive VR experiences, and thoughtful digital products.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.a
            href="/zhalae-website/#portfolio"
            className="hero-cta-primary"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(50, 205, 50, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore my work
          </motion.a>
          <motion.button
            onClick={onThemeToggle}
            className="theme-toggle"
            whileHover={{ rotate: 20 }}
            whileTap={{ rotate: 10 }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState("All roles");
  const [projectQuery, setProjectQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [routePath, setRoutePath] = useState(() => getRouteFromLocation());
  const [routePathname, routeQuery = ""] = routePath.split("?");
  const isExperiencePage = routePathname.startsWith("/experience");
  const isPortfolioPage = routePathname.startsWith("/portfolio");
  const isResearchPage = routePathname.startsWith("/research");
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
    { label: "Open Research", keywords: "labs science healthcare VR", run: () => goToRoute("/research") },
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
    if (routePathname.startsWith("/portfolio") || routePathname.startsWith("/experience") || routePathname.startsWith("/research") || routePathname.startsWith("/resume")) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [routePathname]);

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
    // Open a project detail when URL is /portfolio/:slug
    if (!isPortfolioPage) {
      return undefined;
    }

    const parts = routePathname.split("/").filter(Boolean); // ['', 'portfolio', 'slug'] -> ['portfolio','slug']
    const slug = parts[1];

    if (!slug) {
      setExpandedProject(null);
      return undefined;
    }

    const allProjects = [
      ...AGENTIC_PROJECTS.map((p) => ({ ...p, category: "Agentic AI", skills: p.skills || [] })),
      ...HCI_VR_PROJECTS.map((p) => ({ ...p, category: "UX / HCI", skills: p.tools || [] })),
      ...DATA_SCIENCE_PAPERS.map((p) => ({ ...p, category: "Data Science", skills: p.skills || [] })),
    ];

    const match = allProjects.find((p) => (p.anchorId || slugify(p.title)) === slug);

    if (match) {
      setExpandedProject(match);
    } else {
      setExpandedProject(null);
    }

    return undefined;
  }, [routePathname]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
          href={isExperiencePage || isPortfolioPage || isResumePage || isResearchPage ? toAppPath("/") : "#home"}
        >
          ZD
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a
                href={
                  isExperiencePage || isPortfolioPage || isResumePage || isResearchPage
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
              <a href={toHashRoute("/research")}>Research</a>
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

      {!isExperiencePage && !isPortfolioPage && !isResumePage && !isResearchPage && (
        <main id="home">
          <section className="intro-section">
            <p className="intro-name">Zhalae Daneshvari<span>Developer · Designer · Researcher</span></p>
            <h1>Code, design, and curiosity about <span>human health.</span></h1>
            <p className="intro-description">I’m Zhalae, a developer, designer, and researcher exploring AI, human-centered systems, and biotechnology. I build across disciplines, with people at the center.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#selected-work">Explore my work <span aria-hidden="true">↘</span></a>
              <a className="btn btn-ghost" href={toHashRoute("/resume")}>View résumé</a>
            </div>
            <p className="intro-note">Information Science · Bachelor’s May 2026 · Master’s expected December 2026</p>
          </section>

          <section id="selected-work" className="selected-work">
            <div className="section-heading"><div><p className="eyebrow">A few things I’m building and exploring</p><h2>Selected work</h2></div><a className="see-more-link" href={toHashRoute("/portfolio")}>Full portfolio ↗</a></div>
            <div className="selected-grid">
              <a className="selected-card" href={toHashRoute("/portfolio/molecular-data-chatbot")}>
                <div className="selected-visual featured-art"><img src={toAssetPath("/featured/molecular-3d.png")} alt="" loading="lazy" width="1536" height="1024" /></div>
                <div className="selected-copy"><p className="eyebrow">01 / AI + biotechnology</p><h3>Molecular Data Chatbot</h3><p>Connecting molecular structure and adverse-event risk through an agentic AI system at Johnson &amp; Johnson.</p><span className="card-link">Explore the project ↗</span></div>
              </a>
              <a className="selected-card" href={toHashRoute("/research")}>
                <div className="selected-visual featured-art"><img src={toAssetPath("/featured/research-vr-3d.png")} alt="" loading="lazy" width="1536" height="1024" /></div>
                <div className="selected-copy"><p className="eyebrow">02 / Research + human experience</p><h3>Embodiment &amp; health in VR</h3><p>Investigating VR-based sensory remapping as a potential intervention for phantom limb pain with Weill Cornell Medical School.</p><span className="card-link">Explore my research ↗</span></div>
              </a>
              <a className="selected-card" href={toHashRoute("/portfolio/pantrypal")}>
                <div className="selected-visual featured-art"><img src={toAssetPath("/featured/pantrypal-logo-3d.png")} alt="" loading="lazy" width="1536" height="1024" /></div>
                <div className="selected-copy"><p className="eyebrow">03 / Product design + development</p><h3>PantryPal</h3><p>An AI kitchen companion that turns the ingredients you already have into ideas for your next meal.</p><span className="card-link">Explore the product ↗</span></div>
              </a>
            </div>
          </section>

          <section id="about" className="about-brief">
            <div><p className="eyebrow">The thread through my work</p><h2>Technical curiosity.<br />A human perspective.</h2></div>
            <div><p>I’m drawn to questions that need more than one way of thinking. My work connects molecular data, immersive environments, and everyday tools, and moves between writing code, designing interactions, and asking research questions.</p><p>At Cornell, I’m completing my Master’s in Information Science after earning my bachelor’s in May 2026. I’m especially interested in biotechnology and how thoughtful technology can support human health.</p><a className="see-more-link" href={toHashRoute("/experience")}>Explore my experience ↗</a></div>
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

      {isResearchPage && (
        <main className="research-page">
          <section className="research-intro"><p className="eyebrow">Research / Human-centered technology</p><h1>Questions about people.<br /><span>Tools to explore them.</span></h1><p className="subtitle">My research experience spans virtual embodiment, healthcare environments, and computational approaches to drug repurposing.</p></section>
          <section className="research-list" aria-label="Research experience">
            {[
              { company: "Virtual Embodiment Lab", role: "Graduate Researcher", period: "August 2026 – Present", title: "Sensory remapping & phantom limb pain", question: "Leading research on VR-based sensory remapping as a potential therapeutic intervention for phantom limb pain with Weill Cornell Medical School.", contribution: "I also co-authored an ACM CHI ’27 submission examining how asymmetric transformations of avatar movement shape social behavior and perception in multi-user VR.", methods: "Virtual reality · Sensory remapping · Social behavior · Human perception" },
              { company: "Virtual Embodiment Lab", period: "January 2025 – August 2026", title: "Embodiment, perception & pain", question: "Exploring how virtual environments relate to embodiment, acute pain modulation, and altered self-perception.", contribution: "I developed and designed advanced Unity-based VR systems for studies of human experience in virtual spaces.", methods: "Unity · Virtual reality · Experimental design · Human perception" },
              { company: "Design + Augmented Intelligence Lab", period: "August 2024 – January 2026", title: "Healthcare spaces & human behavior", question: "Investigating environmental psychology in healthcare design and evaluating wayfinding solutions in medical settings.", contribution: "I used VR to support evaluation of healthcare environments and built Python automation scripts for behavioral data analysis.", methods: "VR research · Python · Behavioral data analysis · Healthcare UX" },
              { company: "Albers Lab · Mass General Hospital", period: "July 2022 – May 2023", title: "Computational approaches to drug repurposing", question: "Exploring Alzheimer’s drug repurposing through electronic health record data.", contribution: "I conducted EHR-driven research and applied R and Python algorithms for computational biology analysis in collaboration with a PhD researcher.", methods: "R · Python · EHR data · Computational biology" },
            ].map((study, index) => <article className="research-entry" key={study.company}>
              <div className="research-meta"><span className="research-number">0{index + 1}</span><p>{study.company}</p><span>{study.period}</span><p className="eyebrow">{study.role || "Research Assistant"}</p></div>
              <div><h2>{study.title}</h2><p>{study.question}</p><h3>My contribution</h3><p>{study.contribution}</p><p className="research-methods">{study.methods}</p></div>
            </article>)}
          </section>
          <section className="research-further"><p className="eyebrow">Related work</p><h2>More ways to explore</h2><p>My portfolio also includes HCI studies and data science papers, with project details and available research materials.</p><div className="hero-actions"><a className="btn btn-ghost" href={toHashRoute("/portfolio?category=UX%20%2F%20HCI")}>HCI projects ↗</a><a className="btn btn-ghost" href={toHashRoute("/portfolio?category=Data%20Science")}>Data science papers ↗</a></div></section>
        </main>
      )}

      {isExperiencePage && (
        <main className="experience-page">
          <section className="experience-hero">
            <p className="eyebrow">Experience / 2022 to Present</p><h1>Building across<br /><span className="soft-accent">disciplines.</span></h1>
            <p className="subtitle">From molecular data to immersive environments. A path through industry, research, and teaching.</p>
            <div className="experience-overview"><span><strong>Industry</strong> Johnson &amp; Johnson · IFF</span><span><strong>Research</strong> Cornell · Mass General Hospital</span><span><strong>Teaching</strong> Cornell Bowers</span></div>
          </section>
          <div className="browse-toolbar" aria-label="Filter experience">
            <div className="browse-filters">{["All roles", "Industry", "Research", "Teaching"].map(filter => <button type="button" key={filter} className={`category-pill ${experienceFilter === filter ? "active" : ""}`} aria-pressed={experienceFilter === filter} onClick={() => setExperienceFilter(filter)}>{filter}</button>)}</div>
            <a className="see-more-link" href={toHashRoute("/resume")}>View résumé ↗</a>
          </div>
          <section className="career-list" aria-label="Professional experience">
            {EXPERIENCES.filter(item => experienceFilter === "All roles" || (experienceFilter === "Research" ? item.role.includes("Research") : experienceFilter === "Teaching" ? item.role.includes("Teaching") : item.role.includes("Intern"))).map(item => <article className="career-row" key={`${item.company}-${item.role}`}>
              <div className="career-date"><span>{item.period}</span>{item.period.includes("Present") && <span className="current-label">Current</span>}</div>
              <div className="career-content"><div className="career-heading"><img src={toAssetPath(item.logo)} alt="" /><div><p>{item.company}</p><h2>{item.role}</h2></div></div><p className="career-description">{item.description}</p><div className="career-skills">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>
            </article>)}
          </section>
          <p className="career-note">Interested in the questions behind the work? <a href={toHashRoute("/research")}>Explore my research ↗</a></p>
        </main>
      )}

      {isPortfolioPage && (
        <main className="portfolio-page">
          {!expandedProject && (
            <section className="portfolio-hero reveal">
              <p className="eyebrow">Portfolio / Selected projects & studies</p>
              <h1>Ideas made <span className="soft-accent">real.</span></h1>
              <TypewriterText
                className="subtitle"
                text="AI systems, thoughtful interfaces, and research-led experiments. Explore the work by discipline, or follow your curiosity."
                speed={18}
              />
              <label className="project-search">Find something specific<input type="search" placeholder="Search projects, tools, or topics…" value={projectQuery} onChange={event => setProjectQuery(event.target.value)} /></label>
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
                  onClick={() => {
                    setExpandedProject(null);
                    goToRoute("/portfolio");
                  }}
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
                      <DocumentPreview url={expandedProject.paperLink} title={expandedProject.title} />
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
                                <DocumentPreview url={item.link} title={item.label} />
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

          {!expandedProject && (() => {
            const projects = [
              ...AGENTIC_PROJECTS.map(project => ({ ...project, category: "Agentic AI" })),
              ...HCI_VR_PROJECTS.map(project => ({ ...project, category: "UX / HCI", skills: project.tools })),
              ...DATA_SCIENCE_PAPERS.map(project => ({ ...project, category: "Data Science" })),
            ].filter(project => (selectedCategory === "All Projects" || project.category === selectedCategory) && `${project.title} ${project.summary} ${project.skills.join(" ")}`.toLowerCase().includes(projectQuery.trim().toLowerCase()));
            return <section className="work-collection" aria-label="Projects">
              <p className="collection-count" role="status">{projects.length} {projects.length === 1 ? "project" : "projects"} · {selectedCategory === "All Projects" ? "Across disciplines" : selectedCategory}</p>
              <div className="work-grid">{projects.map((project) => {
                const preview = project.images?.[0] || project.previewImage || (project.media?.[0]?.type === "video" ? toYouTubeThumbnailUrl(project.media[0].link) : null);
                return <a className="work-card" key={project.title} href={toHashRoute(`/portfolio/${project.anchorId || slugify(project.title)}`)}>
                  <div className="work-image">{preview ? <img src={toAssetPath(preview)} alt="" loading="lazy" /> : <div className="paper-art" aria-hidden="true"><span>RESEARCH NOTES</span><i /><i /><i /><span>Data → questions → insight</span></div>}<span className="work-kind">{project.paperLink ? "Research paper" : project.video || project.media?.some(item => item.type === "video") ? "Project + demo" : "Project"}</span></div>
                  <div className="work-copy"><p className="work-meta">{project.category} <span>{project.date}</span></p><h2>{project.title}</h2><p className="work-summary">{project.summary}</p><p className="work-tools">{project.skills.slice(0,3).join(" / ")}</p><span className="work-open">Explore {project.paperLink ? "paper" : "project"} <span aria-hidden="true">↗</span></span></div>
                </a>;
              })}</div>
              {!projects.length && <div className="empty-projects"><h2>No matching projects</h2><p>Try another topic, or reset the filters to see everything.</p><button className="btn btn-ghost" onClick={() => {setProjectQuery(""); setSelectedCategory("All Projects");}}>Reset filters</button></div>}
            </section>;
          })()}

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
              <DocumentPreview url={RESUME_LINK} title="Résumé" />
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
