import '../login/login.scss';
import { BaseView } from '../../features/ui';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseTxtInp from '../../features/ui/base-txt-inp/base-txt-inp';
import Auth from '../../features/auth/auth';

export default class RegView extends BaseView {
  mailField = new BaseTxtInp();
  nameField = new BaseTxtInp(); //
  passwordField = new BaseTxtInp();
  dateField = new BaseTxtInp(); //
  loginBtn = new BaseLogBtn();

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
    const mailFieldElem = this.mailField.getHtmlElement();
    const nameFieldElem = this.nameField.getHtmlElement(); //
    const passwordFieldElem = this.passwordField.getHtmlElement();
    const dateFieldElem = this.dateField.getHtmlElement();
    (dateFieldElem as HTMLInputElement).setAttribute('type', 'date');
    (dateFieldElem as HTMLInputElement).value = '2000-06-01';
    const loginBtnElem = this.loginBtn.getHtmlElement();
    this.validationMsg.textContent = 'Неправильный логин или пароль';
    this.validationMsg.className = 'login__validmsg hidden';
    wrapper.className = 'login';
    content.className = 'login__content';
    (loginBtnElem as HTMLElement).classList.add('login__btn-login');
    this.mailField.setClassnames('login');
    this.passwordField.setClassnames('login');
    this.mailField.setLabel('Почта:');
    this.nameField.setLabel('ФИО:'); //
    this.passwordField.setLabel('Пароль:');
    this.dateField.setLabel('Дата рождения:'); //
    this.loginBtn.setPlaceholder('ЗАРЕГИСТРИРОВАТЬСЯ');
    stripe.className = 'login__stripe';
    content.append(
      mailFieldElem,
      nameFieldElem,
      passwordFieldElem,
      loginBtnElem,
      this.validationMsg,
    );
    this.loginBtn.getHtmlElement().addEventListener('click', async () => this.handleLoginClick());
    wrapper.append(content, stripe);
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
      return (
        target.length > 7 &&
        /[0-9]/.test(target) &&
        /[A-ZА-Я]/.test(target) &&
        /[a-zа-я]/.test(target)
      );
    });
  }

  private checkValidStatus(): boolean {
    return this.mailField.checkValid() && this.passwordField.checkValid();
  }
}
