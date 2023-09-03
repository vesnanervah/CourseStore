import { BaseView } from '../base-view';
import { ProductName } from '../../../types/product';
import './product-title.scss';

export default class ProductTitle extends BaseView {
  constructor() {
    super();
    this.htmlElement = this.createView();
  }
  private createView(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.textContent = 'Здесь должно быть название';
    wrapper.className = 'product__title';
    return wrapper;
  }

  public setTitle(productName: ProductName): void {
    (this.htmlElement as HTMLElement).textContent = productName.ru;
  }
}
