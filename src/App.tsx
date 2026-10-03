import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  HardHat,
  Home as HomeIcon,
  Languages,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  Plus,
  Ruler,
  Send,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

const portraitUrl = '/images/photo-profil.jpeg';
const email = 'arameba662@gmail.com';

type Page = 'home' | 'about' | 'expertise' | 'ouvrages' | 'contact';

const navigation: { id: Page; label: string }[] = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'Parcours' },
  { id: 'expertise', label: 'Expertises' },
  { id: 'ouvrages', label: 'Ouvrages' },
  { id: 'contact', label: 'Contact' },
];

/* ---------------------------------------------------------------
   MISSIONS DE CONTRÔLE TECHNIQUE
   --------------------------------------------------------------- */
const baseMissions = [
  { code: 'L', text: 'Solidité des ouvrages et des éléments d\u2019équipement indissociables.' },
  { code: 'S', text: 'Sécurité des personnes dans les constructions (inclut les missions SH, SEI et STI).' },
];

const complementaryMissions = [
  { code: 'HAND', text: 'Accessibilité des constructions aux personnes handicapées.' },
  { code: 'P1', text: 'Solidité des éléments d\u2019équipement non indissociablement liés.' },
  { code: 'F', text: 'Fonctionnement des installations.' },
  { code: 'Ph', text: 'Isolation acoustique.' },
  { code: 'Th', text: 'Isolation thermique et économies d\u2019énergie.' },
];

/* ---------------------------------------------------------------
   EXPÉRIENCE ACTUELLE (Risk Control)
   --------------------------------------------------------------- */
const currentPhases = [
  {
    title: 'Conception',
    items: [
      'Rédaction du rapport initial de contrôle technique, sur la base du dossier de conception.',
    ],
  },
  {
    title: 'Réalisation',
    items: [
      'Examen des documents d\u2019exécution (plans de fondations, de structure, de cloisonnement, de revêtements, etc.) sur fiches d\u2019examen de documents (FED), avec un avis favorable, défavorable, suspendu, hors mission ou sans objet selon le dossier.',
      'Visites de suivi des travaux sur chantier, puis rédaction d\u2019une fiche de visite (FVC) assortie d\u2019un avis favorable, suspendu ou défavorable selon ce qui est constaté.',
    ],
  },
  {
    title: 'Fin d\u2019opération',
    items: [
      'Rapport final de contrôle technique (RFCT) et, pour les ERP du 1er groupe ou de 5e catégorie avec locaux à sommeil, rapport de vérification réglementaire après travaux (RVRAT).',
    ],
  },
];

const currentExtras = [
  'Vérification de la conformité des ouvrages suivant les DTU, les Eurocodes et les normes en vigueur.',
  'Rédaction d\u2019attestations d\u2019accessibilité PMR pour les ERP, les bâtiments à usage professionnel et les bâtiments d\u2019habitation.',
  'Audits techniques et études capacitaires de bâtiments.',
];

/* ---------------------------------------------------------------
   AUTRES EXPÉRIENCES (d'après le CV)
   --------------------------------------------------------------- */
const pastExperiences = [
  {
    period: '09/2021 — 09/2024',
    role: 'Apprentie ingénieure — produits en mortiers spéciaux',
    company: 'Sika France · Meudon',
    details: [
      'Rédaction du cahier des charges de mortiers de scellement et de calage.',
      'Essais de résistance sur des mortiers spéciaux au centre de R&D.',
      'Étude sur un mortier de réparation structurelle.',
      'Essais de renforcement de structure par fibre de carbone (systèmes Sika Carbodur et Sika Wrap).',
      'Suivi d\u2019un projet portant sur la protection des renforts carbone après application d\u2019une étanchéité à chaud.',
      'Utilisation des textes réglementaires relatifs à la réparation et au renforcement de structure.',
    ],
  },
  {
    period: '08/2023 — 10/2023',
    role: 'Stage d\u2019immersion à l\u2019international',
    company: 'Sika Italie · Calusco d\u2019Adda, Bergame',
    details: [
      'Évaluation de différents mortiers pour proposer aux clients le produit le plus adapté aux efforts sismiques.',
      'Réalisation d\u2019essais d\u2019application et rédaction du rapport des résultats.',
    ],
  },
  {
    period: '03/2021 — 05/2021',
    role: 'Stage en BET et maîtrise d\u2019œuvre TCE',
    company: 'B3E Ingénierie · Nanterre',
    details: [
      'Réalisation de diagnostics techniques.',
      'Rédaction de rapports APS, APD et CCTP, et établissement de devis.',
      'Suivi de projet à l\u2019Institut National de l\u2019Information Géographique et Forestière (IGN).',
    ],
  },
];

