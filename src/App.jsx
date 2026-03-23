import { useEffect, useState } from "react";

const ROLE_TITLES = ["Developer", "Designer"];
const NAME_TO_TYPE = "Zhalae Daneshvari";

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

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-a"></span>
        <span className="orb orb-b"></span>
        <span className="orb orb-c"></span>
      </div>

      <header className="topbar">
        <a className="brand" href="#home">
          ZD
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
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
      </header>

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
            Building elegant digital experiences at Cornell University with a focus on
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
        </section>

        <section id="experience" className="panel reveal">
          <h2>Experience</h2>
          <div className="experience-list">
            <article className="experience-item">
              <p className="experience-role">Role Title at Company</p>
              <p className="experience-time">Month Year - Month Year</p>
              <p className="experience-note">
                Add your first internship or role here with one clear impact statement.
              </p>
            </article>
            <article className="experience-item">
              <p className="experience-role">Role Title at Organization</p>
              <p className="experience-time">Month Year - Month Year</p>
              <p className="experience-note">
                Add your second role here and highlight the product, research, or system you
                built.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="panel reveal">
          <h2>Contact</h2>
          <p>Open to collaborations, research opportunities, and creative projects.</p>
          <a className="email-link" href="mailto:zhalae15@gmail.com">
            zhalae15@gmail.com
          </a>
        </section>
      </main>

      <footer className="site-footer reveal">
        Coded and designed by Zhalae Daneshvari and Copilot ;)
      </footer>
    </>
  );
}

export default App;