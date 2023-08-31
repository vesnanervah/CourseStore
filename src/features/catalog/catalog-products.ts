import './catalog-products.scss';
import { BaseView, Wrapper } from '../ui';
import EcommerceClient from '../commerce/BuildClient';
import { ProductList } from './product-list';

import type { Product } from '../../types';
import { ProductListTitle } from './product-list-title';
import { routes } from '../../routes';
import { DataProvider } from '../../types/data-provider';

type ProductTypeWithProducts = {
  id: string;
  name: string;
  url?: string;
  products: Product[];
};

export class CatalogProducts extends BaseView<HTMLElement> {
  private dataProvider: DataProvider = EcommerceClient.getDataProvider();
  private container: HTMLElement | null = null;

  constructor() {
    super();
    this.createElement();
    this.init();
  }

  private async init(): Promise<void> {
    const productTypes = await this.dataProvider.products.getProductTypes();
    // TODO: show error to user
    Promise.all(
      productTypes.map(({ id, name, key }) =>
        this.dataProvider.products
          .getProductsByType({ id, typeName: name }, { limit: 12 })
          .then((products) => ({
            id,
            name,
            url: routes.productType(key),
            products,
          })),
      ),
    )
      .then(this.renderProductsByType.bind(this))
      .catch(console.warn);
  }

  private createElement(): void {
    const container = document.createElement('section');
    container.classList.add('catalog-products');

    const wrapper = new Wrapper().getHtmlElement();
    container.append(wrapper);

    this.htmlElement = container;
    this.container = wrapper;
  }

  private renderProductsByType(productsByType: ProductTypeWithProducts[]): void {
    const container = this.container;
    if (!container) {
      throw new Error('Container is null');
    }
    container.innerHTML = '';

    productsByType.forEach(({ name, url, products }) => {
      const productTypeName = new ProductListTitle({ text: name, href: url }).getHtmlElement();
      container.append(productTypeName);

      const productList = new ProductList(products);
      container.append(productList.getHtmlElement());
    });
  }
}
