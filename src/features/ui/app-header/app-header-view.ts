import './app-header.scss';
import { BaseView } from '../base-view';

import { PageSlug } from '../../../types';

import { SideNavToggle } from './components/side-nav-toggle';
import { SearchField } from './components/search-field';
import { Wrapper } from '../wrapper/wrapper';
import { IconButton } from '../icon-button';
import { Icon } from '../icon';
import cartIcon from '../../../assets/images/icons/cart.svg';
import profileIcon from '../../../assets/images/icons/user.svg';
import { NavCategories } from './components/nav-categories';

type NavClickHandler = (pageSlug: PageSlug) => void;

export class AppHeaderView extends BaseView {
  private navLinkClickHandler: NavClickHandler;

  constructor(navLinkClickHandler: NavClickHandler) {
    super();

    this.navLinkClickHandler = navLinkClickHandler;
    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const header = document.createElement('header');
    header.classList.add('app-header');

    const wrapper = new Wrapper().getHtmlElement();
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

    return container;
  }

  private createSearchField(): HTMLElement {
    const searchField = new SearchField();
    const searchFieldElement = searchField.getHtmlElement();
    searchFieldElement.classList.add('app-header__search');

    return searchField.getHtmlElement();
  }

  private createCartButton(): HTMLElement {
    // TODO: add cart items counter
    const icon = new Icon({ id: cartIcon.id, viewBox: cartIcon.viewBox });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    const buttonElement = button.getHtmlElement();
    buttonElement.classList.add('app-header__cart-btn');

    return buttonElement;
  }

  private createProfileButton(): HTMLElement {
    const icon = new Icon({ id: profileIcon.id, viewBox: profileIcon.viewBox });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    const buttonElement = button.getHtmlElement();
    buttonElement.classList.add('app-header__profile-btn');

    return buttonElement;
  }
}
