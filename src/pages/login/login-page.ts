import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import LoginView from './login';

export class LoginPage extends BaseView {
  private loginForm = new LoginView();

  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const layout = new MainLayout(this.loginForm.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
