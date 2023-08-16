import { BaseView } from '../base-view';

export default class BaseLogBtn extends BaseView {
  constructor() {
    super();
    this.htmlElement = document.createElement('button');
    this.htmlElement.className = 'login__btn';
  }

  setPlaceholder(txt: string): void {
    if (this.htmlElement) this.htmlElement.textContent = txt;
  }
}
