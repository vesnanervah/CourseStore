import './login.scss';
import { BaseView } from '../../features/ui';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseTxtInp from '../../features/ui/base-txt-inp/base-txt-inp';
import Auth from '../../features/auth/auth';
import LoginErrorMessage from '../../features/ui/login-error-message/login-error-msg';
import { AppRouter } from '../../features/router';
import { routes } from '../../routes';

export default class LoginView extends BaseView {
  private router: AppRouter = AppRouter.getInstance();
  mailField = new BaseTxtInp();
  passwordField = new BaseTxtInp();
  loginBtn = new BaseLogBtn();
  regBtn = new BaseLogBtn();
  validationMsg = new LoginErrorMessage();

  constructor() {
    super();
    this.init();
    this.mailValidation();
    this.passwordValidation();
  }

  private init(): void {
    const wrapper = document.createElement('div');
    const top = document.createElement('div');
    const bottom = document.createElement('div');
    const topLeft = document.createElement('div');
    const topRight = document.createElement('div');
    const content = document.createElement('div');
    const stripe = document.createElement('div');
    const mailFieldElem = this.mailField.getHtmlElement();
    const passwordFieldElem = this.passwordField.getHtmlElement();
    const loginBtnElem = this.loginBtn.getHtmlElement();
    const regBtnElem = this.regBtn.getHtmlElement();
    const or = document.createElement('div');
    wrapper.className = 'login';
    content.className = 'login__content';
    or.className = 'login__or';
    (loginBtnElem as HTMLElement).classList.add('login__btn-login');
    (regBtnElem as HTMLElement).classList.add('login__btn-reg');
    top.className = 'login__top';
    bottom.className = 'login__bottom';
    topLeft.className = 'login__top-left';
    topRight.className = 'login__top-right';
    this.mailField.setClassnames('login');
    this.passwordField.setClassnames('login');
    this.mailField.setLabel('Почта:');
    this.passwordField.setLabel('Пароль:');
    this.loginBtn.setPlaceholder('ВОЙТИ');
    this.regBtn.setPlaceholder('Создать аккаунт');
    or.textContent = 'или';
    stripe.className = 'login__stripe';
    topLeft.append(mailFieldElem, passwordFieldElem, loginBtnElem, or, regBtnElem);
    topRight.appendChild(stripe);
    top.append(topLeft, topRight);
    bottom.appendChild(this.validationMsg.getHtmlElement());
    content.append(top, bottom);
    this.loginBtn.getHtmlElement().addEventListener('click', async () => this.handleLoginClick());
    wrapper.append(content);
    this.htmlElement = wrapper;
    this.bindEvents();
  }

  private throwValidationError(): void {
    this.validationMsg.appear();
  }

  private resetValidationError(): void {
    this.validationMsg.dissappear();
  }

  private async handleLoginClick() {
    if (!this.mailField.checkValid() || !this.mailField.checkValid()) {
      return;
    }
    try {
      await Auth.loggin(this.mailField.getTypedValue(), this.passwordField.getTypedValue());
      this.resetValidationError();
      this.router.navigate(routes.main());
    } catch {
      this.throwValidationError();
    }
  }

  private mailValidation(): void {
    this.mailField.setAlertMsg('Почта должна быть в формате: example@mail.ru');
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
    this.passwordField.setAlertMsg('Пароль должен содержать не менее 8 символов');
    this.passwordField.validateInput((target) => target.length > 7);
  }

  private bindEvents(): void {
    const regBtnElement = this.regBtn.getHtmlElement();
    regBtnElement.addEventListener('click', () => {
      this.router.navigate(routes.signup());
    });
  }
}
