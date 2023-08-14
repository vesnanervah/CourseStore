import { State } from '../../../state';
import { AppHeaderView } from './app-header-view';

import { PageSlug, StateKeys } from '../../../types';

export class AppHeader {
  private state = State.getInstance();
  private view: AppHeaderView;

  constructor() {
    this.view = new AppHeaderView(this.handleNavClick.bind(this));
  }

  public getView(): AppHeaderView {
    return this.view;
  }

  private handleNavClick(pageSlug: PageSlug): void {
    this.state.setValue(StateKeys.CURRENT_PAGE_SLUG, pageSlug);
  }
}
