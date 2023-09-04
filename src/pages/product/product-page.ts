import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import ProductView from './product';

export class ProductPage extends BaseView {
  private view: ProductView | null = null;

  constructor() {
    super();
    this.createElement();
  }

  public init(productId: string): void {
    this.view?.updateProductPage(productId);
  }

  private createElement(): void {
    this.view = new ProductView();

    const layout = new MainLayout(this.view.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
