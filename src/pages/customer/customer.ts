import { BaseView, Wrapper } from '../../features/ui';
import { routes } from '../../routes';
import { AppRouter } from '../../features/router';
import EcommerceClient from '../../features/commerce/BuildClient';
import { AuthListener } from '../../types/auth';
import Auth from '../../features/auth/auth';
import { State } from '../../../src/state';
// import { StateKeys } from '../../types';
import BaseProfileBlock from '../../features/ui/profile__data_person/profile__data_person';
import './customer.scss';

// type ProfileItem = {
//   id: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   middleName: string | null;
//   dateOfBirth: string | null;
//   readonly email: string | null;
// };

export default class Customer extends BaseView implements AuthListener {
  private editMode = false;
  private router = AppRouter.getInstance();
  private state = State.getInstance();
  profileLeftBlock = new BaseProfileBlock();
  customerInfo: string[] | null = [];
  id = '';
  firstName = '';
  lastName = '';
  middleName = '';
  dateOfBirth = '';
  email = '';

  constructor() {
    super();
    this.init();
    Auth.subscribe(this);
  }
  private async init() {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'customer-page';
    const wrapper = new Wrapper();
    const wrapperElement = wrapper.getHtmlElement();
    wrapperElement.classList.add('profile__wrapper');
    //   // const data = this.state.getValue(StateKeys.CUSTOMER);
    //   // console.log(data);
    //   // console.log(data?.email);
    const leftBlock = this.profileLeftBlock.getHtmlElement();
    leftBlock.addEventListener('click', this.handleClick.bind(this));
    wrapperElement.append(leftBlock);
    this.htmlElement.append(wrapperElement);
    await this.listenLogin().then(() => this.addValueInput());
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  async listenLogin(): Promise<void> {
    EcommerceClient.tokenRootPrepare();
    await EcommerceClient.getCustomerByToken().then((res) => {
      this.id += res.body.id;
      this.firstName += res.body.firstName;
      this.lastName += res.body.lastName;
      this.middleName += res.body.middleName;
      this.dateOfBirth += res.body.dateOfBirth;
      this.email += res.body.email;
    });
  }

  private handleClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('.profile__edit_button')) {
      (target.previousElementSibling as HTMLInputElement).disabled = false;
      target.parentElement?.classList.add('border__active');
      this.editMode = true;
    }
  }

  private addValueInput() {
    const parent = document.querySelector('.profile__block_main');
    const inputs = parent?.querySelectorAll('input');
    inputs?.forEach((item) => {
      if (item.getAttribute('data-set') == 'firstName') item.value = this.firstName;
      if (item.getAttribute('data-set') == 'lastName') item.value = this.lastName;
      if (item.getAttribute('data-set') == 'middleName') item.value = this.middleName;
      if (item.getAttribute('data-set') == 'dateOfBirth') item.value = this.dateOfBirth;
      if (item.getAttribute('data-set') == 'email') item.value = this.email;
    });
  }

  getValue(inpElem: HTMLInputElement): string {
    return inpElem.value;
  }

  checkValid(): boolean {
    return this.editMode;
  }
}
