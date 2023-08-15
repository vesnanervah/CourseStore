import { BaseView } from '../base-view';

export default class BaseRegLink extends BaseView {
  private linkElement: HTMLAnchorElement;

  constructor(link: string) {
    super();
    this.htmlElement = document.createElement('div');
    this.linkElement = document.createElement('a');
    this.htmlElement.className = 'form__back';
    this.linkElement.className = 'loginpage__link';
    this.linkElement.id = 'loginpage__link';
    this.linkElement.href = link;
    this.linkElement.textContent = 'НАЗАД';
    this.htmlElement.append(this.linkElement);
  }
}
