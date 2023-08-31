import { BaseView } from '../base-view';
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
    this.htmlElement.append(this.defaultPrice, this.discountPrice);
  }
  private createView(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__prices';
    return wrapper;
  }

  public setPrice(defaultPrice: number, discountPrice?: number): void {
    this.defaultPrice.textContent = defaultPrice + '';
    if (discountPrice) {
      (this.htmlElement as HTMLElement).classList.add('discounted');
      this.discountPrice.textContent = discountPrice + '';
    } else {
      (this.htmlElement as HTMLElement).classList.remove('discounted');
    }
  }
}
