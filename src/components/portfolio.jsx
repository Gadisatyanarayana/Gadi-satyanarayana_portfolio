import React, { useState, useEffect } from "react";

const user = {
  name: "Gadi Satya Narayana",
  title: "Full-Stack Developer",
  roleTag: "Java Programmer",
  tagline: "⚔️ Crafting Digital Worlds • Building Scalable Adventures • Mining Clean Code ⚔️",
  location: "Samalkota / Kakinada, Andhra Pradesh",
  email: "satyanarayaag904@gmail.com",
  whatsapp: "https://wa.me/6304211149",
  github: "https://github.com/Gadisatyanarayana",
  linkedin: "https://www.linkedin.com/in/gadi-satya-narayana-270b31296",
  // Place a file named resume.pdf in frontend/public to enable download
  resume: "/resume.pdf",
  education: [
    { 
      course: "B.Tech in Computer Science", 
      place: "Kakinada Institute of Engineering and Technology", 
      years: "2023–2027" 
    },
    { 
      course: "Intermediate (76.1%)", 
      place: "KSN Junior College, Samalkot", 
      years: "2021–2023" 
    }
  ]
};

const skillCategories = {
  webDevelopment: [
    { name: "HTML5", color: "#E34C26" },
    { name: "CSS3", color: "#1572B6" },
    { name: "React", color: "#61DAFB" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "Node.js", color: "#339933" },
    { name: "Express.js", color: "#000000" },
    { name: "MongoDB", color: "#47A248" },
    { name: "PostgreSQL", color: "#4169E1" },
    { name: "Redux", color: "#764ABC" }
  ],
  programmingLanguages: [
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Python", color: "#3776AB" },
    { name: "Java", color: "#007396" },
    { name: "C", color: "#00599C" },
    { name: "SQL", color: "#CC2927" }
  ],
  tools: [
    { name: "Git", color: "#F05032" },
    { name: "GitHub", color: "#181717" },
    { name: "VS Code", color: "#007ACC" },
    { name: "Docker", color: "#2496ED" },
    { name: "Postman", color: "#FF6C37" },
    { name: "Figma", color: "#F24E1E" },
    { name: "Vercel", color: "#000000" },
    { name: "AWS", color: "#FF9900" }
  ]
};

const projects = [
  {
    name: "E-Commerce Marketplace",
    description: "Multi-vendor platform with admin panel, seller dashboard, payment integration, and real-time inventory management system",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    emoji: "🛒",
    deployLink: "https://ecommerce-marketplace-demo.vercel.app"
  },
  {
    name: "Food Delivery Clone",
    description: "Full-stack food ordering app with authentication, cart system, live order tracking and payment gateway integration",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    emoji: "🍔",
    deployLink: "https://food-delivery-clone-demo.netlify.app"
  },
  {
    name: "Car Price Predictor",
    description: "ML model predicting used car prices using Python, scikit-learn with Flask API and data visualization",
    tags: ["Python", "ML", "Flask", "Pandas","XGBoost","regression models"],
    emoji: "🚗",
    deployLink: "https://car-price-predictor-demo.herokuapp.com"
  },
  {
    name: "Streaming Platform",
    description: "Video streaming platform with categories, user authentication, content management and AI recommendations",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    emoji: "🎬",
    deployLink: "https://streaming-platform-demo.vercel.app"
  }
];

