import './product-list-title.scss';
import { BaseView, Icon } from '../ui';
import arrowIcon from '../../assets/images/icons/arrow-right.svg';

type ProductTitleProps = {
  text: string;
  href?: string;
};

export class ProductListTitle extends BaseView<HTMLElement> {
  constructor(props: ProductTitleProps) {
    super();
    this.createElement(props);
  }

  private createElement({ text, href }: ProductTitleProps): void {
    const title = document.createElement('h2');
    title.classList.add('product-list-title', 'text-h1');
    if (href) {
      const link = document.createElement('a');
      link.classList.add('product-list-title__link');
      link.href = href;
      link.textContent = text;
      title.append(link);

      const icon = new Icon({ id: arrowIcon.id, viewBox: arrowIcon.viewBox }).getHtmlElement();
      icon.classList.add('product-list-title__icon');
      link.append(icon);
    } else {
      title.textContent = text;
    }

    this.htmlElement = title;
  }
}
