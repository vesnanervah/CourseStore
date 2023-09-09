import { BaseView } from '../base-view';

export default class BaseRegInp extends BaseView {
  private labelElem: HTMLSpanElement;
  private inpElem: HTMLInputElement;
  private validElem: HTMLSpanElement;
  private validStatus = false;

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.labelElem = document.createElement('span');
    this.inpElem = document.createElement('input');
    this.validElem = document.createElement('span');
    this.inpElem.setAttribute('type', 'text');
    this.htmlElement.className = 'reg__textarea-wrapper';
    this.labelElem.className = 'reg__textarea-label';
    this.inpElem.className = 'reg__textarea-input';
    this.validElem.className = 'reg__textarea-valid validation-failed';
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
    this.validStatus = false;
  }

  resetValidation(): void {
    this.validElem.classList.remove('validation-failed');
    this.validStatus = true;
  }

  validateInput(validation: (target: string) => boolean): void {
    this.inpElem.addEventListener('keyup', () => {
      if (validation(this.inpElem.value)) {
        this.resetValidation();
      } else {
        this.failValidation();
      }
    });
  }

  getTypedValue(): string {
    return this.inpElem.value;
  }

  checkValid(): boolean {
    return this.validStatus;
  }
}
