import './login.scss';
import { BaseView } from '../../features/ui';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseTxtInp from '../../features/ui/base-txt-inp/base-txt-inp';

export default class LoginView extends BaseView {
  mailField = new BaseTxtInp();
  passwordField = new BaseTxtInp();
  loginBtn = new BaseLogBtn();
  regBtn = new BaseLogBtn();
  validationMsg: HTMLElement;

  constructor() {
    super();
    this.init();
    this.validationMsg = document.createElement('div');
    this.validationMsg.textContent = 'Неправильный логин или пароль';
    this.validationMsg.className = 'login__validmsg hidden';
  }

  public init(): void {
    const wrapper = document.createElement('div');
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
    this.mailField.setClassnames('login');
    this.passwordField.setClassnames('login');
    this.mailField.setLabel('Почта:');
    this.passwordField.setLabel('Пароль:');
    this.loginBtn.setPlaceholder('ВОЙТИ');
    this.regBtn.setPlaceholder('Создать аккаунт');
    or.textContent = 'или';
    stripe.className = 'login__stripe';
    content.append(mailFieldElem, passwordFieldElem, loginBtnElem, or, regBtnElem);
    wrapper.append(content, stripe);
    this.htmlElement = wrapper;
  }
}
