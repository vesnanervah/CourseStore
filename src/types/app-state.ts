import type { ProductCategory } from './product-category';
import type { SideNavStatus } from './side-nav-status';
import type { UniqueId } from './common';

export enum StateKeys {
  SideNavStatus = 'SIDE_NAV_STATUS',
  Categories = 'CATEGORIES',
  CartItemIds = 'CART_ITEM_IDS',
}

export type AppState = {
  [StateKeys.SideNavStatus]: SideNavStatus;
  [StateKeys.Categories]: ProductCategory[];
  [StateKeys.CartItemIds]: UniqueId[];
};
