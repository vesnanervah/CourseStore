import './login.scss';
import { BaseView } from '../../features/ui';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseTxtInp from '../../features/ui/base-txt-inp/base-txt-inp';
import Auth from '../../features/auth/auth';

export default class LoginView extends BaseView {
  mailField = new BaseTxtInp();
  passwordField = new BaseTxtInp();
  loginBtn = new BaseLogBtn();
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
    const mailFieldElem = this.mailField.getHtmlElement();
    const passwordFieldElem = this.passwordField.getHtmlElement();
    const loginBtnElem = this.loginBtn.getHtmlElement();
    const regBtnElem = this.regBtn.getHtmlElement();
    const or = document.createElement('div');
    this.validationMsg.textContent = 'Неправильный логин или пароль';
    this.validationMsg.className = 'login__validmsg hidden';
    wrapper.className = 'login';
    content.className = 'login__content';
    or.className = 'login__or';
    (loginBtnElem as HTMLElement).classList.add('login__btn-login');
    (regBtnElem as HTMLElement).classList.add('login__btn-reg');
    this.mailField.setClassnames('login');
    this.passwordField.setClassnames('login');
    this.mailField.setLabel('Почта:');
    this.passwordField.setLabel('Пароль:');
    this.loginBtn.setPlaceholder('ВОЙТИ');
    this.regBtn.setPlaceholder('Создать аккаунт');
    or.textContent = 'или';
    stripe.className = 'login__stripe';
    content.append(
      mailFieldElem,
      passwordFieldElem,
      loginBtnElem,
      or,
      regBtnElem,
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
    this.passwordField.validateInput((target) => target.length > 3);
  }

  private checkValidStatus(): boolean {
    return this.mailField.checkValid() && this.passwordField.checkValid();
  }
}
