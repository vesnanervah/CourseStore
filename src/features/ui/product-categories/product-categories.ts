import './product-categories.scss';
import { Categories, ProductName } from '../../../types/product';
import EcommerceClient from '../../commerce/BuildClient';
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

  public async setCategories(categories: Categories) {
    this.categoriesList.innerHTML = '';
    categories.forEach(async (cat) => {
      const data = await EcommerceClient.getCategoryById(cat.id);
      const category = document.createElement('span');
      category.className = 'product__category';
      category.textContent = (data.body.name as ProductName).ru;
      this.categoriesList.appendChild(category);
    });
  }
}
