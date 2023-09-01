import { BaseView } from '../base-view';
import './product-includes.scss';

export default class ProductIncludes extends BaseView {
  private list: HTMLElement;

  constructor() {
    super();
    this.list = document.createElement('div');
    this.createView();
  }

  private createView(): void {
    const wrapper = document.createElement('div');
    const head = document.createElement('div');
    this.list.className = 'product__includes-head';
    head.className = 'product__includes-list';
    wrapper.className = 'product__includes';
    head.textContent = 'Включает в себя:';
    wrapper.append(head, this.list);
    this.htmlElement = wrapper;
  }

  /*public setIncludes(text: string): void {

  }*/
}
