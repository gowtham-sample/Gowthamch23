import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Cloud,
  Brain,
  Monitor,
  ArrowUpRight,
  CheckCircle,
  Server,
  ExternalLink,
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const projects = [
    {
      title: "RBAC-Secured Internal AI Assistant",
      description: "Secure, production-ready internal AI chatbot implementing Role-Based Access Control (RBAC) for enterprise environments. Uses Retrieval-Augmented Generation (RAG) with Google Gemini to provide department-specific information access.",
      category: "AI/ML, Security",
      impact: "Secure role-based document access across 6 different role types",
      technologies: ["Python", "FastAPI", "Streamlit", "Google Gemini", "ChromaDB", "Kubernetes", "Docker"],
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg",
      github: "https://github.com/gowtham-org/RBAC-Secured-Internal-AI-Assistant",
    },
    {
      title: "Kubernetes Pod Status Alertmanager",
      description: "Kubernetes monitoring solution that tracks pod health and sends real-time alerts for CrashLoopBackOff errors and other pod failures. Provides proactive monitoring with dashboard visualization.",
      category: "DevOps, Monitoring",
      impact: "Reduces mean time to detection (MTTD) for container failures",
      technologies: ["Kubernetes", "Minikube", "Python", "Helm", "SOPS"],
      image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
      github: "https://github.com/gowtham-org/Kubernetes-Pod-Status-Alertmanager",
    },
    {
      title: "IntelliMatch AI-ATS Resume Matcher",
      description: "Application Tracking System (ATS) companion tool that helps job seekers optimize their resumes using Google Gemini Pro LLM. Analyzes resumes against job descriptions with AI-powered analysis.",
      category: "AI/ML, Career Tools",
      impact: "Helps job seekers improve chances of passing ATS filters",
      technologies: ["Python", "Streamlit", "Google Gemini Pro", "PyPDF2", "SQLite"],
      image: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg",
      github: "https://github.com/gowtham-org/ATSPro-Gemini-Resume-Matcher",
    },
    {
      title: "Cell Viability Prediction",
      description: "Bioinformatics machine learning project that predicts cell viability based on gene expression data from the DepMap portal. Implements multiple regression models with comprehensive preprocessing.",
      category: "AI/ML, Bioinformatics",
      impact: "Predicts cell viability for pharmaceutical research",
      technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost", "GridSearchCV"],
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      github: "https://github.com/gowtham-org/Cell-Viability-Prediction",
    },
    {
      title: "Movie-Recommender-using-ML",
      description: "Intelligent movie recommendation system that suggests personalized movie titles based on user preferences and past interactions. Emulates and enhances the recommendation capabilities of Netflix and Amazon Prime.",
      category: "Machine Learning",
      impact: "Personalized recommendations with collaborative filtering",
      technologies: ["Python", "Pandas", "Scikit-learn", "NumPy"],
      image: "https://i.postimg.cc/SxWvJdYS/1-Aat-Bvnp-Vp-EPo-Qv-ZAMeq-U-A.webp",
      github: "https://github.com/gowtham-org/Movie-Recommender-using-ML",
    },
    {
      title: "AI-Powered Construction Cost Estimation",
      description: "Machine learning model for accurate construction project cost prediction. Integrated historical data analysis with real-time market trends to provide precise cost estimates.",
      category: "AI/ML",
      impact: "Reduced cost estimation errors by 80%",
      technologies: ["Python", "TensorFlow", "Pandas", "FastAPI", "PostgreSQL"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
      github: "https://github.com/gowtham-org/AI-Powered-Smart-Cost-Estimation-for-Construction-Planning",
    },
  ];

  const skills = [
    {
      title: "DevOps & Infrastructure",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["Kubernetes", "Docker", "Helm", "Minikube", "AWS", "GitHub Actions", "SOPS", "Terraform"]
    },
    {
      title: "Data Science & ML",
      icon: <Brain className="w-6 h-6" />,
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "XGBoost", "Google Gemini"]
    },
    {
      title: "Backend & Databases",
      icon: <Server className="w-6 h-6" />,
      skills: ["FastAPI", "PostgreSQL", "SQLite", "ChromaDB", "Redis", "Microservices"]
    },
    {
      title: "Monitoring & Visualization",
      icon: <Monitor className="w-6 h-6" />,
      skills: ["Prometheus", "Grafana", "Streamlit", "Power BI", "Tableau"]
    }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'skills':
        return <SkillsPage skills={skills} />;
      case 'projects':
        return <ProjectsPage projects={projects} />;
      case 'contact':
        return <ContactPage formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitStatus={submitStatus} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/1.png"
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
              />
              <div className="text-xl font-bold text-orange-500">Gowtham Chowdam</div>
            </button>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  className={`capitalize font-medium transition-all duration-300 ${
                    currentPage === item
                      ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                      : 'text-slate-300 hover:text-orange-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800 space-y-2">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  className="block w-full text-left py-2 capitalize text-slate-300 hover:text-orange-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        {renderPage()}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">
              © 2024 <span className="text-orange-500 font-semibold">Gowtham Chowdam</span>. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-first">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full blur-3xl"></div>
              <img
                src="https://i.postimg.cc/HkWsY2jY/ca3985cb-4b38-48d8-bc3b-19dc58a89fdb.jpg"
                alt="Profile"
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover mx-auto border-4 border-orange-500 shadow-2xl relative z-10"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <div className="mb-6 inline-block lg:block">
              <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 text-orange-400 text-sm font-semibold rounded-full">
                3+ Years of Professional Experience
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              DevOps Engineer <span className="text-orange-500">&</span> <br className="hidden lg:block" />MLOps Specialist
            </h1>

            <p className="text-lg text-slate-300 mb-6 max-w-2xl lg:max-w-none leading-relaxed">
              Building scalable infrastructure for machine learning systems. Specializing in CI/CD pipelines, infrastructure automation, and cloud-native deployments with proven expertise in containerization, orchestration, and production reliability.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 lg:justify-start justify-center">
                <span className="text-orange-500 font-bold text-xl">▸</span>
                <span className="text-slate-300">Built and maintained CI/CD pipelines using GitHub Actions and Jenkins at eGovernments Foundation</span>
              </div>
              <div className="flex items-start gap-3 lg:justify-start justify-center">
                <span className="text-orange-500 font-bold text-xl">▸</span>
                <span className="text-slate-300">Automated infrastructure provisioning with Terraform and AWS cloud deployments</span>
              </div>
              <div className="flex items-start gap-3 lg:justify-start justify-center">
                <span className="text-orange-500 font-bold text-xl">▸</span>
                <span className="text-slate-300">Managed Kubernetes operations, Docker containerization, and system monitoring with Prometheus & Grafana</span>
              </div>
              <div className="flex items-start gap-3 lg:justify-start justify-center">
                <span className="text-orange-500 font-bold text-xl">▸</span>
                <span className="text-slate-300">Bridging data science with DevOps through MLOps practices for production ML systems</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => onNavigate('projects')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                View Projects <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Get In Touch <Mail className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center lg:justify-start gap-6">
              <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900/50 hover:bg-orange-500/20 rounded-lg transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900/50 hover:bg-orange-500/20 rounded-lg transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:gowthamchowdam2001@gmail.com" className="p-3 bg-slate-900/50 hover:bg-orange-500/20 rounded-lg transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-white">About Me</h2>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p className="text-lg">
            I'm a <span className="text-orange-500 font-semibold">DevOps Engineer</span> and <span className="text-orange-500 font-semibold">MLOps Specialist</span> with a strong focus on building scalable infrastructure for machine learning systems. My career is centered on bridging the gap between data science and infrastructure engineering.
          </p>

          <p className="text-lg">
            While I have a solid foundation in data science and machine learning, my primary expertise lies in <span className="text-orange-500 font-semibold">DevOps practices and infrastructure automation</span>. I completed a comprehensive data science course to deeply understand how to integrate DevOps with data science, which led me to specialize in <span className="text-orange-500 font-semibold">MLOps</span> — the practice of automating, managing, and monitoring machine learning workflows in production environments.
          </p>

          <p className="text-lg">
            My expertise spans:
          </p>

          <ul className="space-y-3 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span><span className="text-orange-500 font-semibold">Kubernetes Orchestration:</span> Deploying and managing containerized ML applications at scale</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span><span className="text-orange-500 font-semibold">CI/CD Pipelines:</span> Automating deployment workflows for ML models and applications</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span><span className="text-orange-500 font-semibold">Infrastructure as Code:</span> Using Terraform and other tools to manage cloud infrastructure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span><span className="text-orange-500 font-semibold">Monitoring & Observability:</span> Implementing real-time monitoring systems for model performance and infrastructure health</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span><span className="text-orange-500 font-semibold">Security & Access Control:</span> Designing secure systems with role-based access and encryption</span>
            </li>
          </ul>

          <p className="text-lg">
            I have worked on diverse projects including enterprise AI security systems, Kubernetes monitoring solutions, and bioinformatics applications. My approach combines rigorous engineering practices with modern DevOps tools to deliver robust, scalable, and maintainable systems that perform reliably in production.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">3+</div>
              <div className="text-slate-300">Years of Professional Experience</div>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">8+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsPage({ skills }: { skills: any[] }) {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4 text-white">Technical Skills</h2>
        <p className="text-slate-400 mb-12">Core competencies across DevOps, Data Science, and MLOps</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, index) => (
            <div key={index} className="p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-orange-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500">
                  {category.icon}
                </div>
                <h3 className="font-bold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill: string, skillIndex: number) => (
                  <li key={skillIndex} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsPage({ projects }: { projects: any[] }) {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4 text-white">Projects</h2>
        <p className="text-slate-400 mb-12">Recent projects in DevOps, AI/ML, and Infrastructure</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors group">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                {project.impact && (
                  <p className="text-orange-500 text-sm font-semibold mb-4">Impact: {project.impact}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                >
                  View on GitHub <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage({ formData, handleInputChange, handleSubmit, isSubmitting, submitStatus }: any) {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4 text-white">Get In Touch</h2>
        <p className="text-slate-400 mb-12">Let's discuss how we can work together on your next project.</p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <p className="text-slate-400">gowthamchowdam2001@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white">Phone</h4>
                <p className="text-slate-400">+1 (346) 599-8350</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white">Location</h4>
                <p className="text-slate-400">Houston, Texas, United States</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <h4 className="font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 hover:bg-orange-500/20 rounded-lg transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 hover:bg-orange-500/20 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-lg border border-slate-800">
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
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
        </div>
      </div>
    </section>
  );
}

export default App;
