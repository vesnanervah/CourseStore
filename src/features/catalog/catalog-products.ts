import './catalog-products.scss';
import { BaseView, Wrapper } from '../ui';
import EcommerceClient from '../commerce/BuildClient';
import { ProductList } from './product-list';

import { routes } from '../../routes';
import { ProductListTitle } from './product-list-title';
import { ProductFilters, type Filter } from './product-filters';
import { ProductType, Product, DataProvider, LoadingStatus } from '../../types';

type ProductTypeWithProducts = {
  id: string;
  name: string;
  url?: string;
  products: Product[];
};

export class CatalogProducts extends BaseView<HTMLElement> {
  private dataProvider: DataProvider = EcommerceClient.getDataProvider();
  private productTypes: ProductType[] = [];
  private productsByType: ProductTypeWithProducts[] = [];
  private status: LoadingStatus = LoadingStatus.Idle;
  private error: string | null = null;
  private container: HTMLElement | null = null;

  constructor() {
    super();
    this.createElement();
    this.init();
    this.render();
  }

  private async init(): Promise<void> {
    try {
      this.status = LoadingStatus.Loading;
      this.productTypes = await this.dataProvider.products.getProductTypes();
      this.productsByType = await this.fetchProducts();
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
      onSubmit: this.handleFilterChange.bind(this),
    }).getHtmlElement();
    wrapper.append(productFilters);

    const productsContainer = document.createElement('div');
    wrapper.append(productsContainer);

    this.htmlElement = container;
    this.container = productsContainer;
  }

  private render(): void {
    if (!this.container) {
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
    this.productsByType.forEach(({ name, url, products }) => {
      const productTypeName = new ProductListTitle({ text: name, href: url }).getHtmlElement();
      container.append(productTypeName);

      const productList = new ProductList(products);
      container.append(productList.getHtmlElement());
    });
  }

  private async fetchProducts(filter?: Filter): Promise<ProductTypeWithProducts[]> {
    const filters: string[] = [];
    if (filter?.categories && filter.categories.length) {
      filters.push(`categories(id in (${filter.categories.map((c) => `"${c}"`).join(', ')}))`);
    }
    if (filter?.level && filter.level !== 'Any') {
      const courseLevel = `attributes(name="Course-Level" and value(key="${filter.level}"))`;
      const professionLevel = `attributes(name="Profession-Level" and value(key="${filter.level}"))`;
      filters.push(`masterVariant(${courseLevel} or ${professionLevel})`);
    }
    const filterStr = filters.length ? `masterData(current(${filters.join(' and ')}))` : '';

    return Promise.all(
      this.productTypes.map(({ id, name, key }) =>
        this.dataProvider.products
          .getProductsByType({ id, typeName: name }, { limit: 12, filter: filterStr })
          .then((products) => ({
            id,
            name,
            url: routes.productType(key),
            products,
          })),
      ),
    );
  }

  private handleFilterChange(filter: Filter): void {
    this.status = LoadingStatus.Loading;
    this.render();

    this.fetchProducts(filter)
      .then((data) => {
        this.productsByType = data;
        this.status = LoadingStatus.Idle;
      })
      .catch((err: Error) => {
        this.error = err.message;
        this.status = LoadingStatus.Error;
      })
      .finally(() => this.render());
  }
}
