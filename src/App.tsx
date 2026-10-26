import Chatbot from './components/Chatbot';
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Cloud,
  Brain,
  Monitor,
  ArrowUpRight,
  CheckCircle,
  Server,
  ExternalLink,
  Sparkles,
  Briefcase,
  Calendar,
  Building2,
} from 'lucide-react';
import { useTilt } from './hooks/useTilt';
import { useScrollReveal } from './hooks/useScrollReveal';

const NetworkBackground = lazy(() => import('./components/NetworkBackground'));

/* ── Capability detection for 3D background ─────────────────────────────────── */

function shouldRender3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.innerWidth < 768) return false;
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return !!gl;
}

/* ── Framer Motion variants ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const viewportConfig = { once: true, margin: '-80px' };

function MotionReveal({
  children,
  variant = fadeUp,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  variant?: typeof fadeUp;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const PROJECTS = [
  {
    title: 'TriageIQ - AI-Powered IT Ticket Triage System',
    description:
      'Intelligent IT ticket classification and prioritization system using multi-model AI pipeline.',
    fullDescription:
      'Intelligent IT ticket classification and prioritization system using multi-model AI pipeline. Classifies tickets into Bug/Feature/Task/Incident categories, predicts priority levels (P1-P5), and generates AI-powered summaries and root cause analysis using LLaMA 3.3-70B. Creates Jira tickets automatically with all insights.',
    category: 'AI/ML, DevOps',
    impact: '98% classification accuracy with semantic search and SLA breach prediction',
    technologies: ['Python', 'FastAPI', 'Streamlit', 'BERT', 'XGBoost', 'ChromaDB', 'Groq LLaMA', 'Jira API', 'Docker', 'Kubernetes'],
    github: 'https://github.com/gowtham-org/TriageIQ-Ticketing-System',
    live: '',
    image: 'https://images.pexels.com/photos/8867631/pexels-photo-8867631.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 1,
  },
  {
    title: 'GitOps with ArgoCD on k3d',
    description:
      'Hands-on GitOps implementation with ArgoCD on local Kubernetes clusters using k3d.',
    fullDescription:
      'Hands-on GitOps implementation demonstrating ArgoCD on local Kubernetes clusters using k3d. Showcases multi-cluster deployments, sync waves, lifecycle hooks, and production-ready GitOps patterns with GitHub as the single source of truth for infrastructure and applications.',
    category: 'DevOps, GitOps',
    impact: 'Multi-cluster setup with ordered deployment workflows and automatic synchronization',
    technologies: ['ArgoCD', 'Kubernetes', 'k3d', 'Docker', 'Helm', 'YAML', 'GitHub', 'WSL2'],
    github: 'https://github.com/gowtham-org/argocd-public-repo',
    live: '',
    image: 'https://images.pexels.com/photos/38422417/pexels-photo-38422417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 2,
  },
  {
    title: 'RBAC-Secured Internal AI Assistant',
    description:
      'Secure enterprise AI chatbot with Role-Based Access Control and RAG using Google Gemini.',
    fullDescription:
      'Secure, production-ready internal AI chatbot implementing Role-Based Access Control (RBAC) for enterprise environments. Uses Retrieval-Augmented Generation (RAG) with Google Gemini to provide department-specific information access.',
    category: 'AI/ML, Security',
    impact: 'Secure role-based document access across 6 different role types',
    technologies: ['Python', 'FastAPI', 'Streamlit', 'Google Gemini', 'ChromaDB', 'Kubernetes', 'Docker'],
    github: 'https://github.com/gowtham-org/RBAC-Secured-Internal-AI-Assistant',
    live: '',
    image: 'https://images.pexels.com/photos/5473956/pexels-photo-5473956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 3,
  },
  {
    title: 'Kubernetes Pod Status Alertmanager',
    description:
      'Kubernetes monitoring that tracks pod health and sends real-time alerts for failures.',
    fullDescription:
      'Kubernetes monitoring solution that tracks pod health and sends real-time alerts for CrashLoopBackOff errors and other pod failures. Provides proactive monitoring with dashboard visualization.',
    category: 'DevOps, Monitoring',
    impact: 'Reduces mean time to detection (MTTD) for container failures',
    technologies: ['Kubernetes', 'Minikube', 'Python', 'Helm', 'SOPS'],
    github: 'https://github.com/gowtham-org/Kubernetes-Pod-Status-Alertmanager',
    live: '',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 4,
  },
  {
    title: 'IntelliMatch AI-ATS Resume Matcher',
    description:
      'ATS companion tool that helps job seekers optimize resumes using Google Gemini Pro.',
    fullDescription:
      'Application Tracking System (ATS) companion tool that helps job seekers optimize their resumes using Google Gemini Pro LLM. Analyzes resumes against job descriptions with AI-powered analysis.',
    category: 'AI/ML, Career Tools',
    impact: 'Helps job seekers improve chances of passing ATS filters',
    technologies: ['Python', 'Streamlit', 'Google Gemini Pro', 'PyPDF2', 'SQLite'],
    github: 'https://github.com/gowtham-org/ATSPro-Gemini-Resume-Matcher',
    live: '',
    image: 'https://images.pexels.com/photos/4101343/pexels-photo-4101343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 5,
  },
  {
    title: 'AI-Powered Construction Cost Estimation',
    description:
      'ML model for accurate construction project cost prediction with real-time market trends.',
    fullDescription:
      'Machine learning model for accurate construction project cost prediction. Integrated historical data analysis with real-time market trends to provide precise cost estimates.',
    category: 'AI/ML',
    impact: 'Reduced cost estimation errors by 80%',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/gowtham-org/AI-Powered-Smart-Cost-Estimation-for-Construction-Planning',
    live: '',
    image: 'https://images.pexels.com/photos/13758319/pexels-photo-13758319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 6,
  },
  {
    title: 'Cell Viability Prediction',
    description:
      'Bioinformatics ML project predicting cell viability from gene expression data (DepMap).',
    fullDescription:
      'Bioinformatics machine learning project that predicts cell viability based on gene expression data from the DepMap portal. Implements multiple regression models with comprehensive preprocessing.',
    category: 'AI/ML, Bioinformatics',
    impact: 'Predicts cell viability for pharmaceutical research',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'GridSearchCV'],
    github: 'https://github.com/gowtham-org/Cell-Viability-Prediction',
    live: '',
    image: 'https://images.pexels.com/photos/35967917/pexels-photo-35967917.png?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 7,
  },
  {
    title: 'Movie-Recommender-using-ML',
    description:
      'Personalized movie recommendation system using collaborative filtering techniques.',
    fullDescription:
      'Intelligent movie recommendation system that suggests personalized movie titles based on user preferences and past interactions. Emulates and enhances the recommendation capabilities of Netflix and Amazon Prime.',
    category: 'Machine Learning',
    impact: 'Personalized recommendations with collaborative filtering',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'NumPy'],
    github: 'https://github.com/gowtham-org/Movie-Recommender-using-ML',
    live: '',
    image: 'https://images.pexels.com/photos/987586/pexels-photo-987586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 8,
  },
  {
    title: 'Todo Manager - Tkinter Desktop App',
    description:
      'Feature-rich desktop todo app with prioritization, search, CSV export, and analytics.',
    fullDescription:
      'Feature-rich desktop todo application built with Python and Tkinter backed by SQLite. Provides intuitive task management with prioritization, color-coded status tracking, live search filtering, CSV export, and visual dashboard analytics. Includes dark mode and professional UI/UX.',
    category: 'Desktop App, Python',
    impact: 'Complete task management solution with data persistence and analytics',
    technologies: ['Python 3.12', 'Tkinter', 'SQLite', 'Matplotlib', 'CSV Export'],
    github: 'https://github.com/gowtham-org/tkinter-todo-app',
    live: '',
    image: 'https://images.pexels.com/photos/37116245/pexels-photo-37116245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    priority: 9,
  },
];

const SKILLS = [
  {
    title: 'DevOps & Infrastructure',
    icon: <Cloud className="w-6 h-6" />,
    skills: ['Kubernetes', 'Docker', 'Helm', 'Minikube', 'AWS', 'GitHub Actions', 'SOPS', 'Terraform'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Data Science & ML',
    icon: <Brain className="w-6 h-6" />,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'XGBoost', 'Google Gemini'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Backend & Databases',
    icon: <Server className="w-6 h-6" />,
    skills: ['FastAPI', 'PostgreSQL', 'SQLite', 'ChromaDB', 'Redis', 'Microservices'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Monitoring & Visualization',
    icon: <Monitor className="w-6 h-6" />,
    skills: ['Prometheus', 'Grafana', 'Streamlit', 'Power BI', 'Tableau'],
    color: 'from-amber-500 to-orange-500',
  },
];

const EXPERIENCES = [
  {
    company: 'University of Houston College of Natural Sciences and Mathematics',
    employmentType: 'Part-time · 1 yr 2 mos',
    location: 'Houston, Texas, United States · On-site',
    roles: [
      {
        title: 'Instructional Assistant',
        duration: 'Aug 2025 - May 2026 · 10 mos',
        skills: ['Smartsheet', 'Terraform', '+8 skills'],
      },
      {
        title: 'System Administrator',
        duration: 'Apr 2025 - Jul 2025 · 4 mos',
        skills: ['Bash', 'GitHub', '+5 skills'],
      },
    ],
  },
  {
    company: 'eGov Foundation',
    employmentType: 'Full-time',
    location: 'Banglore · On-site',
    roles: [
      {
        title: 'DevOps Engineer',
        duration: 'Aug 2022 - Jul 2024 · 2 yrs',
        skills: ['Recruiting', 'Technical Recruiting', '+33 skills'],
      },
    ],
  },
  {
    company: 'CGI',
    employmentType: 'Contract',
    location: 'Austin, Texas · Remote',
    roles: [
      {
        title: 'Cloud Engineer',
        duration: 'May 2025 - Present · 1 yr 5 mos',
        skills: ['Amazon Web Services (AWS)', 'Cloud Computing', '+7 skills'],
      },
    ],
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    emailjs.init('YOUR_PUBLIC_KEY');
  }, []);

  useEffect(() => {
    setCanRender3D(shouldRender3D());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sortedProjects = [...PROJECTS].sort((a, b) => a.priority - b.priority);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/40 rounded-full blur-md group-hover:bg-orange-500/60 transition-colors" />
                <img
                  src="/1.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-500 relative z-10"
                />
              </div>
              <div className="text-xl font-bold text-orange-500">Gowtham Chowdam</div>
            </button>

            <div className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                      : 'text-slate-300 hover:text-orange-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800 space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>
        <HeroSection canRender3D={canRender3D} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection projects={sortedProjects} />
        <ContactSection
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
        />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 <span className="text-orange-500 font-semibold">Gowtham Chowdam</span>. Built with
            React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}

/* ── Parallax background orbs ──────────────────────────────────────────────── */

