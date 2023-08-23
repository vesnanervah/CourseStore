import { State } from '../../../state';
import { AppHeaderView } from './app-header-view';
import EcommerceClient from '../../commerce/BuildClient';

import { LoadingStatus, StateKeys } from '../../../types';

export class AppHeader {
  private state = State.getInstance();
  private view: AppHeaderView;
  private loadingStatus: LoadingStatus = LoadingStatus.Idle;

  constructor() {
    this.view = new AppHeaderView();
  }

  public init(): void {
    const categories = this.state.getValue(StateKeys.NAV_CATEGORIES);
    if (!categories.length) {
      this.fetchCategories();
    }
  }

  public getView(): AppHeaderView {
    return this.view;
  }
  private fetchCategories(): void {
    if (this.loadingStatus === LoadingStatus.Loading) {
      return;
    }
    this.loadingStatus = LoadingStatus.Loading;
    EcommerceClient.getCategories()
      .then((categories) => {
        this.state.setValue(StateKeys.NAV_CATEGORIES, categories);
        this.loadingStatus = LoadingStatus.Idle;
      })
      .catch((err: Error) => {
        // TODO: show error message to user
        console.warn(err);
        this.loadingStatus = LoadingStatus.Error;
      });
  }
}
