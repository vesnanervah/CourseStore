import { ProductCard } from '../../features/products';
import { BaseView } from '../../features/ui';
import { LineItem } from '@commercetools/platform-sdk';
import './cart-item.scss';
import deleteIcon from './../../assets/delete.png';
import { routes } from '../../routes';
import { Image } from '@commercetools/platform-sdk';

export default class CartItem extends BaseView {
  private countMinusBtn: HTMLButtonElement;
  private countPlusBtn: HTMLButtonElement;
  private countDisplay: HTMLSpanElement;
  private priceDisplay: HTMLDivElement;
  private deleteBtn: HTMLButtonElement;
  private card: ProductCard;

  constructor(item: LineItem) {
    super();
    this.card = this.createCard(item);
    this.htmlElement = document.createElement('div');
    const btnsWrapper = document.createElement('div');
    const countBnts = document.createElement('div');
    this.countMinusBtn = document.createElement('button');
    this.countPlusBtn = document.createElement('button');
    this.countDisplay = document.createElement('span');
    this.priceDisplay = document.createElement('div');
    this.deleteBtn = document.createElement('button');
    this.htmlElement.className = 'cart__item';
    btnsWrapper.className = 'item__btns';
    countBnts.className = 'item__count';
    this.countMinusBtn.className = 'item__count-minus';
    this.countDisplay.className = 'item__count-display';
    this.countPlusBtn.className = 'item__count-plus';
    this.countMinusBtn.textContent = '-';
    this.countPlusBtn.textContent = '+';
    countBnts.append(this.countMinusBtn, this.countDisplay, this.countPlusBtn);
    this.priceDisplay.className = 'item__price-display';
    this.deleteBtn.className = 'item__delete';
    btnsWrapper.append(countBnts, this.priceDisplay, this.deleteBtn);
    this.htmlElement.append(this.card.getHtmlElement(), btnsWrapper);
    this.setValues(item);
    this.deleteBtn.style.backgroundImage = `url(${deleteIcon})`;
  }

  private setValues(item: LineItem) {
    this.countDisplay.textContent = `${item.quantity}`;
    this.priceDisplay.textContent = `${
      item.totalPrice.centAmount / (10 * item.totalPrice.fractionDigits)
    } USD`;
  }

  private createCard(item: LineItem): ProductCard {
    return new ProductCard({
      image: (item.variant.images as Image[])[0].url,
      id: item.productId,
      name: item.name.ru as string,
      url: routes.product(item.productId),
      price: {
        defaultValue: item.price.value.centAmount / (10 * item.price.value.fractionDigits),
        currency: 'USD',
      },
      type: 'Course',
    });
  }
}
