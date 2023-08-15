import '../login/login.scss';
import './reg.scss';
import { BaseView } from '../../features/ui';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseTxtInp from '../../features/ui/base-txt-inp/base-txt-inp';
import Auth from '../../features/auth/auth';

export default class RegView extends BaseView {
  mailField = new BaseTxtInp();
  nameField = new BaseTxtInp(); //
  passwordField = new BaseTxtInp();
  dateField = new BaseTxtInp(); //
  regBtn = new BaseLogBtn();

  validationMsg: HTMLElement = document.createElement('div');

  constructor() {
    super();
    this.init();
    this.mailValidation();
    this.passwordValidation();
  }

  private init(): void {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const stripe = document.createElement('div');
    const text = document.createElement('div');
    const mailFieldElem = this.mailField.getHtmlElement();
    const nameFieldElem = this.nameField.getHtmlElement(); //
    const passwordFieldElem = this.passwordField.getHtmlElement();
    const dateFieldElem = this.dateField.getHtmlElement();
    const dateInput = dateFieldElem.querySelector('input');
    dateInput?.setAttribute('type', 'date');
    if (dateInput) dateInput.value = '2000-06-01';
    const regBtnElem = this.regBtn.getHtmlElement();
    text.textContent = '* Поле обязательно для заполнения';
    text.classList.add('reg__text');
    this.validationMsg.className = 'reg__validmsg hidden';
    wrapper.className = 'login';
    content.className = 'login__content';
    (regBtnElem as HTMLElement).classList.add('login__btn-login');
    this.dateField.setClassnames('login');
    this.mailField.setLabel('Почта*:');
    this.nameField.setLabel('ФИО*:'); //
    this.passwordField.setLabel('Пароль*:');
    this.dateField.setLabel('Дата рождения*:'); //
    this.regBtn.setPlaceholder('ЗАРЕГИСТРИРОВАТЬСЯ');
    stripe.className = 'login__stripe';
    content.append(
      mailFieldElem,
      nameFieldElem,
      passwordFieldElem,
      dateFieldElem,
      regBtnElem,
      text,
      this.validationMsg,
    );
    //this.regBtn.getHtmlElement().addEventListener('click', async () => this.handleLoginClick());
    wrapper.append(stripe, content);
    this.htmlElement = wrapper;
  }

  private throwValidationError(): void {
    this.validationMsg.classList.remove('hidden');
    this.mailField.failValidation();
    this.passwordField.failValidation();
  }

  private resetValidationError(): void {
    this.validationMsg.classList.add('hidden');
    this.mailField.resetValidation();
    this.passwordField.resetValidation();
  }

  private async handleLoginClick() {
    if (!this.checkValidStatus()) {
      return;
    }
    try {
      await Auth.loggin(this.mailField.getTypedValue(), this.passwordField.getTypedValue());
      this.resetValidationError();
      //  TODO: replace alert with real redirect
      alert('Successfully logged in');
    } catch {
      this.throwValidationError();
    }
  }

  private mailValidation(): void {
    this.mailField.validateInput((target) => {
      return (
        target.includes('@') &&
        target.slice(target.indexOf('@')).includes('.') &&
        target.slice(target.indexOf('@')).slice(target.slice(target.indexOf('@')).indexOf('.'))
          .length > 1
      );
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
        this.resetValidationError();
        return true;
      } else {
        this.validationMsg.textContent =
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру';
        this.throwValidationError();
        return false;
      }
    });
  }

  private checkValidStatus(): boolean {
    return this.mailField.checkValid() && this.passwordField.checkValid();
  }
}
