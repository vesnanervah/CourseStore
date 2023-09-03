import { BaseView } from '../base-view';

export default class BaseProfileBlockBye extends BaseView {
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'profile__block_buy';
    const title = document.createElement('h1');
    const div = document.createElement('div');
    div.className = 'profile__curses';
    title.textContent = 'Ваши покупки:';
    title.classList.add('profile__title');
    this.htmlElement.append(title);
  }
}
