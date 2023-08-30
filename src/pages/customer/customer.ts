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

//type for changed values
type ProfileItem = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: string;
  email?: string;
};

export default class Customer extends BaseView implements AuthListener {
  private editMode = false;
  private router = AppRouter.getInstance();
  private state = State.getInstance();
  profileLeftBlock = new BaseProfileBlock();
  customerdata: ProfileItem = {};
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
    this.listenerInputWrite();
    this.handleClickButtonSave();
    this.handleClickButtonRemove();
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  //get info about customer from commersetools
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

  //listener for edit buttons - get change info about customer in inputs
  private handleClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('.profile__edit_button')) {
      (target.previousElementSibling as HTMLInputElement).disabled = false;
      target.parentElement?.classList.add('border__active');
      this.editMode = true;
    }
  }
  private validateInputText(e: Event): void {
    const target = e.target as HTMLElement;
    if (
      target.closest('input') &&
      (target.getAttribute('data-set') === 'firstName' ||
        target.getAttribute('data-set') === 'lastName' ||
        target.getAttribute('data-set') === 'middleName')
    ) {
      const parent = target.parentElement as HTMLDivElement;
      console.log('text');
      parent?.classList.add('border__wrong');
    } else if (target.closest('input') && target.getAttribute('data-set') === 'dateOfBirth') {
      const parent = target.parentElement as HTMLDivElement;
      console.log('date');
      parent?.classList.add('border__wrong');
    }
  }

  private async validateInputEmail(e: Event): Promise<void> {
    const target = e.target as HTMLElement;
    if (target.closest('input') && target.getAttribute('data-set') === 'email') {
      const value = (target as HTMLInputElement).value;
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      if (this.checkMail(value)) {
        parent?.classList.remove('border__wrong');
        parent?.classList.add('border__active');
        paragraph.textContent = '';
        const mailsOfCustomers = await this.checkUniqueMail();
        if (mailsOfCustomers.includes(value)) {
          paragraph.textContent =
            'Укажите другой адрес электронной почты. Пользователь с данными сведениями уже зарегистрирован';
          parent?.classList.add('border__wrong');
          parent?.classList.remove('border__active');
        }
      } else {
        parent?.classList.add('border__wrong');
        parent?.classList.remove('border__active');
        paragraph.textContent =
          'Неправильный адрес электронной почты. Корректный формат: example@email.com';
      }
    }
  }

  private async checkUniqueMail(): Promise<string[]> {
    const usersMails = await EcommerceClient.getUsersEmail();
    return usersMails;
  }
  private checkMail(value: string): boolean {
    if (
      /[a-zа-я0-9_-]+@[a-zA-Z0-9]+\.[a-z]{2,3}/.test(value) &&
      value.indexOf('@') != 0 &&
      value.trim().indexOf(' ') == -1 &&
      value.split('.')[1].length < 3
    ) {
      return true;
    } else return false;
  }

  private getInputs(): NodeListOf<HTMLInputElement> | undefined {
    const parent = document.querySelector('.profile__block_main');
    const inputs = parent?.querySelectorAll('input');
    return inputs;
  }
  private listenerInputWrite() {
    const inputs = this.getInputs();
    inputs?.forEach((input) => {
      input.addEventListener('keyup', this.validateInputText.bind(this));
      input.addEventListener('keyup', this.validateInputEmail.bind(this));
    });
  }
  //get full input fields of profile
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

  //listener to save button of left block
  private handleClickButtonSave(): void {
    const buttonSave = document.querySelector('#profile__save');
    buttonSave?.addEventListener('click', () => {
      const messages = document.querySelectorAll('.profil_field');
      let flag = true;
      messages.forEach((mes) => {
        if (mes.classList.contains('border__wrong')) {
          alert('введите корректные данные'); //TODO modal window
          flag = false;
          return;
        }
      });
      if (flag) {
        this.removeBorder();
        this.saveUpdate();
      }
    });
  }

  //save updates of customer
  private async saveUpdate() {
    this.getDisabled();
    if (!this.editMode) return;
    else {
      const version = await this.getCustomerVersion();
      this.editMode = false;
      const inputs = this.getInputs();
      inputs?.forEach((input) => {
        if (!this.checkValueInput(input)) {
          //check valid
          const nextVersion = Number(version) + 1;
          console.log(version); //TODO send fetch and new value save
          console.log(nextVersion); //TODO send fetch and new value save
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
    const paragraphs = document.querySelectorAll('.profile__msg');
    paragraphs.forEach((p) => (p.textContent = ''));
  }

  private getDisabled() {
    const inputs = this.getInputs();
    inputs?.forEach((input) => {
      input.disabled = true;
    });
  }
  //check info in fieldes - which was changed
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
  //listener to button remove of left block
  private handleClickButtonRemove() {
    const buttonReset = document.querySelector('#profile__reset');
    buttonReset?.addEventListener('click', () => {
      this.removeBorder();
      this.addValueInput();
      this.getDisabled();
    });
  }

  async getCustomerVersion(): Promise<string | number | undefined> {
    try {
      if (this.id) {
        return await EcommerceClient.getCustomerById(this.id).then((res) => res.body.version);
      }
    } catch (err) {
      throw new Error(`${err} customer error`);
    }
  }
}
