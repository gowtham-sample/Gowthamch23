import { useState, useRef, useEffect, KeyboardEvent } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

// ─── Portfolio Data ───────────────────────────────────────────────────────────

const portfolioData = {
  name: 'Gowtham Chowdam',
  title: 'Engineering Data Science Graduate Student & DevOps Engineer',
  location: 'Houston, TX',
  email: 'gowthamchowdam2001@gmail.com',
  phone: '+1 (346) 599-8350',
  github: 'https://github.com/gowtham-org',
  linkedin: 'https://linkedin.com/in/gowtham-chowdam-35ba96185',
  website: 'https://gowthamchowdam23.online',

  summary:
    'Engineering Data Science grad student with 3+ years of hands-on experience in DevOps, cloud platforms, and applied machine learning. Skilled in building CI/CD pipelines, infrastructure automation, and developing AI-powered solutions for real-world problems.',

  skills: {
    'Programming': ['Python', 'SQL', 'GoLang', 'Bash', 'JavaScript'],
    'Data & ML': [
      'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch',
      'Hugging Face', 'LLMs', 'Generative AI', 'OpenCV', 'Streamlit', 'Gradio',
    ],
    'DevOps & Cloud': [
      'AWS (EC2, S3, EKS, ECS, RDS, VPC, IAM)', 'Docker', 'Kubernetes',
      'Terraform', 'Jenkins', 'GitHub Actions', 'Ansible', 'Helm',
      'Prometheus', 'Grafana', 'Kafka', 'ELK Stack',
    ],
    'Other Tools': ['Power BI', 'Tableau', 'Git', 'Linux', 'Jupyter', 'JIRA', 'Confluence', 'n8n'],
  } as Record<string, string[]>,

  projects: [
    {
      name: 'RBAC-Secured Internal AI Assistant',
      description:
        'A secure internal AI assistant that answers questions from company documents while respecting role-based access (Finance, HR, Engineering, Marketing, C-Level). Uses a RAG pipeline with ChromaDB vector search, Google Gemini for response generation, deployed on Kubernetes with Cloudflare Tunnel.',
      tech: ['RAG', 'ChromaDB', 'Google Gemini', 'FastAPI', 'Streamlit', 'Kubernetes', 'Cloudflare Tunnel'],
    },
    {
      name: 'Kubernetes Pod Status Alertmanager',
      description:
        'A Kubernetes monitoring and alerting setup that watches for pods stuck in CrashLoopBackOff, sends Gmail alerts, and displays recent pod events in a web dashboard. Delivered as a reusable Helm chart with SOPS encryption for secrets and ngrok for remote access.',
      tech: ['Kubernetes', 'Helm', 'SOPS', 'Prometheus', 'Alertmanager', 'ngrok', 'Minikube'],
    },
    {
      name: 'AI-Powered Smart Cost Estimation for Construction',
      description:
        'End-to-end ML pipeline to forecast construction costs using XGBoost and Random Forest with strong feature engineering. Added a ChatGPT API layer for natural language queries and built interactive visualizations with Matplotlib and Seaborn.',
      tech: ['XGBoost', 'Random Forest', 'ChatGPT API', 'Matplotlib', 'Seaborn', 'Python'],
    },
  ],

  experience: [
    {
      role: 'Junior DevOps Engineer',
      company: 'eGovernments Foundation',
      location: 'Bangalore, India',
      period: 'Aug 2022 – Jul 2024',
      description:
        'Built and maintained CI/CD pipelines with GitHub Actions and Jenkins. Automated infrastructure provisioning with Terraform on AWS. Managed containerization with Docker and Kubernetes, and integrated Grafana + Prometheus for monitoring.',
    },
    {
      role: 'Site Reliability Engineer',
      company: 'eGovernments Foundation',
      location: 'Bangalore, India',
      period: 'Aug 2021 – Jul 2022',
      description:
        'Automated IT infrastructure tasks including system management and application monitoring. Maintained system health and uptime using Prometheus and Grafana dashboards. Handled incident response and root cause analysis.',
    },
  ],

  education: [
    {
      degree: 'Master of Science in Engineering Data Science',
      school: 'University of Houston, Houston, TX',
      period: 'Aug 2024 – May 2026',
    },
    {
      degree: 'B.Tech in Computer Science and Engineering',
      school: 'Vel Tech R&D Institute of Science and Technology, Chennai',
      period: 'Jul 2019 – Jun 2023',
    },
  ],

  research:
    'Computational Oncology Research — investigating mitochondrial metabolism upregulation in melanoma post-treatment by analyzing large-scale proteomics and transcriptomics datasets (LINCS, CPTAC). Also presented research on the National Urban Governance Platform (NUGP) at ICACT2023.',
};

