import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './data/translations';
import { projectsData } from './data/projects';
import { certificationsData } from './data/certifications';
import {
  FileDown, Moon, Sun, Languages, Github, ExternalLink, Code2, Server, Globe2, Briefcase,
  Database, ShieldCheck, BarChart, LayoutDashboard, Mail, Phone, MapPin, GraduationCap,
  Layers, Terminal, Cloud, CheckCircle2, Send, Cpu, Activity, ChevronDown, ChevronUp,
  Linkedin, MessageSquare, ArrowUp, Youtube, Menu, X, Brain, Sparkles
} from 'lucide-react';

const UTN_LOGO_URL = "/Logo%20UTN.png";
const MUNI_LOGO_URL = "/Logo%20Muni.png";

const dv = (p) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}.svg`;
const ICONS = {
  'Next.js 16': dv('nextjs/nextjs-original'), 'Next.js': dv('nextjs/nextjs-original'),
  'React': dv('react/react-original'), 'React.js': dv('react/react-original'),
  'Node.js': dv('nodejs/nodejs-original'), 'TypeScript': dv('typescript/typescript-original'),
  'Python': dv('python/python-original'), 'Pandas': dv('pandas/pandas-original'),
  'NumPy': dv('numpy/numpy-original'), 'Scikit-learn': dv('scikitlearn/scikitlearn-original'),
  'Vite': dv('vitejs/vitejs-original'), 'Tailwind CSS': dv('tailwindcss/tailwindcss-original'),
  'MySQL': dv('mysql/mysql-original'), 'PostgreSQL': dv('postgresql/postgresql-original'),
  'SQL Server': dv('microsoftsqlserver/microsoftsqlserver-original'), 'Oracle': dv('oracle/oracle-original'),
  'MongoDB': dv('mongodb/mongodb-original'), 'Supabase': dv('supabase/supabase-original'),
  'JavaScript': dv('javascript/javascript-original'), 'Express': dv('express/express-original'),
  'Linux': dv('linux/linux-original'), 'Windows': dv('windows8/windows8-original'),
  'Material UI': dv('materialui/materialui-original'), 'React Router': dv('reactrouter/reactrouter-original'),
  'Prisma': dv('prisma/prisma-original'), 'Vanilla CSS': dv('css3/css3-original'),
  'Framer Motion': dv('framermotion/framermotion-original'), 'Angular': dv('angularjs/angularjs-original'),
  'RxJS': dv('rxjs/rxjs-original'), 'Firebase': dv('firebase/firebase-plain'),
  'Firebase Auth': dv('firebase/firebase-plain'), 'Firestore': dv('firebase/firebase-plain'),
  'Cloud Firestore': dv('firebase/firebase-plain'), 'Git': dv('git/git-original'),
  'GitHub': dv('github/github-original'), 'Bitbucket': dv('bitbucket/bitbucket-original'),
  'Jest': dv('jest/jest-plain'), 'Cypress': dv('cypressio/cypressio-original'),
  'AWS': dv('amazonwebservices/amazonwebservices-original-wordmark'), 'Postman': dv('postman/postman-original'),
  'dbt': '/dbt-logo.svg', 'Salesforce': dv('salesforce/salesforce-original'),
  'Power BI': 'https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg',
  'Tableau': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tableau.svg',
  'KNIME': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/knime.svg',
  'SQL': dv('azuresqldatabase/azuresqldatabase-original')
};
const getTechIcon = (tech) => ICONS[tech] || null;

const S = (name, src, className) => ({ name, src, className });
const I = (name, icon) => ({ name, icon });

/* ---------- Reusable pieces ---------- */
const Section = ({ id, title, children }) => (
  <section id={id} className="section">
    <header className="section-head"><h2>{title}</h2></header>
    {children}
  </section>
);

const TechTags = ({ list }) => (
  <div className="tags">
    {list.map(tech => (
      <span key={tech} className="tag">
        {getTechIcon(tech) && <img src={getTechIcon(tech)} alt="" />}
        {tech}
      </span>
    ))}
  </div>
);

const Collapse = ({ open, children }) => (
  <div className={`collapse ${open ? 'open' : ''}`}><div>{children}</div></div>
);

const ToggleBtn = ({ open, onClick, lang }) => (
  <button className="toggle" onClick={onClick} aria-expanded={open}>
    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    <span>{lang === 'es' ? 'Descripción' : 'Description'}</span>
  </button>
);

const Bullets = ({ items }) => (
  <ul className="bullets">
    {items.map((item, i) => (
      <li key={i}><CheckCircle2 size={16} />{item}</li>
    ))}
  </ul>
);

const ExpRow = ({ logo, alt, d, tags, open, onToggle, lang }) => (
  <article className="row exp">
    <div className="row-side">
      <img src={logo} alt={alt} className="logo" loading="lazy" />
      <span className="period">{d.period}</span>
    </div>
    <div className="row-main">
      <h3 className="role">{d.role}</h3>
      <span className="company">{d.company}</span>
      <ToggleBtn open={open} onClick={onToggle} lang={lang} />
      <Collapse open={open}>
        {d.desc && <p className="muted italic">{d.desc}</p>}
        <Bullets items={d.items} />
      </Collapse>
      <TechTags list={tags} />
    </div>
  </article>
);

const ProjectRow = ({ p, lang, open, onToggle, group }) => (
  <article className="proj">
    <div className="proj-img">
      {p.image ? (
        <img
          src={p.image} alt={p.title} loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
      ) : null}
      <div className="proj-ph" style={{ display: p.image ? 'none' : 'flex' }}><Code2 size={40} /></div>
    </div>
    <div className="proj-body">
      <h4 className="proj-title">{lang === 'es' ? p.title : (p.enTitle || p.title)}</h4>
      <ToggleBtn open={open} onClick={onToggle} lang={lang} />
      <Collapse open={open}>
        <p className="muted">{lang === 'es' ? p.description : p.enDescription}</p>
      </Collapse>
      <TechTags list={p.techs} />
      <div className="proj-actions">
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="link-btn"><ExternalLink size={16} /> Live</a>
        )}
        {group && p.id === 'veterinaria' && (
          <a href="https://www.youtube.com/watch?v=_UIGXiYF8HM" target="_blank" rel="noreferrer" className="link-btn yt"><Youtube size={16} /> Demo</a>
        )}
        {p.repoUrl && (
          <a href={p.repoUrl} target="_blank" rel="noreferrer" className="link-btn">
            <Github size={16} /> {group && p.repoUrlBackend ? 'Frontend' : 'Repo'}
          </a>
        )}
        {group && p.repoUrlBackend && (
          <a href={p.repoUrlBackend} target="_blank" rel="noreferrer" className="link-btn"><Server size={16} /> Backend</a>
        )}
      </div>
    </div>
  </article>
);

/* ---------- App ---------- */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedItems, setExpandedItems] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeSkill, setActiveSkill] = useState('dataAnalytics');

  const toggleItem = (id) => setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);

  useEffect(() => {
    const ids = ['hero', 'about', 'education', 'experience', 'skills', 'certs', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');
  const t = translations[lang];

  const handleDownloadCv = (downloadLang) => {
    const targetLang = downloadLang || lang;
    const link = document.createElement('a');
    link.href = targetLang === 'es' ? `/cv-es.pdf?v=1.24-${Date.now()}` : `/cv-en.pdf?v=1.24-${Date.now()}`;
    link.download = `CV_Miguel_Rodriguez_${targetLang.toUpperCase()}_v1.24.pdf`;
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
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
      id: 'dataAnalytics', icon: <BarChart size={20} />, title: t.skills.categories.dataAnalytics,
      skills: [
        S("Python", ICONS['Python']), S("SQL", ICONS['SQL']), S("Pandas", ICONS['Pandas']),
        S("NumPy", ICONS['NumPy']), S("Scikit-learn", ICONS['Scikit-learn']), S("Power BI", ICONS['Power BI']),
        S("Tableau", ICONS['Tableau']), S("KNIME", ICONS['KNIME']), S("dbt", "/dbt-logo.svg", "dbt-logo-img"),
        I("IBM SPSS Statistics", <Activity size={14} />), I("IBM SPSS Modeler", <Activity size={14} />),
        I("EDA (Exploratory Data Analysis)", <Activity size={14} />),
        I("Data Cleaning & Validation", <CheckCircle2 size={14} />),
        I("Dashboards & KPIs", <LayoutDashboard size={14} />)
      ]
    },
    {
      id: 'aiMl', icon: <Brain size={20} />, title: t.skills.categories.aiMl,
      skills: [
        I("Machine Learning Fundamentals", <Brain size={14} />),
        I("Predictive Modeling & Classification", <Activity size={14} />),
        I("Clustering", <Layers size={14} />), I("IBM SPSS Modeler", <Activity size={14} />),
        I("Prompt Engineering", <Sparkles size={14} />), I("Large Language Models (LLMs)", <Cpu size={14} />),
        I("Neural Networks / Deep Learning", <Brain size={14} />)
      ]
    },
    {
      id: 'databases', icon: <Database size={20} />, title: t.skills.categories.databases,
      skills: [
        S("PostgreSQL", ICONS['PostgreSQL']), S("MySQL", ICONS['MySQL']), S("SQL Server", ICONS['SQL Server']),
        S("Oracle (PL/SQL)", ICONS['Oracle']), S("MongoDB", ICONS['MongoDB']), I("DB Design", <Database size={14} />)
      ]
    },
    {
      id: 'backendApis', icon: <Server size={20} />, title: t.skills.categories.backendApis,
      skills: [
        S("Node.js", ICONS['Node.js']), S("Express", ICONS['Express']), S("Supabase", ICONS['Supabase']),
        I("REST APIs", <Server size={14} />), I("JWT", <ShieldCheck size={14} />),
        S("Firebase", ICONS['Firebase']), S("Postman", ICONS['Postman']),
        I("Integration Troubleshooting", <Cpu size={14} />)
      ]
    },
    {
      id: 'systemsSupport', icon: <ShieldCheck size={20} />, title: t.skills.categories.systemsSupport,
      skills: [
        S("Windows", ICONS['Windows']), S("Linux", ICONS['Linux']),
        I("Software Installation & Config", <Terminal size={14} />), I("Hardware Diagnostics", <Cpu size={14} />),
        I("Workstations Support", <Briefcase size={14} />), I("User Troubleshooting & Support", <ShieldCheck size={14} />)
      ]
    },
    {
      id: 'networking', icon: <Globe2 size={20} />, title: t.skills.categories.networking,
      skills: [
        I(lang === 'es' ? "Configuración IP" : "IP Configuration", <Terminal size={14} />),
        I(lang === 'es' ? "Conectividad" : "Connectivity", <Activity size={14} />),
        I("WiFi", <Globe2 size={14} />),
        I(lang === 'es' ? "Diagnóstico de Redes" : "Network Diagnostics", <ShieldCheck size={14} />)
      ]
    },
    {
      id: 'cloudTools', icon: <Cloud size={20} />, title: t.skills.categories.cloudTools,
      skills: [
        S("Firebase Auth / Firestore", ICONS['Firebase']), S("AWS (IAM, EC2, S3)", ICONS['AWS']),
        S("Git", ICONS['Git']), S("GitHub", ICONS['GitHub']), S("Bitbucket", ICONS['Bitbucket']),
        S("Jest", ICONS['Jest']), S("Cypress", ICONS['Cypress']),
        I("Scrum / Kanban", <CheckCircle2 size={14} />), S("Salesforce", ICONS['Salesforce'])
      ]
    },
    {
      id: 'frontend', icon: <Layers size={20} />, title: t.skills.categories.frontend,
      skills: [
        S("React", ICONS['React']), S("Angular", ICONS['Angular']), S("Next.js", ICONS['Next.js']),
        S("TypeScript", ICONS['TypeScript']), S("JavaScript ES6+", ICONS['JavaScript']),
        S("HTML5", dv('html5/html5-original')), S("Modern CSS", ICONS['Vanilla CSS']), S("Vite", ICONS['Vite'])
      ]
    }
  ];

  const navItems = [
    ['about', t.nav.about], ['education', t.education.title], ['experience', t.experience.title],
    ['skills', t.skills.title], ['certs', t.certifications.title], ['projects', t.nav.projects],
    ['contact', t.nav.contact]
  ];

  const values = [
    [Brain, t.about.dataAiLabel, t.about.dataAiDesc],
    [ShieldCheck, t.about.opsLabel, t.about.opsDesc],
    [Database, t.about.stackLabel, t.about.stackDesc],
    [Cloud, t.about.salesforceLabel, t.about.salesforceDesc],
    [Globe2, t.about.englishLabel, t.about.englishDesc]
  ];

  const education = [t.education.ingenieria, t.education.analista];

  const contactCards = [
    { icon: MapPin, label: t.contact.location },
    { icon: Phone, label: t.contact.phone },
    { icon: Mail, label: t.contact.email, href: `mailto:${t.contact.email}` },
    { icon: Github, label: 'GitHub', href: t.contact.github, ext: true },
    { icon: Globe2, label: 'LinkedIn', href: 'https://www.linkedin.com/in/miguel-rodr%C3%ADguez-eis/', ext: true },
    { icon: Cloud, label: 'Salesforce Trailblazer', href: t.contact.salesforce, ext: true }
  ];

  const formFields = [
    ['text', 'name', t.contact.formName],
    ['text', 'subject', t.contact.formSubject],
    ['email', 'email', t.contact.formEmail]
  ];

  const certIcon = (c) => ({
    'Core & Languages': <Globe2 size={18} />,
    'Cloud & Backend': <Server size={18} />,
    'Data Science, AI & Python': <BarChart size={18} />,
    'Frontend & Web Development': <Layers size={18} />,
    'Agile & Soft Skills': <ShieldCheck size={18} />
  }[c]);

  const footerVersion = lang === 'es'
    ? 'v1.24 · Última actualización: 8 de octubre de 2026'
    : 'v1.24 · Last updated: October 8, 2026';

  return (
    <div className="shell">
      {/* SIDEBAR / TOPBAR */}
      <aside className={`side ${isMenuOpen ? 'open' : ''}`}>
        <div className="side-top">
          <a href="#hero" className="brand" onClick={() => setIsMenuOpen(false)}>
            <span className="mark">MR</span>
            <span className="brand-name">Miguel Rodríguez</span>
          </a>
          <button className="icon-btn menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="side-nav">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setIsMenuOpen(false)} className={activeSection === id ? 'active' : ''}>
              {label}
            </a>
          ))}
        </nav>

        <div className="side-bottom">
          <button className="btn btn-primary block" onClick={() => { setShowCvModal(true); setIsMenuOpen(false); }}>
            <FileDown size={16} /> CV
          </button>
          <div className="side-tools">
            <button className="icon-btn" onClick={toggleLang} aria-label="Language">
              <Languages size={18} /> <span>{lang.toUpperCase()}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      <div className="content">
        <main>
          {/* HERO */}
          <section id="hero" className="hero">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="eyebrow"><i /> {t.hero.greeting}</span>
              <h1 className="hero-title">{t.hero.name}</h1>
              <h2 className="hero-sub">{t.hero.title}</h2>
              <p className="hero-desc">{t.about.summary}</p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary"><Briefcase size={18} /> {t.nav.projects}</a>
                <button onClick={() => setShowCvModal(true)} className="btn btn-ghost">
                  <FileDown size={18} /> {t.contact.downloadThisCv}
                </button>
              </div>
            </motion.div>
            <div className="portrait">
              <img
                src="/profile.jpg" alt="Profile" loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="portrait-ph" style={{ display: 'none' }}><Server size={80} /></div>
            </div>
          </section>

          {/* ABOUT */}
          <Section id="about" title={t.about.title}>
            <div className="about">
              <div className="about-text">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
              <div className="values">
                <h3 className="sub-title">{t.about.valueTitle}</h3>
                {values.map(([Icon, label, desc]) => (
                  <div key={label} className="value">
                    <span className="icon-bubble"><Icon size={20} /></span>
                    <div>
                      <strong>{label}</strong>
                      <p className="muted">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* EDUCATION */}
          <Section id="education" title={t.education.title}>
            <div className="edu">
              {education.map((ed, i) => (
                <article key={i} className="edu-item">
                  <span className="icon-bubble"><GraduationCap size={22} /></span>
                  <div>
                    <h3 className="role">{ed.degree}</h3>
                    <span className="company">{ed.school}</span>
                    <span className="period">{ed.period}</span>
                    <p className="muted">{ed.status}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience" title={t.experience.title}>
            <div className="rows">
              <ExpRow
                logo={UTN_LOGO_URL} alt="UTN Rosario" d={t.experience.utn} lang={lang}
                tags={['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'EDA', 'Clustering']}
                open={!!expandedItems['utn']} onToggle={() => toggleItem('utn')}
              />
              <ExpRow
                logo={MUNI_LOGO_URL} alt="Muni Rosario / HECA" d={t.experience.heca} lang={lang}
                tags={['IT Support', 'Troubleshooting', 'APIs', 'Windows', 'Linux', 'Log Analysis', 'Networks']}
                open={!!expandedItems['heca']} onToggle={() => toggleItem('heca')}
              />
              <ExpRow
                logo={MUNI_LOGO_URL} alt="Secretaría de Salud Pública" d={t.experience.salud} lang={lang}
                tags={['SQL', 'Troubleshooting', 'APIs', 'Functional Analysis', 'Continuous Improvement']}
                open={!!expandedItems['salud']} onToggle={() => toggleItem('salud')}
              />
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills" title={t.skills.title}>
            <div className="stack">
              <div className="stack-tabs" role="tablist">
                {skillCategories.map(cat => (
                  <button
                    key={cat.id} role="tab" aria-selected={activeSkill === cat.id}
                    className={`stack-tab ${activeSkill === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveSkill(cat.id)}
                  >
                    <span className="icon-bubble sm">{cat.icon}</span>
                    <span className="stack-tab-title">{cat.title}</span>
                    <span className="stack-count">{cat.skills.length}</span>
                  </button>
                ))}
              </div>
              {skillCategories.filter(cat => cat.id === activeSkill).map(cat => (
                <div key={cat.id} className="stack-panel" role="tabpanel">
                  <h3 className="stack-panel-title">{cat.title}</h3>
                  <div className="tiles">
                    {cat.skills.map(s => (
                      <div key={s.name} className="tile">
                        <span className="tile-icon">
                          {s.src
                            ? <img src={s.src} alt="" className={s.className || ''} />
                            : s.icon}
                        </span>
                        <span className="tile-name">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* CERTS */}
          <Section id="certs" title={t.certifications.title}>
            <div className="rows">
              {certificationsData.map((cat, idx) => (
                <div key={idx} className="row skill">
                  <h3 className="skill-title">
                    <span className="icon-bubble sm">{certIcon(cat.category)}</span>
                    {cat.category}
                  </h3>
                  <div className="certs">
                    {cat.certs.map(cert => (
                      <div key={cert.id} className="cert">
                        <div className="cert-title">{cert.title}</div>
                        <div className="muted small">{cert.issuer} • {cert.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* PROJECTS */}
          <Section id="projects" title={t.nav.projects}>
            <h3 className="sub-title"><Briefcase size={22} /> {t.projects.group}</h3>
            <div className="projs">
              {projectsData.filter(p => p.type === 'group').map(p => (
                <ProjectRow key={p.id} p={p} lang={lang} group
                  open={!!expandedItems[p.id]} onToggle={() => toggleItem(p.id)} />
              ))}
            </div>
            <h3 className="sub-title mt"><Code2 size={22} /> {t.projects.individual}</h3>
            <div className="projs">
              {projectsData.filter(p => p.type === 'individual').map(p => (
                <ProjectRow key={p.id} p={p} lang={lang}
                  open={!!expandedItems[p.id]} onToggle={() => toggleItem(p.id)} />
              ))}
            </div>
          </Section>

          {/* CONTACT */}
          <Section id="contact" title={t.contact.title}>
            <div className="contact">
              <ul className="contact-list">
                {contactCards.map(({ icon: Icon, label, href, ext }) => {
                  const inner = <><span className="icon-bubble sm"><Icon size={18} /></span><span>{label}</span></>;
                  return (
                    <li key={label}>
                      {href
                        ? <a href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})} className="contact-item">{inner}</a>
                        : <div className="contact-item">{inner}</div>}
                    </li>
                  );
                })}
              </ul>

              <div className="form-wrap">
                <h3 className="sub-title">{t.contact.subtitle}</h3>
                <form className="form" onSubmit={handleSubmit}>
                  {formFields.map(([type, name, ph]) => (
                    <input
                      key={name} type={type} name={name} className="input"
                      placeholder={ph} value={formState[name]} onChange={handleFormChange} required
                    />
                  ))}
                  <textarea
                    name="message" className="input textarea" placeholder={t.contact.formMessage}
                    value={formState.message} onChange={handleFormChange} required
                  />
                  <button type="submit" className="btn btn-primary block" disabled={isSubmitting}>
                    {isSubmitting
                      ? <span>{lang === 'es' ? 'Enviando...' : 'Sending...'}</span>
                      : <><Send size={18} /> {t.contact.formSend}</>}
                  </button>
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div className="status ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {lang === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!'}
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div className="status err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {lang === 'es' ? 'Hubo un error. Inténtalo de nuevo.' : 'Something went wrong. Please try again.'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </Section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <h2 className="brand big">
                <span className="mark">MR</span>
                <span className="brand-name">Miguel Rodríguez</span>
              </h2>
              <p className="muted">{t.footer.bio}</p>
              <div className="flink"><MapPin size={16} /> Rosario, Santa Fe, Argentina</div>
              <div className="footer-icons">
                {['Python', 'Pandas', 'PostgreSQL', 'Node.js', 'React'].map(n => (
                  <img key={n} src={getTechIcon(n)} alt={n} />
                ))}
              </div>
            </div>

            <div className="footer-col">
              <span className="col-title">{lang === 'es' ? 'Navegación' : 'Navigation'}</span>
              <a href="#hero" className="flink"><ArrowUp size={16} /> {lang === 'es' ? 'Inicio' : 'Home'}</a>
              <a href="#about" className="flink"><Briefcase size={16} /> {t.nav.about}</a>
              <a href="#education" className="flink"><GraduationCap size={16} /> {t.education.title}</a>
              <a href="#experience" className="flink"><Activity size={16} /> {t.experience.title}</a>
              <a href="#skills" className="flink"><Layers size={16} /> {t.skills.title}</a>
              <a href="#projects" className="flink"><Code2 size={16} /> {t.nav.projects}</a>
              <a href="#contact" className="flink"><Mail size={16} /> {t.contact.title}</a>
            </div>

            <div className="footer-col">
              <span className="col-title">{lang === 'es' ? 'Contacto Rápido' : 'Quick Contact'}</span>
              <a href={`mailto:${t.contact.email}`} className="flink box"><Mail size={16} /> {t.contact.email}</a>
              <div className="flink box"><Phone size={16} /> {t.contact.phone}</div>
              <button onClick={() => setShowCvModal(true)} className="flink box accent">
                <FileDown size={16} /> {lang === 'es' ? 'Descargar CV' : 'Download CV'}
              </button>
            </div>

            <div className="footer-col">
              <span className="col-title">{lang === 'es' ? 'Redes Sociales' : 'Social Media'}</span>
              <div className="social">
                <a href={t.contact.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
                <a href={t.contact.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
                <a href={t.contact.salesforce} target="_blank" rel="noreferrer"><Cloud size={16} /> Salesforce</a>
                <a href={`mailto:${t.contact.email}`}><Mail size={16} /> Email</a>
                <a href={`https://wa.me/${t.contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                  <MessageSquare size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Miguel Rodríguez. {t.footer.rights}</p>
            <span>{footerVersion}</span>
          </div>
        </footer>
      </div>

      {/* CV MODAL */}
      <AnimatePresence>
        {showCvModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCvModal(false)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="icon-bubble lg"><FileDown size={32} /></span>
              <h3>{lang === 'es' ? 'Confirmar Descarga' : 'Confirm Download'}</h3>
              <p className="muted">
                {lang === 'es'
                  ? 'Selecciona en qué idioma deseas descargar el CV (v1.24):'
                  : 'Select in which language you wish to download the CV (v1.24):'}
              </p>
              <div className="modal-actions">
                <button className="btn btn-primary block" onClick={() => handleDownloadCv('es')}>{t.about.downloadCvSpanish}</button>
                <button className="btn btn-primary block" onClick={() => handleDownloadCv('en')}>{t.about.downloadCvEnglish}</button>
                <button className="btn btn-ghost block" onClick={() => setShowCvModal(false)}>
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