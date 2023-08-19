import { PageSlug } from './page-slug';
import { ProductCategory } from './product-category';
import { SideNavStatus } from './side-nav-status';

export enum StateKeys {
  CURRENT_PAGE_SLUG = 'CURRENT_PAGE_SLUG',
  SIDE_NAV_STATUS = 'SIDE_NAV_STATUS',
  NAV_CATEGORIES = 'NAV_CATEGORIES',
}

export type AppState = {
  [StateKeys.CURRENT_PAGE_SLUG]: PageSlug;
  [StateKeys.SIDE_NAV_STATUS]: SideNavStatus;
  [StateKeys.NAV_CATEGORIES]: ProductCategory[];
};
