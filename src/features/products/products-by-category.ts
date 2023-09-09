import { BaseView, Wrapper } from '../ui';
import EcommerceClient from '../commerce/BuildClient';
import { ProductList } from './product-list';

import { ProductFilters, type Filter } from './product-filters';
import { Product, DataProvider, LoadingStatus } from '../../types';

type ProductsByCategoryProps = {
  categoryId: string;
};

export class ProductsByCategory extends BaseView<HTMLElement> {
  private dataProvider: DataProvider = EcommerceClient.getDataProvider();
  private productCategoryId: string;
  private productsByCategory: Product[] = [];
  private status: LoadingStatus = LoadingStatus.Idle;
  private error: string | null = null;
  private container: HTMLElement | null = null;

  constructor(props: ProductsByCategoryProps) {
    super();
    this.productCategoryId = props.categoryId;
    this.createElement();
    this.init();
    this.render();
  }

  private async init(): Promise<void> {
    try {
      this.status = LoadingStatus.Loading;
      this.productsByCategory = await this.fetchProducts();
      this.status = LoadingStatus.Idle;
    } catch (err: unknown) {
      this.error = 'Не удалось загрузить товары';
      this.status = LoadingStatus.Error;
    } finally {
      this.render();
    }
  }

  private createElement(): void {
    const container = document.createElement('section');
    container.classList.add('catalog-products');

    const wrapper = new Wrapper().getHtmlElement();
    container.append(wrapper);

    // Product filters
    const productFilters = new ProductFilters({
      activeFilters: { categories: false },
      onSubmit: this.handleFilterChange.bind(this),
    }).getHtmlElement();
    wrapper.append(productFilters);

    const productsContainer = document.createElement('div');
    wrapper.append(productsContainer);

    this.htmlElement = container;
    this.container = productsContainer;
  }

  private render(): void {
    if (!this.container || !this.productsByCategory) {
      return;
    }

    this.container.innerHTML = '';
    if (this.status === LoadingStatus.Loading) {
      // TODO: show loader
      this.container.append('Загрузка...');
      return;
    }
    if (this.status === LoadingStatus.Error) {
      this.container.append(this.error || '');
      return;
    }

    const container = this.container;
    if (!container) {
      throw new Error('Container is null');
    }

    container.innerHTML = '';

    // Product list
    const productList = new ProductList(this.productsByCategory);
    container.append(productList.getHtmlElement());
  }

  private async fetchProducts(filter?: Filter): Promise<Product[]> {
    const id = this.productCategoryId;
    const filters: string[] = [];
    if (filter?.level && filter.level !== 'Any') {
      const courseLevel = `attributes(name="Course-Level" and value(key="${filter.level}"))`;
      const professionLevel = `attributes(name="Profession-Level" and value(key="${filter.level}"))`;
      filters.push(`masterVariant(${courseLevel} or ${professionLevel})`);
    }
    const filterStr = filters.length ? `masterData(current(${filters.join(' and ')}))` : '';

    return this.dataProvider.products.getProductsByCategory(id, { filter: filterStr });
  }

  private handleFilterChange(filter: Filter): void {
    this.status = LoadingStatus.Loading;
    this.render();

    this.fetchProducts(filter)
      .then((data) => {
        this.productsByCategory = data;
        this.status = LoadingStatus.Idle;
      })
      .catch((err: Error) => {
        this.error = err.message;
        this.status = LoadingStatus.Error;
      })
      .finally(() => this.render());
  }
}
