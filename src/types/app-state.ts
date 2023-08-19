import { ProductCategory } from './product-category';
import { SideNavStatus } from './side-nav-status';

export enum StateKeys {
  SIDE_NAV_STATUS = 'SIDE_NAV_STATUS',
  NAV_CATEGORIES = 'NAV_CATEGORIES',
}

export type AppState = {
  [StateKeys.SIDE_NAV_STATUS]: SideNavStatus;
  [StateKeys.NAV_CATEGORIES]: ProductCategory[];
};
