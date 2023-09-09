import { BaseView } from '../base-view';
import { VariantIncludes, ProductName } from '../../../types/product';
import EcommerceClient from '../../commerce/BuildClient';
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
    this.list.className = 'product__includes-list';
    head.className = 'product__includes-head';
    wrapper.className = 'product__includes';
    head.textContent = 'Включает в себя:';
    wrapper.append(head, this.list);
    this.htmlElement = wrapper;
  }

  public async setIncludes(includesArr: VariantIncludes[]) {
    includesArr.forEach(async (incl) => {
      await this.createLine(incl);
    });
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }

  public reveal(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }

  private async createLine(include: VariantIncludes) {
    const line = document.createElement('span');
    const id = Array.isArray(include) ? include[0].id : include.id;
    const related = await EcommerceClient.getProductById(id);
    line.textContent = (related.body.masterData.current.name as ProductName).ru;
    line.className = 'product__related';
    // TODO: add click listeners to links;
    this.list.appendChild(line);
  }
}
