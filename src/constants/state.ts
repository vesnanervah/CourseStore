import { AppState, StateKeys } from '../types';

export const DEFAULT_STATE: AppState = {
  // [StateKeys.CUSTOMER]: null,
  [StateKeys.SideNavStatus]: false,
  [StateKeys.Categories]: [],
};

export default DEFAULT_STATE;
