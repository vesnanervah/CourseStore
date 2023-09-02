import { BaseView } from '../base-view';
import './product-roadmap.scss';

export default class ProductRoadmap extends BaseView {
  private head: HTMLElement;
  private list: HTMLElement;

  constructor() {
    super();
    this.head = document.createElement('div');
    this.list = document.createElement('div');
    this.createView();
  }

  private createView(): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__roadmap';
    this.head.className = 'product__roadmap-head';
    this.list.className = 'product__roadmap-list';
    wrapper.append(this.head, this.list);
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

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }

  public reveal(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }
}
