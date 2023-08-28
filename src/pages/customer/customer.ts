import { BaseView, Wrapper } from '../../features/ui';
import { routes } from '../../routes';
import { AppRouter } from '../../features/router';
import EcommerceClient from '../../features/commerce/BuildClient';
import { AuthListener } from '../../types/auth';
import Auth from '../../features/auth/auth';
import { State } from '../../../src/state';
// import { StateKeys } from '../../types';

export default class Customer extends BaseView implements AuthListener {
  private router = AppRouter.getInstance();
  private state = State.getInstance();
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
    content.addEventListener('click', async () => {
      // const data = this.state.getValue(StateKeys.CUSTOMER);
      // console.log(data);
      // console.log(data?.email);
      EcommerceClient.tokenRootPrepare();
      await EcommerceClient.getCustomerByToken().then((res) => console.log(res.body.firstName));
      console.log('by token');
    });
    wrapperElement.append(content);
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  listenLogin(): void {
    //  Будет тянуть данные о юзере
  }
}
