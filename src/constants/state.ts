import { AppState, StateKeys } from '../types';

export const DEFAULT_STATE: AppState = {
  [StateKeys.SideNavStatus]: false,
  [StateKeys.Categories]: [],
  [StateKeys.CartItemIds]: [],
};

export default DEFAULT_STATE;
