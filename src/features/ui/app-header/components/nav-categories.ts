import './nav-categories.scss';
import { BaseView } from '../../base-view';
import { Wrapper } from '../../wrapper';
import { State } from '../../../../state';
import { routes } from '../../../../routes';
import { AppRouter } from '../../../router';
import { ProductCategory, StateKeys } from '../../../../types';
import { Button } from '../../button';
import { Divider } from '../../divider';

type NavItem = {
  id: string;
  label: string;
  link: string;
};

export class NavCategories extends BaseView<DocumentFragment> {
  private state: State = State.getInstance();
  private router: AppRouter = AppRouter.getInstance();
  private categories: ProductCategory[] = [];
  private categoryListElement: HTMLElement = NavCategories.createCategoryList();
  private showMenu: boolean = false;

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

  // eslint-disable-next-line max-lines-per-function
  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const container = document.createElement('div');
    container.classList.add('nav-categories');
    fragment.append(container);

    const wrapper = new Wrapper().getHtmlElement();
    wrapper.classList.add('nav-categories__wrapper');
    container.append(wrapper);

    const logo = this.createLogo();
    wrapper.append(logo);

    const btnIcon = document.createElement('span');
    btnIcon.classList.add('icon', 'icon--chevron');
    const categoriesToggle = new Button({
      text: 'Все курсы',
      variant: 'outlined',
      icon: btnIcon,
    }).getHtmlElement();
    categoriesToggle.classList.add('nav-categories__toggle');
    categoriesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMenu();
      if (this.showMenu) {
        categoriesToggle.classList.add('nav-categories__toggle--show');
      } else {
        categoriesToggle.classList.remove('nav-categories__toggle--show');
      }
    });
    wrapper.append(categoriesToggle);

    const divider = new Divider({ direction: 'vertical' });
    wrapper.append(divider.getHtmlElement());

    const aboutLink = this.createNavItem({ id: 'about', label: 'О нас', link: routes.about() });
    wrapper.append(aboutLink);

    fragment.append(this.categoryListElement);

    this.htmlElement = fragment;
  }

  private toggleMenu(): void {
    if (this.showMenu) {
      this.categoryListElement.classList.remove('nav-categories__list--show');
    } else {
      this.categoryListElement.classList.add('nav-categories__list--show');
    }

    this.showMenu = !this.showMenu;
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
    const categoryList = document.createElement('div');
    categoryList.classList.add('nav-categories__list', 'wrapper');

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
    this.categories.forEach(({ id, name }) => {
      const navItem = new Button({
        component: 'a',
        text: name,
        size: 'small',
        variant: 'outlined',
      }).getHtmlElement();
      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        this.router.navigate(routes.category(id));
      });
      this.categoryListElement.append(navItem);
    });
  }

  private setCategories(categories: ProductCategory[]): void {
    this.categories = categories;
    this.renderCategories();
  }
}
