import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Compass,
  Download,
  ExternalLink,
  GraduationCap,
  HardHat,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const portraitUrl = '/images/photo-profil.jpeg';

type Page = 'home' | 'about' | 'expertise' | 'projects' | 'contact';

const navigation: { id: Page; label: string }[] = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'Parcours' },
  { id: 'expertise', label: 'Expertises' },
  { id: 'projects', label: 'Réalisations' },
  { id: 'contact', label: 'Contact' },
];

const experiences = [
  {
    period: '01/2025 — aujourd\u2019hui',
    role: 'Ingénieure chargée d\u2019affaires en contrôle technique de la construction',
    company: 'Risk Control · Villiers-sur-Marne',
    details: [
      'Contrôle technique de bâtiments d\u2019habitation, d\u2019établissements recevant du public (ERP) et de bâtiments à usage professionnel, dans le cadre des missions de base L (solidité des ouvrages) et S (sécurité des personnes), complétées selon les opérations par les missions HAND (accessibilité) et PS (risque sismique).',
      'En phase conception : participation aux réunions techniques de mise au point et examen critique des dispositions techniques du projet, donnant lieu au rapport initial de contrôle technique et à la formulation d\u2019avis sur ouvrage.',
      'En phase réalisation : examen des documents d\u2019exécution — plans de fondations, de structure, de cloisonnement, de revêtements — et avis sur ouvrage après examen documentaire.',
      'Visites sur site pour vérifier, par sondages, les ouvrages et éléments d\u2019équipement soumis au contrôle, et s\u2019assurer que les vérifications incombant aux constructeurs s\u2019effectuent de manière satisfaisante.',
      'Vérification de la conformité des ouvrages aux référentiels applicables, notamment la norme NF P03-100 et le Code de la construction et de l\u2019habitation.',
      'Rédaction des avis et rapports de contrôle technique tout au long de l\u2019opération, jusqu\u2019au rapport de synthèse clôturant la mission.',
    ],
  },
  {
    period: '09/2024 — 01/2025',
    role: 'Apprentie ingénieure — produits en mortiers spéciaux',
    company: 'Sika France · Meudon',
    details: [
      'Rédaction de cahiers des charges de mortiers de scellement et de calage.',
      'Études de résistance et caractérisation de mortiers spéciaux au centre R&D.',
      'Réalisation d\u2019essais de renforcement de structures par fibre de carbone et système Sika Carbodur.',
    ],
  },
  {
    period: '08/2023 — 10/2023',
    role: 'Stagiaire à l\u2019international',
    company: 'Sika Italie · Calusco d\u2019Adda, Bergame',
    details: [
      'Évaluation de mortiers adaptés aux sollicitations sismiques.',
      'Réalisation d\u2019essais et analyse des résultats.',
    ],
  },
  {
    period: '03/2021 — 05/2021',
    role: 'Stage en bâtiment et maîtrise d\u2019œuvre TCE',
    company: 'B3E Ingénierie · Nanterre',
    details: [
      'Réalisation de diagnostics techniques et participation à l\u2019élaboration de rapports APS, APD et CCTP.',
      'Établissement de devis et prise en main de l\u2019information géographique.',
    ],
  },
];

const expertiseCards = [
  {
    icon: ShieldCheck,
    title: 'Contrôle en phase conception',
    text: 'Analyse des dossiers de conception et du DCE, avec rédaction du rapport initial de contrôle technique.',
    tags: ['Dossier de conception', 'DCE', 'Rapport initial'],
  },
  {
    icon: Ruler,
    title: 'Suivi des documents d\u2019exécution',
    text: 'Examen des plans de fondations, de structure, de cloisonnement et de revêtements tout au long du chantier.',
    tags: ['Plans d\u2019exécution', 'Structure', 'Conformité'],
  },
  {
    icon: Compass,
    title: 'Suivi de chantier & avis techniques',
    text: 'Visites sur site et formulation d\u2019avis techniques jusqu\u2019à la réception des travaux.',
    tags: ['Visites de chantier', 'Avis techniques', 'Réception'],
  },
];

