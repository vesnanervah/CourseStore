import { MainLayout } from '../../features/layouts';
import { BaseView } from '../../features/ui';
import CartView from './cart-view';

export class CartPage extends BaseView {
  private view: CartView | null = null;

  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    this.view = new CartView();

    const layout = new MainLayout(this.view.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
