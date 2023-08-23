import { BaseView } from '../base-view';

export default class BaseRegAddress extends BaseView {
  div: HTMLDivElement;
  select: HTMLSelectElement;
  option: HTMLOptionElement;
  option1: HTMLOptionElement;
  blockAddress: HTMLDivElement;
  blockAddress1: HTMLDivElement;
  checkbox: HTMLDivElement;
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.div = document.createElement('div');
    this.select = document.createElement('select');
    this.option = document.createElement('option');
    this.option1 = document.createElement('option');
    this.htmlElement.className = 'form__address';
    this.div.className = 'fields__form';
    this.select.className = 'select__form';
    this.option.textContent = 'Россия';
    this.option1.textContent = 'США';
    this.select.append(this.option, this.option1);
    this.blockAddress = this.getBlockAddress('Платежный адрес');
    this.checkbox = this.getCheck();
    this.blockAddress1 = this.getBlockAddress('Адрес доставки');
    this.blockAddress1.id = 'addres__block_shipping';
    this.blockAddress.id = 'addres__block_billing';
    this.blockAddress1.classList.add('remove');
    this.htmlElement.append(this.select, this.blockAddress, this.checkbox, this.blockAddress1);
  }

  getBlockAddress(text: string): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    const div1: HTMLDivElement = document.createElement('div');
    div.className = 'addres__block';
    div1.className = 'addres__block_label';
    const h3 = document.createElement('h3');
    h3.textContent = text;
    for (let i = 0; i < 3; i++) {
      const label = document.createElement('label');
      const span = document.createElement('span');
      const input = document.createElement('input');
      label.className = 'field';
      span.id = 'field__span';
      input.className = 'field__input';
      if (i == 0) span.textContent = 'город';
      else if (i == 1) span.textContent = 'улица';
      else span.textContent = 'индекс';
      label.append(span, input);
      div1.append(label);
    }
    div.append(h3, div1);
    return div;
  }

  getCheck(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'checkbox__block';
    const check = document.createElement('input');
    check.id = 'checkbox';
    check.type = 'checkbox';
    check.checked = true;
    const label = document.createElement('label');
    label.className = 'check__label';
    label.textContent = 'Установить как адрес доставки и платежный адрес';
    div.append(check, label);
    return div;
  }
}
