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
  const isExperiencePage = window.location.pathname.startsWith("/experience");

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

    if (prefersReducedMotion || isCarouselPaused || isExperiencePage) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % EXPERIENCES.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [isCarouselPaused, isExperiencePage]);

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
  }, []);

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
        <a className="brand" href={isExperiencePage ? "/" : "#home"}>
          ZD
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a href={isExperiencePage ? "/#home" : "#home"}>Home</a>
            </li>
            <li>
              <a href={isExperiencePage ? "/#work" : "#work"}>Work</a>
            </li>
            <li>
              <a href="/experience">Experience</a>
            </li>
            <li>
              <a href={isExperiencePage ? "/#contact" : "#contact"}>Contact</a>
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

      {!isExperiencePage && (
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
              <a className="btn btn-primary" href="#work">
                View Work
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
          </section>

          <section id="work" className="panel reveal">
            <h2>Focus Areas</h2>
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
              <a className="see-more-link" href="/experience">
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
                      <img src={activeExperience.logo} alt={`${activeExperience.company} logo`} />
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
                      <img src={nextExperience.logo} alt={`${nextExperience.company} logo`} />
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
            <p className="subtitle">
              A detailed look at internships, research, and product work across machine
              learning, UX, and interactive technology.
            </p>
            <div className="experience-hero-actions">
              <a className="btn btn-primary" href="/">
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
                    {item.logo ? <img src={item.logo} alt={`${item.company} logo`} /> : item.logoText}
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

      <footer className="site-footer reveal">
        Coded and designed by Zhalae Daneshvari and Copilot ;)
      </footer>
    </>
  );
}

export default App;