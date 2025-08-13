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
  ExternalLink,
  Code,
  Database,
  Cloud,
  Brain,
  Monitor,
  ChevronRight,
  Calendar,
  Building,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  Server,
  BarChart3,
  Shield,
  Layers,
  ArrowUpRight,
  Send
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
    emailjs.init("YOUR_PUBLIC_KEY");
  }, []);

  // Handle form submission
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
      description: "Advanced machine learning system that revolutionizes construction project cost prediction through intelligent data analysis and real-time market integration.",
      category: "Artificial Intelligence",
      impact: "Reduced estimation errors by 80%",
      technologies: ["Python", "TensorFlow", "Pandas", "FastAPI", "PostgreSQL", "Docker"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
      github: "https://github.com/gowtham-org/AI-Powered-Smart-Cost-Estimation-for-Construction-Planning",
    },
    {
      title: "Visual Question Answering System",
      description: "Sophisticated deep learning architecture combining computer vision and natural language processing to understand and respond to visual queries with human-like accuracy.",
      category: "Computer Vision",
      impact: "Achieved 85% accuracy on VQA datasets",
      technologies: ["PyTorch", "OpenCV", "BERT", "Flask", "CUDA", "MLflow"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      github: "https://github.com/gowtham-org/MultiModal-VQA-and-Automated-Image-Captioning",
    },
    {
      title: "Advanced Image Quantization System",
      description: "Comprehensive interactive platform demonstrating the mathematical foundations of image processing through systematic quantization and spatial resolution analysis.",
      category: "Image Processing",
      impact: "Enhanced theoretical understanding and practical implementation",
      technologies: ["OpenCV", "NumPy", "Matplotlib", "Python"],
      image: "https://i.postimg.cc/C1ZtLgjt/image-quant2.png",
      github: "https://github.com/gowtham-org/Quantization-and-Spatial-Resolution",
    },
    {
      title: "Intelligent Movie Recommendation Engine",
      description: "Sophisticated recommendation system leveraging collaborative filtering and content-based algorithms to deliver personalized movie suggestions with Netflix-level accuracy.",
      category: "Machine Learning",
      impact: "Personalized recommendations for diverse user preferences",
      technologies: ["Python", "Pandas", "Scikit-learn", "NumPy"],
      image: "https://i.postimg.cc/SxWvJdYS/1-Aat-Bvnp-Vp-EPo-Qv-ZAMeq-U-A.webp",
      github: "https://github.com/gowtham-org/Movie-Recommender-using-ML",
    },
    {
      title: "Jal Jeevan Mission Infrastructure",
      description: "Comprehensive water supply infrastructure management system serving rural communities through IoT integration, predictive maintenance, and intelligent resource optimization.",
      category: "Infrastructure Engineering",
      impact: "Enhanced water access for 50,000+ rural households",
      technologies: ["Terraform", "PostgreSQL", "Docker", "Kubernetes"],
      image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg",
      github: "#",
    },
    {
      title: "Smart Water Management System",
      description: "Advanced sewerage management and water treatment monitoring platform featuring real-time analytics, quality assessment, and automated maintenance scheduling.",
      category: "Environmental Technology",
      impact: "Improved water quality monitoring for 100,000+ residents",
      technologies: ["GitHub Actions", "Redis", "AWS", "Terraform"],
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
      github: "#",
    },
    {
      title: "Cougar Cupboard Analytics Dashboard",
      description: "Comprehensive business intelligence solution for food pantry operations, featuring advanced analytics, demographic insights, and operational optimization tools.",
      category: "Data Analytics",
      impact: "Streamlined operations and enhanced resource allocation",
      technologies: ["Power BI", "DAX", "SQL", "Excel", "Data Modeling"],
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
      github: "https://github.com/gowtham-org/Cougar-Cupboard-Dashboard-Using-Power-BI",
    }
  ];

  // Skills data
  const skillCategories = [
    {
      title: "Data Science & Machine Learning",
      icon: <Brain className="w-6 h-6" />,
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Jupyter", "MLflow"]
    },
    {
      title: "Cloud & DevOps Engineering",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "Ansible", "Prometheus"]
    },
    {
      title: "Backend & Database Systems",
      icon: <Server className="w-6 h-6" />,
      skills: ["PostgreSQL", "Redis", "Apache Kafka", "Microservices", "API Design"]
    },
    {
      title: "Analytics & Visualization",
      icon: <BarChart3 className="w-6 h-6" />,
      skills: ["Power BI", "Tableau", "Grafana", "Kibana", "Streamlit", "D3.js"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                GC
              </div>
              <div className="text-xl font-semibold">Gowtham Chowdam</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Expertise', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
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
            <div className="md:hidden py-4 border-t border-gray-800">
              {['Home', 'About', 'Expertise', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-3 text-gray-300 hover:text-white transition-colors duration-200"
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float delay-300"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="mb-8">
              <img
                src="https://i.postimg.cc/x8mLdspn/Profile-pic.jpg"
                alt="Gowtham Chowdam"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-8 border-4 border-gray-700 shadow-2xl"
              />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance">
              <span className="gradient-text">Data Scientist</span>
              <br />
              <span className="text-white">& DevOps Engineer</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed text-balance">
              Transforming complex data into actionable insights while building the robust infrastructure 
              to scale intelligent systems. Bridging the gap between advanced analytics and production-ready solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover-lift flex items-center gap-2"
              >
                Explore My Work <ArrowUpRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-gray-600 rounded-lg font-semibold hover:border-indigo-500 transition-colors duration-300 flex items-center gap-2"
              >
                Get In Touch <Mail className="w-5 h-5" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:gowthamchowdam2001@gmail.com" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gray-800/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">
                Crafting Intelligence Through Data & Infrastructure
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  As a Data Scientist and DevOps Engineer, I specialize in creating comprehensive machine learning 
                  solutions that seamlessly transition from research to production. My expertise encompasses the 
                  entire data science lifecycle, from initial exploration to scalable deployment.
                </p>
                <p>
                  I've architected and deployed intelligent systems across diverse domains, including water 
                  infrastructure management, construction cost optimization, and visual intelligence applications. 
                  My approach combines rigorous analytical methodologies with modern engineering practices to 
                  deliver sustainable, impactful solutions.
                </p>
                <p>
                  My passion lies in solving complex real-world problems through the intersection of advanced 
                  analytics, cloud infrastructure, and automated deployment pipelines, ensuring that innovative 
                  solutions reach their full potential in production environments.
                </p>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="grid grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-xl text-center hover-lift">
                  <div className="text-4xl font-bold gradient-text mb-2">2+</div>
                  <div className="text-gray-300 font-medium">Years of Experience</div>
                </div>
                <div className="glass-card p-8 rounded-xl text-center hover-lift">
                  <div className="text-4xl font-bold gradient-text mb-2">7+</div>
                  <div className="text-gray-300 font-medium">Projects Delivered</div>
                </div>
                <div className="glass-card p-8 rounded-xl text-center hover-lift">
                  <div className="text-4xl font-bold gradient-text mb-2">150K+</div>
                  <div className="text-gray-300 font-medium">Lives Impacted</div>
                </div>
                <div className="glass-card p-8 rounded-xl text-center hover-lift">
                  <div className="text-4xl font-bold gradient-text mb-2">80%</div>
                  <div className="text-gray-300 font-medium">Accuracy Improvement</div>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Advanced Analytics</h4>
                    <p className="text-gray-400 text-sm">Machine learning, statistical modeling, and predictive analytics</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">MLOps & Infrastructure</h4>
                    <p className="text-gray-400 text-sm">Model deployment, monitoring, and scalable cloud architecture</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">System Architecture</h4>
                    <p className="text-gray-400 text-sm">Scalable design, microservices, and performance optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="expertise" className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Technical Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              A comprehensive technology stack for building and deploying intelligent systems at scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {skillCategories.map((category, index) => (
              <div key={index} className={`glass-card p-8 rounded-xl hover-lift animate-scale-in delay-${(index + 1) * 100}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-12 animate-fade-in-up">My Approach</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "Understanding business objectives, data landscape, and infrastructure requirements"
                },
                {
                  step: "02",
                  title: "Design & Development",
                  description: "Creating robust ML models and designing scalable system architectures"
                },
                {
                  step: "03",
                  title: "Implementation & Testing",
                  description: "Deploying solutions with comprehensive testing and performance optimization"
                },
                {
                  step: "04",
                  title: "Monitoring & Evolution",
                  description: "Continuous monitoring, model retraining, and system enhancement"
                }
              ].map((process, index) => (
                <div key={index} className={`text-center animate-fade-in-up delay-${(index + 1) * 200}`}>
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
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
      <section id="projects" className="section-padding bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Showcasing innovative solutions across data science, machine learning, and infrastructure engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`glass-card rounded-xl overflow-hidden hover-lift animate-scale-in delay-${(index + 1) * 100}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-indigo-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                  {project.impact && (
                    <p className="text-indigo-400 font-medium text-sm mb-4">{project.impact}</p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Community Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Contributing to sustainable development and community empowerment initiatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-xl hover-lift animate-scale-in">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Campaign Volunteer</h3>
                      <p className="text-indigo-400 font-semibold mb-2">Unnat Bharat Abhiyan, IIT Roorkee</p>
                      <p className="text-gray-300 text-sm">March 2020 - March 2023 · 3 years 1 month</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30">
                        Environmental Impact
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    Participated in comprehensive rural development initiatives focused on sustainable development 
                    and community empowerment. Contributed to environmental conservation programs, educational 
                    outreach, and technology adoption campaigns aimed at improving quality of life in rural 
                    communities through innovative solutions and awareness building.
                  </p>
                  
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-indigo-400" />
                      <span className="font-medium">Rural Development Focus</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                      <span className="font-medium">3 Years of Dedicated Service</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Building className="w-5 h-5 text-indigo-400" />
                      <span className="font-medium">IIT Roorkee Initiative</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Let's Collaborate</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Ready to transform your data into actionable insights? Let's discuss how we can work together 
              to build intelligent solutions that drive real impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-300">gowthamchowdam2001@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <p className="text-gray-300">+1 (346) 599-8350</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Location</h4>
                    <p className="text-gray-300">Houston, Texas, United States</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/orgs/gowtham-org/repositories" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card hover:bg-indigo-500/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/gowtham-chowdam-35ba96185/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card hover:bg-indigo-500/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:gowthamchowdam2001@gmail.com" className="w-12 h-12 glass-card hover:bg-indigo-500/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-xl">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-300"
                    placeholder="Tell me about your project requirements, goals, and how I can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                    Thank you for your message! I'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                    Sorry, there was an error sending your message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2024 Gowtham Chowdam. Crafted with precision using React, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-gray-500 text-sm">
              Transforming data into intelligence, one solution at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;