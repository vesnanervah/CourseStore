import { PageSlug } from './page-slug';

export enum StateKeys {
  CURRENT_PAGE_SLUG = 'CURRENT_PAGE_SLUG',
}

export type AppState = {
  [StateKeys.CURRENT_PAGE_SLUG]: PageSlug;
};
