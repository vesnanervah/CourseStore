import { BaseView } from '../base-view';
import './product-descr.scss';

export default class ProductDescr extends BaseView {
  constructor() {
    super();
    this.createView();
  }

  private createView(): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__descr';
    this.htmlElement = wrapper;
  }

  public setDescription(text: string): void {
    (this.htmlElement as HTMLElement).textContent = text;
  }
}
