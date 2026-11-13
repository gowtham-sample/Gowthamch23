export interface Project {
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  tools: string[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  { title: 'TriageIQ', subtitle: 'AI-powered IT ticket triage', description: 'A multi-model pipeline that turns noisy support tickets into clear, actionable work.', impact: '98% classification accuracy with semantic search and SLA breach prediction.', tools: ['Python', 'FastAPI', 'BERT', 'XGBoost', 'ChromaDB', 'Groq LLaMA', 'Jira API', 'Docker', 'Kubernetes'], github: 'https://github.com/gowtham-org/TriageIQ-Ticketing-System' },
  { title: 'GitOps on k3d', subtitle: 'ArgoCD deployment system', description: 'A multi-cluster GitOps setup with ordered deployments, sync waves, and auto-sync.', impact: 'Infrastructure and applications stay aligned with one source of truth.', tools: ['ArgoCD', 'Kubernetes', 'k3d', 'Docker', 'Helm', 'WSL2'], github: 'https://github.com/gowtham-org/argocd-public-repo' },
  { title: 'RBAC AI Assistant', subtitle: 'Enterprise RAG chatbot', description: 'An internal assistant that respects role-based document access across six enterprise roles.', impact: 'Secure answers without exposing documents beyond a team’s permissions.', tools: ['Python', 'FastAPI', 'Streamlit', 'Google Gemini', 'ChromaDB', 'Kubernetes'], github: 'https://github.com/gowtham-org/RBAC-Secured-Internal-AI-Assistant' },
  { title: 'Pod Status Alertmanager', subtitle: 'Kubernetes observability', description: 'Real-time failure alerts for unhealthy pods, packaged as a reusable Helm workflow.', impact: 'Lowers mean time to detection for container failures.', tools: ['Kubernetes', 'Minikube', 'Python', 'Helm', 'SOPS'], github: 'https://github.com/gowtham-org/Kubernetes-Pod-Status-Alertmanager' },
  { title: 'IntelliMatch', subtitle: 'AI-ATS resume matcher', description: 'A resume optimizer that compares experience against job descriptions with Gemini Pro.', impact: 'Turns a resume review into a focused, explainable improvement loop.', tools: ['Python', 'Streamlit', 'Gemini Pro', 'PyPDF2', 'SQLite'], github: 'https://github.com/gowtham-org/ATSPro-Gemini-Resume-Matcher' },
  { title: 'Construction Cost Estimation', subtitle: 'Applied machine learning', description: 'An end-to-end model for accurate construction project cost prediction.', impact: 'Cut estimation errors by 80% through feature engineering and validation.', tools: ['Python', 'TensorFlow', 'Pandas', 'FastAPI', 'PostgreSQL'], github: 'https://github.com/gowtham-org/AI-Powered-Smart-Cost-Estimation-for-Construction-Planning' },
  { title: 'Cell Viability Prediction', subtitle: 'Bioinformatics', description: 'Machine learning models for predicting cell viability from DepMap gene expression data.', impact: 'A data science workflow shaped for pharmaceutical research.', tools: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost'], github: 'https://github.com/gowtham-org/Cell-Viability-Prediction' },
  { title: 'Movie Recommender', subtitle: 'Collaborative filtering', description: 'A personalized recommendation system built around user preferences and interactions.', impact: 'A compact exploration of ranking and recommendation patterns.', tools: ['Python', 'Pandas', 'Scikit-learn', 'NumPy'], github: 'https://github.com/gowtham-org/Movie-Recommender-using-ML' },
  { title: 'Todo Manager', subtitle: 'Desktop productivity app', description: 'A Tkinter application with prioritization, search, analytics, and CSV export.', impact: 'A complete task workflow backed by SQLite persistence.', tools: ['Python', 'Tkinter', 'SQLite', 'Matplotlib'], github: 'https://github.com/gowtham-org/tkinter-todo-app' },
];
