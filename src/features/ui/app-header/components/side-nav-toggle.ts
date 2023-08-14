import './side-nav-toggle.scss';
import { BaseView } from '../../base-view';

type SideNavToggleProps = {
  onClick: (e: MouseEvent) => void;
};

export class SideNavToggle extends BaseView {
  constructor(props: SideNavToggleProps) {
    super();
    this.createElement(props);
  }

  private createElement({ onClick }: SideNavToggleProps): void {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.classList.add('side-nav-toggle', 'btn');
    toggle.title = 'Меню сайта';
    toggle.addEventListener('click', onClick);

    const icon = document.createElement('span');
    icon.classList.add('side-nav-toggle__icon');
    toggle.append(icon);

    this.htmlElement = toggle;
  }
}
