import { BaseView } from '../base-view';

export default class BaseTxtInp extends BaseView {
  private labelElem: HTMLSpanElement;
  private inpElem: HTMLInputElement;
  private validElem: HTMLSpanElement;

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.labelElem = document.createElement('span');
    this.inpElem = document.createElement('input');
    this.validElem = document.createElement('span');
    this.inpElem.setAttribute('type', 'text');
    this.htmlElement.className = 'login__textarea-wrapper';
    this.labelElem.className = 'login__textarea-label';
    this.inpElem.className = 'login__textarea-input';
    this.validElem.className = 'login__textarea-valid';
    this.htmlElement.append(this.labelElem, this.inpElem, this.validElem);
  }

  setLabel(txt: string): void {
    this.labelElem.textContent = txt;
  }

  setClassnames(className: string) {
    (this.htmlElement as HTMLElement).className = className + '__textarea-wrapper';
    this.labelElem.className = className + '__textarea-label';
    this.inpElem.className = className + '__textarea-input';
    this.validElem.className = className + '__textarea-valid';
  }

  failValidation(): void {
    this.validElem.classList.add('validation-failed');
  }
}
