import './icon-button.scss';
import { BaseView } from '../base-view';

type IconButtonProps = {
  type?: HTMLButtonElement['type'];
  icon: HTMLElement;
};

export class IconButton extends BaseView<HTMLButtonElement> {
  constructor(props: IconButtonProps) {
    super();

    this.createElement(props);
  }

  private createElement(props: IconButtonProps): void {
    const { type = 'button', icon } = props;

    const button = document.createElement('button');
    button.classList.add('icon-btn');
    button.type = type;

    icon.classList.add('icon-btn__icon');
    button.append(icon);

    this.htmlElement = button;
  }
}
