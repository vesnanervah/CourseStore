import { State } from '../../../state';
import { AppHeaderView } from './app-header-view';
import EcommerceClient from '../../commerce/BuildClient';

import { LoadingStatus, StateKeys, DataProvider } from '../../../types';

export class AppHeader {
  private dataProvider: DataProvider = EcommerceClient.getDataProvider();
  private state = State.getInstance();
  private view: AppHeaderView;
  private loadingStatus: LoadingStatus = LoadingStatus.Idle;

  constructor() {
    this.view = new AppHeaderView();
  }

  public init(): void {
    const categories = this.state.getValue(StateKeys.Categories);
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
    this.dataProvider.products
      .getCategories()
      .then((categories) => {
        this.state.setValue(StateKeys.Categories, categories);
        this.loadingStatus = LoadingStatus.Idle;
      })
      .catch((err: Error) => {
        // TODO: show error message to user
        console.warn(err);
        this.loadingStatus = LoadingStatus.Error;
      });
  }
}
