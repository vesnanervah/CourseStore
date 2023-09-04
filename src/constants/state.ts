import { AppState, StateKeys } from '../types';

export const DEFAULT_STATE: AppState = {
  [StateKeys.SideNavStatus]: false,
  [StateKeys.Categories]: [],
};

export default DEFAULT_STATE;
