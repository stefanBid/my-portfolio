import type { MetaDescription, Section } from '@/types/common.types';

export interface AboutMePageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  bioSections: Section[];
}
