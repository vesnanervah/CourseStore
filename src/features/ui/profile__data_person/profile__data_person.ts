import { BaseView } from '../base-view';

export default class BaseProfileBlock extends BaseView {
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'profile__block_main';
    const title = document.createElement('h1');
    const nameCustomer = this.addField('Имя:', 'firstName');
    const surname = this.addField('Фамилия:', 'lastName');
    const middlename = this.addField('Отчество:', 'middleName');
    const dateBirth = this.addField('Дата рождения:', 'dateOfBirth');
    (dateBirth.querySelector('input') as HTMLInputElement).type = 'date';
    const email = this.addField('Почта:', 'email');
    const buttons = this.addButtons('button__main');
    title.textContent = 'Ваши данные:';
    title.classList.add('profile__title');
    const checkPassword = this.getCheckPassword();
    const modalWindow = this.getModalWindowPassword();
    const modalMessagew = this.getModalWindowMessage();
    this.htmlElement.append(
      title,
      nameCustomer,
      surname,
      middlename,
      dateBirth,
      email,
      buttons,
      checkPassword,
      modalWindow,
      modalMessagew,
    );
  }

  addField(text: string, data: string): HTMLDivElement {
    const div = document.createElement('div');
    const div1 = document.createElement('div');
    const labelElem = document.createElement('span') as HTMLSpanElement;
    const inpElem = document.createElement('input') as HTMLInputElement;
    const validElem = document.createElement('span') as HTMLSpanElement;
    const message = document.createElement('p');
    div.className = 'profile';
    div1.className = 'profil_field';
    inpElem.setAttribute('type', 'text');
    inpElem.disabled = true;
    inpElem.setAttribute('data-set', data);
    labelElem.textContent = text;
    labelElem.className = 'profile__libel';
    inpElem.className = 'profile__input';
    validElem.className = 'profile__edit_button';
    message.className = 'profile__msg';
    message.textContent = '';
    div1.append(labelElem, inpElem, validElem);
    div.append(div1, message);
    return div;
  }
  addButtons(value: string): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add(value);
    const button = document.createElement('button') as HTMLButtonElement;
    button.textContent = 'сохранить';
    button.classList.add('button__round_profile');
    button.id = 'profile__save';
    const button1 = document.createElement('button') as HTMLButtonElement;
    button1.textContent = 'отменить';
    button1.classList.add('button__round_profile');
    button1.id = 'profile__reset';
    div.append(button, button1);
    return div;
  }
  getCheckPassword(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'checkbox__change_password';
    const check = document.createElement('input');
    check.id = 'checkbox_passw';
    check.type = 'checkbox';
    check.checked = false;
    const label = document.createElement('label');
    label.className = 'check__label_password';
    label.textContent = 'Изменить пароль';
    div.append(check, label);
    return div;
  }

  getModalWindowPassword(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'passw_block';
    const div1 = document.createElement('div');
    div1.className = 'modal';
    const div2 = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'password';
    input.placeholder = 'Текущий пароль';
    input.id = 'current__password';
    const input1 = document.createElement('input');
    input1.type = 'password';
    input1.placeholder = 'Новый пароль';
    input1.id = 'new__password';
    div2.append(input, input1);
    const p = document.createElement('p');
    p.className = 'passw_mes';
    p.textContent =
      'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру';
    const div3 = document.createElement('div');
    div3.className = 'buttons__control';
    const buttonSave = document.createElement('button');
    buttonSave.className = 'passw__save';
    buttonSave.textContent = 'Сохранить';
    const buttonReset = document.createElement('button');
    buttonReset.className = 'passw__reset';
    buttonReset.textContent = 'Отменить';
    div3.append(buttonSave, buttonReset);
    div1.append(div2, p, div3);
    div.append(div1);
    return div;
  }

  getModalWindowMessage(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'message_block';
    const div1 = document.createElement('div');
    div1.className = 'mess__profile_modal';
    const p = document.createElement('p');
    p.textContent = 'Сообщение';
    p.className = 'profile_mes';
    const div2 = document.createElement('div');
    div2.className = 'button__close';
    const buttonCansel = document.createElement('a');
    buttonCansel.className = 'mes__cansel_btn';
    buttonCansel.textContent = 'Закрыть';
    const span = document.createElement('span');
    span.className = 'cross';
    div2.append(span, buttonCansel);
    div1.append(p, div2);
    div.append(div1);
    return div;
  }
}