function ParallaxOrbs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      const orbs = ref.current.querySelectorAll<HTMLDivElement>('.parallax-orb');
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 0.4;
        orb.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="parallax-orb orb animate-float"
        style={{ width: 400, height: 400, background: 'rgba(249,115,22,0.25)', top: '5%', left: '10%' }}
      />
      <div
        className="parallax-orb orb animate-float delay-500"
        style={{ width: 300, height: 300, background: 'rgba(6,182,212,0.2)', top: '40%', right: '8%' }}
      />
      <div
        className="parallax-orb orb animate-float delay-1000"
        style={{ width: 350, height: 350, background: 'rgba(239,68,68,0.15)', bottom: '5%', left: '30%' }}
      />
    </div>
  );
}

/* ── Holographic rings around hero image ──────────────────────────────────── */

function HoloRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="holo-ring animate-spin-slow"
        style={{ width: '110%', height: '110%', borderColor: 'rgba(249,115,22,0.25)' }}
      />
      <div
        className="holo-ring animate-spin-slow"
        style={{
          width: '125%',
          height: '125%',
          borderColor: 'rgba(6,182,212,0.15)',
          animationDirection: 'reverse',
        }}
      />
      <div
        className="holo-ring animate-spin-slow"
        style={{ width: '140%', height: '140%', borderColor: 'rgba(249,115,22,0.1)' }}
      />
    </div>
  );
}

