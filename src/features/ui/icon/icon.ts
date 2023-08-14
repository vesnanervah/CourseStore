import './icon.scss';
import { BaseView } from '../base-view';

type IconProps = {
  id: string;
  viewBox?: string;
  color?: string;
  width?: string;
  height?: string;
};

const DEFAULT_PROPS: Required<Omit<IconProps, 'id'>> = {
  viewBox: '',
  color: 'none',
  width: '20',
  height: '20',
};

export class Icon extends BaseView<HTMLElement> {
  constructor(props: IconProps) {
    super();

    this.createElement({ ...DEFAULT_PROPS, ...props });
  }

  private createElement(props: Required<IconProps>): void {
    const { id, viewBox, color, width, height } = props;

    const container = document.createElement('span');
    container.classList.add('icon');

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.classList.add('car__icon');
    icon.innerHTML = `<use xlink:href="#${id}" />`;
    icon.setAttribute('viewBox', viewBox);
    icon.setAttribute('fill', color);
    icon.setAttribute('width', width);
    icon.setAttribute('height', height);
    container.append(icon);

    this.htmlElement = container;
  }
}
