import './product-categories.scss';
import { BaseView } from '../base-view';

export default class ProductCategories extends BaseView {
  private categoriesList: HTMLElement;

  constructor() {
    super();
    this.categoriesList = document.createElement('div');
    this.createView();
  }

  private createView(): void {
    const wrapper = document.createElement('div');
    const label = document.createElement('div');
    wrapper.className = 'product__categories';
    label.className = 'product__categories-label';
    this.categoriesList.className = 'product__categories-list';
    label.textContent = 'Категории:';
    wrapper.append(label, this.categoriesList);
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
