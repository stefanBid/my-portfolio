export interface AboutMePageContent {
  pageHeading: string;
  bio: Bio[];
}

interface Bio {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionParagraph: string;
  imgPath: string;
  imgDescription: string;
}

export interface HomePageContent {
  welcomeText: string;
  presentationText: string;
  presentationText2: string;
  generalSkills: string[];
  callToAction1: CallToAction;
  callToAction2: CallToAction;
}

interface CallToAction {
  text: string;
  link: string;
}
