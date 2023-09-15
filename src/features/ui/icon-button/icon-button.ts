import './icon-button.scss';
import { BaseView } from '../base-view';

type IconButtonProps = {
  icon: HTMLElement;
  type?: HTMLButtonElement['type'];
  badgeContent?: string;
};

export class IconButton extends BaseView<HTMLButtonElement> {
  private badge: HTMLElement;

  constructor(props: IconButtonProps) {
    super();

    this.badge = this.createBadge();
    this.createElement(props);
  }

  public setBadgeContent(content: string): void {
    this.badge.textContent = content;
  }

  private createElement(props: IconButtonProps): void {
    const { type = 'button', icon } = props;

    const button = document.createElement('button');
    button.classList.add('icon-btn');
    button.type = type;
    button.append(this.badge);
    icon.classList.add('icon-btn__icon');
    button.append(icon);

    this.htmlElement = button;
  }

  private createBadge(content: string = ''): HTMLElement {
    const badge = document.createElement('span');
    badge.classList.add('icon-btn__badge');
    badge.textContent = content;

    return badge;
  }
}
