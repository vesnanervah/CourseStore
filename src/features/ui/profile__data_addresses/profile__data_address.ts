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
    this.htmlElement.className = 'form__address_prof';
    this.div.className = 'fields__form';
    this.htmlElement.append(title);
  }

  getBlockAddress(text: 'Платежный адрес' | 'Адрес доставки'): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    const ul: HTMLUListElement = document.createElement('ul');
    const li = document.createElement('li');
    li.className = 'button__edit';
    const li1 = document.createElement('li');
    li1.className = 'button__save';
    const li2 = document.createElement('li');
    li2.className = 'button__delete';
    ul.append(li, li1, li2);
    const div1: HTMLDivElement = document.createElement('div');
    ul.className = 'list__buttons';
    div.className = 'addres__block_profile';
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
      if (i == 0) span.textContent = 'страна (ru/us)';
      else if (i == 1) span.textContent = 'город';
      else if (i == 2) span.textContent = 'улица';
      else if (i == 3) span.textContent = 'дом';
      else if (i == 4) span.textContent = 'офис/ квартира';
      else span.textContent = 'индекс';
      label.append(span, input);
      div1.append(label);
    }
    div.append(ul, h3, div1);
    return div;
  }

  private getRadiobuttonBlock(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'radio__choice_block';
    const radio1 = this.getRadioButton('Установить как адрес по умолчанию');
    div.append(radio1);
    return div;
  }

  private getRadioButton(text: string): HTMLDivElement {
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

  getButtonsAddAddresses() {
    const div = document.createElement('div');
    div.className = 'form__address_buttons';
    const button = document.createElement('button') as HTMLButtonElement;
    button.textContent = 'добавить адрес доставки';
    button.classList.add('btn__add_address');
    button.id = 'profile__address_ship';
    const button1 = document.createElement('button') as HTMLButtonElement;
    button1.textContent = 'добавить платежный адрес';
    button1.classList.add('btn__add_address');
    button1.id = 'profile__address_bill';
    div.append(button, button1);
    return div;
  }
}
