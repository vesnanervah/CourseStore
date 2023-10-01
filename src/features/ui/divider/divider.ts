import './divider.scss';
import { BaseView } from '../base-view';

type DividerProps = {
  direction: 'vertical' | 'horizontal';
};

const defaultProps: DividerProps = {
  direction: 'horizontal',
};

export class Divider extends BaseView<HTMLElement> {
  constructor(props: DividerProps = defaultProps) {
    super();

    this.createElement(props);
  }

  private createElement(props: DividerProps): void {
    const container = document.createElement('span');
    container.classList.add('divider', `divider--${props.direction}`);

    this.htmlElement = container;
  }
}
