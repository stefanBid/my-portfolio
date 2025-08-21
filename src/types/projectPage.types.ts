import type { MetaDescription, Image } from '@/types/common.types';

interface Project {
  id: string;
  title: string;
  projectCover: Image;
  platformIcon?: string;
  codeLink: string;
  demoLink?: string;
}

export interface ProjectsPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  firstHeading: string;
  firstParagraph: string;
  projects: Project[];
}