const skills = [
  'Sécurité incendie',
  'Accessibilité PMR',
  'Eurocodes et normes',
  'Calcul des structures',
  'Matériaux de la construction',
  'Robot',
  'AutoCAD',
  'Pack Office',
];

/* ---------------------------------------------------------------
   MÉTHODE PAR PHASE (page Expertises)
   --------------------------------------------------------------- */
const phaseCards = [
  {
    icon: FileText,
    title: 'Phase conception',
    text: 'Je rédige le rapport initial de contrôle technique sur la base du dossier de conception.',
    tags: ['Dossier de conception', 'Rapport initial'],
  },
  {
    icon: Ruler,
    title: 'Documents d\u2019exécution et travaux',
    text: 'J\u2019examine les plans de fondations, de structure, de cloisonnement, de revêtements, etc., puis je suis les travaux lors de visites sur chantier.',
    tags: ['Fiches d\u2019examen (FED)', 'Visites de suivi (FVC)', 'etc.'],
  },
  {
    icon: ClipboardCheck,
    title: 'Fin d\u2019opération',
    text: 'Je clos l\u2019opération par le rapport final de contrôle technique, complété si nécessaire par un RVRAT pour certains ERP.',
    tags: ['RFCT', 'RVRAT'],
  },
];

/* ---------------------------------------------------------------
   OUVRAGES
   --------------------------------------------------------------- */
const ouvrages = [
  {
    icon: HomeIcon,
    title: 'Maisons individuelles',
    kind: 'Habitat individuel',
    text: 'Un contrôle technique suivi de la conception à la fin des travaux, du rapport initial au rapport final.',
    tags: ['Rapport initial', 'Documents d\u2019exécution', 'Visites de suivi', 'Rapport final'],
    tone: 'tone-sand',
  },
  {
    icon: Building2,
    title: 'Bâtiments d\u2019habitation',
    kind: 'Habitation',
    text: 'Contrôle technique des bâtiments d\u2019habitation, avec rédaction des attestations d\u2019accessibilité PMR.',
    tags: ['Conformité', 'Attestation PMR'],
    tone: 'tone-blue',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Bâtiments à usage professionnel',
    kind: 'Code du travail',
    text: 'Bâtiments à usage professionnel, supérieurs et inférieurs à 8 mètres : vérification de la conformité et attestations d\u2019accessibilité PMR.',
    tags: ['Conformité', 'Attestation PMR'],
    tone: 'tone-sage',
  },
  {
    icon: Users,
    title: 'Établissements recevant du public',
    kind: 'ERP',
    text: 'Contrôle technique des ERP, attestations d\u2019accessibilité PMR et, selon le classement, rapport de vérification réglementaire après travaux.',
    tags: ['Attestation PMR', 'RVRAT'],
    tone: 'tone-dark',
  },
];

