import { ProductCard } from '../../features/products';
import { BaseView } from '../../features/ui';
import { LineItem } from '@commercetools/platform-sdk';
import './cart-item.scss';
import deleteIcon from './../../assets/delete.png';
import { routes } from '../../routes';
import { Image } from '@commercetools/platform-sdk';
import CartModel from '../../features/cart/cart-model';

export default class CartItem extends BaseView {
  private lineItemId: string;
  private countMinusBtn: HTMLButtonElement;
  private countPlusBtn: HTMLButtonElement;
  private countDisplay: HTMLSpanElement;
  private priceDisplay: HTMLDivElement;
  private deleteBtn: HTMLButtonElement;
  private card: ProductCard;
  private price = 0;
  private quantity = 0;

  constructor(item: LineItem) {
    super();
    this.lineItemId = item.id;
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
    this.setDisplays();
    this.deleteBtn.style.backgroundImage = `url(${deleteIcon})`;
    this.deleteBtn.addEventListener('click', () => CartModel.removeItemByLineId(item.id));
    this.countMinusBtn.addEventListener('click', () => this.handleMinusClick());
    this.countPlusBtn.addEventListener('click', () => this.handlePlusClick());
  }

  private setValues(item: LineItem) {
    if (item.price.discounted) {
      this.price = item.price.discounted.value.centAmount / 100;
    } else {
      this.price = item.price.value.centAmount / 100;
    }
    this.quantity = item.quantity;
  }

  private setDisplays() {
    this.priceDisplay.textContent = `${this.price * this.quantity} USD`;
    this.countDisplay.textContent = `${this.quantity}`;
  }

  private createCard(item: LineItem): ProductCard {
    return new ProductCard({
      image: (item.variant.images as Image[])[0].url,
      id: item.productId,
      name: item.name.ru as string,
      url: routes.product(item.productId),
      price: {
        defaultValue: item.price.value.centAmount / 100,
        currency: 'USD',
        discountedValue: item.price.discounted ? item.price.discounted.value.centAmount / 100 : 0,
      },
      type: 'Course',
    });
  }

  private async handleMinusClick() {
    this.quantity -= 1;
    if (this.quantity <= 0) {
      await CartModel.removeItemByLineId(this.lineItemId);
    } else {
      await CartModel.changeItemQuantity(this.lineItemId, this.quantity, false);
      this.setDisplays();
    }
  }

  private async handlePlusClick() {
    this.quantity += 1;
    if (this.quantity <= 0) {
      await CartModel.removeItemByLineId(this.lineItemId);
    } else {
      await CartModel.changeItemQuantity(this.lineItemId, this.quantity, false);
      this.setDisplays();
    }
  }
}
