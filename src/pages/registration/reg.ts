import './reg.scss';
import { RegisterBody } from '../../types/reg';
import { BaseView } from '../../features/ui';
import BaseRegLink from '../../features/ui/base-reg-link/base-reg-link';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseRegInp from '../../features/ui/base-reg-inp/base-reg-inp';
import EcommerceClient from '../../features/commerce/BuildClient';
import BaseRegAddress from '../../features/ui/base-reg-formAddress/base-reg-address';
import { BaseAddress } from '@commercetools/platform-sdk';
import { AppRouter } from '../../features/router';
import { routes } from '../../routes';

export default class RegView extends BaseView {
  mailField = new BaseRegInp();
  nameField = new BaseRegInp(); //
  passwordField = new BaseRegInp();
  dateField = new BaseRegInp(); //
  regBtn = new BaseLogBtn();
  backBtn = new BaseRegLink('#');
  addressField = new BaseRegAddress();
  validationMsg: HTMLElement = document.createElement('div');
  arr: Array<BaseAddress> = [];
  private router: AppRouter = AppRouter.getInstance();
  constructor() {
    super();
    this.init();
    this.mailValidation();
    this.passwordValidation();
    this.nameValidation();
  }

  private init(): void {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const stripe = document.createElement('div');
    const text = this.getDivMessage();
    const linkFieldElem = this.backBtn.getHtmlElement();
    const mailFieldElem = this.mailField.getHtmlElement();
    const nameFieldElem = this.nameField.getHtmlElement(); //
    const passwordFieldElem = this.passwordField.getHtmlElement();
    const dateFieldElem = this.dateField.getHtmlElement();
    const addressFieldElem = this.addressField.getHtmlElement();
    dateFieldElem.querySelector('input')?.setAttribute('type', 'date');
    (dateFieldElem.querySelector('input') as HTMLInputElement).value = '2000-06-01';
    const regBtnElem = this.regBtn.getHtmlElement();
    this.validationMsg.className = 'reg__validmsg hidden';
    wrapper.className = 'reg';
    content.className = 'reg__content';
    (regBtnElem as HTMLElement).id = 'reg__btn';
    this.dateField.setClassnames('reg');
    this.mailField.setLabel('Почта*:');
    this.nameField.setLabel('ФИО*:');
    this.passwordField.setLabel('Пароль*:');
    this.dateField.setLabel('Дата рождения:');
    this.regBtn.setPlaceholder('ЗАРЕГИСТРИРОВАТЬСЯ');
    stripe.className = 'reg__stripe';
    content.append(linkFieldElem, mailFieldElem, nameFieldElem, passwordFieldElem, dateFieldElem);
    content.append(addressFieldElem, regBtnElem, text, this.validationMsg);
    this.addressField.getHtmlElement().addEventListener('change', () => this.removeBlockAddress());
    this.regBtn.getHtmlElement().addEventListener('click', async () => this.handleLoginClick());
    this.backBtn.getHtmlElement().addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate(routes.login());
    });
    wrapper.append(stripe, content);
    this.htmlElement = wrapper;
  }

  private getDivMessage(): HTMLDivElement {
    const div = document.createElement('div');
    div.textContent = '* Поле обязательно для заполнения';
    div.classList.add('reg__text');
    return div;
  }

  private throwValidationError(): void {
    this.validationMsg.classList.remove('hidden');
  }

  private resetValidationError(): void {
    this.validationMsg.classList.add('hidden');
  }
  private throwValidationErrorNameField(): void {
    this.validationMsg.classList.remove('hidden');
    this.throwValidationError();
    this.nameField.failValidation();
  }

  private async handleLoginClick() {
    if (!this.checkValidStatus()) {
      this.validationMsg.textContent = 'Заполните обязательные поля';
      this.throwValidationError();
      return;
    }
    try {
      const mail = this.mailField.getHtmlElement().querySelector('input')?.value || '';
      const passw = this.passwordField.getHtmlElement().querySelector('input')?.value || '';
      const arrayName = this.nameField.getHtmlElement().querySelector('input')?.value.split(' ');
      const name = arrayName?.slice(0, 1).join('');
      const surname = arrayName?.slice(1, 2).join('');
      const middlename = arrayName?.slice(2).join('');
      const date = this.dateField.getHtmlElement().querySelector('input')?.value || '';
      this.getArrayAddresses();
      const clientBody: RegisterBody = {
        email: mail,
        password: passw,
        firstName: name,
        lastName: surname,
        middleName: middlename,
        dateOfBirth: date,
        addresses: this.arr,
        defaultShippingAddress: 1,
        defaultBillingAddress: 0,
      };
      await EcommerceClient.stockRootPrepare();
      await EcommerceClient.registerUser(clientBody).then(() => {
        this.validationMsg.textContent = '';
        this.resetValidationError();
        this.router.navigate(routes.main());
      });
    } catch {
      this.validationMsg.textContent = 'У вас уже есть учетная запись. Войдите в систему (кнопка "Назад")';
      this.throwValidationError();
    }
  }

  private addressInfo(id: string): BaseAddress {
    const blockAddressBilling = this.addressField.getHtmlElement().querySelector(id);
    const key = this.getKeyAddress();
    const inputs: NodeListOf<HTMLInputElement> | undefined =
      blockAddressBilling?.querySelectorAll('.field__input');
    let city = '';
    if (inputs) city = inputs[0].value;
    let street = '';
    if (inputs) street = inputs[1].value;
    let postal = '';
    if (inputs) postal = inputs[2].value;
    const country = blockAddressBilling?.querySelector('.select__form') as HTMLSelectElement;
    let valueCountry = '';
    if (country?.value == 'Россия') valueCountry += 'RU';
    else valueCountry += 'US';
    return {
      key: key,
      country: valueCountry,
      city: city,
      streetName: street,
      postalCode: postal,
    };
  }

  private getKeyAddress(): string {
    const minLength = 2;
    const maxLength = 256;
    const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1));
    const stringValue = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    let result = '';
    for (let i = 0; i < randomLength; i++) {
      result += stringValue[Math.floor(Math.random() * stringValue.length)];
    }
    return result;
  }

  private getArrayAddresses() {
    this.arr.push(this.addressInfo('#addres__block_billing'));
    if (document.querySelector('#addres__block_shipping')) {
      this.arr.push(this.addressInfo('#addres__block_shipping'));
    } else {
      this.arr.push(this.addressInfo('#addres__block_billing')); //true
    }
  }

  private mailValidation(): void {
    this.mailField.validateInput((target) => {
      if (
        /[a-zа-я0-9_-]+@[a-zA-Z0-9]+\.[a-z]{2,3}/.test(target) &&
        target.indexOf('@') != 0 &&
        target.trim().indexOf(' ') == -1
      ) {
        this.resetValidationError();
        this.mailField.resetValidation();
        return true;
      } else {
        this.validationMsg.textContent =
          'Неправильный адрес электронной почты. Корректный формат: example@email.com';
        this.throwValidationError();
        this.mailField.failValidation();
        return false;
      }
    });
  }

  private passwordValidation(): void {
    this.passwordField.validateInput((target) => {
      if (
        target.length > 7 &&
        /[0-9]/.test(target) &&
        /[A-ZА-Я]/.test(target) &&
        /[a-zа-я]/.test(target)
      ) {
        this.validationMsg.textContent = '';
        this.resetValidationError();
        this.passwordField.resetValidation();
        return true;
      } else {
        this.validationMsg.textContent =
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру';
        this.throwValidationError();
        this.passwordField.failValidation();
        return false;
      }
    });
  }

  private nameValidation(): void {
    this.nameField.validateInput((target) => {
      if (target.split(' ').length > 1) {
        for (const elem of target.split(' ')) {
          const text = elem.toLowerCase();
          const specSymbol = /[$%^&!@#*()_+\-=[\]{};':"\\|,.<>/?]+/;
          if (/[0-9]/g.test(text) || specSymbol.test(text)) {
            this.validationMsg.textContent =
              'Сведения не должны содержать специальных символов или цифр';
            this.throwValidationErrorNameField();
            return false;
          }
        }
        this.validationMsg.textContent = '';
        this.resetValidationError();
        this.nameField.resetValidation();
        return true;
      } else {
        this.validationMsg.textContent = 'Укажите фамилию и имя';
        this.throwValidationErrorNameField();
        return false;
      }
    });
  }

  private removeBlockAddress(): void {
    const checkbox = document.querySelector('input[type=checkbox]') as HTMLInputElement;
    const blockAddressShipping = document.querySelector('#addres__block_shipping');
    if (checkbox.checked) {
      blockAddressShipping?.classList.add('remove');
    } else {
      blockAddressShipping?.classList.remove('remove');
    }
  }

  private checkValidStatus(): boolean {
    return (
      this.mailField.checkValid() && this.passwordField.checkValid() && this.nameField.checkValid()
    );
  }
}