/* ---------------------------------------------------------------
   APP
   --------------------------------------------------------------- */
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

  // Le formulaire ouvre la messagerie du visiteur avec le message prêt à envoyer.
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const from = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = encodeURIComponent(`Contact depuis le portfolio — ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')} aria-label="Retour à l'accueil">
          <span className="brand-mark"><HardHat size={18} /></span>
          <span>ARAME BA<span className="brand-dot">.</span></span>
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
        {page === 'ouvrages' && <Ouvrages navigate={navigate} />}
        {page === 'contact' && <Contact sent={sent} submitForm={submitForm} onReset={() => setSent(false)} />}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark"><HardHat size={18} /></span>
          <span>ARAME BA<span className="brand-dot">.</span></span>
        </div>
        <nav className="footer-nav" aria-label="Navigation secondaire">
          {navigation.map((item) => (
            <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="footer-meta">
          <span>© 2026 Arame BA</span>
          <button onClick={() => navigate('contact')}>Disponible pour de nouvelles opportunités <MoveUpRight size={14} /></button>
        </div>
      </footer>
    </div>
  );
}

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <section className="page-intro"><div><p className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</p><h1>{title}</h1></div>{children}</section>;
}

/* ---------------------------------------------------------------
   ACCUEIL
   --------------------------------------------------------------- */
function Home({ navigate }: { navigate: (page: Page) => void }) {
  return <>
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> Contrôle technique de la construction · Île-de-France</p>
        <h1>Sécuriser vos projets,<br /><em>de la conception à la fin des travaux.</em></h1>
        <p className="hero-text">J'interviens de la conception à la fin des travaux pour garantir la conformité, la sécurité et la qualité des maisons individuelles, des bâtiments d'habitation, des locaux professionnels et des ERP.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={() => navigate('expertise')}>Découvrir mon expertise <ArrowUpRight size={16} /></button><button className="text-link" onClick={() => navigate('about')}>Mon parcours <ChevronRight size={16} /></button></div>
        <div className="cv-actions"><a className="cv-link" href="/cv-arame-ba.pdf" target="_blank" rel="noreferrer"><ExternalLink size={15} /> Consulter le CV</a><a className="cv-link cv-download" href="/cv-arame-ba.pdf" download="CV-Arame-BA.pdf"><Download size={15} /> Télécharger le CV</a></div>
      </div>
      <div className="hero-visual"><div className="hero-image-wrap"><img src={portraitUrl} alt="Portrait d'Arame BA, ingénieure en contrôle technique de la construction" /><div className="image-caption"><span>Conformité · rigueur · chantier</span></div></div><div className="floating-stamp"><Sparkles size={17} /><span>Le contrôle technique<br />au service du bâti</span></div></div>
      <div className="hero-side-note">ARAME BA <span>—</span> PORTFOLIO 2026</div>
    </section>

    <section className="home-strip">
      <div className="strip-item"><strong>L + S</strong><span>Missions de base : solidité<br />et sécurité des personnes</span></div>
      <div className="strip-item"><strong>4</strong><span>Familles d'ouvrages suivies,<br />des maisons aux ERP</span></div>
      <div className="strip-item"><strong>3</strong><span>Phases : conception, travaux,<br />fin d'opération</span></div>
      <button onClick={() => navigate('contact')}>Échanger sur un projet <ArrowUpRight size={17} /></button>
    </section>

    <section className="manifesto section-pad">
      <p className="eyebrow"><span className="eyebrow-line" /> La conviction</p>
      <div className="manifesto-grid">
        <h2>Garantir la conformité, <span>à chaque étape.</span></h2>
        <div>
          <p>Ingénieure en génie civil spécialisée en conception et contrôle de la construction, diplômée d'une formation en alternance de trois ans, je suis chaque opération du rapport initial au rapport final de contrôle technique. Rigoureuse, impliquée et dotée d'un bon sens de l'analyse, je m'investis pleinement dans chacune de mes missions.</p>
          <button className="text-link" onClick={() => navigate('about')}>En savoir plus <ChevronRight size={16} /></button>
        </div>
      </div>
    </section>

    <section className="domains section-pad">
      <p className="eyebrow"><span className="eyebrow-line" /> Ouvrages suivis</p>
      <div className="domain-list">
        {ouvrages.map(({ icon: Icon, title }) => (
          <button className="domain-item" key={title} onClick={() => navigate('ouvrages')}>
            <Icon size={20} strokeWidth={1.6} />
            <span>{title}</span>
          </button>
        ))}
      </div>
    </section>
  </>;
}

/* ---------------------------------------------------------------
   PARCOURS
   --------------------------------------------------------------- */
function CurrentRole() {
  return (
    <article className="timeline-item is-current">
      <div className="timeline-period">01/2025 — aujourd{'\u2019'}hui</div>
      <div className="timeline-content">
        <h3>Ingénieure chargée d{'\u2019'}affaires en contrôle technique de la construction</h3>
        <p className="company">Risk Control · Noisy-le-Grand</p>

        <p className="role-lead">
          Contrôle technique de maisons individuelles, de bâtiments d{'\u2019'}habitation, de bâtiments à usage professionnel (code du travail, supérieurs et inférieurs à 8 mètres) et d{'\u2019'}ERP.
        </p>

        <div className="mission-chips" aria-label="Missions réalisées">
          {baseMissions.map((mission) => <span className="chip chip-base" key={mission.code}>{mission.code}</span>)}
          <span className="chip-sep">+ selon les opérations</span>
          {complementaryMissions.map((mission) => <span className="chip" key={mission.code}>{mission.code}</span>)}
        </div>

        <ol className="phase-list">
          {currentPhases.map((phase, index) => (
            <li key={phase.title}>
              <span className="phase-index">{index + 1}</span>
              <div>
                <h4>{phase.title}</h4>
                {phase.items.map((item) => <p key={item}>{item}</p>)}
              </div>
            </li>
          ))}
        </ol>

        <div className="cross-block">
          <h4>Également</h4>
          <ul>{currentExtras.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </article>
  );
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-page section-pad">
    <PageIntro eyebrow="Parcours" title={<>Une expertise ancrée<br /><em>dans le contrôle technique.</em></>}>
      <p className="intro-aside">Du rapport initial au rapport final, je suis chaque opération de contrôle technique avec rigueur, en m'appuyant sur une formation d'ingénieure en alternance.</p>
    </PageIntro>

    <div className="about-layout">
      <aside className="profile-card">
        <div className="profile-image"><img src={portraitUrl} alt="Portrait d'Arame BA" /></div>
        <p className="quote">« Rigoureuse, impliquée, avec un bon sens de l'analyse. »</p>
        <div className="profile-meta">
          <span><MapPin size={14} /> Villiers-sur-Marne, 94350</span>
          <span><Mail size={14} /> {email}</span>
          <span><Phone size={14} /> +33 7 60 63 96 89</span>
        </div>
      </aside>

      <div className="timeline-area">
        <div className="section-label"><BriefcaseBusiness size={17} /> Expériences professionnelles</div>
        <CurrentRole />
        {pastExperiences.map((experience) => (
          <article className="timeline-item" key={experience.period}>
            <div className="timeline-period">{experience.period}</div>
            <div className="timeline-content">
              <h3>{experience.role}</h3>
              <p className="company">{experience.company}</p>
              <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </div>

    <div className="cv-panel">
      <div><p className="eyebrow"><span className="eyebrow-line" /> Document professionnel</p><h2>Mon Curriculum Vitae complet</h2><p>Retrouvez mon parcours, mes expériences, ma formation et mes compétences dans un document prêt à être partagé.</p></div>
      <div className="cv-panel-actions"><a className="button button-dark" href="/cv-arame-ba.pdf" target="_blank" rel="noreferrer">Consulter <ExternalLink size={15} /></a><a className="cv-panel-download" href="/cv-arame-ba.pdf" download="CV-Arame-BA.pdf"><Download size={15} /> Télécharger</a></div>
    </div>

    <div className="education-block">
      <div className="section-label"><GraduationCap size={17} /> Formation</div>
      <div className="education-grid">
        <div><span>2021 — 2024</span><h3>Diplôme d'ingénieurs en conception et contrôle dans la construction</h3><p>ESIEE Paris · Champs-sur-Marne</p></div>
        <div><span>2019 — 2021</span><h3>DUT Génie civil et construction durable</h3><p>IUT de Cergy-Pontoise · Neuville-sur-Oise</p></div>
      </div>
    </div>

    <div className="extras-row">
      <div className="interests-block">
        <div className="section-label"><Languages size={17} /> Langues parlées</div>
        <p className="interests-text">Français : langue maternelle<br />Anglais : TOEIC B2</p>
      </div>
      <div className="interests-block">
        <div className="section-label"><Sparkles size={17} /> Centres d'intérêt</div>
        <p className="interests-text">Lecture · voyages · décoration d'intérieur · sport</p>
      </div>
    </div>

    <div className="page-next"><span>Suivant</span><button onClick={() => navigate('expertise')}>Mes expertises <ArrowUpRight size={16} /></button></div>
  </div>;
}

/* ---------------------------------------------------------------
   EXPERTISES
   --------------------------------------------------------------- */
function Expertise({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-page section-pad">
    <PageIntro eyebrow="Expertises" title={<>Le contrôle technique<br /><em>comme spécialité.</em></>}>
      <p className="intro-aside">De l'analyse du dossier de conception au rapport final, une méthode construite sur la rigueur documentaire et le suivi de terrain.</p>
    </PageIntro>

    <div className="expertise-grid">
      {phaseCards.map(({ icon: Icon, title, text, tags }, index) => (
        <article className={`expertise-card card-${index}`} key={title}>
          <div className="card-number">0{index + 1}</div>
          <Icon size={28} strokeWidth={1.5} />
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>
      ))}
    </div>

    <section className="missions-section">
      <div className="missions-head">
        <p className="eyebrow"><span className="eyebrow-line" /> Missions de contrôle technique</p>
        <h2>Les missions que <em>je réalise.</em></h2>
      </div>

      <div className="mission-group">
        <h3 className="mission-group-title">Missions de base</h3>
        <div className="mission-grid">
          {baseMissions.map((mission) => (
            <div className="mission-tile is-base" key={mission.code}>
              <span className="mission-code">{mission.code}</span>
              <p>{mission.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mission-group">
        <h3 className="mission-group-title">Missions complémentaires, selon les opérations</h3>
        <div className="mission-grid">
          {complementaryMissions.map((mission) => (
            <div className="mission-tile" key={mission.code}>
              <span className="mission-code">{mission.code}</span>
              <p>{mission.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="skills-section">
      <div><p className="eyebrow"><span className="eyebrow-line" /> Compétences</p><h2>Un socle technique,<br /><em>les outils du métier.</em></h2></div>
      <div className="skills-list">{skills.map((skill) => <span key={skill}><b>{skill}</b></span>)}</div>
    </div>

    <div className="page-next"><span>Suivant</span><button onClick={() => navigate('ouvrages')}>Voir les ouvrages <ArrowUpRight size={16} /></button></div>
  </div>;
}

/* ---------------------------------------------------------------
   OUVRAGES
   --------------------------------------------------------------- */
function Ouvrages({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-page section-pad">
    <PageIntro eyebrow="Ouvrages" title={<>Quelques ouvrages<br /><em>sur lesquels j'interviens.</em></>}>
      <p className="intro-aside">Maisons individuelles, bâtiments d'habitation, locaux professionnels, ERP : un contrôle technique mené de la conception à la fin des travaux.</p>
    </PageIntro>

    <div className="ouvrages-grid">
      {ouvrages.map(({ icon: Icon, title, kind, text, tags, tone }) => (
        <article className={`ouvrage-card ${tone}`} key={title}>
          <span className="ouvrage-icon"><Icon size={22} strokeWidth={1.6} /></span>
          <p className="ouvrage-kind">{kind}</p>
          <h2>{title}</h2>
          <p className="ouvrage-text">{text}</p>
          <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>
      ))}
      <article className="ouvrage-card ouvrage-etc">
        <span className="ouvrage-icon"><Plus size={22} strokeWidth={1.6} /></span>
        <div>
          <h2>Et d'autres ouvrages, etc.</h2>
          <p className="ouvrage-text">Cette liste n'est pas exhaustive : je m'adapte aux particularités de chaque opération.</p>
        </div>
      </article>
    </div>

    <div className="quote-banner"><Sparkles size={22} /><p>« Je m'investis pleinement dans chacune de mes missions. »</p><span>— Arame BA</span></div>
    <div className="page-next"><span>Suivant</span><button onClick={() => navigate('contact')}>Me contacter <ArrowUpRight size={16} /></button></div>
  </div>;
}

/* ---------------------------------------------------------------
   CONTACT
   --------------------------------------------------------------- */
function Contact({ sent, submitForm, onReset }: { sent: boolean; submitForm: (event: FormEvent<HTMLFormElement>) => void; onReset: () => void }) {
  return <div className="content-page section-pad contact-page">
    <PageIntro eyebrow="Contact" title={<>Un projet en tête ?<br /><em>Parlons-en.</em></>}>
      <p className="intro-aside">Une question, un besoin de contrôle technique, ou simplement envie d'échanger ? Ma boîte mail est ouverte.</p>
    </PageIntro>
    <div className="contact-layout">
      <div className="contact-details">
        <div className="contact-detail"><span className="detail-icon"><Mail size={18} /></span><div><span>Email</span><a href={`mailto:${email}`}>{email}</a></div></div>
        <div className="contact-detail"><span className="detail-icon"><Phone size={18} /></span><div><span>Téléphone</span><a href="tel:+33760639689">+33 7 60 63 96 89</a></div></div>
        <div className="contact-detail"><span className="detail-icon"><MapPin size={18} /></span><div><span>Localisation</span><p>Villiers-sur-Marne, 94350</p></div></div>
        <div className="availability"><span className="availability-dot" /> Disponible pour de nouvelles opportunités</div>
      </div>
      <form className="contact-form" onSubmit={submitForm}>
        {sent ? (
          <div className="success-message">
            <span><Check size={22} /></span>
            <h2>Votre message est prêt.</h2>
            <p>Votre messagerie s'ouvre avec le message préparé : il ne vous reste qu'à l'envoyer. Si rien ne s'ouvre, écrivez-moi à {email}.</p>
            <button type="button" className="text-link success-reset" onClick={onReset}>Modifier mon message</button>
          </div>
        ) : (
          <>
            <div className="form-row">
              <label>Votre nom<input name="name" required placeholder="Prénom Nom" autoComplete="name" /></label>
              <label>Votre email<input type="email" name="email" required placeholder="vous@exemple.com" autoComplete="email" /></label>
            </div>
            <label>Votre message<textarea name="message" required placeholder="Dites-moi quelques mots sur votre projet..." rows={5} /></label>
            <button className="button button-dark" type="submit">Envoyer le message <Send size={16} /></button>
          </>
        )}
      </form>
    </div>
  </div>;
}

export default App;