/* ── Reusable 3D tilt wrapper ──────────────────────────────────────────────── */

function TiltCard({
  children,
  className = '',
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}) {
  const { ref, handleMove, handleLeave } = useTilt<HTMLDivElement>();
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      {glare && <div className="tilt-glare" />}
      {children}
    </div>
  );
}

/* ── Legacy reveal wrapper (kept for components that use IntersectionObserver) ─ */

function Reveal3D({
  children,
  variant = 'center',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'center' | 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const cls = variant === 'left' ? 'reveal-3d-left' : variant === 'right' ? 'reveal-3d-right' : 'reveal-3d';
  return (
    <div
      ref={ref}
      className={`${cls} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────────────────────── */

function HeroSection({ canRender3D }: { canRender3D: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden pt-20"
    >
      {/* 3D network background — lazy-loaded with gradient fallback */}
      {canRender3D ? (
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          }
        >
          <NetworkBackground />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      )}

      <ParallaxOrbs />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D profile image with parallax */}
          <div
            ref={heroRef}
            className="flex justify-center order-first perspective-2000"
            style={{ transform: `rotateY(${parallax.x * 0.5}deg) rotateX(${-parallax.y * 0.5}deg)` }}
          >
            <div className="relative preserve-3d" style={{ width: 320, height: 320 }}>
              <HoloRings />
              <div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-cyan-500/20 rounded-full blur-3xl"
                style={{ transform: 'translateZ(-40px)' }}
              />
              <img
                src="https://i.postimg.cc/HkWsY2jY/ca3985cb-4b38-48d8-bc3b-19dc58a89fdb.jpg"
                alt="Profile"
                className="w-72 h-72 lg:w-80 lg:h-80 rounded-full object-cover mx-auto border-4 border-orange-500 shadow-2xl relative z-10"
                style={{ transform: 'translateZ(40px)' }}
              />
            </div>
          </div>

          {/* Text content with parallax depth */}
          <div
            className="text-center lg:text-left"
            style={{ transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)` }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-6 inline-block lg:block"
            >
              <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 text-orange-400 text-sm font-semibold rounded-full inline-flex3+ Years of Professional Experience
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight"
            >
              <span className="gradient-text">DevOps Engineer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-lg text-slate-300 mb-6 max-w-2xl lg:max-w-none leading-relaxed"
            >
              Building scalable infrastructure for machine learning systems. Specializing in CI/CD
              pipelines, infrastructure automation, and cloud-native deployments with proven expertise
              in containerization, orchestration, and production reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="space-y-4 mb-8"
            >
              {[
                'Built and maintained CI/CD pipelines using GitHub Actions and Jenkins at eGovernments Foundation',
                'Automated infrastructure provisioning with Terraform and AWS cloud deployments',
                'Managed Kubernetes operations, Docker containerization, and system monitoring with Prometheus & Grafana',
                'Bridging data science with DevOps through MLOps practices for production ML systems',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 lg:justify-start justify-center">
                  <span className="text-orange-500 font-bold text-xl">▸</span>
                  <span className="text-slate-300">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="magnetic-btn px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                View Projects <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="magnetic-btn px-8 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                Get In Touch <Mail className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              <a
                href="https://github.com/orgs/gowtham-org/repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900/50 hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900/50 hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:gowthamchowdam2001@gmail.com"
                className="p-3 bg-slate-900/50 hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About Section ────────────────────────────────────────────────────────── */

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      <ParallaxOrbs />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionReveal>
          <h2 className="text-5xl font-bold mb-12 text-white">About Me</h2>
        </MotionReveal>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <MotionReveal delay={0.05}>
            <p className="text-lg">
              I'm a <span className="text-orange-500 font-semibold">DevOps Engineer</span> with a strong focus
              on building scalable infrastructure for machine learning systems. My career is centered on
              bridging the gap between data science and infrastructure engineering.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="text-lg">
              While I have a solid foundation in data science and machine learning, my primary expertise
              lies in <span className="text-orange-500 font-semibold">DevOps practices and infrastructure
              automation</span>. I completed a comprehensive data science course to deeply understand how
              to integrate DevOps with data science, which led me to specialize in{' '}
              <span className="text-orange-500 font-semibold">MLOps</span> — the practice of automating,
              managing, and monitoring machine learning workflows in production environments.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="text-lg">My expertise spans:</p>
          </MotionReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Kubernetes Orchestration', 'Deploying and managing containerized ML applications at scale'],
              ['CI/CD Pipelines', 'Automating deployment workflows for ML models and applications'],
              ['Infrastructure as Code', 'Using Terraform and other tools to manage cloud infrastructure'],
              ['Monitoring & Observability', 'Real-time monitoring for model performance and infra health'],
              ['Security & Access Control', 'Designing secure systems with role-based access and encryption'],
            ].map(([title, desc], i) => (
              <MotionReveal key={i} variant={i % 2 === 0 ? fadeLeft : fadeRight} delay={0.2 + i * 0.08}>
                <TiltCard className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-sm h-full">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl">•</span>
                    <div>
                      <span className="text-orange-500 font-semibold">{title}:</span>{' '}
                      <span className="text-slate-300 text-sm">{desc}</span>
                    </div>
                  </div>
                </TiltCard>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal delay={0.45}>
            <p className="text-lg">
              I have worked on diverse projects including enterprise AI security systems, Kubernetes
              monitoring solutions, and bioinformatics applications. My approach combines rigorous
              engineering practices with modern DevOps tools to deliver robust, scalable, and
              maintainable systems that perform reliably in production.
            </p>
          </MotionReveal>

          <div className="grid grid-cols-2 gap-6 mt-8 perspective-1000">
            <MotionReveal variant={fadeLeft} delay={0.5}>
              <TiltCard className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center h-full">
                <div className="text-4xl font-bold gradient-text mb-2">3+</div>
                <div className="text-slate-300">Years of Professional Experience</div>
              </TiltCard>
            </MotionReveal>
            <MotionReveal variant={fadeRight} delay={0.55}>
              <TiltCard className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center h-full">
                <div className="text-4xl font-bold gradient-text mb-2">8+</div>
                <div className="text-slate-300">Projects Completed</div>
              </TiltCard>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Experience Section ────────────────────────────────────────────────────── */

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      <ParallaxOrbs />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionReveal>
          <h2 className="text-5xl font-bold mb-4 text-white">Experience</h2>
        </MotionReveal>
        <MotionReveal delay={0.05}>
          <p className="text-slate-400 mb-12">My professional journey across DevOps, infrastructure, and academic roles.</p>
        </MotionReveal>

        <div className="relative perspective-2000">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-slate-700 to-transparent" />

          {EXPERIENCES.map((exp, ei) => (
            <MotionReveal key={ei} variant={fadeRight} delay={ei * 0.1} className="mb-10">
              <TiltCard className="relative pl-16 pr-6 py-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-orange-500/50 transition-colors">
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-7 w-4 h-4 rounded-full bg-orange-500 border-4 border-slate-950 shadow-lg shadow-orange-500/50" />

                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{exp.company}</h3>
                    <p className="text-sm text-orange-400 font-medium">{exp.employmentType}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="pl-1 border-l-2 border-slate-700 ml-1">
                      <div className="pl-4">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 text-cyan-400" />
                          <h4 className="font-semibold text-white">{role.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                          <Calendar className="w-3 h-3" /> {role.duration}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, si) => (
                            <span
                              key={si}
                              className="px-2.5 py-1 bg-slate-800/60 text-slate-300 text-xs font-medium rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skills Section with 3D flip cards ─────────────────────────────────────── */

function SkillsSection() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      <ParallaxOrbs />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionReveal>
          <h2 className="text-5xl font-bold mb-4 text-white">Technical Skills</h2>
        </MotionReveal>
        <MotionReveal delay={0.05}>
          <p className="text-slate-400 mb-12">
            Core competencies across DevOps, Data Science, and MLOps — hover or tap to flip
          </p>
        </MotionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {SKILLS.map((category, index) => (
            <MotionReveal key={index} delay={index * 0.08}>
              <div
                className={`flip-card h-64 cursor-pointer ${flipped === index ? 'flipped' : ''}`}
                onClick={() => setFlipped(flipped === index ? null : index)}
              >
                <div className="flip-card-inner">
                  {/* Front */}
                  <div className="flip-card-face">
                    <div className="h-full p-6 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-md flex flex-col items-center justify-center text-center gap-4 hover:border-orange-500/50 transition-colors">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}
                        style={{ transform: 'translateZ(20px)' }}
                      >
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-white text-lg">{category.title}</h3>
                      <span className="text-xs text-slate-500">Tap to reveal skills</span>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="flip-card-face flip-card-back">
                    <div className="h-full p-6 bg-slate-900/80 border border-orange-500/40 rounded-xl backdrop-blur-md flex flex-col justify-center">
                      <h3 className="font-bold text-orange-400 text-sm mb-3 text-center">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.skills.map((skill: string, si: number) => (
                          <li key={si} className="flex items-center gap-2 text-slate-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects Section — clean cards with hover lift ────────────────────────── */

function ProjectsSection({ projects }: { projects: typeof PROJECTS }) {
  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      <ParallaxOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionReveal>
          <h2 className="text-5xl font-bold mb-4 text-white">Featured Projects</h2>
        </MotionReveal>
        <MotionReveal delay={0.05}>
          <p className="text-lg text-slate-400 mb-12">
            Organized by priority. Showcasing production-grade work in DevOps, AI/ML, and Infrastructure
          </p>
        </MotionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <MotionReveal
              key={index}
              variant={index % 3 === 0 ? fadeLeft : index % 3 === 2 ? fadeRight : fadeUp}
              delay={(index % 3) * 0.08}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
              >
                <div className="h-full bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-orange-500/50 transition-colors flex flex-col overflow-hidden">
                  <div className="relative h-36 overflow-hidden flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        #{index + 1}
                      </span>
                      <span className="px-2.5 py-1.5 bg-slate-900/80 backdrop-blur text-slate-200 text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">

                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.impact && (
                    <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <p className="text-orange-400 text-xs font-medium">
                        {project.impact}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-800/60 text-slate-300 text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-700 hover:border-orange-500 text-slate-300 hover:text-orange-400 text-sm font-semibold rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                  </div>
                  </div>
                </div>
              </motion.div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact Section ───────────────────────────────────────────────────────── */

function ContactSection({ formData, handleInputChange, handleSubmit, isSubmitting, submitStatus }: any) {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      <ParallaxOrbs />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionReveal>
          <h2 className="text-5xl font-bold mb-4 text-white">Get In Touch</h2>
        </MotionReveal>
        <MotionReveal delay={0.05}>
          <p className="text-slate-400 mb-12">
            Let's discuss how we can work together on your next project.
          </p>
        </MotionReveal>

        <div className="grid lg:grid-cols-2 gap-12 perspective-1000">
          <MotionReveal variant={fadeLeft}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              {[
                [<Mail key="m" className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />, 'Email', 'gowthamchowdam2001@gmail.com'],
                [<Phone key="p" className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />, 'Phone', '+1 (346) 599-8350'],
              ].map(([icon, label, value], i) => (
                <TiltCard key={i} className="flex items-start gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-sm">
                  {icon}
                  <div>
                    <h4 className="font-semibold text-white">{label as string}</h4>
                    <p className="text-slate-400">{value as string}</p>
                  </div>
                </TiltCard>
              ))}

              <div className="mt-8 pt-8 border-t border-slate-800">
                <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/orgs/gowtham-org/repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900 hover:bg-orange-500/20 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900 hover:bg-orange-500/20 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal variant={fadeRight} delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-slate-900/80 p-8 rounded-2xl border border-slate-800 backdrop-blur-md"
            >
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}

export default App;
