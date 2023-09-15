import './product-card.scss';
import { BaseView, Button, Icon } from '../ui';
import { AppRouter } from '../router';
import CartModel from '../cart/cart-model';
import { State } from '../../state';
import { routes } from '../../routes';
import cartIcon from '../../assets/images/icons/cart.svg';

import { StateKeys, Product, UniqueId } from '../../types';

export class ProductCard extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private router: AppRouter = AppRouter.getInstance();
  private cartButtonContainer: HTMLElement = document.createElement('div');
  private productId: UniqueId;
  private isInCart: boolean = false;

  constructor(product: Product) {
    super();
    this.productId = product.id;
    const cartProductIds = this.state.getValue(StateKeys.CartItemIds);
    this.isInCart = cartProductIds.includes(this.productId);

    this.createElement(product);
    this.init();
  }

  private init(): void {
    this.state.subscribe(StateKeys.CartItemIds, this.render.bind(this));
  }

  private render(cartProductIds: UniqueId[]): void {
    this.cartButtonContainer.innerHTML = '';
    this.isInCart = cartProductIds.includes(this.productId);
    this.cartButtonContainer.append(this.createCartButton());
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

    const cardActions = document.createElement('div');
    cardActions.classList.add('product-card__actions');
    cardContent.append(cardActions);

    const detailsButton = new Button({
      component: 'a',
      href: url,
      text: 'Подробнее',
      variant: 'outlined',
    }).getHtmlElement();
    detailsButton.classList.add('product-card__btn');
    detailsButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate(url);
    });
    cardActions.append(detailsButton);

    this.cartButtonContainer.append(this.createCartButton());
    cardActions.append(this.cartButtonContainer);

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

  private createCartButton(): HTMLElement {
    const cartIconEl = new Icon({ id: cartIcon.id, viewBox: cartIcon.viewBox }).getHtmlElement();
    const cartButton = new Button({
      component: 'button',
      variant: this.isInCart ? 'contained' : 'outlined',
      icon: cartIconEl,
      iconOnly: true,
    }).getHtmlElement() as HTMLButtonElement;
    cartButton.classList.add('product-card__btn');
    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isInCart) {
        this.router.navigate(routes.cart());
      } else {
        CartModel.addProduct(this.productId);
      }
    });

    return cartButton;
  }
}
