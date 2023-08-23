import { BaseView } from '../base-view';

export default class LoginErrorMessage extends BaseView {
  placeholder = 'Неправильный логин или пароль';
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'login__validmsg hidden';
    this.htmlElement.textContent = this.placeholder;
  }

  appear(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }
  dissappear(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }
}
