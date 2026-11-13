import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail, Menu, Send, X } from 'lucide-react';
import { portfolio } from './data/portfolio';
import { projects } from './data/projects';

const navItems = [
  { label: 'ABOUT', id: 'about' },
  { label: 'WORK', id: 'work' },
  { label: 'CONTACT', id: 'contact' },
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor-glow" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} />;
}

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  return <nav className="nav-shell"><a href="#top" className="logo-mark" aria-label="Back to top">{portfolio.initials}</a><a className="nav-email" href={`mailto:${portfolio.email}`}>{portfolio.email}</a><div className="hidden md:flex items-center gap-9">{navItems.map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} className={`nav-link ${active === item.id ? 'active' : ''}`}>{item.label}</button>)}</div><button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>{open && <div className="mobile-nav">{navItems.map((item) => <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>)}</div>}</nav>;
}

function SideRail() {
  return <><div className="side-social"><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a></div><a className="resume-link" href="#contact"><span>RESUME</span><FileText size={14} /></a></>;
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % portfolio.roles.length), 2600); return () => window.clearInterval(timer); }, []);
  return <section id="top" className="hero-section"><div className="hero-photo" /><div className="hero-grid" /><div className="hero-content"><Reveal className="hero-intro"><p className="eyebrow">HELLO! I'M</p><h1>Gowtham<br /><span>Chowdam.</span></h1><p className="hero-note">I design the systems that let ambitious ideas run in production.</p></Reveal><Reveal delay={0.14} className="hero-role"><p className="eyebrow">A DEVOPS ENGINEER</p><AnimatePresence mode="wait"><motion.h2 key={portfolio.roles[roleIndex]} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>{portfolio.roles[roleIndex]}</motion.h2></AnimatePresence><a href="#about" className="scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={16} /></a></Reveal></div><div className="hero-bottom"><span>HOUSTON, TX · 2026</span><span>BUILDING FOR WHAT'S NEXT</span></div></section>;
}

function About() {
  const words = portfolio.about.split(' ');
  return <section id="about" className="section-shell about-section"><Reveal><p className="eyebrow">01 / ABOUT</p><h2 className="statement">{words.map((word, index) => <motion.span key={`${word}-${index}`} initial={{ color: '#465260' }} whileInView={{ color: '#e6edf3' }} viewport={{ once: true, amount: 0.8 }} transition={{ delay: index * 0.025 }}>{word} </motion.span>)}</h2></Reveal><div className="about-footer"><span>ENGINEERED WITH CURIOSITY</span><span>SCALABLE BY DEFAULT</span></div></section>;
}

function Experience() {
  return <section className="section-shell experience-section"><Reveal><p className="eyebrow">02 / EXPERIENCE</p><h2 className="section-title">My career <span>&amp; experience</span></h2></Reveal><div className="timeline">{portfolio.experience.map((item, index) => <Reveal key={item.role} delay={index * 0.07} className="timeline-row"><div><p className="timeline-role">{item.role}</p><p className="timeline-company">{item.company}</p></div><p className="timeline-year">{item.year}</p><p className="timeline-description">{item.description}</p></Reveal>)}</div></section>;
}

function Projects() {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const next = () => setIndex((value) => (value + 1) % projects.length);
  const previous = () => setIndex((value) => (value - 1 + projects.length) % projects.length);
  return <section id="work" className="section-shell work-section"><Reveal><div className="work-heading"><div><p className="eyebrow">03 / SELECTED WORK</p><h2 className="section-title">My <span>Work</span></h2></div><div className="project-controls"><button onClick={previous} aria-label="Previous project"><ArrowLeft size={18} /></button><button onClick={next} aria-label="Next project"><ArrowRight size={18} /></button></div></div></Reveal><div className="project-frame"><div className="project-copy"><AnimatePresence mode="wait"><motion.div key={project.title} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.35 }}><p className="project-number">{String(index + 1).padStart(2, '0')}</p><p className="project-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><p className="eyebrow tool-label">TOOLS &amp; FEATURES</p><div className="tool-list">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={15} /></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">LIVE <ArrowUpRight size={15} /></a>}</div></motion.div></AnimatePresence></div><div className="project-preview"><div className="preview-grid" /><div><span className="preview-index">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><p>{project.title}</p><small>{project.impact}</small></div></div></div><div className="pagination">{projects.map((item, dotIndex) => <button key={item.title} onClick={() => setIndex(dotIndex)} className={index === dotIndex ? 'selected' : ''} aria-label={`Show ${item.title}`} />)}</div></section>;
}

function TechStack() {
  const reduceMotion = useReducedMotion();
  return <section className="section-shell tech-section"><Reveal><p className="eyebrow">04 / TOOLKIT</p><div className="tech-header"><h2 className="section-title">My Tech <span>Stack</span></h2><p>Tools I use to move from a blank repo to a dependable system.</p></div></Reveal><div className={`tech-field ${reduceMotion ? 'reduced' : ''}`}>{portfolio.tech.map((tech, index) => <motion.div key={tech} className="tech-ball" initial={reduceMotion ? false : { y: -80, opacity: 0 }} whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: (index % 9) * 0.06, type: 'spring', bounce: 0.35 }} whileHover={{ scale: 1.08, color: '#071117' }}>{tech}</motion.div>)}</div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); window.setTimeout(() => setSent(false), 4500); };
  return <section id="contact" className="contact-section"><div className="section-shell"><Reveal><p className="eyebrow">05 / CONTACT</p><h2 className="contact-title">LET'S BUILD<br /><span>SOMETHING USEFUL.</span></h2></Reveal><div className="contact-grid"><div className="contact-details"><a href={`mailto:${portfolio.email}`}>{portfolio.email}</a><a href={`tel:${portfolio.phone.replace(/[^\d+]/g, '')}`}>{portfolio.phone}</a><p>MS IN ENGINEERING DATA SCIENCE<br />UNIVERSITY OF HOUSTON</p></div><form className="contact-form" onSubmit={submit}><label>NAME<input name="name" required placeholder="Your name" /></label><label>EMAIL<input name="email" type="email" required placeholder="you@company.com" /></label><label>MESSAGE<textarea name="message" required rows={4} placeholder="Tell me about the problem you're solving." /></label><button type="submit">SEND MESSAGE <Send size={16} /></button>{sent && <p className="form-success">Thanks — your message is ready to be connected.</p>}</form><div className="contact-social"><p className="eyebrow">FIND ME ELSEWHERE</p><a href={portfolio.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={20} /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={20} /></a></div></div><div className="footer-line"><span>DEVELOPED BY <b>GOWTHAM CHOWDAM</b></span><span>© 2026</span></div></div></section>;
}

export default function App() {
  const [active, setActive] = useState('about');
  const sections = useMemo(() => navItems.map((item) => item.id), []);
  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-40% 0px -50% 0px' }); sections.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); }); return () => observer.disconnect(); }, [sections]);
  return <div className="app-shell"><CursorGlow /><Navbar active={active} /><SideRail /><main><Hero /><About /><Experience /><Projects /><TechStack /><Contact /></main></div>;
}
