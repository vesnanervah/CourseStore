import { BaseView, Wrapper } from '../../features/ui';
import { routes } from '../../routes';
import { AppRouter } from '../../features/router';
import { AuthListener } from '../../types/auth';
import Auth from '../../features/auth/auth';

export default class Customer extends BaseView implements AuthListener {
  private router = AppRouter.getInstance();
  constructor() {
    super();
    this.init();
    Auth.subscribe(this);
  }
  private init() {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'customer-page';

    const wrapper = new Wrapper();
    const wrapperElement = wrapper.getHtmlElement();
    this.htmlElement.append(wrapperElement);

    const content = document.createElement('div');
    content.className = 'customer__content';
    content.textContent =
      'Так как вы успешно залогинены, здесь должен быть личный кабинет, но ещё только спринт 2...';
    wrapperElement.append(content);
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  listenLogin(): void {
    //  Будет тянуть данные о юзере
  }
}
