import { SideNavStatus } from './side-nav-status';

export enum StateKeys {
  SIDE_NAV_STATUS = 'SIDE_NAV_STATUS',
}

export type AppState = {
  [StateKeys.SIDE_NAV_STATUS]: SideNavStatus;
};
