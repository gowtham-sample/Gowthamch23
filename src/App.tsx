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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
                src="/profile-stylized.png"
                src="/1.png" 
                className="w-76 h-76 rounded-full object-cover absolute top-2 left-2 border-4 border-slate-900 shadow-2xl"
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
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 capitalize"
                >
                  {item}
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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <Code className="w-8 h-8 text-orange-400/30" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float delay-1000">
            <Database className="w-8 h-8 text-blue-400/30" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float delay-2000">
            <Cloud className="w-8 h-8 text-green-400/30" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float delay-3000">
            <Brain className="w-8 h-8 text-purple-400/30" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Profile picture container with spinning gradient */}
              <div className="w-80 h-80 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-spin-slow"></div>
                {/* Profile image */}
                <img
                  src="https://i.postimg.cc/x8mLdspn/Profile-pic.jpg"//Profile image
                  alt="Profile"
                  // Increased size from w-28 h-28 to w-76 h-76 and adjusted positioning
                  className="w-76 h-76 rounded-full object-cover absolute top-2 left-2 border-4 border-slate-900"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Data Scientist
            </span>
            <br />
            <span className="text-white">& DevOps Engineer</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between data science and infrastructure engineering.
            Building scalable ML systems and robust deployment pipelines for real-world impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              View My Work <ArrowUpRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Get In Touch <Mail className="w-5 h-5" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:gowthamchowdam2001@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate about transforming data into actionable insights and building the infrastructure to scale them
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                As a Data Scientist and DevOps Engineer, I specialize in creating end-to-end machine learning solutions
                that not only deliver accurate predictions but are also production-ready and scalable. My expertise spans
                from data exploration and model development to containerization, orchestration, and monitoring.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I've worked on diverse projects ranging from water infrastructure management systems to AI-powered
                applications, always focusing on real-world impact and sustainable solutions. My approach combines
                rigorous data science methodologies with modern DevOps practices to deliver robust, maintainable systems.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-400 mb-2">2+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-400 mb-2">5+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Science & Analytics</h4>
                    <p className="text-gray-300 text-sm">Machine learning, statistical analysis, predictive modeling, and data visualization</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">MLOps & Infrastructure</h4>
                    <p className="text-gray-300 text-sm">Model deployment, monitoring, CI/CD pipelines, and cloud infrastructure</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">System Architecture</h4>
                    <p className="text-gray-300 text-sm">Scalable system design, microservices, and performance optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Technical Skills</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit for building and deploying intelligent systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Working Process */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">My Working Process</h3>
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
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      {process.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold text-orange-400">
                      {process.step}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">{process.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing impactful solutions in Data Science, Machine Learning, and Infrastructure Engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 group">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                    {/* Only display status if it exists for the project */}
                    {project.status && (
                    <span className={`px-2 py-1 text-white text-xs font-medium rounded-full backdrop-blur-sm ${
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
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                  <div className="mb-4">
                    {/* Only display impact if it exists for the project */}
                    {project.impact && (
                      <p className="text-orange-400 font-medium text-sm mb-2">Impact: {project.impact}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice for target="_blank"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors duration-200"
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
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Volunteering</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Contributing to community development and social impact initiatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Campaign Volunteer</h3>
                      <p className="text-orange-400 font-semibold mb-2">Unnat Bharat Abhiyan, VelTech University</p>
                      <p className="text-gray-300 text-sm">Mar 2020 - Mar 2023 · 3 yrs 1 mo</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                        Environment
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Participated in rural development initiatives focused on sustainable development and community empowerment. 
                    Contributed to various environmental and educational programs aimed at improving quality of life in rural areas 
                    through technology adoption and awareness campaigns.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      Rural Development Focus
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      3 Years of Service
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Building className="w-4 h-4 text-orange-400" />
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
      <section id="contact" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to collaborate on your next data science or infrastructure project? Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">gowthamchowdam2001@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">+1 (346) 599-8350</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-300">Houston, Texas, United States</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-orange-500 rounded-lg transition-colors duration-200">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-orange-500 rounded-lg transition-colors duration-200">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:gowthamchowdam2001@gmail.com" className="p-3 bg-slate-800 hover:bg-orange-500 rounded-lg transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Your Name. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;