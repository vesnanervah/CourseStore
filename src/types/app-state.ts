import { PageSlug } from './page-slug';
import { SideNavStatus } from './side-nav-status';

export enum StateKeys {
  CURRENT_PAGE_SLUG = 'CURRENT_PAGE_SLUG',
  SIDE_NAV_STATUS = 'SIDE_NAV_STATUS',
}

export type AppState = {
  [StateKeys.CURRENT_PAGE_SLUG]: PageSlug;
  [StateKeys.SIDE_NAV_STATUS]: SideNavStatus;
};
