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
    this.htmlElement.append(title, nameCustomer, surname, middlename, dateBirth, email, buttons);
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
}
