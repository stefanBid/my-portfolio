import welcomeCover from '@/assets/welcome.png';

export const WELCOME_GATE_MODEL: Record<string, Record<string, string>> = {
  title: {
    en: '👋🏼 Welcome to my portfolio!',
    it: '👋🏼 Benvenuto nel mio portfolio!',
  },
  intro: {
    en: `My name is <strong>Stefano Biddau</strong>, a <strong>web developer</strong> driven by a passion for <strong>design</strong> and <strong>technology</strong>. 
    I believe a website should be both <strong>beautiful</strong> and <strong>functional</strong>, offering a <strong>seamless, accessible experience</strong> to every user.<br><br>
    With experience in <strong>front-end</strong> precision and <strong>back-end</strong> integration, I create solutions that are elegant on the outside and solid underneath.<br><br>
    Each project is a chance to <strong>listen</strong>, <strong>understand</strong>, and <strong>turn ideas into reality</strong> — with <strong>creativity</strong>, <strong>dedication</strong>, and a drive to craft something that truly works and inspires.`,
    it: `Mi chiamo <strong>Stefano Biddau</strong> e sono uno <strong>sviluppatore web</strong> appassionato di <strong>design</strong> e <strong>tecnologia</strong>. 
    Credo che un sito debba essere al tempo stesso <strong>bello</strong> e <strong>funzionale</strong>, offrendo un’<strong>esperienza fluida e accessibile</strong> a tutti.<br><br>
    Unisco la precisione del <strong>front-end</strong> alla solidità dell’<strong>integrazione back-end</strong> per creare soluzioni curate e affidabili.<br><br>
    Ogni progetto è l’occasione per <strong>ascoltare</strong>, <strong>comprendere</strong> e <strong>trasformare un’idea in realtà</strong> — con <strong>creatività</strong>, <strong>dedizione</strong> e voglia di costruire qualcosa che ispiri davvero.`,
  },
  cta: {
    en: 'Enter the portfolio',
    it: 'Entra nel portfolio',
  },
};

export const SOCIAL_BADGE_LINKS = [
  { icon: 'mdi:github', link: 'https://github.com/stefanBid' },
  {
    icon: 'fa6-brands:linkedin',
    link: 'https://www.linkedin.com/in/stefano-biddau/',
  },
  {
    icon: 'fa6-brands:instagram',
    link: 'https://www.instagram.com/stefano_bid/',
  },
];

export const PROFILE_IMAGE_LINK = welcomeCover;
