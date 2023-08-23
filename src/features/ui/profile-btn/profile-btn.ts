import { BaseView } from '../base-view';
import profileIcon from '../../../assets/images/icons/user.svg';
import { IconButton } from '../icon-button';
import { Icon } from '../icon';
import { AuthListener } from '../../../types/auth';
import { routes } from '../../../routes';
import { AppRouter } from '../../router';

export default class ProfileBtn extends BaseView implements AuthListener {
  private router: AppRouter = AppRouter.getInstance();

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    const icon = new Icon({ id: profileIcon.id, viewBox: profileIcon.viewBox });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    const buttonElement = button.getHtmlElement();
    buttonElement.classList.add('app-header__profile-btn');
    this.htmlElement = buttonElement;
  }

  listenLogin(): void {
    (this.htmlElement as HTMLElement).onclick = () => this.router.navigate(routes.customer());
  }

  listenLogout(): void {
    (this.htmlElement as HTMLElement).onclick = () => this.router.navigate(routes.login());
  }
}
