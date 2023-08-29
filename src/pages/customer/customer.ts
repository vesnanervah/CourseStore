import { BaseView, Wrapper } from '../../features/ui';
import { routes } from '../../routes';
import { AppRouter } from '../../features/router';
// import EcommerceClient from '../../features/commerce/BuildClient';
import { AuthListener } from '../../types/auth';
import Auth from '../../features/auth/auth';
import { State } from '../../../src/state';
// import { StateKeys } from '../../types';
import BaseProfileBlock from '../../features/ui/profile__data_person/profile__data_person';
import './customer.scss';

export default class Customer extends BaseView implements AuthListener {
  private router = AppRouter.getInstance();
  private state = State.getInstance();
  profileLeftBlock = new BaseProfileBlock();
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
    wrapperElement.classList.add('profile__wrapper');
    // const content = document.createElement('div');
    // content.className = 'customer__content';
    // content.textContent =
    //   'Так как вы успешно залогинены, здесь должен быть личный кабинет, но ещё только спринт 2...';
    // content.addEventListener('click', async () => {
    //   // const data = this.state.getValue(StateKeys.CUSTOMER);
    //   // console.log(data);
    //   // console.log(data?.email);
    //   EcommerceClient.tokenRootPrepare();
    //   await EcommerceClient.getCustomerByToken().then((res) => console.log(res.body.firstName));
    //   console.log('by token');
    // });
    const leftBlock = this.profileLeftBlock.getHtmlElement();
    wrapperElement.append(leftBlock);
    this.htmlElement.append(wrapperElement);
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  listenLogin(): void {
    //  Будет тянуть данные о юзере
  }
}
