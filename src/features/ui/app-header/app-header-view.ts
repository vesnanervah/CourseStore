import './app-header.scss';
import { BaseView } from '../base-view';
import { routes } from '../../../routes';
import { AppRouter } from '../../router';
import { SideNavToggle } from './components/side-nav-toggle';
import { SearchField } from './components/search-field';
import { NavCategories } from './components/nav-categories';
import { CartButton } from './components/cart-button';
import { Wrapper } from '../wrapper/wrapper';
import LogoutBtn from '../logout-btn/logout-btn';
import Auth from '../../auth/auth';
import ProfileBtn from '../profile-btn/profile-btn';

export class AppHeaderView extends BaseView {
  private router: AppRouter = AppRouter.getInstance();

  constructor() {
    super();

    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const header = document.createElement('header');
    header.classList.add('app-header');

    const wrapper = new Wrapper().getHtmlElement();
    wrapper.classList.add('app-header__wrapper');
    header.append(wrapper);

    const content = this.createAppHeaderContent();
    wrapper.append(content);

    const sideNavToggle = new SideNavToggle();
    content.append(sideNavToggle.getHtmlElement());

    const userButtons = this.createUserButtons();
    content.append(userButtons);

    const navCategories = new NavCategories();
    navCategories.init();
    header.append(navCategories.getHtmlElement());

    fragment.append(header);

    this.htmlElement = fragment;
  }

  private createAppHeaderContent(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('app-header__content');

    return container;
  }

  private createUserButtons(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('app-header__user-buttons');

    const search = this.createSearchField();
    container.append(search);

    const cartButton = this.createCartButton();
    container.append(cartButton);

    const profileButton = this.createProfileButton();
    container.append(profileButton);

    const logoutButton = this.createLogoutButton();
    container.append(logoutButton);

    return container;
  }

  private createSearchField(): HTMLElement {
    const searchField = new SearchField();
    const searchFieldElement = searchField.getHtmlElement();
    searchFieldElement.classList.add('app-header__search');

    return searchField.getHtmlElement();
  }

  private createCartButton(): HTMLElement {
    const button = new CartButton().getHtmlElement();
    button.classList.add('app-header__cart-btn');

    button.addEventListener('click', () => {
      this.router.navigate(routes.cart());
    });

    return button;
  }

  private createProfileButton(): HTMLElement {
    const profileBtn = new ProfileBtn();
    Auth.subscribe(profileBtn);
    return profileBtn.getHtmlElement() as HTMLElement;
    /*const icon = new Icon({ id: profileIcon.id, viewBox: profileIcon.viewBox });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    const buttonElement = button.getHtmlElement();
    buttonElement.classList.add('app-header__profile-btn');

    // TODO: show menu with login/register links
    buttonElement.addEventListener('click', () => {
      this.router.navigate(routes.login());
    });

    return buttonElement;*/
  }

  private createLogoutButton(): HTMLElement {
    const logoutBtn = new LogoutBtn();
    Auth.subscribe(logoutBtn);
    return logoutBtn.getHtmlElement() as HTMLElement;
  }
}
