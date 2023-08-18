import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import LoginView from './login';

export class LoginPage extends BaseView {
  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const loginForm = new LoginView();
    const layout = new MainLayout(loginForm.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
