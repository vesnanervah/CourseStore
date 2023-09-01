import './nav-categories.scss';
import { BaseView } from '../../base-view';
import { Wrapper } from '../../wrapper';
import { State } from '../../../../state';
import { routes } from '../../../../routes';
import { AppRouter } from '../../../router';

import { ProductCategory, StateKeys } from '../../../../types';

type NavItem = {
  id: string;
  label: string;
  link: string;
};

export class NavCategories extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private router: AppRouter = AppRouter.getInstance();
  private categories: ProductCategory[] = [];
  private categoryListElement: HTMLElement = NavCategories.createCategoryList();

  constructor() {
    super();

    this.createElement();
  }

  public init(): void {
    this.categories = this.state.getValue(StateKeys.Categories);
    this.state.subscribe(StateKeys.Categories, this.setCategories.bind(this));

    this.renderCategories();
    // TODO: show skeleton items on categories load
  }

  private createElement(): void {
    const container = document.createElement('div');
    container.classList.add('nav-categories');

    const wrapper = new Wrapper().getHtmlElement();
    wrapper.classList.add('nav-categories__wrapper');
    container.append(wrapper);

    const logo = this.createLogo();
    wrapper.append(logo);

    wrapper.append(this.categoryListElement);

    this.htmlElement = container;
  }

  private createLogo(): HTMLElement {
    const logo = document.createElement('a');
    logo.href = routes.main();
    logo.classList.add('app-logo');
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate(routes.main());
    });

    return logo;
  }

  private static createCategoryList(): HTMLElement {
    const categoryList = document.createElement('ul');
    categoryList.classList.add('nav-categories__list');

    return categoryList;
  }

  private createNavItem({ label, link }: NavItem): HTMLElement {
    const sideNavItem = document.createElement('div');
    sideNavItem.classList.add('nav-categories__item');

    const sideNavLink = document.createElement('a');
    sideNavLink.classList.add('nav-categories__link', 'text-nav-item');
    sideNavLink.href = link;
    sideNavLink.textContent = label;
    sideNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate(link);
    });
    sideNavItem.append(sideNavLink);

    return sideNavItem;
  }

  private renderCategories(): void {
    if (!this.categoryListElement) {
      return;
    }

    this.categoryListElement.innerHTML = '';
    this.categories.forEach(({ id, name, slug }) => {
      const navItem = this.createNavItem({
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
