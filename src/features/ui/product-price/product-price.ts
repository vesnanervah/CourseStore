import { BaseView } from '../base-view';
import { type ProductPrice as Price } from '../../../types/product';
import './product-price.scss';

export default class ProductPrice extends BaseView {
  private defaultPrice: HTMLElement;
  private discountPrice: HTMLElement;
  constructor() {
    super();
    this.htmlElement = this.createView();
    this.defaultPrice = document.createElement('span');
    this.defaultPrice.classList.add('product__default-price');
    this.discountPrice = document.createElement('span');
    this.discountPrice.classList.add('product__discount-price');
    this.htmlElement.append(this.discountPrice, this.defaultPrice);
  }
  private createView(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__prices';
    return wrapper;
  }

  public setPrice(price: Price): void {
    this.defaultPrice.textContent = `${price.defaultValue} ${price.currency}`;
    if (price.discountedValue) {
      (this.htmlElement as HTMLElement).classList.add('product__prices--discounted');
      this.discountPrice.textContent = `${price.discountedValue} ${price.currency}`;
    }
  }
}
