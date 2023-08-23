import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import CustomerView from './customer';

export class CustomerPage extends BaseView {
  private customerView = new CustomerView();

  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const layout = new MainLayout(this.customerView.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
