import { AppState, PageSlug, StateKeys } from '../types';

export const DEFAULT_STATE: AppState = {
  [StateKeys.CURRENT_PAGE_SLUG]: PageSlug.Main,
  [StateKeys.SIDE_NAV_STATUS]: false,
  [StateKeys.NAV_CATEGORIES]: [],
};

export default DEFAULT_STATE;
