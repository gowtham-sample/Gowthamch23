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
  Download,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Brain,
  Monitor,
  ChevronRight,
  Award,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  Star,
  ArrowUpRight,
  Play,
  Users,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  Server,
  GitBranch,
  BarChart3,
  Cpu,
  Shield,
  Layers
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your service ID
        "YOUR_TEMPLATE_ID", // Replace with your template ID
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

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Projects data
  const projects = [
    {
      title: "AI-Powered Construction Cost Estimation",
      description: "Machine learning model for accurate construction project cost prediction. Integrated historical data analysis with real-time market trends to provide precise cost estimates and risk assessments.",
      category: "AI/ML",
      impact: "Reduced cost estimation errors by 80%",
      technologies: ["Python", "TensorFlow", "Pandas", "FastAPI", "PostgreSQL", "Docker"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
      github: "https://github.com/gowtham-org/AI-Powered-Smart-Cost-Estimation-for-Construction-Planning",
    },
    {
      title: "Visual Question Answering System",
      description: "Deep learning system that answers questions about images using computer vision and natural language processing. Implemented attention mechanisms and transformer architectures for improved accuracy.",
      category: "Computer Vision",
      impact: "Achieved 85% accuracy on VQA datasets",
      technologies: ["PyTorch", "OpenCV", "BERT", "Flask", "CUDA", "MLflow"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      github: "https://github.com/gowtham-org/MultiModal-VQA-and-Automated-Image-Captioning",
    },
    {
      title: "Image Quantization",
      description: "To design a comprehensive, interactive system that demonstrates and visualizes the effects of systematically reducing the number of gray levels (quantization) and changing the resolution (spatial sampling rate) of images.",
      category: "Image processing",
      impact: "Improved theoretical foundations and implementation accuracy",
      technologies: ["opencv-python-headless", "numpy", "matplotlib"],
      image: "https://i.postimg.cc/C1ZtLgjt/image-quant2.png",
      github: "https://github.com/gowtham-org/Quantization-and-Spatial-Resolution",
    },
    {
      title: "Movie-Recommender-using-ML",
      description: "project focuses on building an intelligent movie recommendation system that suggests personalized movie titles to users based on their preferences and past interactions. The goal is to emulate and enhance the recommendation capabilities of platforms like Netflix and Amazon Prime using machine learning algorithms.",
      category: "Machine Learning",
      technologies: ["Python", "pandas", "scikit-learn", "numpy"],
      image: "https://i.postimg.cc/SxWvJdYS/1-Aat-Bvnp-Vp-EPo-Qv-ZAMeq-U-A.webp",
      github: "https://github.com/gowtham-org/Movie-Recommender-using-ML",
    },
    {
      title: "JJM - Jal Jeevan Mission Water Infrastructure",
      description: "Comprehensive water supply infrastructure management system for rural areas. Implemented automated monitoring, predictive maintenance, and resource optimization using IoT sensors and machine learning algorithms.",
      category: "Infrastructure",
      impact: "Improved water access for 50,000+ rural households",
      technologies: ["Terraform", "PostgreSQL", "Docker", "Kubernetes"],
      image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg",
      github: "#",
    },
    {
      title: "DWSS - Drinking Water & Sewerage System",
      description: "Advanced sewerage management and water treatment monitoring system. Built real-time analytics dashboard for water quality monitoring and automated alert systems for maintenance scheduling.",
      category: "Water Management",
      impact: "Enhanced water quality monitoring for 100,000+ residents",
      technologies: ["GitHub Actions", "Redis", "AWS", "Terraform"],
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
      github: "#",
    },
    {
      title: "Cougar Cupboard Dashboard Using Power BI",
      description: "Comprehensive analytics dashboard for food pantry operations management. Built interactive visualizations to track inventory, visitor demographics, and distribution patterns to optimize resource allocation and improve service delivery.",
      category: "Data Analytics",
      impact: "Improved operational efficiency and resource planning",
      technologies: ["Power BI", "DAX", "SQL", "Excel", "Data Modeling"],
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
      github: "https://github.com/gowtham-org/Cougar-Cupboard-Dashboard-Using-Power-BI",
    }
  ];

  // Skills data
  const skillCategories = [
    {
      title: "Data Science & ML",
      icon: <Brain className="w-6 h-6" />,
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Jupyter", "MLflow"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["GitHub Actions", "AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Ansible", "Prometheus"]
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      skills: ["PostgreSQL", "Redis", "Apache Kafka", "Microservices"]
    },
    {
      title: "Frontend & Visualization",
      icon: <Monitor className="w-6 h-6" />,
      skills: ["Power BI", "Tableau", "Prometheus", "Kibana", "Streamlit", "Grafana"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Floating particles in navigation */}
          <div className="particle w-2 h-2 bg-orange-400 top-2 left-10 animate-float"></div>
          <div className="particle w-1 h-1 bg-blue-400 top-4 right-20 animate-float delay-1000"></div>
          <div className="particle w-1.5 h-1.5 bg-purple-400 top-6 left-1/3 animate-float delay-2000"></div>
          
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <img 
                src="/1.png" 
                alt="Gowtham Chowdam Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-400 animate-pulse-glow hover:scale-110 transition-transform duration-300"
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Gowtham Chowdam
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-orange-400 transition-all duration-300 capitalize relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-gray-300 hover:text-orange-400 transition-colors duration-200 capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 perspective-1000 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-grid">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse transform-3d"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 transform-3d"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-rotate-3d"></div>
          
          {/* 3D Geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-400/30 to-red-500/30 transform rotate-45 animate-bounce-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full animate-float delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-green-400/30 to-teal-500/30 transform rotate-12 animate-bounce-slow delay-1000"></div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float transform-3d animate-text-glow">
            <Code className="w-8 h-8 text-orange-400/50" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float delay-1000 transform-3d animate-text-glow">
            <Database className="w-8 h-8 text-blue-400/50" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float delay-2000 transform-3d animate-text-glow">
            <Cloud className="w-8 h-8 text-green-400/50" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float delay-3000 transform-3d animate-text-glow">
            <Brain className="w-8 h-8 text-purple-400/50" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="relative inline-block perspective-1000">
              {/* Profile picture container with spinning gradient */}
              <div className="w-80 h-80 mx-auto mb-8 relative transform-3d">
                <div className="absolute inset-0 gradient-border rounded-full"></div>
                {/* Profile image */}
                <img
                  src="https://i.postimg.cc/x8mLdspn/Profile-pic.jpg"//Profile image
                  alt="Profile"
                  // Increased size from w-28 h-28 to w-76 h-76 and adjusted positioning
                  className="w-76 h-76 rounded-full object-cover absolute top-2 left-2 border-4 border-slate-900 hover:scale-105 transition-transform duration-500 animate-pulse-glow"
                />
                {/* 3D floating elements around profile */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-bounce-slow opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float delay-1000 opacity-80"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 transform rotate-45 animate-bounce-slow delay-2000 opacity-80"></div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black mb-6 animate-text-reveal">
            <span className="gradient-text font-black tracking-tight">
              Data Scientist
            </span>
            <br />
            <span className="text-white text-glow font-black tracking-tight animate-text-glow delay-500">& DevOps Engineer</span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-left delay-700 font-medium">
            Bridging the gap between data science and infrastructure engineering.
            <span className="gradient-text-static font-semibold"> Building scalable ML systems</span> and robust deployment pipelines for real-world impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-right delay-1000">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold magnetic-btn flex items-center gap-2 glass-card border border-orange-500/50 text-white shadow-2xl hover-lift"
            >
              <span className="animate-text-shimmer">View My Work</span> <ArrowUpRight className="w-5 h-5 animate-bounce-slow" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-orange-500 rounded-xl font-bold magnetic-btn flex items-center gap-2 glass-card hover:bg-orange-500/20 text-white shadow-2xl hover-lift"
            >
              <span className="animate-text-shimmer delay-200">Get In Touch</span> <Mail className="w-5 h-5 animate-wave delay-500" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in delay-1500">
            <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:scale-125 hover:rotate-12 animate-pulse-glow">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:scale-125 hover:rotate-12 animate-pulse-glow delay-200">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:gowthamchowdam2001@gmail.com" className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:scale-125 hover:rotate-12 animate-pulse-glow delay-500">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden bg-dots">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black gradient-text mb-6 animate-text-reveal">About Me</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium animate-slide-in-left delay-300">
              Passionate about transforming data into actionable insights and building the infrastructure to scale them
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left delay-500">
              <h3 className="text-2xl font-bold text-white mb-6 text-glow-blue animate-text-glow">My Journey</h3>
              <p className="text-slate-300 mb-6 leading-relaxed font-medium">
                As a Data Scientist and DevOps Engineer, I specialize in creating end-to-end machine learning solutions
                that not only deliver accurate predictions but are also production-ready and scalable. My expertise spans
                from data exploration and model development to containerization, orchestration, and monitoring.
              </p>
              <p className="text-slate-300 mb-8 leading-relaxed font-medium">
                I've worked on diverse projects ranging from water infrastructure management systems to AI-powered
                applications, always focusing on real-world impact and sustainable solutions. My approach combines
                rigorous data science methodologies with modern DevOps practices to deliver robust, maintainable systems.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 glass-card rounded-xl card-3d hover-lift transition-all duration-300 animate-scale-pulse delay-700">
                  <div className="text-3xl font-black gradient-text mb-2 animate-text-glow">2+</div>
                  <div className="text-slate-300 font-semibold">Years Experience</div>
                </div>
                <div className="text-center p-4 glass-card rounded-xl card-3d hover-lift transition-all duration-300 animate-scale-pulse delay-1000">
                  <div className="text-3xl font-black gradient-text mb-2 animate-text-glow">7+</div>
                  <div className="text-slate-300 font-semibold">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-slide-in-right delay-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-glow-blue animate-text-glow">Core Competencies</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 animate-slide-in-right delay-1000">
                  <div className="p-2 bg-orange-500/20 rounded-lg animate-pulse-glow">
                    <BarChart3 className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-shadow-lg">Data Science & Analytics</h4>
                    <p className="text-slate-300 text-sm font-medium">Machine learning, statistical analysis, predictive modeling, and data visualization</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 animate-slide-in-right delay-1200">
                  <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse-glow delay-1000">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-shadow-lg">MLOps & Infrastructure</h4>
                    <p className="text-slate-300 text-sm font-medium">Model deployment, monitoring, CI/CD pipelines, and cloud infrastructure</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 animate-slide-in-right delay-1500">
                  <div className="p-2 bg-green-500/20 rounded-lg animate-pulse-glow delay-2000">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-shadow-lg">System Architecture</h4>
                    <p className="text-slate-300 text-sm font-medium">Scalable system design, microservices, and performance optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden bg-grid">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="bg-gradient-to-r from-orange-400 to-red-500 animate-pulse rounded-sm" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black gradient-text mb-6 animate-text-reveal">Technical Skills</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium animate-slide-in-left delay-300">
              A comprehensive toolkit for building and deploying intelligent systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-all duration-300 card-3d group hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/30 rounded-lg text-orange-400 group-hover:animate-bounce-slow animate-pulse-glow">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white text-shadow-lg">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300 animate-slide-in-left" style={{ transitionDelay: `${skillIndex * 0.1}s`, animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s` }}>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-slate-300 text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Working Process */}
          <div className="mt-20">
            <h3 className="text-3xl font-black gradient-text text-center mb-12 animate-text-reveal">My Working Process</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description: "Understanding business requirements, exploring data patterns, and assessing infrastructure needs",
                  icon: <Target className="w-6 h-6" />
                },
                {
                  step: "02",
                  title: "Design & Development",
                  description: "Creating ML models, designing system architecture, and developing CI/CD pipelines",
                  icon: <Code className="w-6 h-6" />
                },
                {
                  step: "03",
                  title: "Implementation & Testing",
                  description: "Deploying solutions with automated testing, performance optimization, and security measures",
                  icon: <Zap className="w-6 h-6" />
                },
                {
                  step: "04",
                  title: "Monitoring & Maintenance",
                  description: "Continuous monitoring, model retraining, system updates, and performance tracking",
                  icon: <TrendingUp className="w-6 h-6" />
                }
              ].map((process, index) => (
                <div key={index} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.3}s` }}>
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-slow animate-pulse-glow shadow-2xl">
                      {process.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 glass-card rounded-full flex items-center justify-center text-sm font-bold gradient-text group-hover:scale-110 transition-transform duration-300 animate-scale-pulse">
                      {process.step}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 text-shadow-lg">{process.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden bg-dots">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-red-500/30 transform rotate-45 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-green-400/30 to-teal-500/30 transform rotate-12 animate-float delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black gradient-text mb-6 animate-text-reveal">Featured Projects</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium animate-slide-in-left delay-300">
              Showcasing impactful solutions in Data Science, Machine Learning, and Infrastructure Engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden border border-slate-600 hover:border-orange-500/50 transition-all duration-500 card-3d group hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent group-hover:from-slate-900/70 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm animate-pulse-glow shadow-lg">
                      {project.category}
                    </span>
                    {/* Only display status if it exists for the project */}
                    {project.status && (
                    <span className={`px-2 py-1 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${
                      project.status === 'Completed' ? 'bg-green-500/90' :
                      project.status === 'Active' ? 'bg-blue-500/90' :
                      project.status === 'Production' ? 'bg-purple-500/90' :
                      'bg-yellow-500/90'
                    }`}>
                      {project.status}
                    </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 group-hover:bg-slate-800/50 transition-all duration-300">
                  <h3 className="text-xl font-black text-white mb-3 line-clamp-2 text-shadow-lg">{project.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3 font-medium">{project.description}</p>

                  <div className="mb-4">
                    {/* Only display impact if it exists for the project */}
                    {project.impact && (
                      <p className="gradient-text-static font-bold text-sm mb-2">Impact: {project.impact}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 glass-card text-slate-300 text-xs rounded-md group-hover:bg-slate-600/50 transition-all duration-300 font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 glass-card text-slate-300 text-xs rounded-md group-hover:bg-slate-600/50 transition-all duration-300 font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice for target="_blank"
                      className="flex items-center gap-2 px-3 py-2 glass-card hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 magnetic-btn font-semibold"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden bg-grid">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-400/20 via-transparent to-blue-400/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black gradient-text mb-6 animate-text-reveal">Volunteering</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium animate-slide-in-left delay-300">
              Contributing to community development and social impact initiatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-all duration-300 card-3d group hover-lift animate-slide-up delay-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse-glow group-hover:animate-bounce-slow shadow-2xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2 text-shadow-lg">Campaign Volunteer</h3>
                      <p className="gradient-text-static font-bold mb-2">Unnat Bharat Abhiyan, VelTech University</p>
                      <p className="text-slate-300 text-sm font-medium">Mar 2020 - Mar 2023 · 3 yrs 1 mo</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className="px-3 py-1 bg-green-500/30 text-green-400 text-sm font-bold rounded-full animate-pulse-glow shadow-lg">
                        Environment
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                    Participated in rural development initiatives focused on sustainable development and community empowerment. 
                    Contributed to various environmental and educational programs aimed at improving quality of life in rural areas 
                    through technology adoption and awareness campaigns.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <MapPin className="w-4 h-4 text-orange-400 group-hover:animate-bounce-slow" />
                      Rural Development Focus
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <Calendar className="w-4 h-4 text-orange-400 group-hover:animate-bounce-slow delay-1000" />
                      3 Years of Service
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <Building className="w-4 h-4 text-orange-400 group-hover:animate-bounce-slow delay-2000" />
                      VelTech Initiative
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden bg-dots">
        {/* Contact background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black gradient-text mb-6 animate-text-reveal">Get In Touch</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium animate-slide-in-left delay-300">
              Ready to collaborate on your next data science or infrastructure project? Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-slide-in-left delay-500">
              <h3 className="text-2xl font-black text-white mb-8 text-glow-blue animate-text-glow">Let's Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group animate-slide-in-left delay-700">
                  <div className="p-3 bg-orange-500/20 rounded-lg group-hover:animate-bounce-slow animate-pulse-glow">
                    <Mail className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-shadow-lg">Email</h4>
                    <p className="text-slate-300 font-medium">gowthamchowdam2001@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group animate-slide-in-left delay-1000">
                  <div className="p-3 bg-orange-500/20 rounded-lg group-hover:animate-bounce-slow animate-pulse-glow delay-1000">
                    <Phone className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-shadow-lg">Phone</h4>
                    <p className="text-slate-300 font-medium">+1 (346) 599-8350</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group animate-slide-in-left delay-1200">
                  <div className="p-3 bg-orange-500/20 rounded-lg group-hover:animate-bounce-slow animate-pulse-glow delay-2000">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-shadow-lg">Location</h4>
                    <p className="text-slate-300 font-medium">Houston, Texas, United States</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 animate-slide-in-left delay-1500">
                <h4 className="font-bold text-white mb-4 text-shadow-lg">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:bg-orange-500/20 rounded-lg transition-all duration-300 magnetic-btn animate-pulse-glow">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:bg-orange-500/20 rounded-lg transition-all duration-300 magnetic-btn animate-pulse-glow delay-200">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:gowthamchowdam2001@gmail.com" className="p-3 glass-card hover:bg-orange-500/20 rounded-lg transition-all duration-300 magnetic-btn animate-pulse-glow delay-500">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right delay-700">
              <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-xl border border-slate-600 hover-lift">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-card border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 font-medium"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-card border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass-card border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-slate-400 resize-none transition-all duration-300 font-medium"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold magnetic-btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 glass-card border border-orange-500/50 text-white shadow-2xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="animate-text-shimmer">Send Message</span>
                      <Mail className="w-5 h-5 animate-wave" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 glass-card bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center animate-slide-up font-semibold">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 glass-card bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center animate-slide-up font-semibold">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 glass-card border-t border-slate-600 relative overflow-hidden">
        {/* Footer background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-transparent to-red-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400 font-medium">
              © 2024 <span className="gradient-text-static font-bold">Gowtham Chowdam</span>. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;