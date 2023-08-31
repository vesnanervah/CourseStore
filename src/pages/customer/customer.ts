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
import { MyCustomerUpdate, MyCustomerChangePassword } from '@commercetools/platform-sdk';

export default class Customer extends BaseView implements AuthListener {
  private editMode = false;
  private router = AppRouter.getInstance();
  private state = State.getInstance();
  profileLeftBlock = new BaseProfileBlock();
  id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;

  constructor() {
    super();
    this.id = '';
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
    this.listenerButtonsModalWindowPassword();
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
      const value = (target as HTMLInputElement).value;
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      const text = value.toLowerCase();
      const specSymbol = /[$%^&!@#*()_+\-=[\]{};':"\\|,.<>/?]+/;
      if (/[0-9]/g.test(text) || specSymbol.test(text) || text.length == 0) {
        this.addErrorValue(parent);
        paragraph.textContent = 'Сведения не должны содержать специальных символов или цифр';
      } else {
        this.removeErrorValue(parent);
        paragraph.textContent = '';
      }
    }
  }

  private validateInputDate(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('input') && target.getAttribute('data-set') === 'dateOfBirth') {
      const value = (target as HTMLInputElement).value;
      console.log(value);
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      const userDate = +new Date(value);
      const age: number = (Date.now() - userDate) / 1000 / 3600 / 24 / 30 / 12;
      console.log(age + ' age');
      if (age > 100 || age < 7 || !isNaN(+value)) {
        this.addErrorValue(parent);
        paragraph.textContent = 'Допустимый возраст от 7 до 100 лет';
      } else {
        this.removeErrorValue(parent);
        paragraph.textContent = '';
      }
    }
  }

  private async validateInputEmail(e: Event): Promise<void> {
    const target = e.target as HTMLElement;
    if (target.closest('input') && target.getAttribute('data-set') === 'email') {
      const value = (target as HTMLInputElement).value;
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      if (this.checkMail(value)) {
        this.removeErrorValue(parent);
        paragraph.textContent = '';
        const mailsOfCustomers = await this.checkUniqueMail();
        if (mailsOfCustomers.includes(value) && value !== this.email) {
          paragraph.textContent =
            'Укажите другой адрес электронной почты. Пользователь с данными сведениями уже зарегистрирован';
          this.addErrorValue(parent);
        }
      } else {
        this.addErrorValue(parent);
        paragraph.textContent =
          'Неправильный адрес электронной почты. Корректный формат: example@email.com';
      }
    }
  }
  private validateInputPassw(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('.new__password')) {
      const value = (target as HTMLInputElement).value;
      if (
        value.length > 7 &&
        /[0-9]/.test(value) &&
        /[A-ZА-Я]/.test(value) &&
        /[a-zа-я]/.test(value)
      ) {
        this.removeErrorValue(target);
        this.getPasswordMessage('Пароль корректный');
      } else {
        this.addErrorValue(target);
        this.getPasswordMessage(
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру',
        );
      }
    }
  }
  private openModalWindowPassword() {
    this.getPasswordMessage(
      'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру',
    );
    const modal = document.querySelector('.passw_block');
    modal?.classList.add('fullscreen');
  }
  private removeErrorValue(elem: HTMLElement) {
    elem?.classList.remove('border__wrong');
    elem?.classList.add('border__active');
  }
  private addErrorValue(elem: HTMLElement) {
    elem?.classList.add('border__wrong');
    elem?.classList.remove('border__active');
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
      value.split('.')[1].length < 4
    ) {
      return true;
    } else return false;
  }

  private listenerInputWrite() {
    const inputs = this.getInputs();
    inputs?.[3].addEventListener('blur', this.validateInputDate.bind(this));
    inputs?.[4].addEventListener('keyup', this.validateInputEmail.bind(this));
    inputs?.forEach((input: HTMLElement, index: number) => {
      if (index >= 0 && index <= 2) {
        input.addEventListener('keyup', this.validateInputText.bind(this));
      }
    });
    const checkbox = document.querySelector('#checkbox_passw') as HTMLInputElement;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const window = document.querySelector('.passw_block');
        const inputs = window?.querySelectorAll('input');
        inputs?.forEach((input) => {
          input.value = '';
        });
        this.openModalWindowPassword();
      }
    });
    const passwInput = document.querySelector('.new__password');
    passwInput?.addEventListener('keyup', this.validateInputPassw.bind(this));
  }

  private listenerButtonsModalWindowPassword() {
    const buttonReset = document.querySelector('.passw__reset');
    buttonReset?.addEventListener('click', () => {
      console.log('click');
      this.removeCheck();
      const passwInput = document.querySelector('.new__password');
      passwInput?.classList.remove('border__active');
      passwInput?.classList.remove('border__wrong');
      document.querySelector('.passw_block')?.classList.remove('fullscreen');
    });
    const buttonSave = document.querySelector('.passw__save');
    buttonSave?.addEventListener('click', () => {
      const inputs = document.querySelectorAll(
        'input[type=password]',
      ) as NodeListOf<HTMLInputElement>;
      if (inputs[0].value === inputs[1].value) {
        this.getPasswordMessage('Вы ввели одинаковые пароли');
      } else if (inputs[1].classList.contains('border__wrong')) {
        this.getPasswordMessage(
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру',
        );
      } else {
        this.getUpdatePassw(inputs);
      }
    });
  }

  private async getUpdatePassw(inputs: NodeListOf<HTMLInputElement>) {
    const version = await this.getCustomerVersion();
    const currentPassword = inputs[0].value;
    const newPassword = inputs[1].value;
    const data: MyCustomerChangePassword = {
      version: Number(version),
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    try {
      const res = await EcommerceClient.updateCustomerPassword(data);
      if (res.statusCode != 200) console.log(res.statusCode);
      const modal = document.querySelector('.passw_block');
      modal?.classList.remove('fullscreen');
      const p = document?.querySelector('.profile_mes') as HTMLParagraphElement;
      p.textContent = 'Данные успешно обновлены';
      document.querySelector('.message_block')?.classList.add('fullscreen');
      this.removeCheck();
    } catch (err) {
      const modal = document.querySelector('.passw_block');
      modal?.classList.remove('fullscreen');
      const p = document?.querySelector('.profile_mes') as HTMLParagraphElement;
      p.textContent = 'Данные не обновлены. Попробуйте позже.';
      document.querySelector('.message_block')?.classList.add('fullscreen');
      this.removeCheck();
    }
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
          flag = false;
          return;
        }
      });
      if (!flag) {
        const message = document.querySelector('.message_block');
        const p = message?.querySelector('p') as HTMLParagraphElement;
        p.textContent = 'Введите корректные данные';
        message?.classList.add('fullscreen');
      }
      if (flag) {
        this.removeBorder();
        this.saveUpdate();
      }
    });
  }

  //save updates of customer
  /* eslint-disable*/
  private async saveUpdate() {
    this.getDisabled();
    if (!this.editMode) return;
    else {
      const version = await this.getCustomerVersion();
      const nextVersion = Number(version);
      const data: MyCustomerUpdate = {
        version: nextVersion,
        actions: [],
      };
      this.editMode = false;
      const inputs = this.getInputs();
      inputs?.forEach((input) => {
        if (!this.checkValueInput(input)) {
          const property = input.getAttribute('data-set');
          if (property === 'email') {
            data.actions.push({
              action: 'changeEmail',
              email: input.value,
            });
          } else if (property === 'dateOfBirth') {
            data.actions.push({
              action: 'setDateOfBirth',
              dateOfBirth: input.value,
            });
          } else if (property === 'firstName') {
            data.actions.push({
              action: 'setFirstName',
              firstName: input.value,
            });
          } else if (property === 'lastName') {
            data.actions.push({
              action: 'setLastName',
              lastName: input.value,
            });
          } else if (property === 'middleName') {
            data.actions.push({
              action: 'setMiddleName',
              middleName: input.value,
            });
          }
        }
      });
      this.getUpdate(data);
    }
  }
  private async getUpdate(data: MyCustomerUpdate) {
    const message = document.querySelector('.message_block');
    const a = data;
    try {
      const res = await EcommerceClient.updateCustomer(a);
      const p = message?.querySelector('p') as HTMLParagraphElement;
      p.textContent = 'Данные успешно обновлены';
      message?.classList.add('fullscreen');
      await this.listenLogin(); //.then(() => this.addValueInput());
    } catch (err) {
      const p = message?.querySelector('p') as HTMLParagraphElement;
      p.textContent = 'Данные не обновлены. Попробуйте позже.';
      message?.classList.add('fullscreen');
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
    const buttonResetModal = document.querySelector('.button__close');
    buttonResetModal?.addEventListener('click', () => {
      const modal = document.querySelector('.message_block');
      modal?.classList.remove('fullscreen');
    });
  }

  async getCustomerVersion(): Promise<string | number | undefined> {
    try {
      if (this.id) {
        return await EcommerceClient.getCustomerById(this.id).then((res) => res.body.version);
      }
    } catch (err) {
      const modal = document.querySelector('.passw_block');
      modal?.classList.remove('fullscreen');
      const p = document?.querySelector('.profile_mes') as HTMLParagraphElement;
      p.textContent = 'Данные не обновлены.';
      document.querySelector('.message_block')?.classList.add('fullscreen');
      this.removeCheck();
      throw new Error(`${err} customer error`);
    }
  }

  private getInputs(): NodeListOf<HTMLInputElement> | undefined {
    const parent = document.querySelector('.profile__block_main');
    const inputs = parent?.querySelectorAll('input.profile__input') as NodeListOf<HTMLInputElement>;
    return inputs;
  }
  private getPasswordMessage(text: string) {
    const p = document.querySelector('.passw_mes') as HTMLParagraphElement;
    p.textContent = text;
  }
  private removeCheck() {
    const check = document.querySelector('#checkbox_passw') as HTMLInputElement;
    check.checked = false;
  }
}
