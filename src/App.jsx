import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import { projectsData } from './data/projects';
import { certificationsData } from './data/certifications';
import {
  FileDown, Moon, Sun, Languages, Github, ExternalLink, Code2, Server, Globe2, Briefcase,
  Database, ShieldCheck, BarChart, LayoutDashboard, Mail, Phone, MapPin, GraduationCap,
  Layers, Terminal, Cloud, CheckCircle2, Send, Cpu, PenTool, FileText, Activity, Building2, ChevronDown, ChevronUp,
  Instagram, Linkedin, MessageSquare, ArrowUp, Youtube
} from 'lucide-react';

const MUNI_LOGO_URL = "/Logo.png";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedProjects, setExpandedProjects] = useState({});
  const [expandedExperience, setExpandedExperience] = useState({});

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
    const sections = ['hero', 'about', 'experience', 'skills', 'certs', 'projects', 'education', 'contact'];

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => revealElements.forEach(el => observer.unobserve(el));
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const t = translations[lang];

  // Dynamic CV link
  const cvLink = lang === 'es' ? '/cv-es.pdf' : '/cv-en.pdf';

  const skillCategories = [
    {
      id: 'backend',
      icon: <Server size={22} />,
      title: t.skills.categories.backend,
      skills: [
        { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "C#", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
        { name: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
        { name: "Pascal", icon: <Terminal size={14} /> },
        { name: "Smalltalk", icon: <Terminal size={14} /> }
      ]
    },
    {
      id: 'database',
      icon: <Database size={22} />,
      title: t.skills.categories.database,
      skills: [
        { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "SQL Server", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
        { name: "Oracle", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
        { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
        { name: "DB Design", icon: <Database size={14} /> }
      ]
    },
    {
      id: 'frontend',
      icon: <Layers size={22} />,
      title: t.skills.categories.frontend,
      skills: [
        { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
        { name: "Axure", icon: <PenTool size={14} /> },
        { name: "Marvel", icon: <PenTool size={14} /> }
      ]
    },
    {
      id: 'cloud',
      icon: <Cloud size={22} />,
      title: t.skills.categories.cloud,
      skills: [
        { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "OCI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
        { name: "Cypress", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg" },
        { name: "Postman", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" }
      ]
    },
    {
      id: 'eng',
      icon: <Cpu size={22} />,
      title: t.skills.categories.eng,
      skills: [
        { name: "UML", icon: <CheckCircle2 size={14} /> },
        { name: "Bizagi", icon: <Activity size={14} /> },
        { name: "AnyLogic", icon: <Activity size={14} /> },
        { name: "Matlab", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg" },
        { name: "AutoCAD", icon: <PenTool size={14} /> },
        { name: "IT Support", icon: <Briefcase size={14} /> },
        { name: "Troubleshooting", icon: <Cpu size={14} /> },
        { name: "Networks", icon: <Globe2 size={14} /> }
      ]
    },
    {
      id: 'tools',
      icon: <Terminal size={22} />,
      title: t.skills.categories.tools,
      skills: [
        { name: "Microsoft 365", icon: <Layers size={14} /> },
        { name: "Excel", icon: <Briefcase size={14} /> },
        { name: "LaTeX", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/latex/latex-original.svg" },
        { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
        { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Salesforce", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg" },
        { name: "Pandas", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
        { name: "NumPy", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
        { name: "Continuous Improvement", icon: <Activity size={14} /> }
      ]
    }
  ];

  const getTechIcon = (tech) => {
    const icons = {
      'React': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      'Node.js': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      'TypeScript': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      'Python': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      'Vite': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
      'Tailwind CSS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      'MySQL': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      'JavaScript': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      'Express': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      'Linux': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      'C#': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    };
    return icons[tech] || null;
  };

  return (
    <div className="app-container">
      <nav>
        <div className="nav-container">
          <div className="nav-links">
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>{t.nav.about}</a>
            <a href="#education" className={activeSection === 'education' ? 'active' : ''}>{t.education.title}</a>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>{t.experience.title}</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>{t.skills.title}</a>
            <a href="#certs" className={activeSection === 'certs' ? 'active' : ''}>{t.certifications.title}</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>{t.nav.projects}</a>
            <div className="dropdown">
              <a href="#" className="flex items-center gap-1"><FileDown size={18} /> CV</a>
              <div className="dropdown-content">
                <a href="/cv-es.pdf" download="CV Miguel Rodríguez (ES).pdf" className="dropdown-item"><FileDown size={16} /> Español</a>
                <a href="/cv-en.pdf" download="CV Miguel Rodríguez (EN).pdf" className="dropdown-item"><FileDown size={16} /> English</a>
              </div>
            </div>
          </div>
          <div className="nav-controls">
            <button className="icon-btn" onClick={toggleLang}>
              <Languages size={20} /> <span style={{ marginLeft: '5px' }}>{lang.toUpperCase()}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-content glass" style={{ borderRadius: '2.5rem' }}>
            <span className="greeting">{t.hero.greeting}</span>
            <h1 className="hero-title gradient-text">{t.hero.name}</h1>
            <h2 className="hero-subtitle text-center">{t.hero.title}</h2>
            <p className="hero-desc text-center">{t.about.summary}</p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary"><Briefcase size={20} /> {t.nav.projects}</a>
              <a href={cvLink} download={`CV Miguel Rodríguez (${lang.toUpperCase()}).pdf`} className="btn btn-outline glass"><FileDown size={20} /> {t.contact.downloadThisCv}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container reveal">
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
          <div className="about-content glass text-center" style={{ padding: '2.5rem' }}>
            <p className="mb-4">{t.about.p1}</p>
            <p className="mb-6">{t.about.p2}</p>
            <div className="about-value" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 className="value-title gradient-text">{t.about.valueTitle}</h3>
              <ul className="value-list" style={{ textAlign: 'left' }}>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <Code2 className="value-icon" />
                    <span className="value-label">{t.about.stackLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.stackDesc}</div>
                </li>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <Server className="value-icon" />
                    <span className="value-label">{t.about.opsLabel}</span>
                  </div>
                  <div className="value-desc" style={{ paddingLeft: '2.3rem' }}>{t.about.opsDesc}</div>
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
      </section>

      <section id="education" className="container reveal">
        <h2 className="section-title gradient-text">{t.education.title}</h2>
        <div className="info-grid">
          <div className="info-card glass">
            <div className="info-header">
              <span className="info-role">{t.education.analista.degree}</span>
              <span className="info-period">{t.education.analista.period}</span>
            </div>
            <span className="info-company">{t.education.analista.school}</span>
            <p className="project-desc">{t.education.analista.status}</p>
          </div>
          <div className="info-card glass">
            <div className="info-header">
              <span className="info-role">{t.education.ingenieria.degree}</span>
              <span className="info-period">{t.education.ingenieria.period}</span>
            </div>
            <span className="info-company">{t.education.ingenieria.school}</span>
            <p className="project-desc">{t.education.ingenieria.status}</p>
          </div>
        </div>
      </section>

      <section id="experience" className="container reveal">
        <h2 className="section-title gradient-text">{t.experience.title}</h2>
        <div className="info-grid">
          <div className="info-card glass">
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={MUNI_LOGO_URL} alt="Muni Rosario" className="muni-logo-img" loading="lazy" />
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
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', textAlign: 'left' }}>
                {t.experience.heca.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skill-items" style={{ marginTop: '1.5rem' }}>
              {['IT Support', 'Troubleshooting', 'Networks', 'Windows', 'Linux', 'Log Analysis', 'APIs'].map(tech => (
                <div key={tech} className="mini-tech-tag">
                  {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{width:14, height:14}} />}
                  {tech}
                </div>
              ))}
            </div>
          </div>
          <div className="info-card glass">
            <div className="info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={MUNI_LOGO_URL} alt="Muni Rosario" className="muni-logo-img" loading="lazy" />
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
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', textAlign: 'left' }}>
                {t.experience.salud.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skill-items" style={{ marginTop: '1.5rem' }}>
              {['Python', 'Pandas', 'NumPy', 'Frappe', 'SQL', 'Functional Analysis', 'Continuous Improvement', 'APIs'].map(tech => (
                <div key={tech} className="mini-tech-tag">
                  {getTechIcon(tech) && <img src={getTechIcon(tech)} className="skill-icon" style={{width:14, height:14}} />}
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="container reveal">
        <h2 className="section-title gradient-text">{t.skills.title}</h2>
        <div className="skills-container">
          {skillCategories.map(cat => (
            <div key={cat.id} className="skill-category-card glass">
              <h3 className="skill-category-title">{cat.icon} {cat.title}</h3>
              <div className="skill-items">
                {cat.skills.map(s => (
                  <div key={s.name} className="skill-tag">
                    {s.src ? <img src={s.src} alt={s.name} className="skill-icon" /> : s.icon}
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certs" className="container">
        <h2 className="section-title gradient-text">{t.certifications.title}</h2>
        <div className="skills-container">
          {certificationsData.map((cat, idx) => (
            <div key={idx} className="skill-category-card glass" style={{ height: 'auto' }}>
              <h3 className="skill-category-title">
                {cat.category === 'Core & Languages' && <Globe2 size={22} />}
                {cat.category === 'Cloud & Backend' && <Server size={22} />}
                {cat.category === 'Data Science & Python' && <BarChart size={22} />}
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
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="container reveal">
        <h2 className="section-title gradient-text">{t.nav.projects}</h2>
        <h3 className="section-subtitle"><Briefcase size={28} /> {t.projects.group}</h3>
        <div className="projects-grid">
          {projectsData.filter(p => p.type === 'group').map(project => (
            <div key={project.id} className="project-card glass hover-highlight">
              <div className="project-img-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                ) : (
                  <div className="project-img-placeholder">
                    <Code2 size={48} />
                  </div>
                )}
              </div>
              <div className="project-info">
                <div className="project-header-side" style={{ justifyContent: 'center', width: '100%' }}>
                  <h4 className="project-title">{project.title}</h4>
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
            </div>
          ))}
        </div>
        <h3 className="section-subtitle"><Code2 size={28} /> {t.projects.individual}</h3>
        <div className="projects-grid">
          {projectsData.filter(p => p.type === 'individual').map(project => (
            <div key={project.id} className="project-card glass hover-highlight">
              <div className="project-img-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                ) : (
                  <div className="project-img-placeholder">
                    <Code2 size={48} />
                  </div>
                )}
              </div>
              <div className="project-info">
                <div className="project-header-side" style={{ justifyContent: 'center', width: '100%' }}>
                  <h4 className="project-title">{project.title}</h4>
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
            </div>
          ))}
        </div>
      </section>


      <section id="contact" className="container reveal" style={{ paddingBottom: '10rem' }}>
        <h2 className="section-title gradient-text">{t.contact.title}</h2>
        <div className="info-grid" style={{ marginBottom: '4rem' }}>
          <div className="info-card glass" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="p-4 bg-blue-500/10 rounded-full text-blue-500"><MapPin size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>{t.contact.location}</span>
          </div>
          <div className="info-card glass" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="p-4 bg-green-500/10 rounded-full text-green-500"><Phone size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>{t.contact.phone}</span>
          </div>
          <a href={`mailto:${t.contact.email}`} className="info-card glass" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="p-4 bg-purple-500/10 rounded-full text-purple-500"><Mail size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>{t.contact.email}</span>
          </a>
          <a href={t.contact.github} target="_blank" rel="noreferrer" className="info-card glass" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="p-4 bg-gray-500/10 rounded-full text-gray-500"><Github size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/miguel-rodr%C3%ADguez-eis/" target="_blank" rel="noreferrer" className="info-card glass" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="p-4 bg-blue-600/10 rounded-full text-blue-600"><Globe2 size={32} /></div>
            <span className="info-company" style={{ marginBottom: 0 }}>LinkedIn</span>
          </a>
        </div>

        <div className="glass p-8 mx-auto" style={{ borderRadius: '2.5rem', maxWidth: '900px', padding: '4rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          <h3 className="section-title gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t.contact.subtitle}</h3>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" className="form-input" placeholder={t.contact.formName} style={{ padding: '1.2rem' }} />
            </div>
            <div className="form-group">
              <input type="text" className="form-input" placeholder={t.contact.formSubject} style={{ padding: '1.2rem' }} />
            </div>
            <div className="form-group">
              <input type="email" className="form-input" placeholder={t.contact.formEmail} style={{ padding: '1.2rem' }} />
            </div>
            <div className="form-group">
              <textarea className="form-textarea" placeholder={t.contact.formMessage} style={{ padding: '1.2rem' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem' }}>
              <Send size={20} /> {t.contact.formSend}
            </button>
          </form>
        </div>
      </section>

      <footer className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2 className="gradient-text">MIGUEL.DEV</h2>
              <p className="footer-bio">
                {lang === 'es'
                  ? 'Ingeniero en Sistemas con enfoque en desarrollo robusto, ciberseguridad y análisis de datos. Especializado en transformar desafíos técnicos en soluciones escalables.'
                  : 'Systems Engineer focused on robust development, cybersecurity, and data analysis. Specialized in transforming technical challenges into scalable solutions.'}
              </p>
              <div className="footer-contact-item" style={{ border: 'none', padding: 0 }}>
                <MapPin size={18} className="text-cyan-400" />
                <span>Rosario, Santa Fe, Argentina</span>
              </div>
              <div className="skill-items" style={{ marginTop: '1.5rem' }}>
                <img src={getTechIcon('React')} className="skill-icon" />
                <img src={getTechIcon('Node.js')} className="skill-icon" />
                <img src={getTechIcon('Python')} className="skill-icon" />
                <img src={getTechIcon('MySQL')} className="skill-icon" />
              </div>
            </div>

            <div className="footer-nav">
              <span className="footer-col-title">{lang === 'es' ? 'Navegación' : 'Navigation'}</span>
              <div className="footer-links">
                <a href="#hero" className="footer-link"><ArrowUp size={16} /> {lang === 'es' ? 'Inicio' : 'Home'}</a>
                <a href="#about" className="footer-link"><Briefcase size={16} /> {t.nav.about}</a>
                <a href="#experience" className="footer-link"><Activity size={16} /> {t.experience.title}</a>
                <a href="#projects" className="footer-link"><Code2 size={16} /> {t.nav.projects}</a>
                <a href="#skills" className="footer-link"><Layers size={16} /> {t.skills.title}</a>
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
              <a href={cvLink} download className="footer-contact-item" style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>
                <FileDown size={18} />
                <span>{lang === 'es' ? 'Descargar CV' : 'Download CV'}</span>
              </a>
            </div>

            <div className="footer-social">
              <span className="footer-col-title">{lang === 'es' ? 'Redes Sociales' : 'Social Media'}</span>
              <div className="footer-social-grid">
                <a href={t.contact.github} target="_blank" rel="noreferrer" className="social-pill">
                  <Github size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/in/miguel-rodriguez-eis" target="_blank" rel="noreferrer" className="social-pill">
                  <Linkedin size={18} /> LinkedIn
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
            <div style={{ opacity: 0.7, letterSpacing: '1px' }}>v1.01. Última actualización: 23/04/2026</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
