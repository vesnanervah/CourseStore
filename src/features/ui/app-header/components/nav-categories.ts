import './nav-categories.scss';
import { BaseView } from '../../base-view';
import { State } from '../../../../state';

import { ProductCategory, StateKeys } from '../../../../types';
import { routes } from '../../../../routes';
import { Wrapper } from '../../wrapper';

type NavItem = {
  id: string;
  label: string;
  link: string;
};

export class NavCategories extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private categories: ProductCategory[] = [];
  private categoryListElement: HTMLElement = NavCategories.createCategoryList();

  constructor() {
    super();

    this.createElement();
  }

  public init(): void {
    this.state.subscribe(StateKeys.NAV_CATEGORIES, this.setCategories.bind(this));
    // TODO: show skeleton items on categories load
  }

  private createElement(): void {
    const container = document.createElement('div');
    container.classList.add('nav-categories');

    const wrapper = new Wrapper().getHtmlElement();
    wrapper.classList.add('nav-categories__wrapper');
    container.append(wrapper);

    const logo = NavCategories.createLogo();
    wrapper.append(logo);

    wrapper.append(this.categoryListElement);

    this.htmlElement = container;
  }

  private static createLogo(): HTMLElement {
    const logo = document.createElement('a');
    logo.href = routes.main();
    logo.classList.add('app-logo');

    return logo;
  }

  private static createCategoryList(): HTMLElement {
    const categoryList = document.createElement('ul');
    categoryList.classList.add('nav-categories__list');

    return categoryList;
  }

  private static createNavItem({ label, link }: NavItem): HTMLElement {
    const sideNavItem = document.createElement('div');
    sideNavItem.classList.add('nav-categories__item');

    const sideNavLink = document.createElement('a');
    sideNavLink.classList.add('nav-categories__link', 'text-nav-item');
    sideNavLink.href = link;
    sideNavLink.textContent = label;
    sideNavItem.append(sideNavLink);

    return sideNavItem;
  }

  private renderCategories(): void {
    if (!this.categoryListElement) {
      return;
    }

    this.categoryListElement.innerHTML = '';
    this.categories.forEach(({ id, name, slug }) => {
      const navItem = NavCategories.createNavItem({
        id,
        label: name,
        link: routes.category(slug),
      });
      this.categoryListElement.append(navItem);
    });
  }

  private setCategories(categories: ProductCategory[]): void {
    this.categories = categories;
    this.renderCategories();
  }
}
