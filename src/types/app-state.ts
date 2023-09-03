import { Customer } from '@commercetools/platform-sdk';
import { ProductCategory } from './product-category';
import { SideNavStatus } from './side-nav-status';

export enum StateKeys {
  CUSTOMER = 'CUSTOMER',
  SideNavStatus = 'SIDE_NAV_STATUS',
  Categories = 'CATEGORIES',
}

export type AppState = {
  [StateKeys.SideNavStatus]: SideNavStatus;
  [StateKeys.Categories]: ProductCategory[];
};
