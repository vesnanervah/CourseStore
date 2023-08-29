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
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;

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
    this.handleClickButtonSave();
    this.handleClickButtonRemove();
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  async listenLogin(): Promise<void> {
    EcommerceClient.tokenRootPrepare();
    await EcommerceClient.getCustomerByToken().then((res) => {
      this.id = res.body.id;
      this.firstName = res.body.firstName;
      this.lastName = res.body.lastName;
      this.middleName = res.body.middleName;
      this.dateOfBirth = res.body.dateOfBirth;
      this.email = res.body.email;
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

  private getInputs(): NodeListOf<HTMLInputElement> | undefined {
    const parent = document.querySelector('.profile__block_main');
    const inputs = parent?.querySelectorAll('input');
    return inputs;
  }
  private getSpansGear(): NodeListOf<Element> | undefined {
    const parent = document.querySelector('.profile__block_main');
    const spans = parent?.querySelectorAll('.profile__edit_button');
    return spans;
  }
  private addValueInput() {
    const inputs = this.getInputs();
    inputs?.forEach((item) => {
      if (item.getAttribute('data-set') == 'firstName') item.value = this.firstName || '';
      if (item.getAttribute('data-set') == 'lastName') item.value = this.lastName || '';
      if (item.getAttribute('data-set') == 'middleName') item.value = this.middleName || '';
      if (item.getAttribute('data-set') == 'dateOfBirth') item.value = this.dateOfBirth || '';
      if (item.getAttribute('data-set') == 'email') item.value = this.email || '';
    });
  }

  private handleClickButtonSave(): void {
    const buttonSave = document.querySelector('#profile__save');
    buttonSave?.addEventListener('click', () => {
      console.log(this.editMode);
      this.removeBorder();
      this.saveUpdate();
    });
  }

  saveUpdate() {
    this.getDisabled();
    if (!this.editMode) return;
    else {
      this.editMode = false;
      const inputs = this.getInputs();
      inputs?.forEach((input) => {
        if (!this.checkValueInput(input)) {
          console.log(input.value); //TODO send fetch and new value save
        }
      });
    }
  }
  private removeBorder() {
    const fields = document.querySelectorAll('.profil_field');
    fields.forEach((item) => {
      item.classList.remove('border__active');
      item.classList.remove('border__wrong');
    });
  }
  private getDisabled() {
    const inputs = this.getInputs();
    inputs?.forEach((input) => {
      input.disabled = true;
    });
  }
  checkValueInput(input: HTMLInputElement): boolean | undefined {
    if (input.getAttribute('data-set') == 'firstName') return input.value.trim() === this.firstName;
    else if (input.getAttribute('data-set') == 'lastName') {
      return input.value.trim() === this.lastName;
    } else if (input.getAttribute('data-set') == 'middleName') {
      return input.value.trim() === this.middleName;
    } else if (input.getAttribute('data-set') == 'dateOfBirth') {
      return input.value.trim() === this.dateOfBirth;
    } else if (input.getAttribute('data-set') == 'email') return input.value.trim() === this.email;
  }

  private handleClickButtonRemove() {
    const buttonReset = document.querySelector('#profile__reset');
    buttonReset?.addEventListener('click', () => {
      this.removeBorder();
      this.addValueInput();
      this.getDisabled();
    });
  }
}
