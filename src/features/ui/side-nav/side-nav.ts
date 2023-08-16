/*import './side-nav.scss';
import { BaseView } from '../base-view';
import { State } from '../../../state';
//import { routes } from '../../../routes';
import { IconButton } from '../icon-button';
import closeIcon from '../../../assets/images/icons/close.svg';

import { StateKeys, SideNavStatus } from '../../../types';
import { Icon } from '../icon';

type NavItem = {
  id: string;
  label: string;
  link: string;
};

const MAIN_PAGE_NAV_ITEM: NavItem = { id: 'main', label: 'Главная', link: routes.main() };
const ABOUT_PAGE_NAV_ITEM: NavItem = { id: 'about', label: 'О нас', link: routes.about() };
// TODO: replace with API data
const CATEGORY_NAV_ITEMS: NavItem[] = [
  { id: 'category-frontend', label: 'Frontend', link: routes.category('frontend') },
  { id: 'category-backend', label: 'Backend', link: routes.category('backend') },
  { id: 'category-ui-ux', label: 'Дизайн и UX', link: routes.category('ui-ux') },
  { id: 'category-testing', label: 'Тестирование', link: routes.category('testing') },
  { id: 'category-data-science', label: 'Data Science', link: routes.category('data-science') },
  { id: 'category-analytics', label: 'Аналитика', link: routes.category('analytics') },
];

export class SideNav extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private overlayElement: HTMLElement = SideNav.createOverlay();
  private closeButtonElement: HTMLElement = SideNav.createCloseButton();

  constructor() {
    super();

    this.createElement();
  }

  public init(): void {
    this.state.subscribe(StateKeys.SIDE_NAV_STATUS, this.render.bind(this));
    this.overlayElement.addEventListener('click', () => {
      this.state.setValue(StateKeys.SIDE_NAV_STATUS, false);
    });
    this.closeButtonElement.addEventListener('click', () => {
      this.state.setValue(StateKeys.SIDE_NAV_STATUS, false);
    });
  }

  private render(sideNavOpen: SideNavStatus): void {
    if (sideNavOpen) {
      this.showSideNav();
    } else {
      this.hideSideNav();
    }
  }

  private showSideNav(): void {
    const container = this.getHtmlElement();
    container.classList.add('side-nav--show');

    this.showOverlay();
  }

  private hideSideNav(): void {
    const container = this.getHtmlElement();
    container.classList.remove('side-nav--show');

    this.hideOverlay();
  }

  private showOverlay(): void {
    this.overlayElement.classList.add('overlay--show');
    document.body.classList.add('overflow-hidden');
  }

  private hideOverlay(): void {
    this.overlayElement.classList.remove('overlay--show');
    document.body.classList.remove('overflow-hidden');
  }

  private createElement(): void {
    const sideNav = this.createSideNav();

    sideNav.append(this.overlayElement);

    this.htmlElement = sideNav;
  }

  private createSideNav(): HTMLElement {
    const sideNav = document.createElement('nav');
    sideNav.classList.add('side-nav');
    sideNav.addEventListener('click', this.handleNavClick.bind(this));

    const sideNavContent = document.createElement('div');
    sideNavContent.classList.add('side-nav__content');
    sideNav.append(sideNavContent);

    // Main page section
    sideNavContent.append(SideNav.createMainPageSection());
    sideNavContent.append(SideNav.createDivider());

    // Categories section
    sideNavContent.append(SideNav.createCategoriesSection());
    sideNavContent.append(SideNav.createDivider());

    // About page section
    sideNavContent.append(SideNav.createAboutPageSection());

    // Close button
    sideNavContent.append(this.closeButtonElement);

    return sideNav;
  }

  private handleNavClick(e: Event): void {
    if (e.target instanceof HTMLAnchorElement) {
      this.hideSideNav();
    }
  }

  private static createMainPageSection(): HTMLElement {
    const section = SideNav.createSection();

    const list = SideNav.createSideNavList();
    list.append(SideNav.createSideNavItem(MAIN_PAGE_NAV_ITEM));
    section.append(list);

    return section;
  }

  private static createCategoriesSection(): HTMLElement {
    const section = SideNav.createSection('Направления подготовки');

    const list = SideNav.createSideNavList();
    CATEGORY_NAV_ITEMS.forEach((item) => {
      const navItem = SideNav.createSideNavItem(item);
      list.append(navItem);
    });
    section.append(list);

    return section;
  }

  private static createAboutPageSection(): HTMLElement {
    const section = SideNav.createSection();

    const list = SideNav.createSideNavList();
    list.append(SideNav.createSideNavItem(ABOUT_PAGE_NAV_ITEM));
    section.append(list);

    return section;
  }

  private static createSideNavList(): HTMLElement {
    const sideNavList = document.createElement('ul');
    sideNavList.classList.add('side-nav__list');

    return sideNavList;
  }

  private static createSection(title?: string): HTMLElement {
    const section = document.createElement('div');
    section.classList.add('side-nav__section');

    if (title) {
      const titleElement = document.createElement('p');
      titleElement.classList.add('side-nav__section-title', 'text-h4', 'text-secondary');
      titleElement.textContent = title;
      section.append(titleElement);
    }

    return section;
  }

  private static createSideNavItem({ label, link }: NavItem): HTMLElement {
    const sideNavItem = document.createElement('div');
    sideNavItem.classList.add('side-nav__item');

    const sideNavLink = document.createElement('a');
    sideNavLink.classList.add('side-nav__link', 'text-nav-item');
    sideNavLink.href = link;
    sideNavLink.textContent = label;
    sideNavItem.append(sideNavLink);

    return sideNavItem;
  }

  private static createCloseButton(): HTMLElement {
    const icon = new Icon({ id: closeIcon.id, viewBox: closeIcon.viewBox });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    const buttonElement = button.getHtmlElement();
    buttonElement.classList.add('side-nav__close-btn');
    buttonElement.title = 'Закрыть меню';

    return buttonElement;
  }

  private static createOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.classList.add('side-nav__overlay');

    return overlay;
  }

  private static createDivider(): HTMLElement {
    const divider = document.createElement('hr');
    divider.classList.add('divider');

    return divider;
  }
}
*/
