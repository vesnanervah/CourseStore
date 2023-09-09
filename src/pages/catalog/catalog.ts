import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import { CatalogProducts } from '../../features/catalog';

export class CatalogPage extends BaseView {
  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const catalogProducts = new CatalogProducts();
    fragment.append(catalogProducts.getHtmlElement());

    const layout = new MainLayout(fragment);

    this.htmlElement = layout.getHtmlElement();
  }
}
