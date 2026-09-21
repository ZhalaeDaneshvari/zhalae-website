import { useState } from "react";

const sources = {
  pain: "https://www.iasp-pain.org/resources/fact-sheets/an-overview-of-neuropathic-pain-and-its-impact/",
  vr: "https://research.chalmers.se/publication/542931/file/542931_Fulltext.pdf",
  alz: "https://www.alz.org/alzheimers-dementia/facts-figures",
  albers: "https://alberslab.org/projects.html",
};

function Source({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} ↗</a>;
}

const stories = [
  {
    lab: "Virtual Embodiment Lab", role: "Graduate Researcher", date: "August 2026 – Present",
    title: "Rethinking pain through virtual embodiment",
    preview: <p>Neuropathic pain affects an estimated 7–10% of adults. Behind that number are people whose nervous systems continue to signal pain in ways that can be difficult to treat. My independent master’s research asks whether changing the experience of the body in VR could offer another way to help. <Source href={sources.pain}>IASP: neuropathic pain</Source></p>,
    content: <>
      <h3>From the clinic to a virtual body</h3>
      <p>Working with Weill Cornell Medical School, I lead a study of VR-based sensory remapping for phantom limb pain. I am also exploring applications to complex regional pain syndrome (CRPS) and neuropathy. Shadowing doctors helps me connect the technical work to patients’ experiences and the realities of clinical care.</p>
      <p>The question is how changing the relationship between sensory feedback and a virtual body might influence pain and body perception. I am developing a novel remapping technique alongside the study design and research method. Published extended-reality trials offer encouraging evidence for phantom limb pain, but that does not establish the effectiveness of our approach. Our study is designed to investigate that possibility. <Source href={sources.vr}>Related clinical trial</Source></p>
      <h3>Who leads when a virtual body changes?</h3>
      <p>In a separate project, I co-authored an ACM CHI ’27 submission about social leading in VR. We examine how asymmetric transformations of avatar movement shape social behavior and perception. The work moves from dyadic interactions, involving two people, toward a triadic study with three. That shift lets us ask how leadership and coordination change when an interaction becomes a group dynamic.</p>
      <h3>Another direction: AI for everyday access</h3>
      <p>I am also collaborating with a PhD student at Cornell Tech on an AI guide project for people who are blind. We are exploring how AR glasses and AI could support access to information about the surrounding environment. Across these projects, I am interested in how emerging technology can respond to the needs of the people using it.</p>
    </>,
    methods: "Sensory remapping · Meta Quest 2 · Study design · Social interaction · Accessible technology",
  },
  {
    lab: "Virtual Embodiment Lab", role: "Research Assistant", date: "January 2025 – August 2026",
    title: "Building environments to study perception",
    preview: <p>My earlier work in the lab centered on building the virtual environments that make embodiment research possible. I developed Unity-based systems for studies of acute pain modulation and altered self-perception, connecting interactive development with questions about how people experience their bodies.</p>,
    content: <>
      <p>The work also extended beyond experimental systems. I created a website for a disability-focused VR showcase supporting neurodiverse participants. For a historical restoration initiative focused on Pompeii, I designed 3D models of Roman figures with an emphasis on historical accuracy. These projects brought together the parts of research I enjoy: making something work technically while paying close attention to the people and context it represents.</p>
    </>,
    methods: "Unity · Embodiment · Web development · Historical 3D modeling",
  },
  {
    lab: "Design + Augmented Intelligence Lab", role: "Research Assistant", date: "August 2024 – January 2026",
    title: "Making care environments easier to navigate",
    preview: <p>Finding your way through a hospital can be difficult, especially when you are already worried or overwhelmed. Our research approached wayfinding as a design problem: how could the environment make that experience easier?</p>,
    content: <>
      <h3>Testing a space before changing it</h3>
      <p>Using a virtual environment based on a real hospital in Canada, we investigated healthcare design and navigation. VR made it possible to evaluate design alternatives without first making costly changes to a physical building. I helped run studies, led participant recruitment, and built Python scripts to support behavioral data analysis. I also contributed to writing research manuscripts.</p>
      <h3>Research with older adults</h3>
      <p>Another part of my work involved recruiting older adults for research exploring VR experiences in the context of neurodegenerative conditions and potential therapeutic applications.</p>
      <p>Across these studies, I focused on connecting design decisions with participant experiences, from navigating healthcare spaces to evaluating VR with older adults.</p>
    </>,
    methods: "Healthcare design · VR studies · Older adults · Participant recruitment · Python",
  },
  {
    lab: "Albers Lab · Mass General Hospital", role: "Research Assistant", date: "July 2022 – May 2023",
    title: "Looking for new possibilities in existing drugs",
    preview: <p>An estimated 7.4 million Americans age 65 and older are living with clinical Alzheimer’s dementia in 2026. That scale gives urgency to a difficult question: could medicines developed for other conditions also offer useful directions for Alzheimer’s research? <Source href={sources.alz}>Alzheimer’s Association, 2026</Source></p>,
    content: <>
      <h3>Using data to guide the next question</h3>
      <p>My work in the Albers Lab was part of Drug Repurposing in Alzheimer’s Disease through Systems Pharmacology Approaches (DRIAD-SP). My focus was on drug repurposing: investigating whether existing drugs could be candidates for a new use in Alzheimer’s disease. <Source href={sources.albers}>Explore DRIAD-SP at the Albers Lab</Source></p>
      <p>Working with a PhD researcher, I used R and Python for computational biology analysis in support of this research. Repurposing starts with medicines that have already been developed, but their potential in Alzheimer’s still needs to be tested. For me, this work connected programming with a concrete biomedical question: how can we use data to decide which possibilities deserve a closer look?</p>
    </>,
    methods: "DRIAD-SP · Systems pharmacology · R · Python · Computational biology",
  },
];

function ResearchStory({ story, index }) {
  const [expanded, setExpanded] = useState(false);
  const detailId = `research-details-${index}`;
  return <article className="research-entry">
    <div className="research-meta"><span className="research-number">0{index + 1}</span><p>{story.lab}</p><span>{story.date}</span><p className="eyebrow">{story.role}</p></div>
    <div className="research-story">
      <h2>{story.title}</h2>
      {story.preview}
      <button className="research-read-more" type="button" aria-expanded={expanded} aria-controls={detailId} aria-label={`${expanded ? "Read less" : "Read more"} about ${story.title}`} onClick={() => setExpanded(!expanded)}>
        {expanded ? "Read less" : "Read more"}<span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div id={detailId} hidden={!expanded} className="research-details">{story.content}</div>
      <p className="research-methods">{story.methods}</p>
    </div>
  </article>;
}

export default function ResearchStories() {
  return <section className="research-list" aria-label="Research stories">
    {stories.map((story, index) => <ResearchStory key={story.title} story={story} index={index} />)}
  </section>;
}
