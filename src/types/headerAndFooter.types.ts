export interface HeaderContent {
  navbarRoutes: {
    text: string;
    path: string;
  }[];
}

export interface FooterContent {
  intro: {
    title: string;
    description: string;
    socials: {
      icon: string;
      link: string;
    }[];
  };
  quickLinks: {
    title: string;
    links: {
      text: string;
      link: string;
    }[];
  };
  contacts: {
    title: string;
    channels: {
      icon: string;
      value: string;
    }[];
  };
  helpAndSupport: {
    title: string;
    links: {
      text: string;
      link: string;
    }[];
  };
}