// ─── Response Logic ───────────────────────────────────────────────────────────

function getBotResponse(input: string): string {
  const msg = input.toLowerCase();

  if (/^(hi|hello|hey|greetings|howdy|sup)\b/.test(msg))
    return `👋 Hey! I'm ${portfolioData.name}'s assistant. He's a DevOps Engineer and Data Science grad student based in Houston, TX. What would you like to know?`;

  if (msg.includes('who are you') || msg.includes('what are you') || msg.includes('your name'))
    return `I'm a chatbot representing **${portfolioData.name}** — an Engineering Data Science graduate student at the University of Houston with 3+ years of experience in DevOps and ML.`;

  if (msg.includes('summary') || msg.includes('about') || msg.includes('tell me about') || msg.includes('introduction'))
    return `👤 **About Gowtham:**\n\n${portfolioData.summary}\n\n📍 Based in Houston, TX\n🎓 Currently pursuing MS in Engineering Data Science at University of Houston`;

  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('tool') || msg.includes('language')) {
    let response = '🛠️ **Technical Skills:**\n\n';
    for (const [category, skills] of Object.entries(portfolioData.skills)) {
      response += `**${category}:** ${skills.join(', ')}\n\n`;
    }
    return response.trim();
  }

  if (msg.includes('aws') || msg.includes('cloud') || msg.includes('devops') || msg.includes('kubernetes') || msg.includes('docker') || msg.includes('terraform'))
    return `☁️ **Cloud & DevOps Skills:**\n\n${portfolioData.skills['DevOps & Cloud'].join(', ')}\n\nGowtham has hands-on experience using these at eGovernments Foundation, building and maintaining production infrastructure.`;

  if (msg.includes('machine learning') || msg.includes('data science') || (msg.includes('ai') && !msg.includes('trail')))
    return `🤖 **AI/ML Skills:**\n\n${portfolioData.skills['Data & ML'].join(', ')}\n\nHe's worked on RAG pipelines, cost estimation models using XGBoost/Random Forest, and computational oncology research.`;

  if (msg.includes('rbac') || msg.includes('ai assistant') || msg.includes('rag') || msg.includes('gemini')) {
    const p = portfolioData.projects[0];
    return `🔐 **${p.name}**\n\n${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}`;
  }

  if ((msg.includes('kubernetes') && msg.includes('alert')) || msg.includes('alertmanager') || msg.includes('helm')) {
    const p = portfolioData.projects[1];
    return `📡 **${p.name}**\n\n${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}`;
  }

  if (msg.includes('construction') || msg.includes('cost estimation') || msg.includes('xgboost')) {
    const p = portfolioData.projects[2];
    return `🏗️ **${p.name}**\n\n${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}`;
  }

  if (msg.includes('project') || msg.includes('built') || msg.includes('work on')) {
    let response = '🚀 **Featured Projects:**\n\n';
    portfolioData.projects.forEach((p) => {
      response += `**${p.name}**\n${p.description}\n🔧 ${p.tech.join(', ')}\n\n`;
    });
    return response + 'Check out more on GitHub: ' + portfolioData.github;
  }

  if (msg.includes('experience') || msg.includes('work history') || msg.includes('company') || msg.includes('egovernments') || msg.includes('worked')) {
    let response = '💼 **Work Experience:**\n\n';
    portfolioData.experience.forEach((exp) => {
      response += `**${exp.role}** @ ${exp.company}\n📍 ${exp.location} | 📅 ${exp.period}\n📝 ${exp.description}\n\n`;
    });
    return response.trim();
  }

  if (msg.includes('education') || msg.includes('degree') || msg.includes('university') || msg.includes('school') || msg.includes('masters') || msg.includes('btech') || msg.includes('b.tech')) {
    let response = '🎓 **Education:**\n\n';
    portfolioData.education.forEach((edu) => {
      response += `**${edu.degree}**\n${edu.school}\n📅 ${edu.period}\n\n`;
    });
    return response.trim();
  }

  if (msg.includes('research') || msg.includes('publication') || msg.includes('oncology') || msg.includes('conference'))
    return `🔬 **Research:**\n\n${portfolioData.research}`;

  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('hire') || msg.includes('get in touch') || msg.includes('phone'))
    return `📬 **Contact Gowtham:**\n\n📧 Email: ${portfolioData.email}\n📞 Phone: ${portfolioData.phone}\n🔗 LinkedIn: ${portfolioData.linkedin}\n🐙 GitHub: ${portfolioData.github}\n🌐 Website: ${portfolioData.website}`;

  if (msg.includes('github'))
    return `🐙 **GitHub:** ${portfolioData.github}\n\nYou'll find projects like the RBAC AI Assistant, Kubernetes Alertmanager, and more there.`;

  if (msg.includes('linkedin'))
    return `🔗 **LinkedIn:** ${portfolioData.linkedin}`;

  if (msg.includes('location') || msg.includes('where') || msg.includes('based') || msg.includes('houston'))
    return `📍 Gowtham is based in **Houston, TX** and currently studying at the University of Houston.`;

  if (msg.includes('available') || msg.includes('open to') || msg.includes('opportunity') || msg.includes('internship') || msg.includes('looking for'))
    return `✅ Yes! Gowtham is open to opportunities in **DevOps, Data Science, MLOps, and Cloud Engineering**. Reach out:\n\n📧 ${portfolioData.email}\n🔗 ${portfolioData.linkedin}`;

  if (msg.includes('help') || msg.includes('what can you'))
    return `Here's what I can tell you about Gowtham:\n\n👤 Background & Summary\n🛠️ Technical skills (ML, DevOps, Cloud)\n🚀 Projects he's built\n💼 Work experience\n🎓 Education\n🔬 Research\n📧 Contact info\n\nJust ask naturally — like "What projects has he built?" or "Is he available for hire?"`;

  if (/thank|thanks|appreciate|great|awesome|cool/.test(msg))
    return "You're welcome! 😊 Feel free to ask anything else. Have a great day!";

  if (/bye|goodbye|see you|later/.test(msg))
    return `Take care! You can also reach Gowtham directly at ${portfolioData.email}`;

  return `Hmm, not sure about that one. Try asking about Gowtham's **skills**, **projects**, **experience**, or **contact info**. Type "help" to see everything I can answer! 🤔`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTime(): string {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

const SUGGESTIONS = [
  { label: '🛠️ Skills', msg: 'What are your skills?' },
  { label: '🚀 Projects', msg: 'Tell me about your projects' },
  { label: '💼 Experience', msg: "What's your experience?" },
  { label: '📧 Contact', msg: 'How can I contact you?' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "👋 Hi there! I'm Gowtham's AI assistant. Ask me about his skills, projects, experience, or how to get in touch!",
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const message = (text ?? inputValue).trim();
    if (!message) return;

    const userMsg: Message = { id: Date.now(), text: message, sender: 'user', time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(message);
      const botMsg: Message = { id: Date.now() + 1, text: response, sender: 'bot', time: getTime() };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 10000, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none', boxShadow: '0 4px 20px rgba(102,126,234,0.4)',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 28,
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        aria-label="Open chatbot"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: 80, right: 0,
          width: 380, height: 550,
          background: 'white', borderRadius: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'slideUp 0.3s ease',
        }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, background: 'white', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>🤖</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Gowtham's Assistant</h3>
                <p style={{ fontSize: 12, opacity: 0.9, margin: 0 }}>● Online | Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
                width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }}
              aria-label="Close chatbot"
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: 20,
            background: '#f7f8fc', display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ maxWidth: '85%', alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 18,
                    lineHeight: 1.5,
                    fontSize: 14,
                    ...(msg.sender === 'bot'
                      ? { background: 'white', color: '#333', borderBottomLeftRadius: 5, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }
                      : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderBottomRightRadius: 5 }),
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                <div style={{ fontSize: 10, color: '#999', marginTop: 4, padding: '0 5px' }}>{msg.time}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ maxWidth: '85%', alignSelf: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: 18, borderBottomLeftRadius: 5,
                  background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  display: 'flex', gap: 4,
                }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{
                      width: 8, height: 8, background: '#999', borderRadius: '50%',
                      animation: `typingBounce 1.4s ${delay}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div style={{
            padding: '12px 16px', background: 'white',
            borderTop: '1px solid #e5e7eb', display: 'flex', gap: 8, flexWrap: 'wrap',
          }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSend(s.msg)}
                style={{
                  background: '#f3f4f6', border: '1px solid #e5e7eb',
                  color: '#374151', padding: '7px 13px', borderRadius: 20,
                  fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  btn.style.color = 'white';
                  btn.style.borderColor = 'transparent';
                  btn.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = '#f3f4f6';
                  btn.style.color = '#374151';
                  btn.style.borderColor = '#e5e7eb';
                  btn.style.transform = 'translateY(0)';
                }}
              >{s.label}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '14px 18px', background: 'white',
            borderTop: '1px solid #e5e7eb', display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1, padding: '11px 16px', border: '2px solid #e5e7eb',
                borderRadius: 25, fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#667eea'; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                width: 44, height: 44, flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none', borderRadius: '50%', color: 'white',
                fontSize: 18, cursor: 'pointer', transition: 'transform 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
              aria-label="Send message"
            >➤</button>
          </div>
        </div>
      )}

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
          30%           { transform: translateY(-8px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}