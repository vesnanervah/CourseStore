import { BaseView } from '../base-view';
import './base-txt-inp.scss';

export default class BaseTxtInp extends BaseView {
  private labelElem: HTMLSpanElement;
  private inpElem: HTMLInputElement;
  private validElem: HTMLSpanElement;
  private validStatus: boolean = false;
  private alertMsg: HTMLDivElement;

  constructor() {
    super();
    const inpWrapper = document.createElement('div');
    this.alertMsg = document.createElement('div');
    this.htmlElement = document.createElement('div');
    this.labelElem = document.createElement('span');
    this.inpElem = document.createElement('input');
    this.validElem = document.createElement('span');
    this.inpElem.setAttribute('type', 'text');
    this.alertMsg.className = 'login__textarea-msg hidden';
    inpWrapper.className = 'login__textarea';
    this.htmlElement.className = 'login__textarea-wrapper';
    this.labelElem.className = 'login__textarea-label';
    this.inpElem.className = 'login__textarea-input';
    this.validElem.className = 'login__textarea-valid validation-failed';
    inpWrapper.append(this.labelElem, this.inpElem, this.validElem);
    this.htmlElement.append(this.alertMsg, inpWrapper);
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
    this.alertMsg.classList.remove('hidden');
    this.validStatus = false;
  }

  resetValidation(): void {
    this.validElem.classList.remove('validation-failed');
    this.alertMsg.classList.add('hidden');
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

  setAlertMsg(text: string) {
    this.alertMsg.textContent = text;
  }

  setMsgRight(): void {
    this.alertMsg.remove();
    this.htmlElement?.appendChild(this.alertMsg);
  }

  setMsgLeft(): void {
    this.alertMsg.remove();
    this.htmlElement?.prepend(this.alertMsg);
  }
}
