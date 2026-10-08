import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './data/translations';
import { projectsData } from './data/projects';
import { certificationsData } from './data/certifications';
import {
  FileDown, Moon, Sun, Languages, Github, ExternalLink, Code2, Server, Globe2, Briefcase,
  Database, ShieldCheck, BarChart, LayoutDashboard, Mail, Phone, MapPin, GraduationCap,
  Layers, Terminal, Cloud, CheckCircle2, Send, Cpu, PenTool, FileText, Activity, Building2, ChevronDown, ChevronUp,
  Instagram, Linkedin, MessageSquare, ArrowUp, Youtube, Menu, X, Brain, Sparkles, Award
} from 'lucide-react';

const UTN_LOGO_URL = "/Logo%20UTN.png";
const MUNI_LOGO_URL = "/Logo%20Muni.png";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedProjects, setExpandedProjects] = useState({});
  const [expandedExperience, setExpandedExperience] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const toggleProject = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExperience = (id) => {
    setExpandedExperience(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Scroll spy implementation
  useEffect(() => {
    const sections = ['hero', 'about', 'education', 'experience', 'skills', 'certs', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const t = translations[lang];

  // Dynamic CV download handler
  const handleDownloadCv = (downloadLang) => {
    const targetLang = downloadLang || lang;
    const link = document.createElement('a');
    link.href = targetLang === 'es' ? `/cv-es.pdf?v=1.23-${Date.now()}` : `/cv-en.pdf?v=1.23-${Date.now()}`;
    link.download = `CV_Miguel_Rodriguez_${targetLang.toUpperCase()}_v1.23.pdf`;
    link.href = targetLang === 'es' ? `/cv-es.pdf?v=1.22-${Date.now()}` : `/cv-en.pdf?v=1.22-${Date.now()}`;
    link.download = `CV_Miguel_Rodriguez_${targetLang.toUpperCase()}_v1.23.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCvModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/miguelrodriguezips36@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const skillCategories = [
    {
      id: 'dataAnalytics',
      icon: <BarChart size={22} />,
      title: t.skills.categories.dataAnalytics,
      skills: [
        { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "SQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
        { name: "Pandas", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
        { name: "NumPy", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
        { name: "Scikit-learn", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
        { name: "Power BI", src: "https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg" },
        { name: "Tableau", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tableau.svg" },
        { name: "KNIME", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/knime.svg" },
        { name: "dbt", src: "/dbt-logo.svg", className: "dbt-logo-img" },
        { name: "IBM SPSS Statistics", icon: <Activity size={14} /> },
        { name: "IBM SPSS Modeler", icon: <Activity size={14} /> },
        { name: "EDA (Exploratory Data Analysis)", icon: <Activity size={14} /> },
        { name: "Data Cleaning & Validation", icon: <CheckCircle2 size={14} /> },
        { name: "Dashboards & KPIs", icon: <LayoutDashboard size={14} /> }
      ]
    },
    {
      id: 'aiMl',
      icon: <Brain size={22} />,
      title: t.skills.categories.aiMl,
      skills: [
        { name: "Machine Learning Fundamentals", icon: <Brain size={14} /> },
        { name: "Predictive Modeling & Classification", icon: <Activity size={14} /> },
        { name: "Clustering", icon: <Layers size={14} /> },
        { name: "IBM SPSS Modeler", icon: <Activity size={14} /> },
        { name: "Prompt Engineering", icon: <Sparkles size={14} /> },
        { name: "Large Language Models (LLMs)", icon: <Cpu size={14} /> },
        { name: "Neural Networks / Deep Learning", icon: <Brain size={14} /> }
      ]
    },
    {
      id: 'databases',
      icon: <Database size={22} />,
      title: t.skills.categories.databases,
      skills: [
        { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "SQL Server", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
        { name: "Oracle (PL/SQL)", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
        { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "DB Design", icon: <Database size={14} /> }
      ]
    },
    {
      id: 'backendApis',
      icon: <Server size={22} />,
      title: t.skills.categories.backendApis,
      skills: [
        { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
        { name: "REST APIs", icon: <Server size={14} /> },
        { name: "JWT", icon: <ShieldCheck size={14} /> },
        { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
        { name: "Postman", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
        { name: "Integration Troubleshooting", icon: <Cpu size={14} /> }
      ]
    },
    {
      id: 'systemsSupport',
      icon: <ShieldCheck size={22} />,
      title: t.skills.categories.systemsSupport,
      skills: [
        { name: "Windows", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" },
        { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Software Installation & Config", icon: <Terminal size={14} /> },
        { name: "Hardware Diagnostics", icon: <Cpu size={14} /> },
        { name: "Workstations Support", icon: <Briefcase size={14} /> },
        { name: "User Troubleshooting & Support", icon: <ShieldCheck size={14} /> }
      ]
    },
    {
      id: 'networking',
      icon: <Globe2 size={22} />,
      title: t.skills.categories.networking,
      skills: [
        { name: lang === 'es' ? "Configuración IP" : "IP Configuration", icon: <Terminal size={14} /> },
        { name: lang === 'es' ? "Conectividad" : "Connectivity", icon: <Activity size={14} /> },
        { name: "WiFi", icon: <Globe2 size={14} /> },
        { name: lang === 'es' ? "Diagnóstico de Redes" : "Network Diagnostics", icon: <ShieldCheck size={14} /> }
      ]
    },
    {
      id: 'cloudTools',
      icon: <Cloud size={22} />,
      title: t.skills.categories.cloudTools,
      skills: [
        { name: "Firebase Auth / Firestore", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
        { name: "AWS (IAM, EC2, S3)", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
        { name: "Bitbucket", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg" },
        { name: "Jest", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" },
        { name: "Cypress", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg" },
        { name: "Scrum / Kanban", icon: <CheckCircle2 size={14} /> },
        { name: "Salesforce", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg" }
      ]
    },
    {
      id: 'frontend',
      icon: <Layers size={22} />,
      title: t.skills.categories.frontend,
      skills: [
        { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Angular", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
        { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "JavaScript ES6+", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "Modern CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        { name: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" }
      ]
    }
  ];

  const getTechIcon = (tech) => {
    const icons = {
      'Next.js 16': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      'Next.js': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      'React': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      'React.js': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      'Node.js': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      'TypeScript': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      'Python': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      'Pandas': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
      'NumPy': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
      'Scikit-learn': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
      'Vite': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
      'Tailwind CSS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      'MySQL': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      'PostgreSQL': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      'SQL Server': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
      'Oracle': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",
      'MongoDB': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      'Supabase': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      'JavaScript': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      'Express': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      'Linux': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      'Windows': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
      'Material UI': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
      'React Router': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg",
      'Prisma': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      'Vanilla CSS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      'Framer Motion': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
      'Angular': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
      'RxJS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rxjs/rxjs-original.svg",
      'Firebase': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
      'Firebase Auth': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
      'Firestore': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
      'Cloud Firestore': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
      'Git': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      'GitHub': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      'Bitbucket': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg",
      'Jest': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
      'Cypress': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg",
      'AWS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      'Postman': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      'dbt': "/dbt-logo.svg",
      'Salesforce': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg",
      'Power BI': "https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg",
      'Tableau': "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tableau.svg",
      'KNIME': "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/knime.svg",
      'SQL': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
    };
    return icons[tech] || null;
  };

  return (
    <div className="app-container">
      <nav className={isMenuOpen ? 'menu-open' : ''}>
        <div className="nav-container">
          <div className="nav-logo">
            <h2 className="gradient-text" style={{ margin: 0, fontSize: '1.5rem' }}>MIGUEL.DEV</h2>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className={activeSection === 'about' ? 'active' : ''}>{t.nav.about}</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)} className={activeSection === 'education' ? 'active' : ''}>{t.education.title}</a>
            <a href="#experience" onClick={() => setIsMenuOpen(false)} className={activeSection === 'experience' ? 'active' : ''}>{t.experience.title}</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className={activeSection === 'skills' ? 'active' : ''}>{t.skills.title}</a>
            <a href="#certs" onClick={() => setIsMenuOpen(false)} className={activeSection === 'certs' ? 'active' : ''}>{t.certifications.title}</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className={activeSection === 'projects' ? 'active' : ''}>{t.nav.projects}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className={activeSection === 'contact' ? 'active' : ''}>{t.nav.contact}</a>
            <button
              onClick={() => { setShowCvModal(true); setIsMenuOpen(false); }}
              className="cv-nav-btn"
            >
              <FileDown size={18} /> CV
            </button>
          </div>

          <div className="nav-controls">
            <button className="icon-btn" onClick={toggleLang}>
              <Languages size={20} /> <span style={{ marginLeft: '5px' }}>{lang.toUpperCase()}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="container">
          <motion.div
            className="hero-content glass"
            style={{ borderRadius: '2.5rem' }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t.hero.greeting}
            </motion.span>
            <motion.h1
              className="hero-title gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.hero.name}
            </motion.h1>
            <motion.h2
              className="hero-subtitle text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t.hero.title}
            </motion.h2>
            <motion.p
              className="hero-desc text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t.about.summary}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a href="#projects" className="btn btn-primary"><Briefcase size={20} /> {t.nav.projects}</a>
              <button onClick={() => setShowCvModal(true)} className="btn btn-outline glass"><FileDown size={20} /> {t.contact.downloadThisCv}</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="about"
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.about.title}</h2>
        <div className="about-grid">
          <div className="about-image">
            <div className="image-container glass">
              <img src="/profile.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem' }}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div className="image-placeholder" style={{ display: 'none' }}><Server size={100} /></div>
            </div>
          </div>
          <div className="about-content glass">
            <p className="mb-4">{t.about.p1}</p>
            <p className="mb-6">{t.about.p2}</p>
            <div className="about-value-container">
              <h3 className="value-title gradient-text">{t.about.valueTitle}</h3>
              <ul className="value-list">
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <Brain className="value-icon" />
                    <span className="value-label">{t.about.dataAiLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.dataAiDesc}</div>
                </li>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <ShieldCheck className="value-icon" />
                    <span className="value-label">{t.about.opsLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.opsDesc}</div>
                </li>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <Database className="value-icon" />
                    <span className="value-label">{t.about.stackLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.stackDesc}</div>
                </li>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <Cloud className="value-icon" />
                    <span className="value-label">{t.about.salesforceLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.salesforceDesc}</div>
                </li>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <Globe2 className="value-icon" />
                    <span className="value-label">{t.about.englishLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.englishDesc}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="education"
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.education.title}</h2>
        <div className="info-grid info-grid-2col">
          <motion.div
            className="info-card glass"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <GraduationCap size={28} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                <span className="info-role">{t.education.ingenieria.degree}</span>
              </div>
              <span className="info-period">{t.education.ingenieria.period}</span>
            </div>
            <span className="info-company">{t.education.ingenieria.school}</span>
            <p className="project-desc">{t.education.ingenieria.status}</p>
          </motion.div>
          <motion.div
            className="info-card glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <GraduationCap size={28} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                <span className="info-role">{t.education.analista.degree}</span>
              </div>
              <span className="info-period">{t.education.analista.period}</span>
            </div>
            <span className="info-company">{t.education.analista.school}</span>
            <p className="project-desc">{t.education.analista.status}</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="experience"
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.experience.title}</h2>

        {/* Fila 1: UTN — ocupa todo el ancho */}
        <div className="info-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '2rem' }}>
          <motion.div
            className="info-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={UTN_LOGO_URL} alt="UTN Rosario" className="experience-logo-img" loading="lazy" />
                <span className="info-role">{t.experience.utn.role}</span>
              </div>
              <span className="info-period">{t.experience.utn.period}</span>
            </div>
            <span className="info-company">{t.experience.utn.company}</span>

            <button
              className="description-toggle"
              onClick={() => toggleExperience('utn')}
              style={{ marginTop: '1rem' }}
            >
              {expandedExperience['utn'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span>{lang === 'es' ? 'Descripción' : 'Description'}</span>
            </button>

            <div className={`project-desc-container ${expandedExperience['utn'] ? 'expanded' : ''}`}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                {t.experience.utn.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem', textAlign: 'left' }}>
                {t.experience.utn.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skill-items" style={{ marginTop: '1.5rem' }}>
              {['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'EDA', 'Clustering'].map(tech => (
                <div key={tech} className="mini-tech-tag">
                  {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{ width: 14, height: 14 }} />}
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fila 2: HECA + Salud — 2 columnas */}
        <div className="info-grid info-grid-2col">
          <motion.div
            className="info-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={MUNI_LOGO_URL} alt="Muni Rosario / HECA" className="experience-logo-img" loading="lazy" />
                <span className="info-role">{t.experience.heca.role}</span>
              </div>
              <span className="info-period">{t.experience.heca.period}</span>
            </div>
            <span className="info-company">{t.experience.heca.company}</span>

            <button
              className="description-toggle"
              onClick={() => toggleExperience('heca')}
              style={{ marginTop: '1rem' }}
            >
              {expandedExperience['heca'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span>{lang === 'es' ? 'Descripción' : 'Description'}</span>
            </button>

            <div className={`project-desc-container ${expandedExperience['heca'] ? 'expanded' : ''}`}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                {t.experience.heca.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem', textAlign: 'left' }}>
                {t.experience.heca.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skill-items" style={{ marginTop: '1.5rem' }}>
              {['IT Support', 'Troubleshooting', 'APIs', 'Windows', 'Linux', 'Log Analysis', 'Networks'].map(tech => (
                <div key={tech} className="mini-tech-tag">
                  {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{ width: 14, height: 14 }} />}
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="info-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={MUNI_LOGO_URL} alt="Secretaría de Salud Pública" className="experience-logo-img" loading="lazy" />
                <span className="info-role">{t.experience.salud.role}</span>
              </div>
              <span className="info-period">{t.experience.salud.period}</span>
            </div>
            <span className="info-company">{t.experience.salud.company}</span>

            <button
              className="description-toggle"
              onClick={() => toggleExperience('salud')}
              style={{ marginTop: '1rem' }}
            >
              {expandedExperience['salud'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span>{lang === 'es' ? 'Descripción' : 'Description'}</span>
            </button>

            <div className={`project-desc-container ${expandedExperience['salud'] ? 'expanded' : ''}`}>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem', textAlign: 'left' }}>
                {t.experience.salud.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skill-items" style={{ marginTop: '1.5rem' }}>
              {['SQL', 'Troubleshooting', 'APIs', 'Functional Analysis', 'Continuous Improvement'].map(tech => (
                <div key={tech} className="mini-tech-tag">
                  {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{ width: 14, height: 14 }} />}
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.skills.title}</h2>
        <div className="skills-container">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className="skill-category-card glass"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'var(--accent-primary)' }}
            >
              <h3 className="skill-category-title">{cat.icon} {cat.title}</h3>
              <div className="skill-items">
                {cat.skills.map(s => (
                  <motion.div
                    key={s.name}
                    className="skill-tag"
                    whileHover={{ scale: 1.1 }}
                  >
                    {s.src ? <img src={s.src} alt={s.name} className={`skill-icon${s.className ? ' ' + s.className : ''}`} /> : s.icon}
                    {s.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="certs"
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.certifications.title}</h2>
        <div className="skills-container">
          {certificationsData.map((cat, idx) => (
            <motion.div
              key={idx}
              className="skill-category-card glass"
              style={{ height: 'auto' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'var(--accent-primary)' }}
            >
              <h3 className="skill-category-title">
                {cat.category === 'Core & Languages' && <Globe2 size={22} />}
                {cat.category === 'Cloud & Backend' && <Server size={22} />}
                {cat.category === 'Data Science, AI & Python' && <BarChart size={22} />}
                {cat.category === 'Frontend & Web Development' && <Layers size={22} />}
                {cat.category === 'Agile & Soft Skills' && <ShieldCheck size={22} />}
                {cat.category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {cat.certs.map(cert => (
                  <div key={cert.id} style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '1rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{cert.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {cert.issuer} • {cert.year}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.nav.projects}</h2>
        <h3 className="section-subtitle"><Briefcase size={28} /> {t.projects.group}</h3>
        <div className="projects-grid">
          {projectsData.filter(p => p.type === 'group').map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card glass hover-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-img-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                ) : (
                  <div className="project-img-placeholder">
                    <Code2 size={48} />
                  </div>
                )}
                <div className="project-img-placeholder" style={{ display: 'none' }}><Code2 size={48} /></div>
              </div>
              <div className="project-info">
                <div className="project-header-side" style={{ justifyContent: 'center', width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h4 className="project-title">{lang === 'es' ? project.title : (project.enTitle || project.title)}</h4>
                </div>

                <button
                  className="description-toggle"
                  onClick={() => toggleProject(project.id)}
                  style={{ alignSelf: 'center' }}
                >
                  {expandedProjects[project.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  <span>{lang === 'es' ? 'Descripción' : 'Description'}</span>
                </button>

                <div className={`project-desc-container ${expandedProjects[project.id] ? 'expanded' : ''}`}>
                  <p className="project-desc">
                    {lang === 'es' ? project.description : project.enDescription}
                  </p>
                </div>

                <div className="skill-items" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techs.map(tech => (
                    <div key={tech} className="mini-tech-tag">
                      {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{ width: 14, height: 14 }} />}
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="project-actions" style={{ width: '100%' }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-btn">
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                  {project.id === 'veterinaria' && (
                    <a href="https://www.youtube.com/watch?v=_UIGXiYF8HM" target="_blank" rel="noreferrer" className="project-btn" style={{ borderColor: '#ff0000', color: '#ff0000' }}>
                      <Youtube size={16} /> Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="project-btn">
                      <Github size={16} /> {project.repoUrlBackend ? 'Frontend' : 'Repo'}
                    </a>
                  )}
                  {project.repoUrlBackend && (
                    <a href={project.repoUrlBackend} target="_blank" rel="noreferrer" className="project-btn">
                      <Server size={16} /> Backend
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <h3 className="section-subtitle"><Code2 size={28} /> {t.projects.individual}</h3>
        <div className="projects-grid">
          {projectsData.filter(p => p.type === 'individual').map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card glass hover-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-img-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                ) : (
                  <div className="project-img-placeholder">
                    <Code2 size={48} />
                  </div>
                )}
                <div className="project-img-placeholder" style={{ display: 'none' }}><Code2 size={48} /></div>
              </div>
              <div className="project-info">
                <div className="project-header-side" style={{ justifyContent: 'center', width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h4 className="project-title">{lang === 'es' ? project.title : (project.enTitle || project.title)}</h4>
                </div>

                <button
                  className="description-toggle"
                  onClick={() => toggleProject(project.id)}
                  style={{ alignSelf: 'center' }}
                >
                  {expandedProjects[project.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  <span>{lang === 'es' ? 'Descripción' : 'Description'}</span>
                </button>

                <div className={`project-desc-container ${expandedProjects[project.id] ? 'expanded' : ''}`}>
                  <p className="project-desc">
                    {lang === 'es' ? project.description : project.enDescription}
                  </p>
                </div>

                <div className="skill-items" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techs.map(tech => (
                    <div key={tech} className="mini-tech-tag">
                      {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{ width: 14, height: 14 }} />}
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="project-actions" style={{ width: '100%' }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-btn">
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="project-btn">
                      <Github size={16} /> Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>


      <motion.section
        id="contact"
        className="container"
        style={{ paddingBottom: '10rem' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title gradient-text">{t.contact.title}</h2>
        <div className="info-grid" style={{ marginBottom: '4rem' }}>
          <motion.div
            className="info-card glass"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="p-4 bg-blue-500/10 rounded-full text-blue-500"><MapPin size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>{t.contact.location}</span>
          </motion.div>
          <motion.div
            className="info-card glass"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="p-4 bg-green-500/10 rounded-full text-green-500"><Phone size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>{t.contact.phone}</span>
          </motion.div>
          <motion.a
            href={`mailto:${t.contact.email}`}
            className="info-card glass"
            style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="p-4 bg-purple-500/10 rounded-full text-purple-500"><Mail size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>{t.contact.email}</span>
          </motion.a>
          <motion.a
            href={t.contact.github}
            target="_blank"
            rel="noreferrer"
            className="info-card glass"
            style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <div className="p-4 bg-gray-500/10 rounded-full text-gray-500"><Github size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/miguel-rodr%C3%ADguez-eis/"
            target="_blank"
            rel="noreferrer"
            className="info-card glass"
            style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -10 }}
          >
            <div className="p-4 bg-blue-600/10 rounded-full text-blue-600"><Globe2 size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>LinkedIn</span>
          </motion.a>
          <motion.a
            href={t.contact.salesforce}
            target="_blank"
            rel="noreferrer"
            className="info-card glass"
            style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <div className="p-4 bg-sky-500/10 rounded-full text-sky-500"><Cloud size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>Salesforce Trailblazer</span>
          </motion.a>
        </div>

        <div className="glass p-8 mx-auto" style={{ borderRadius: '2.5rem', maxWidth: '900px', padding: '4rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          <h3 className="section-title gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t.contact.subtitle}</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder={t.contact.formName}
                style={{ padding: '1.2rem' }}
                value={formState.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                className="form-input"
                placeholder={t.contact.formSubject}
                style={{ padding: '1.2rem' }}
                value={formState.subject}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder={t.contact.formEmail}
                style={{ padding: '1.2rem' }}
                value={formState.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                className="form-textarea"
                placeholder={t.contact.formMessage}
                style={{ padding: '1.2rem' }}
                value={formState.message}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
              style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem' }}
            >
              {isSubmitting ? (
                <span>{lang === 'es' ? 'Enviando...' : 'Sending...'}</span>
              ) : (
                <>
                  <Send size={20} /> {t.contact.formSend}
                </>
              )}
            </button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#10b981', marginTop: '1rem', textAlign: 'center', fontWeight: 500 }}
                >
                  {lang === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!'}
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center', fontWeight: 500 }}
                >
                  {lang === 'es' ? 'Hubo un error. Inténtalo de nuevo.' : 'Something went wrong. Please try again.'}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.section>

      <footer className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="gradient-text">MIGUEL.DEV</h2>
              <p className="footer-bio">
                {t.footer.bio}
              </p>
              <div className="footer-contact-item" style={{ border: 'none', padding: 0 }}>
                <MapPin size={18} className="text-cyan-400" />
                <span>Rosario, Santa Fe, Argentina</span>
              </div>
              <div className="skill-items" style={{ marginTop: '1.5rem' }}>
                <img src={getTechIcon('Python')} className="skill-icon" />
                <img src={getTechIcon('Pandas')} className="skill-icon" />
                <img src={getTechIcon('PostgreSQL')} className="skill-icon" />
                <img src={getTechIcon('Node.js')} className="skill-icon" />
                <img src={getTechIcon('React')} className="skill-icon" />
              </div>
            </motion.div>

            <div className="footer-nav">
              <span className="footer-col-title">{lang === 'es' ? 'Navegación' : 'Navigation'}</span>
              <div className="footer-links">
                <a href="#hero" className="footer-link"><ArrowUp size={16} /> {lang === 'es' ? 'Inicio' : 'Home'}</a>
                <a href="#about" className="footer-link"><Briefcase size={16} /> {t.nav.about}</a>
                <a href="#education" className="footer-link"><GraduationCap size={16} /> {t.education.title}</a>
                <a href="#experience" className="footer-link"><Activity size={16} /> {t.experience.title}</a>
                <a href="#skills" className="footer-link"><Layers size={16} /> {t.skills.title}</a>
                <a href="#projects" className="footer-link"><Code2 size={16} /> {t.nav.projects}</a>
                <a href="#contact" className="footer-link"><Mail size={16} /> {t.contact.title}</a>
              </div>
            </div>

            <div className="footer-contact">
              <span className="footer-col-title">{lang === 'es' ? 'Contacto Rápido' : 'Quick Contact'}</span>
              <a href={`mailto:${t.contact.email}`} className="footer-contact-item">
                <Mail size={18} />
                <span>{t.contact.email}</span>
              </a>
              <div className="footer-contact-item">
                <Phone size={18} />
                <span>{t.contact.phone}</span>
              </div>
              <button onClick={() => setShowCvModal(true)} className="footer-contact-item" style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', background: 'none', width: '100%', cursor: 'pointer' }}>
                <FileDown size={18} />
                <span>{lang === 'es' ? 'Descargar CV' : 'Download CV'}</span>
              </button>
            </div>

            <div className="footer-social">
              <span className="footer-col-title">{lang === 'es' ? 'Redes Sociales' : 'Social Media'}</span>
              <div className="footer-social-grid">
                <a href={t.contact.github} target="_blank" rel="noreferrer" className="social-pill">
                  <Github size={18} /> GitHub
                </a>
                <a href={t.contact.linkedin} target="_blank" rel="noreferrer" className="social-pill">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href={t.contact.salesforce} target="_blank" rel="noreferrer" className="social-pill">
                  <Cloud size={18} /> Salesforce
                </a>
                <a href={`mailto:${t.contact.email}`} className="social-pill">
                  <Mail size={18} /> Email
                </a>
                <a href={`https://wa.me/${t.contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="social-pill">
                  <MessageSquare size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Miguel Rodríguez. {t.footer.rights}</p>
            <div style={{ opacity: 0.7, letterSpacing: '1px' }}>{t.footer.version}</div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {showCvModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCvModal(false)}
            style={{ zIndex: 100000 }}
          >
            <motion.div
              className="modal-content glass"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FileDown size={48} className="modal-icon" />
              <h3>{lang === 'es' ? 'Confirmar Descarga' : 'Confirm Download'}</h3>
              <p>
                {lang === 'es'
                  ? 'Selecciona en qué idioma deseas descargar el CV (v1.21):'
                  : 'Select in which language you wish to download the CV (v1.21):'}
              </p>
              <div className="modal-actions" style={{ flexDirection: 'column', gap: '0.8rem' }}>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleDownloadCv('es')}>
                  {t.about.downloadCvSpanish}
                </button>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleDownloadCv('en')}>
                  {t.about.downloadCvEnglish}
                </button>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} onClick={() => setShowCvModal(false)}>
                  {lang === 'es' ? 'Cerrar' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
