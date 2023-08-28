import { AppState, StateKeys } from '../types';

export const DEFAULT_STATE: AppState = {
  [StateKeys.SIDE_NAV_STATUS]: false,
  [StateKeys.NAV_CATEGORIES]: [],
  [StateKeys.CUSTOMER]: null,
};

export default DEFAULT_STATE;
