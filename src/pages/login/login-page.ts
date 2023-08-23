import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import { AppRouter } from '../../features/router';
import LoginView from './login';
import { routes } from '../../routes';
import Auth from '../../features/auth/auth';

import { AuthListener } from '../../types/auth';

export class LoginPage extends BaseView implements AuthListener {
  private router = AppRouter.getInstance();
  private loginForm = new LoginView();

  constructor() {
    super();
    this.createElement();
    Auth.subscribe(this);
  }

  private createElement(): void {
    const layout = new MainLayout(this.loginForm.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }

  listenLogout(): void {
    //
  }

  listenLogin(): void {
    this.router.navigate(routes.main());
  }
}