const projects = [
  {
    index: '01',
    title: 'Bâtiments d\u2019habitation',
    type: 'Contrôle technique · Logements collectifs & individuels',
    description: 'Analyse des dossiers de conception, rédaction du rapport initial et suivi des documents d\u2019exécution jusqu\u2019à la réception des travaux.',
    accent: 'project-sand',
  },
  {
    index: '02',
    title: 'Établissements recevant du public',
    type: 'Contrôle technique · ERP',
    description: 'Vérification de la conformité réglementaire et suivi de chantier pour des établissements accueillant du public.',
    accent: 'project-blue',
  },
  {
    index: '03',
    title: 'Bâtiments à usage professionnel',
    type: 'Contrôle technique · Bureaux & locaux professionnels',
    description: 'Examen des plans de structure, de cloisonnement et de revêtement, avec formulation d\u2019avis techniques tout au long du projet.',
    accent: 'project-dark',
  },
];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      setPage(navigation.some((item) => item.id === hash) ? hash : 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (nextPage: Page) => {
    window.location.hash = nextPage;
    setMenuOpen(false);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')} aria-label="Retour à l'accueil">
          <span className="brand-mark"><HardHat size={18} /></span>
          <span>ARAME BÂ<span className="brand-dot">.</span></span>
        </button>
        <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
          {navigation.map((item) => (
            <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="header-cta" onClick={() => navigate('contact')}>Parlons de votre projet <ArrowUpRight size={15} /></button>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'about' && <About navigate={navigate} />}
        {page === 'expertise' && <Expertise navigate={navigate} />}
        {page === 'projects' && <Projects navigate={navigate} />}
        {page === 'contact' && <Contact sent={sent} submitForm={submitForm} />}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark"><HardHat size={18} /></span>
          <span>ARAME BÂ<span className="brand-dot">.</span></span>
        </div>
        <nav className="footer-nav" aria-label="Navigation secondaire">
          {navigation.map((item) => (
            <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="footer-meta">
          <span>© 2026 Arame BÂ</span>
          <button onClick={() => navigate('contact')}>Disponible pour de nouveaux projets <MoveUpRight size={14} /></button>
        </div>
      </footer>
    </div>
  );
}

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <section className="page-intro"><div><p className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</p><h1>{title}</h1></div>{children}</section>;
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  return <>
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> Contrôle technique de la construction · Île-de-France</p>
        <h1>Sécuriser vos projets,<br /><em>de la conception à la réception.</em></h1>
        <p className="hero-text">J'interviens de la conception à la réalisation des travaux pour garantir la conformité, la sécurité et la qualité des bâtiments d'habitation, des ERP et des locaux professionnels.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={() => navigate('projects')}>Découvrir mon expertise <ArrowUpRight size={16} /></button><button className="text-link" onClick={() => navigate('about')}>Mon parcours <ChevronRight size={16} /></button></div>
        <div className="cv-actions"><a className="cv-link" href="/cv-arame-ba.pdf" target="_blank" rel="noreferrer"><ExternalLink size={15} /> Consulter le CV</a><a className="cv-link cv-download" href="/cv-arame-ba.pdf" download="CV-Arame-Ba.pdf"><Download size={15} /> Télécharger le CV</a></div>
      </div>
      <div className="hero-visual"><div className="hero-image-wrap"><img src={portraitUrl} alt="Portrait professionnel d'une ingénieure sur un chantier" /><div className="image-caption"><span>01</span><span>Conformité · rigueur · chantier</span></div></div><div className="floating-stamp"><Sparkles size={17} /><span>Le contrôle technique<br />au service du bâti</span></div></div>
      <div className="hero-side-note">ARAME BÂ <span>—</span> PORTFOLIO 2026</div>
    </section>
    <section className="home-strip">
      <div className="strip-item"><strong>01</strong><span>Une spécialisation<br />en contrôle technique</span></div>
      <div className="strip-item"><strong>03</strong><span>Types de bâtiments suivis :<br />habitation, ERP, bureaux</span></div>
      <div className="strip-item"><strong>360°</strong><span>De la conception<br />à la réception</span></div>
      <button onClick={() => navigate('contact')}>Échanger sur un projet <ArrowUpRight size={17} /></button>
    </section>
    <section className="manifesto section-pad">
      <p className="eyebrow"><span className="eyebrow-line" /> La conviction</p>
      <div className="manifesto-grid">
        <h2>Garantir la conformité, <span>à chaque étape.</span></h2>
        <div>
          <p>Ingénieure spécialisée en contrôle technique de la construction, j'analyse les dossiers de conception, j'examine les documents d'exécution et je suis le chantier jusqu'à la réception, pour sécuriser chaque projet du premier plan à la dernière visite.</p>
          <button className="text-link" onClick={() => navigate('about')}>En savoir plus <ChevronRight size={16} /></button>
        </div>
      </div>
    </section>
  </>;
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-page section-pad">
    <PageIntro eyebrow="Parcours" title={<>Une expertise ancrée<br /><em>dans le contrôle technique.</em></>}>
      <p className="intro-aside">Du rapport initial de contrôle technique au suivi de chantier, j'interviens à chaque étape pour garantir la conformité et la sécurité des bâtiments.</p>
    </PageIntro>
    <div className="about-layout">
      <aside className="profile-card">
        <div className="profile-image"><img src={portraitUrl} alt="Portrait d'Arame Bâ" /></div>
        <p className="quote">« Garantir la conformité, à chaque étape du projet. »</p>
        <div className="profile-meta"><span><MapPin size={14} /> Chelles, 77500</span><span><Mail size={14} /> arameba662@gmail.com</span><span><Phone size={14} /> +33 7 60 63 96 89</span></div>
      </aside>
      <div className="timeline-area">
        <div className="section-label"><BriefcaseBusiness size={17} /> Expériences professionnelles</div>
        {experiences.map((experience, index) => <article className={`timeline-item${index === 0 ? ' is-current' : ''}`} key={experience.period}><div className="timeline-period">{experience.period}</div><div className="timeline-dot" /><div className="timeline-content"><h3>{experience.role}</h3><p className="company">{experience.company}</p><ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}
      </div>
    </div>
    <div className="cv-panel">
      <div><p className="eyebrow"><span className="eyebrow-line" /> Document professionnel</p><h2>Mon Curriculum Vitae Complet</h2><p>Retrouvez mon parcours, mes expériences, ma formation et mes compétences dans un document prêt à être partagé.</p></div>
      <div className="cv-panel-actions"><a className="button button-dark" href="/cv-arame-ba.pdf" target="_blank" rel="noreferrer">Consulter <ExternalLink size={15} /></a><a className="cv-panel-download" href="/cv-arame-ba.pdf" download="CV-Arame-Ba.pdf"><Download size={15} /> Télécharger</a></div>
    </div>
    <div className="education-block">
      <div className="section-label"><GraduationCap size={17} /> Formation</div>
      <div className="education-grid">
        <div><span>2021 — 2024</span><h3>Diplôme d'ingénieurs en conception et contrôle de la construction</h3><p>ESIEE Paris · Champs-sur-Marne</p></div>
        <div><span>2019 — 2021</span><h3>DUT Génie civil et construction durable</h3><p>IUT de Cergy-Pontoise · Neuville-sur-Oise</p></div>
      </div>
    </div>
    <div className="interests-block">
      <div className="section-label"><Sparkles size={17} /> À côté du métier</div>
      <p className="interests-text">Lecture · voyages · décoration d'intérieur · sport</p>
    </div>
    <div className="page-next"><span>Suivant</span><button onClick={() => navigate('expertise')}>Mes expertises <ArrowUpRight size={16} /></button></div>
  </div>;
}

function Expertise({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-page section-pad">
    <PageIntro eyebrow="Expertises" title={<>Le contrôle technique<br /><em>comme spécialité.</em></>}>
      <p className="intro-aside">De l'analyse du dossier de conception à la réception des travaux, une expertise construite sur la rigueur documentaire et le suivi de terrain.</p>
    </PageIntro>
    <div className="expertise-grid">{expertiseCards.map(({ icon: Icon, title, text, tags }, index) => <article className={`expertise-card card-${index}`} key={title}><div className="card-number">0{index + 1}</div><Icon size={28} strokeWidth={1.5} /><h2>{title}</h2><p>{text}</p><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
    <div className="skills-section">
      <div><p className="eyebrow"><span className="eyebrow-line" /> Compétences transversales</p><h2>Une rigueur technique,<br /><em>un dialogue de terrain.</em></h2></div>
      <div className="skills-list"><span><b>Analyse documentaire</b></span><span><b>Avis techniques</b></span><span><b>Communication claire</b></span><span><b>Suivi de chantier</b></span></div>
    </div>
    <div className="page-next"><span>Suivant</span><button onClick={() => navigate('projects')}>Voir les réalisations <ArrowUpRight size={16} /></button></div>
  </div>;
}

function Projects({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-page section-pad">
    <PageIntro eyebrow="Réalisations" title={<>Des bâtiments contrôlés<br /><em>de A à Z.</em></>}>
      <p className="intro-aside">Trois typologies de bâtiments sur lesquelles s'exerce son contrôle technique, de la conception à la réception des travaux.</p>
    </PageIntro>
    <div className="projects-list">{projects.map((project) => <article className={`project-card ${project.accent}`} key={project.index}><div className="project-index">{project.index}</div><div className="project-content"><p className="eyebrow">{project.type}</p><h2>{project.title}</h2><p>{project.description}</p><button className="project-arrow" aria-label={`Voir ${project.title}`}><ArrowUpRight size={21} /></button></div><div className="project-pattern"><span /><span /><span /></div></article>)}</div>
    <div className="quote-banner"><Sparkles size={22} /><p>« Mon objectif : garantir la conformité et la sécurité de chaque ouvrage, de la conception à la réception. »</p><span>— Arame Bâ</span></div>
    <div className="page-next"><span>Suivant</span><button onClick={() => navigate('contact')}>Me contacter <ArrowUpRight size={16} /></button></div>
  </div>;
}

function Contact({ sent, submitForm }: { sent: boolean; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="content-page section-pad contact-page">
    <PageIntro eyebrow="Contact" title={<>Un projet en tête ?<br /><em>Parlons-en.</em></>}>
      <p className="intro-aside">Une question, un besoin de contrôle technique, ou simplement envie d'échanger ? Ma boîte mail est ouverte.</p>
    </PageIntro>
    <div className="contact-layout">
      <div className="contact-details">
        <div className="contact-detail"><span className="detail-icon"><Mail size={18} /></span><div><span>Email</span><a href="mailto:arameba662@gmail.com">arameba662@gmail.com</a></div></div>
        <div className="contact-detail"><span className="detail-icon"><Phone size={18} /></span><div><span>Téléphone</span><a href="tel:+33760636989">+33 7 60 63 96 89</a></div></div>
        <div className="contact-detail"><span className="detail-icon"><MapPin size={18} /></span><div><span>Localisation</span><p>Chelles, 77500</p></div></div>
        <div className="availability"><span className="availability-dot" /> Disponible pour de nouvelles opportunités</div>
      </div>
      <form className="contact-form" onSubmit={submitForm}>{sent ? <div className="success-message"><span><Check size={22} /></span><h2>Message bien reçu.</h2><p>Merci pour votre message. Arame reviendra vers vous très prochainement.</p></div> : <><div className="form-row"><label>Votre nom<input name="name" required placeholder="Prénom Nom" autoComplete="name" /></label><label>Votre email<input type="email" name="email" required placeholder="vous@exemple.com" autoComplete="email" /></label></div><label>Votre message<textarea name="message" required placeholder="Dites-moi quelques mots sur votre projet..." rows={5} /></label><button className="button button-dark" type="submit">Envoyer le message <Send size={16} /></button></>}</form>
    </div>
  </div>;
}

export default App;