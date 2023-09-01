import { BaseView } from '../base-view';

export default class BaseProfileAddress extends BaseView {
  div: HTMLDivElement;
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = 'Ваши адреса:';
    title.classList.add('profile__title');
    this.div = document.createElement('div');
    this.htmlElement.className = 'form__address';
    this.div.className = 'fields__form';
    this.htmlElement.append(title);
  }

  getBlockAddress(text: 'Платежный адрес' | 'Адрес доставки'): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    const ul: HTMLUListElement = document.createElement('ul');
    const li = document.createElement('li');
    li.className = 'button__edit';
    const li1 = document.createElement('li');
    li1.className = 'button__delete';
    ul.append(li, li1);
    const div1: HTMLDivElement = document.createElement('div');
    const select = document.createElement('select');
    const option = document.createElement('option');
    const option1 = document.createElement('option');
    ul.className = 'list__buttons';
    select.className = 'select__form';
    option.textContent = 'Россия';
    option1.textContent = 'США';
    select.append(option, option1);
    div.className = 'addres__block';
    div1.className = 'addres__block_label';
    const h3 = document.createElement('h3');
    h3.textContent = text;
    for (let i = 0; i < 6; i++) {
      const label = document.createElement('label');
      const span = document.createElement('span');
      const input = document.createElement('input');
      label.className = 'field';
      span.className = 'field__span';
      input.className = 'field__input';
      if (i == 0) span.textContent = 'регион';
      else if (i == 1) span.textContent = 'город';
      else if (i == 2) span.textContent = 'улица';
      else if (i == 3) span.textContent = 'дом';
      else if (i == 4) span.textContent = 'офис/ квартира';
      else span.textContent = 'индекс';
      label.append(span, input);
      div1.append(label);
    }
    div.append(ul, h3, select, div1);
    return div;
  }

  getRadiobuttonBlock(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'radio__choice_block';
    const radio1 = this.getRadioButton('Установить как адрес доставки');
    const radio2 = this.getRadioButton('Установить как платежный адрес');
    const radio3 = this.getRadioButton('Установить как адрес доставки и платежный адрес');
    div.append(radio1, radio2, radio3);
    return div;
  }

  getRadioButton(text: string): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'radio__block';
    const check = document.createElement('input');
    check.className = 'radio_button';
    check.type = 'radio';
    const label = document.createElement('label');
    label.className = 'radio__label';
    label.textContent = text;
    div.append(check, label);
    return div;
  }
}
