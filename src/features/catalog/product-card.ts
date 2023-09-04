import './product-card.scss';
import { BaseView, Button } from '../ui';

import { AppRouter } from '../router';
import type { Product } from '../../types';

export class ProductCard extends BaseView<HTMLElement> {
  private router: AppRouter = AppRouter.getInstance();

  constructor(product: Product) {
    super();
    this.createElement(product);
  }

  // eslint-disable-next-line max-lines-per-function
  private createElement(product: Product): void {
    const { url, image } = product;
    const card = document.createElement('div');
    card.classList.add('product-card');

    const cardContent = this.createCardContent(product);
    card.append(cardContent);

    if (image) {
      const cardImage = document.createElement('img');
      cardImage.classList.add('product-card__image');
      cardImage.src = image;
      cardImage.width = 110;
      cardImage.height = 110;
      card.append(cardImage);
    }

    const btn = new Button({
      component: 'a',
      href: url,
      text: 'Подробнее',
    }).getHtmlElement();
    btn.classList.add('product-card__btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate(url);
    });
    cardContent.append(btn);

    this.htmlElement = card;
  }

  private createCardContent({ name, type, price }: Product): HTMLElement {
    const cardContent = document.createElement('div');
    cardContent.classList.add('product-card__content');

    const cardTextContent = document.createElement('div');
    cardTextContent.classList.add('product-card__text-content');
    cardContent.append(cardTextContent);

    const cardSubtitle = document.createElement('div');
    cardSubtitle.classList.add('product-card__subtitle');
    cardSubtitle.textContent = type;
    cardTextContent.append(cardSubtitle);

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('product-card__title', 'text-h2');
    cardTitle.textContent = name;
    cardTextContent.append(cardTitle);

    if (price.discountedValue) {
      const discounted = document.createElement('span');
      discounted.classList.add('product-card__price', 'product-card__price--type--discounted');
      discounted.textContent = `${price.discountedValue} ${price.currency}`;
      cardTextContent.append(discounted);
      const normalPrice = document.createElement('span');
      normalPrice.classList.add('product-card__price', 'product-card__price--type--normal');
      normalPrice.textContent = `${price.defaultValue} ${price.currency}`;
      cardTextContent.append(normalPrice);
    } else if (price.defaultValue) {
      const productPrice = document.createElement('span');
      productPrice.classList.add('product-card__price', 'product-card__price--type--default');
      productPrice.textContent = `${price.defaultValue} ${price.currency}`;
      cardTextContent.append(productPrice);
    }

    return cardContent;
  }
}
