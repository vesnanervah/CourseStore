import { BaseView } from '../base-view';
import logoutIcon from '../../../assets/images/icons/logout.svg';
import { IconButton } from '../icon-button';
import { Icon } from '../icon';
import { AuthListener } from '../../../types/auth';
import './logout-btn.scss';
import Auth from '../../auth/auth';

export default class LogoutBtn extends BaseView implements AuthListener {
  constructor() {
    super();
    this.init();
  }

  private init(): void {
    const icon = new Icon({ id: logoutIcon.id, width: '34px', height: '30px' });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    const buttonElement = button.getHtmlElement();
    buttonElement.classList.add('app-header__logout-btn');
    buttonElement.addEventListener('click', () => {
      Auth.loggout();
    });
    this.htmlElement = buttonElement;
  }

  listenLogin(): void {
    this.revealBtn();
  }

  listenLogout(): void {
    this.hideBtn();
  }

  hideBtn(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }

  revealBtn(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }
}
