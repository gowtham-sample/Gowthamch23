export const portfolio = {
  name: 'Gowtham Chowdam',
  initials: 'GC',
  email: 'gowthamchowdam2001@gmail.com',
  phone: '+1 (346) 599-8350',
  github: 'https://github.com/gowtham-org',
  linkedin: 'https://www.linkedin.com/in/gowtham-chowdam-35ba96185/',
  roles: ['PLATFORM ENGINEER', 'SRE', 'MLOPS ENGINEER'],
  about: 'DevOps/SRE engineer with 3+ years of production experience at CGI and eGovernments Foundation. Completed an MS in Engineering Data Science at the University of Houston. I build scalable infrastructure for ML systems: CI/CD, Kubernetes, Terraform, and production reliability.',
  experience: [
    { role: 'Cloud Engineer', company: 'CGI · Contract · Remote · Austin TX', year: '2025-NOW', description: 'AWS cloud engineering and cloud deployments across reliable, repeatable delivery workflows.' },
    { role: 'DevOps Engineer', company: 'eGovernments Foundation', year: '2022—2024', description: 'Built CI/CD with GitHub Actions and Jenkins, automated infra with Terraform on AWS, ran Kubernetes and Docker workloads, and added Prometheus + Grafana monitoring.' },
    { role: 'MS Engineering Data Science', company: 'University of Houston', year: '2024-2026', description: 'Specialized in data science + MLOps while building production-style AI platforms.' },
  ],
  tech: ['Kubernetes', 'Docker', 'Helm', 'Terraform', 'AWS', 'GitHub Actions', 'Jenkins', 'ArgoCD', 'Prometheus', 'Grafana', 'Ansible', 'Python', 'FastAPI', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'PostgreSQL', 'Redis', 'ChromaDB'],
};

export type Portfolio = typeof portfolio;