export default function MinecraftPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll for small header shadow and to trigger sticky visuals
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use IntersectionObserver to detect active section reliably (accounts for header height)
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'what-i-offer', 'contact'];
    const navHeight = document.querySelector('nav')?.offsetHeight || 80;

    const observerOptions = {
      root: null,
      rootMargin: `-${navHeight + 10}px 0px -40% 0px`,
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = document.querySelector('nav')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset - 8; // small extra gap
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update active section immediately
      setActiveSection(sectionId);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      {/* Fixed Navigation */}
      <nav style={{
        ...styles.nav,
        ...(isScrolled ? styles.navScrolled : {}),
        ...(isMobileMenuOpen ? { height: '100vh', background: 'linear-gradient(180deg, #54752b 0%, #2d4416 100%)' } : {})
      }}>
        <div style={{
          ...styles.navInner,
          '@media (max-width: 768px)': {
            justifyContent: 'space-between',
            padding: '1rem'
          }
        }}>
          <div style={styles.navBrand} onClick={() => scrollToSection('home')}>
            <span style={styles.pixelIcon}>⛏️</span>
            <span>GSN</span>
          </div>
          {/* Mobile Menu Button */}
          <button 
            style={{
              ...styles.mobileMenuButton,
              display: isMobile ? 'block' : 'none'
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Desktop Navigation - Hidden on mobile */}
          <ul style={{
            ...styles.navList,
            display: isMobile ? 'none' : 'flex'
          }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'what-i-offer', label: 'Services' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <li
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                style={styles.navItem}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Desktop Resume Button */}
          {!isMobile && (
            <a
              href={user.resume}
              download
              className="resume-btn"
              style={styles.resumeButton}
            >
              ⬇️ Resume
            </a>
          )}

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div style={styles.mobileMenu} className="mobile-menu">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'what-i-offer', label: 'Services' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <div
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  style={styles.mobileNavItem}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </div>
              ))}
              {/* Mobile Resume Button inside dropdown */}
              <a
                href={user.resume}
                download
                className="resume-btn"
                style={{ ...styles.resumeButton, marginTop: '0.5rem' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ⬇️ Resume
              </a>
            </div>
          )}
        </div>
      </nav>

      <main style={styles.main}>
        {/* Hero Section */}
        <section id="home" style={styles.hero}>
          <div style={styles.heroContent}>
            {/* Minecraft Avatar */}
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>
                <div style={styles.avatarHead}>
                  <div style={styles.avatarFace}>GS</div>
                </div>
                <div style={styles.avatarBody}></div>
              </div>
            </div>
            
            <h1 style={styles.heroTitle}>
              Welcome, <span style={styles.heroName}>{user.name}</span>
            </h1>
            
            <div style={styles.heroSubtitle}>
              ⚔️ {user.title} ⚔️ • ☕ {user.roleTag}
            </div>

            <div style={styles.heroTagline}>
              {user.tagline} — ☕ Java backend, OOP & enterprise-ready services
            </div>
            
            <div style={styles.heroLocation}>
              📍 {user.location}
            </div>

            {/* Action Buttons */}
            <div style={styles.heroButtons}>
              <button 
                className="hero-btn primary-btn"
                style={styles.primaryButton}
                onClick={() => scrollToSection('projects')}
              >
                🗺️ View Projects
              </button>
              <button 
                className="hero-btn secondary-btn"
                style={styles.secondaryButton}
                onClick={() => scrollToSection('contact')}
              >
                📬 Contact Me
              </button>
            </div>

            {/* Social Connect Icons */}
            <div style={styles.socialConnect}>
              <a 
                href={user.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialIconLink}
                className="social-icon-link"
              >
                <div style={{...styles.socialIcon, ...styles.whatsappIcon}} className="social-icon">
                  💬
                </div>
                <div style={styles.socialLabel}>WhatsApp</div>
              </a>

              <a 
                href={user.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialIconLink}
                className="social-icon-link"
              >
                <div style={{...styles.socialIcon, ...styles.linkedinIcon}} className="social-icon">
                  💼
                </div>
                <div style={styles.socialLabel}>LinkedIn</div>
              </a>

              <a 
                href={user.github} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialIconLink}
                className="social-icon-link"
              >
                <div style={{...styles.socialIcon, ...styles.githubIcon}} className="social-icon">
                  💻
                </div>
                <div style={styles.socialLabel}>GitHub</div>
              </a>

              <a 
                href={`mailto:${user.email}`}
                style={styles.socialIconLink}
                className="social-icon-link"
              >
                <div style={{...styles.socialIcon, ...styles.emailIcon}} className="social-icon">
                  📧
                </div>
                <div style={styles.socialLabel}>Email</div>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardIcon}>📖</span> About Me
          </h2>
          <div style={styles.cardContent}>
            <p style={styles.aboutText}>
              Greetings, fellow adventurer! I'm a passionate full-stack developer who crafts 
              digital experiences in the vast realm of web development. With my pickaxe of 
              knowledge and sword of creativity, I mine through complex problems and build 
              scalable solutions that stand the test of time.
            </p>
            <div style={styles.educationSection}>
              <h3 style={styles.sectionSubtitle}>🎓 Education Quest</h3>
              {user.education.map((edu, idx) => (
                <div key={idx} style={styles.educationItem}>
                  <div style={styles.educationCourse}>{edu.course}</div>
                  <div style={styles.educationPlace}>{edu.place}</div>
                  <div style={styles.educationYears}>{edu.years}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Skills Section - 3 Categories */}
        <section id="skills" style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardIcon}>⛏️</span> Skills Inventory
          </h2>
          
          {/* Web Development */}
          <div style={styles.skillCategory}>
            <h3 style={styles.skillCategoryTitle}>
              🌐 Web Development
            </h3>
            <div style={styles.skillsGrid}>
              {skillCategories.webDevelopment.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="skill-slot"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    ...styles.skillSlot,
                    ...(hoveredSkill === skill.name && {
                      transform: 'translateY(-4px) scale(1.05)',
                      boxShadow: '0 10px 0 #2a2a1a, inset 0 2px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255,215,0,0.2)',
                      border: '4px ridge #ffd700'
                    })
                  }}
                >
                  <div style={{
                    ...styles.skillIcon,
                    backgroundColor: skill.color,
                    boxShadow: hoveredSkill === skill.name 
                      ? `0 0 20px ${skill.color}, inset 0 2px 0 rgba(255,255,255,0.3)` 
                      : 'inset 0 2px 0 rgba(255,255,255,0.3), 0 4px 0 rgba(0,0,0,0.3)'
                  }}>
                    {skill.name.charAt(0)}
                  </div>
                  <div style={styles.skillName}>{skill.name}</div>
                  {hoveredSkill === skill.name && (
                    <div className="skill-tooltip" style={styles.skillTooltip}>⭐ Master Level</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div style={styles.skillCategory}>
            <h3 style={styles.skillCategoryTitle}>
              💻 Programming Languages
            </h3>
            <div style={styles.skillsGrid}>
              {skillCategories.programmingLanguages.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="skill-slot"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    ...styles.skillSlot,
                    ...(hoveredSkill === skill.name && {
                      transform: 'translateY(-4px) scale(1.05)',
                      boxShadow: '0 10px 0 #2a2a1a, inset 0 2px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255,215,0,0.2)',
                      border: '4px ridge #ffd700'
                    })
                  }}
                >
                  <div style={{
                    ...styles.skillIcon,
                    backgroundColor: skill.color,
                    boxShadow: hoveredSkill === skill.name 
                      ? `0 0 20px ${skill.color}, inset 0 2px 0 rgba(255,255,255,0.3)` 
                      : 'inset 0 2px 0 rgba(255,255,255,0.3), 0 4px 0 rgba(0,0,0,0.3)'
                  }}>
                    {skill.name.charAt(0)}
                  </div>
                  <div style={styles.skillName}>{skill.name}</div>
                  {hoveredSkill === skill.name && (
                    <div className="skill-tooltip" style={styles.skillTooltip}>⭐ Expert Level</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div style={styles.skillCategory}>
            <h3 style={styles.skillCategoryTitle}>
              🛠️ Tools & Technologies
            </h3>
            <div style={styles.skillsGrid}>
              {skillCategories.tools.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="skill-slot"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    ...styles.skillSlot,
                    ...(hoveredSkill === skill.name && {
                      transform: 'translateY(-4px) scale(1.05)',
                      boxShadow: '0 10px 0 #2a2a1a, inset 0 2px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255,215,0,0.2)',
                      border: '4px ridge #ffd700'
                    })
                  }}
                >
                  <div style={{
                    ...styles.skillIcon,
                    backgroundColor: skill.color,
                    boxShadow: hoveredSkill === skill.name 
                      ? `0 0 20px ${skill.color}, inset 0 2px 0 rgba(255,255,255,0.3)` 
                      : 'inset 0 2px 0 rgba(255,255,255,0.3), 0 4px 0 rgba(0,0,0,0.3)'
                  }}>
                    {skill.name.charAt(0)}
                  </div>
                  <div style={styles.skillName}>{skill.name}</div>
                  {hoveredSkill === skill.name && (
                    <div className="skill-tooltip" style={styles.skillTooltip}>⭐ Advanced Level</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardIcon}>🗺️</span> Featured Projects
          </h2>
          <div style={styles.projectsGrid}>
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                style={{
                  ...styles.projectCard,
                  ...(hoveredProject === idx ? styles.projectCardHover : {})
                }}
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={styles.projectEmoji}>{project.emoji}</div>
                <div style={styles.projectName}>{project.name}</div>
                <div style={styles.projectDesc}>{project.description}</div>
                <div style={styles.projectTags}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={styles.projectTag}>{tag}</span>
                  ))}
                </div>
                <button
                  style={styles.deployButton}
                  onClick={() => window.open(project.deployLink, '_blank', 'noopener,noreferrer')}
                  className="deploy-btn"
                >
                  🌐 Visit Project
                </button>
              </div>
            ))}
          </div>
        </section>
          {/* What I Offer (moved under Projects) */}
        <section id="what-i-offer" style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardIcon}>🧭</span> What I Offer
          </h2>
          <div style={styles.servicesGrid} className="services-grid">
            {/* Full-Stack Web Development */}
            <div style={styles.serviceCard} className="service-card">
              <div style={styles.serviceIcon} className="service-icon">🪓</div>
              <div style={styles.serviceTitle}>Full-Stack Web Development</div>
              <div style={styles.serviceDesc}>
                Building scalable apps with MERN, RESTful APIs and clean, maintainable code.
              </div>
              <div style={styles.serviceBadges}>
                {['MERN', 'REST APIs', 'PostgreSQL', 'Docker'].map((b, i) => (
                  <span key={i} style={styles.serviceBadge} className="service-badge">{b}</span>
                ))}
              </div>
            </div>

            {/* Modern UI/UX Design */}
            <div style={styles.serviceCard} className="service-card">
              <div style={styles.serviceIcon} className="service-icon">🎨</div>
              <div style={styles.serviceTitle}>Modern UI/UX Design</div>
              <div style={styles.serviceDesc}>
                Pixel‑perfect interfaces with React, TypeScript, Tailwind CSS, and Shadcn UI.
              </div>
              <div style={styles.serviceBadges}>
                {['Tailwind', 'Responsive', 'TypeScript', 'Shadcn UI'].map((b, i) => (
                  <span key={i} style={styles.serviceBadge} className="service-badge">{b}</span>
                ))}
              </div>
            </div>

            {/* Database Design & Management */}
            <div style={styles.serviceCard} className="service-card">
              <div style={styles.serviceIcon} className="service-icon">🧱</div>
              <div style={styles.serviceTitle}>Database Design & Management</div>
              <div style={styles.serviceDesc}>
                Efficient schemas and type‑safe operations with MongoDB, MySQL and PostgreSQL.
              </div>
              <div style={styles.serviceBadges}>
                {['MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM'].map((b, i) => (
                  <span key={i} style={styles.serviceBadge} className="service-badge">{b}</span>
                ))}
              </div>
            </div>

            {/* Java Programming (4th box) */}
            <div style={styles.serviceCard} className="service-card">
              <div style={styles.serviceIcon} className="service-icon">☕</div>
              <div style={styles.serviceTitle}>Java Programming</div>
              <div style={styles.serviceDesc}>
                Robust OOP design, DSA‑driven performance, REST APIs and clean architecture.
              </div>
              <div style={styles.serviceBadges}>
                {['Core Java', 'OOP', 'DSA', 'APIs'].map((b, i) => (
                  <span key={i} style={styles.serviceBadge} className="service-badge">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        

        {/* Contact Section */}
        <section id="contact" style={styles.contactCard}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardIcon}>📬</span> Contact Me
          </h2>
          <div style={styles.contactContent}>
            <p style={styles.contactIntro}>
              Ready to start a new quest together? Drop me a message through any portal below!
            </p>
            <div style={styles.contactGrid}>
              <div className="contact-item" style={styles.contactItem}>
                <span className="contact-icon" style={styles.contactIcon}>📧</span>
                <div>
                  <div style={styles.contactLabel}>Email</div>
                  <a href={`mailto:${user.email}`} style={styles.contactLink}>
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="contact-item" style={styles.contactItem}>
                <span className="contact-icon" style={styles.contactIcon}>💻</span>
                <div>
                  <div style={styles.contactLabel}>GitHub</div>
                  <a href={user.github} target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                    View Profile
                  </a>
                </div>
              </div>

              <div className="contact-item" style={styles.contactItem}>
                <span className="contact-icon" style={styles.contactIcon}>💼</span>
                <div>
                  <div style={styles.contactLabel}>LinkedIn</div>
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                    Connect
                  </a>
                </div>
              </div>

              <div className="contact-item" style={styles.contactItem}>
                <span className="contact-icon" style={styles.contactIcon}>💬</span>
                <div>
                  <div style={styles.contactLabel}>WhatsApp</div>
                  <a href={user.whatsapp} target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                    Chat Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            ⛏️ Crafted with passion in the Minecraft universe ⛏️
          </p>
          <p style={styles.footerCopy}>
            © 2024 {user.name} • Built with React
          </p>
        </footer>
      </main>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Press Start 2P', monospace;
          }

          .nav-item {
            position: relative;
            transition: all 0.3s ease;
          }

          .nav-item:hover {
            color: #ffd700;
            transform: scale(1.1);
            text-shadow: 0 0 10px #ffd700, 2px 2px 0 #1a2a0d;
          }

          .nav-item.active {
            color: #ffd700;
          }

          .nav-item.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #ffd700;
            box-shadow: 0 0 10px #ffd700;
          }

          .skill-slot {
            transition: all 0.3s ease;
          }

          .skill-slot:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 10px 0 #2a2a1a, inset 0 2px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255,215,0,0.2);
            border: 4px ridge #ffd700;
          }

          .skill-slot:hover .skillIcon {
            transform: rotate(360deg) scale(1.1);
          }

          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(255,215,0,0.5); }
            50% { box-shadow: 0 0 20px rgba(255,215,0,0.8); }
            100% { box-shadow: 0 0 5px rgba(255,215,0,0.5); }
          }

          .skill-slot:hover div:first-of-type {
            animation: glowPulse 1.5s infinite;
            border-color: rgba(255,215,0,0.5);
          }

          .skill-tooltip {
            animation: fadeIn 0.3s ease-in-out;
          }

          /* Hero button hover styles */
          .hero-btn {
            transition: transform 0.18s ease, box-shadow 0.18s ease;
            will-change: transform;
          }

          .hero-btn:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 12px 0 rgba(0,0,0,0.4), 0 0 20px rgba(255,215,0,0.07);
          }

          .primary-btn:hover { }
          .secondary-btn:hover { }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes iconFloat {
            0% { transform: translateY(-8px) scale(1.1); }
            100% { transform: translateY(-12px) scale(1.1); }
          }

          .social-icon-link:hover .social-icon {
            transform: translateY(-8px);
            box-shadow: 0 12px 0 rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.4);
          }

          .contact-item:hover .contact-link {
            color: #ffd700;
            text-shadow: 0 0 10px rgba(255,215,0,0.5);
            transform: scale(1.05);
          }

          .contact-item:hover .contact-icon {
            animation: minecraftBounce 0.6s ease-in-out;
            transform: scale(1.3) rotate(10deg);
            filter: drop-shadow(0 0 15px #ffd700);
          }

          @keyframes minecraftBounce {
            0% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.4) rotate(-5deg); }
            50% { transform: scale(1.2) rotate(10deg); }
            75% { transform: scale(1.35) rotate(-5deg); }
            100% { transform: scale(1.3) rotate(10deg); }
          }

          .mobile-nav-item:hover {
            position: relative;
          }

          .mobile-nav-item:hover::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 0%, rgba(255,215,0,0.2) 50%, transparent 100%);
            animation: shimmer 0.8s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-20deg); }
            100% { transform: translateX(200%) skewX(-20deg); }
          }

          @media (max-width: 768px) {
            .mobile-menu-button {
              display: block !important;
            }
            
            .nav-list {
              display: none;
            }

            .mobile-menu {
              animation: slideDown 0.3s ease-out;
            }

            .mobile-nav-item {
              animation: fadeIn 0.3s ease-out;
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .mobile-nav-item.active {
            color: #ffd700;
            background: rgba(255, 215, 0, 0.1);
          }

          .mobile-menu-button:hover {
            transform: scale(1.1);
            text-shadow: 0 0 10px #ffd700;
          }

          .mobile-menu-button:active {
            transform: scale(0.95);
          }

          .mobile-nav-item:hover {
            transform: translateX(10px);
            background: rgba(255, 215, 0, 0.1);
          }

          .mobile-nav-item:active {
            transform: scale(0.98) translateX(10px);
          }

          .deploy-btn:hover {
            transform: translateY(-6px) scale(1.05);
            box-shadow: 0 8px 0 #8a7500, 0 0 25px rgba(255,215,0,0.6) !important;
          }

          .deploy-btn:active {
            transform: translateY(-2px) scale(0.98);
            box-shadow: 0 2px 0 #8a7500 !important;
          }

          /* Minecraft hover motions for What I Offer */
          .service-card {
            position: relative;
            transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, border-color 180ms ease;
            will-change: transform, box-shadow;
          }

          .service-card:hover {
            transform: translateY(-12px) rotate(-1deg) scale(1.03);
            box-shadow: 0 14px 0 #1a2a0d, 0 0 35px rgba(255,215,0,0.25), inset 0 4px 0 rgba(255,255,255,0.12);
            border-color: #9fd96a !important;
            filter: saturate(1.08);
          }

          .service-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 12px;
            background: linear-gradient(135deg, transparent 0%, rgba(255,215,0,0.15) 50%, transparent 100%);
            pointer-events: none;
            transform: translateX(-120%);
            animation: none;
          }

          .service-card:hover::after {
            animation: pixelShimmer 900ms ease-out forwards;
          }

          .service-icon {
            transition: transform 220ms cubic-bezier(0.68, -0.55, 0.265, 1.55), filter 220ms ease;
            display: inline-block;
          }

          .service-card:hover .service-icon {
            transform: translateY(-6px) rotate(-6deg) scale(1.12);
            filter: drop-shadow(0 0 18px rgba(255,215,0,0.4));
          }

          .service-badge {
            transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
          }

          .service-card:hover .service-badge {
            animation: badgePop 300ms ease-out;
            border-color: #7da83c !important;
            box-shadow: inset 0 2px 0 rgba(255,255,255,0.12), 0 0 12px rgba(125,168,60,0.25);
          }

          @keyframes pixelShimmer {
            0% { transform: translateX(-120%); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translateX(120%); opacity: 0; }
          }

          @keyframes badgePop {
            0% { transform: scale(0.9); }
            60% { transform: scale(1.08); }
            100% { transform: scale(1.0); }
          }

          /* Minecraft resume motion button */
          .resume-btn {
            display: inline-block;
            text-decoration: none;
            color: #1a2a0d;
            background: linear-gradient(135deg, #7cfc00 0%, #38a169 100%);
            border: 4px solid #22543d;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            font-size: 0.8rem;
            box-shadow: 0 8px 0 #22543d, 0 0 18px rgba(124,252,0,0.25);
            text-shadow: 0 1px 0 rgba(255,255,255,0.6);
            transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
          }

          .resume-btn:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 12px 0 #22543d, 0 0 28px rgba(124,252,0,0.45);
            filter: saturate(1.2);
          }

          .resume-btn:active {
            transform: translateY(-2px) scale(0.98);
            box-shadow: 0 4px 0 #22543d;
          }

          /* Social Icons Hover Effects */
          .social-icon-link {
            text-decoration: none !important;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .social-icon-link:hover {
            transform: translateY(-8px) scale(1.1);
          }

          .social-icon-link:hover .social-icon {
            box-shadow: 0 12px 0 rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.4);
            border: 4px solid #ffd700 !important;
            transform: translateY(-8px);
          }

          .social-icon-link:active {
            transform: translateY(-4px) scale(1.05);
          }

          .social-icon {
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          @media (max-width: 768px) {
            .heroContent {
              padding: 1rem;
            }
            
            .heroTitle {
              font-size: 1rem !important;
            }
            
            .heroButtons {
              flex-direction: column;
              gap: 1rem;
            }

            .primaryButton,
            .secondaryButton {
              width: 100%;
              font-size: 0.75rem !important;
              padding: 0.75rem 1rem !important;
            }

            .socialConnect {
              gap: 1rem !important;
            }

            .socialIcon {
              width: 60px !important;
              height: 60px !important;
              font-size: 2rem !important;
            }

            .socialLabel {
              font-size: 0.6rem !important;
            }

            .navBrand {
              font-size: 1rem !important;
            }

            .mobileMenuButton {
              font-size: 1.5rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#2d5016',
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 16px, rgba(0,0,0,0.1) 17px), repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 16px, rgba(0,0,0,0.1) 17px)',
    fontFamily: "'Press Start 2P', monospace",
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%)',
    backgroundSize: '32px 32px',
    backgroundPosition: '0 0, 16px 16px',
    zIndex: 0,
    pointerEvents: 'none'
  },
  nav: {
    background: 'linear-gradient(180deg, #54752b 0%, #3d5a1f 100%)',
    borderBottom: '8px solid #2d4416',
    boxShadow: '0 8px 0 #1a2a0d, inset 0 4px 0 rgba(255,255,255,0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease'
  },
  navScrolled: {
    boxShadow: '0 8px 0 #1a2a0d, 0 8px 30px rgba(0,0,0,0.6), inset 0 4px 0 rgba(255,255,255,0.1)'
  },
  navInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.2rem',
    color: '#f4e4bc',
    textShadow: '2px 2px 0 #1a2a0d',
    cursor: 'pointer'
  },
  pixelIcon: {
    fontSize: '1.5rem'
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap'
  },
  navItem: {
    color: '#e8d4a0',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textShadow: '2px 2px 0 #1a2a0d',
    padding: '0.5rem',
    letterSpacing: '1px',
    position: 'relative',
    ':hover': {
      color: '#ffd700',
      transform: 'scale(1.1)',
      textShadow: '0 0 10px #ffd700, 2px 2px 0 #1a2a0d'
    }
  },
  navItemActive: {
    color: '#ffd700',
    transform: 'scale(1.15)',
    textShadow: '0 0 15px #ffd700, 2px 2px 0 #1a2a0d',
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '100%',
      height: '2px',
      background: '#ffd700',
      boxShadow: '0 0 10px #ffd700'
    }
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '6rem 1rem 2rem',
    position: 'relative',
    zIndex: 1
  },
  hero: {
    minHeight: 'calc(100vh - 150px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    marginBottom: '3rem'
  },
  heroContent: {
    textAlign: 'center',
    width: '100%'
  },
  avatarContainer: {
    marginBottom: '2rem'
  },
  avatar: {
    display: 'inline-block'
  },
  avatarHead: {
    width: '96px',
    height: '96px',
    background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
    border: '4px solid #3d2817',
    boxShadow: '0 8px 0 #2a1810, inset 0 4px 0 rgba(255,255,255,0.2)',
    borderRadius: '8px',
    margin: '0 auto',
    position: 'relative'
  },
  avatarFace: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#f4e4bc',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 0 #1a2a0d'
  },
  avatarBody: {
    width: '64px',
    height: '48px',
    background: 'linear-gradient(135deg, #4169e1 0%, #1e3a8a 100%)',
    border: '4px solid #1e40af',
    boxShadow: '0 6px 0 #1e3a8a',
    borderRadius: '4px',
    margin: '4px auto 0'
  },
  heroTitle: {
    fontSize: '1.4rem',
    color: '#f4e4bc',
    marginBottom: '1rem',
    textShadow: '3px 3px 0 #1a2a0d',
    lineHeight: '1.8'
  },
  heroName: {
    color: '#7cfc00',
    textShadow: '0 0 20px #7cfc00, 3px 3px 0 #1a2a0d'
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: '#d4af37',
    marginBottom: '1rem',
    textShadow: '2px 2px 0 #1a2a0d'
  },
  heroTagline: {
    fontSize: '0.75rem',
    color: '#a8c97f',
    marginBottom: '1rem',
    textShadow: '1px 1px 0 #1a2a0d',
    lineHeight: '1.8',
    maxWidth: '800px',
    margin: '0 auto 1rem'
  },
  heroLocation: {
    fontSize: '0.85rem',
    color: '#a8c97f',
    marginBottom: '2rem',
    textShadow: '2px 2px 0 #1a2a0d'
  },
  heroButtons: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #7da83c 0%, #54752b 100%)',
    border: '4px solid #3d5a1f',
    borderRadius: '8px',
    padding: '1rem 2rem',
    fontSize: '0.85rem',
    color: '#f4e4bc',
    cursor: 'pointer',
    boxShadow: '0 8px 0 #3d5a1f, 0 0 20px rgba(125,168,60,0.3)',
    textShadow: '2px 2px 0 #1a2a0d',
    transition: 'all 0.3s',
    fontFamily: "'Press Start 2P', monospace",
    letterSpacing: '1px'
  },
  secondaryButton: {
    background: 'linear-gradient(135deg, #4169e1 0%, #1e3a8a 100%)',
    border: '4px solid #1e40af',
    borderRadius: '8px',
    padding: '1rem 2rem',
    fontSize: '0.85rem',
    color: '#f4e4bc',
    cursor: 'pointer',
    boxShadow: '0 8px 0 #1e40af, 0 0 20px rgba(65,105,225,0.3)',
    textShadow: '2px 2px 0 #1a2a0d',
    transition: 'all 0.3s',
    fontFamily: "'Press Start 2P', monospace",
    letterSpacing: '1px'
  },
  socialConnect: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  socialIconLink: {
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    display: 'inline-block',
    margin: '0 15px',
    '&:hover': {
      transform: 'translateY(-10px)',
    },
    '&:active': {
      transform: 'translateY(-2px) scale(0.95)',
    }
  },
  socialIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    border: '4px solid rgba(0,0,0,0.3)',
    boxShadow: '0 6px 0 rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.2)',
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, transparent 50%, rgba(255,215,0,0.2) 100%)',
      transform: 'translateY(100%)',
      transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.1)',
      boxShadow: '0 15px 0 rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.3), 0 0 30px rgba(255,215,0,0.4)',
      border: '4px solid #ffd700'
    },
    '&:hover::before': {
      transform: 'translateY(0) scale(2) rotate(45deg)'
    },
    '&:active': {
      transform: 'translateY(2px) scale(0.95)',
      boxShadow: '0 4px 0 rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.2)',
    }
  },
  whatsappIcon: {
    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
  },
  linkedinIcon: {
    background: 'linear-gradient(135deg, #0077B5 0%, #0A66C2 100%)'
  },
  githubIcon: {
    background: 'linear-gradient(135deg, #6e5494 0%, #24292e 100%)'
  },
  emailIcon: {
    background: 'linear-gradient(135deg, #EA4335 0%, #c71610 100%)'
  },
  socialLabel: {
    fontSize: '0.7rem',
    color: '#f4e4bc',
    textShadow: '1px 1px 0 #1a2a0d'
  },
  card: {
    background: 'linear-gradient(135deg, #3d5a1f 0%, #2d4416 100%)',
    border: '6px ridge #7da83c',
    borderRadius: '16px',
    boxShadow: '0 12px 0 #1a2a0d, 0 0 30px rgba(125,168,60,0.3), inset 0 4px 0 rgba(255,255,255,0.1)',
    padding: '2rem',
    marginBottom: '2rem'
  },
  cardTitle: {
    fontSize: '1.3rem',
    color: '#ffd700',
    marginBottom: '1.5rem',
    textShadow: '3px 3px 0 #1a2a0d',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  cardIcon: {
    fontSize: '1.8rem'
  },
  cardContent: {
    color: '#e8f4d7',
    lineHeight: '1.8',
    fontSize: '0.85rem'
  },
  aboutText: {
    marginBottom: '1.5rem',
    textShadow: '1px 1px 0 rgba(0,0,0,0.5)'
  },
  educationSection: {
    background: 'rgba(0,0,0,0.2)',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '3px solid #2d4416'
  },
  sectionSubtitle: {
    color: '#ffd700',
    fontSize: '1rem',
    marginBottom: '1rem',
    textShadow: '2px 2px 0 #1a2a0d'
  },
  educationItem: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '2px dashed #7da83c',
    padding: '1rem',
    borderRadius: '6px',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  educationCourse: {
    color: '#7cfc00',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
    fontSize: '0.85rem'
  },
  educationPlace: {
    color: '#d4af37',
    fontSize: '0.7rem',
    marginBottom: '0.2rem'
  },
  educationYears: {
    color: '#a8c97f',
    fontSize: '0.7rem'
  },
  skillCategory: {
    marginBottom: '2.5rem'
  },
  skillCategoryTitle: {
    fontSize: '1.1rem',
    color: '#ffd700',
    marginBottom: '1.5rem',
    textShadow: '2px 2px 0 #1a2a0d',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderBottom: '3px solid #7da83c',
    paddingBottom: '0.75rem'
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
    gap: '1rem'
  },
  skillSlot: {
    background: 'linear-gradient(135deg, #4a4a2a 0%, #3a3a1a 100%)',
    border: '4px ridge #8a8a5a',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer',
    boxShadow: '0 6px 0 #2a2a1a, inset 0 2px 0 rgba(255,255,255,0.1)',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.05)',
      boxShadow: '0 10px 0 #2a2a1a, inset 0 2px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255,215,0,0.2)',
      border: '4px ridge #ffd700'
    }
  },
  skillIcon: {
    width: '48px',
    height: '48px',
    margin: '0 auto 0.5rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
    border: '3px solid rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease-in-out',
    transform: 'rotate(0deg)',
    backfaceVisibility: 'hidden'
  },
  skillName: {
    color: '#f4e4bc',
    fontSize: '0.7rem',
    textShadow: '1px 1px 0 #1a2a0d'
  },
  skillTooltip: {
    position: 'absolute',
    top: '-45px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #2a1810 0%, #1a2a0d 100%)',
    color: '#ffd700',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.65rem',
    whiteSpace: 'nowrap',
    border: '2px solid #ffd700',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5), 0 0 15px rgba(255,215,0,0.3)',
    zIndex: 10,
    opacity: 0,
    animation: 'fadeIn 0.3s ease-in-out forwards'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  projectCard: {
    background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
    border: '5px solid #3d2817',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 8px 0 #2a1810, 0 0 20px rgba(139,69,19,0.3), inset 0 3px 0 rgba(255,255,255,0.1)',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  projectCardHover: {
    transform: 'translateY(-12px) rotate(-1deg) scale(1.02)',
    boxShadow: '0 14px 0 #1a2a0d, 0 0 30px rgba(255,215,0,0.12), inset 0 4px 0 rgba(255,255,255,0.12)'
  },
  projectEmoji: {
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  projectName: {
    color: '#ffd700',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    textShadow: '2px 2px 0 #1a2a0d',
    textAlign: 'center'
  },
  projectDesc: {
    color: '#f4e4bc',
    fontSize: '0.75rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    textShadow: '1px 1px 0 rgba(0,0,0,0.5)'
  },
  projectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center'
  },
  projectTag: {
    background: '#3d2817',
    color: '#ffd700',
    padding: '0.3rem 0.6rem',
    borderRadius: '6px',
    fontSize: '0.65rem',
    border: '2px solid #654321',
    boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.3)'
  },
  deployButton: {
    background: 'linear-gradient(135deg, #ffd700 0%, #d4af37 100%)',
    border: '3px solid #8a7500',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.7rem',
    color: '#1a2a0d',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #8a7500, 0 0 15px rgba(255,215,0,0.3)',
    textShadow: 'none',
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    fontFamily: "'Press Start 2P', monospace",
    letterSpacing: '1px',
    fontWeight: 'bold',
    marginTop: '1rem',
    width: '100%'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.25rem'
  },
  serviceCard: {
    background: 'linear-gradient(135deg, #3f5d21 0%, #293b18 100%)',
    border: '6px ridge #6fa83c',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 10px 0 #1a2a0d, inset 0 4px 0 rgba(255,255,255,0.08)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    cursor: 'default'
  },
  serviceIcon: {
    fontSize: '1.6rem',
    marginBottom: '0.75rem'
  },
  serviceTitle: {
    color: '#ffd700',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 0 #1a2a0d'
  },
  serviceDesc: {
    color: '#e8f4d7',
    fontSize: '0.75rem',
    lineHeight: '1.6',
    marginBottom: '0.85rem'
  },
  serviceBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  serviceBadge: {
    background: '#1f2e10',
    color: '#cde7a0',
    border: '3px solid #4f7a24',
    borderRadius: '8px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.6rem',
    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.06)'
  },
  contactCard: {
    background: 'linear-gradient(135deg, #4169e1 0%, #1e3a8a 100%)',
    border: '6px ridge #6495ed',
    borderRadius: '16px',
    boxShadow: '0 12px 0 #1e40af, 0 0 30px rgba(65,105,225,0.3), inset 0 4px 0 rgba(255,255,255,0.1)',
    padding: '2rem',
    marginBottom: '2rem'
  },
  contactContent: {
    color: '#e8f4d7'
  },
  contactIntro: {
    fontSize: '0.85rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#f4e4bc',
    textShadow: '1px 1px 0 #1a2a0d'
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(0,0,0,0.2)',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '4px ridge #1e40af',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 0 rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.1)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, transparent 0%, rgba(255,215,0,0.15) 50%, transparent 100%)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s'
    },
    '&:hover': {
      transform: 'translateY(-10px) scale(1.05) rotate(1deg)',
      boxShadow: '0 14px 0 rgba(0,0,0,0.4), 0 0 35px rgba(255,215,0,0.5), inset 0 3px 0 rgba(255,255,255,0.2)',
      background: 'rgba(0,0,0,0.4)',
      border: '4px ridge #ffd700'
    },
    '&:hover:before': {
      transform: 'translateX(100%)'
    },
    '&:active': {
      transform: 'translateY(-6px) scale(1.02)',
      boxShadow: '0 8px 0 rgba(0,0,0,0.4), 0 0 25px rgba(255,215,0,0.4)',
    }
  },
  contactIcon: {
    fontSize: '2rem',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    display: 'inline-block'
  },
  contactLabel: {
    fontSize: '0.75rem',
    color: '#d4af37',
    marginBottom: '0.3rem',
    textShadow: '1px 1px 0 #1a2a0d'
  },
  contactLink: {
    color: '#ffd700',
    textDecoration: 'none',
    fontSize: '0.7rem',
    textShadow: '1px 1px 0 #1a2a0d',
    transition: 'all 0.2s',
    wordBreak: 'break-word'
  },
  footer: {
    textAlign: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
    border: '4px solid #3a3a3a',
    borderRadius: '12px',
    boxShadow: '0 8px 0 #000, inset 0 2px 0 rgba(255,255,255,0.05)',
    marginTop: '2rem'
  },
  footerText: {
    color: '#7da83c',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 0 #000'
  },
  footerCopy: {
    color: '#666',
    fontSize: '0.7rem',
    textShadow: '1px 1px 0 #000'
  },
  mobileMenuButton: {
    background: 'linear-gradient(135deg, #7da83c 0%, #54752b 100%)',
    border: '4px solid #2d4416',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    padding: '0.75rem 1rem',
    boxShadow: '0 6px 0 #2d4416',
    textShadow: '2px 2px 0 #1a2a0d'
  },
  mobileMenu: {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2rem',
    '@media (min-width: 769px)': {
      display: 'none'
    }
  },
  mobileNavItem: {
    padding: '1.5rem',
    color: '#e8d4a0',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    textShadow: '2px 2px 0 #1a2a0d',
    marginBottom: '1rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(45,70,22,0.8) 0%, rgba(26,42,13,0.9) 100%)',
    borderRadius: '12px',
    border: '4px ridge #54752b',
    boxShadow: '0 8px 0 rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
    transform: 'translateY(0)',
    '&:last-child': {
      marginBottom: 0
    },
    ':hover': {
      color: '#ffd700',
      transform: 'translateY(-12px) scale(1.08) rotate(-1deg)',
      background: 'linear-gradient(135deg, rgba(125,168,60,0.3) 0%, rgba(85,117,43,0.4) 100%)',
      border: '4px ridge #ffd700',
      boxShadow: '0 14px 0 rgba(0,0,0,0.4), 0 0 35px rgba(255,215,0,0.5), inset 0 3px 0 rgba(255,255,255,0.2)',
      textShadow: '0 0 20px #ffd700, 3px 3px 0 #1a2a0d'
    },
    ':active': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 6px 0 rgba(0,0,0,0.4), 0 0 25px rgba(255,215,0,0.4)'
    }
  },
  resumeButton: {
    background: 'linear-gradient(135deg, #7cfc00 0%, #38a169 100%)',
    border: '4px solid #22543d',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: '#0b1e0b',
    fontSize: '0.8rem',
    textDecoration: 'none',
    boxShadow: '0 8px 0 #22543d, 0 0 18px rgba(124,252,0,0.25)',
    textShadow: '0 1px 0 rgba(255,255,255,0.6)',
    fontFamily: "'Press Start 2P', monospace",
    letterSpacing: '1px',
    cursor: 'pointer'
  }
}