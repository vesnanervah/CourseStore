import './side-nav-toggle.scss';
import { State } from '../../../../state';
import { BaseView } from '../../base-view';

import { StateKeys } from '../../../../types';

export class SideNavToggle extends BaseView {
  private state = State.getInstance();

  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.classList.add('side-nav-toggle', 'btn');
    toggle.title = 'Меню сайта';
    toggle.addEventListener('click', this.showSideNav.bind(this));

    const icon = document.createElement('span');
    icon.classList.add('side-nav-toggle__icon');
    toggle.append(icon);

    this.htmlElement = toggle;
  }

  private showSideNav(): void {
    this.state.setValue(StateKeys.SideNavStatus, true);
  }
}
