import './product-list.scss';
import { BaseView } from '../ui';
import { ProductCard } from './product-card';

import type { Product } from '../../types';

export class ProductList extends BaseView<HTMLElement> {
  constructor(products: Product[]) {
    super();
    this.createElement(products);
  }

  private createElement(products: Product[]): void {
    const productList = document.createElement('ul');
    productList.classList.add('product-list');

    products.forEach((product) => {
      productList.append(this.createProductItem(product));
    });

    this.htmlElement = productList;
  }

  private createProductItem(product: Product): HTMLElement {
    const item = document.createElement('li');
    item.classList.add('product-item');
    const productCard = new ProductCard(product);
    item.append(productCard.getHtmlElement());

    return item;
  }
}
