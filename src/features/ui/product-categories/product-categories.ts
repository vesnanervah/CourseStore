import './product-categories.scss';
import { BaseView } from '../base-view';

export default class ProductCategories extends BaseView {
  private categoriesList: HTMLElement;

  constructor() {
    super();
    this.createView();
  }

  private createView(): void {
    const wrapper = document.createElement('div');
    const label = document.createElement('div');
    const list = document.createElement('div');
    wrapper.className = 'product__categories';
    label.className = 'product__categories-label';
    list.className = 'product__categories-list';
    label.textContent = 'Категории:';
    this.categoriesList = list;
    wrapper.append(label, list);
    this.htmlElement = wrapper;
  }

  public setCategories(cats: string[]) {
    this.categoriesList.innerHTML = '';
    cats.forEach((cat) => {
      const category = document.createElement('span');
      category.className = 'product__category';
      category.textContent = cat;
      this.categoriesList.appendChild(category);
    });
  }
}
