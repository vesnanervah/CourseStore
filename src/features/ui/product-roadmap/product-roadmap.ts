import { BaseView } from '../base-view';
import './product-roadmap.scss';

export default class ProductRoadmap extends BaseView {
  private head: HTMLElement;
  private list: HTMLElement;

  constructor() {
    super();
    this.createView();
  }

  private createView(): void {
    const wrapper = document.createElement('div');
    const head = document.createElement('div');
    const list = document.createElement('div');
    wrapper.className = 'product__roadmap';
    head.className = 'product__roadmap-head';
    list.className = 'product__roadmap-list';
    this.head = head;
    this.list = list;
    wrapper.append(head, list);
    this.htmlElement = wrapper;
  }

  public setRoadmap(text: string) {
    const txtArr = text.split('-');
    this.head.textContent = txtArr[0];
    this.list.innerHTML = '';
    txtArr.slice(1).forEach((line) => {
      const lineElem = document.createElement('span');
      lineElem.className = 'product__roadmap-line';
      lineElem.textContent = `-${line}`;
      this.list.appendChild(lineElem);
    });
  }
}
