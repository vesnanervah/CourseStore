import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import RegView from './reg';

export class SignupPage extends BaseView {
  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const regForm = new RegView();
    const layout = new MainLayout(regForm.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
