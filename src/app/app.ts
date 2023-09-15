import './app.scss';
import { routes } from '../routes';
import { AppRouter, type UrlParams } from '../features/router';
import { CartPage } from '../pages/cart/cart-page';
import {
  MainPage,
  LoginPage,
  SignupPage,
  CustomerPage,
  CatalogPage,
  ProductPage,
  ProductTypePage,
  CategoryPage,
  AboutUsPage,
  NotFoundPage,
} from '../pages';
import Auth from '../features/auth/auth';

export class App {
  private appContainer: HTMLElement;
  private router: AppRouter = AppRouter.getInstance();

  constructor(root: HTMLElement) {
    this.appContainer = this.createAppContainer();

    Auth.init();

    root.append(this.appContainer);
  }

  public start(): void {
    this.router.setRoutes(
      [
        { location: routes.main(), callback: this.renderMainPage.bind(this) },
        { location: routes.login(), callback: this.renderLoginPage.bind(this) },
        { location: routes.signup(), callback: this.renderSignupPage.bind(this) },
        { location: routes.customer(), callback: this.renderCustomerPage.bind(this) },
        { location: routes.catalog(), callback: this.renderCatalogPage.bind(this) },
        { location: routes.product(':id'), callback: this.renderProductPage.bind(this) },
        { location: routes.productType(':id'), callback: this.renderProductTypePage.bind(this) },
        { location: routes.category(':id'), callback: this.renderCategoryPage.bind(this) },
        { location: routes.about(), callback: this.renderAboutPage.bind(this) },
        { location: routes.cart(), callback: this.renderCartPage.bind(this) },
      ],
      {
        callback: this.renderNotFoundPage.bind(this),
      },
    );
    this.router.init();
  }

  private createAppContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('app');

    return container;
  }

  private renderMainPage(): void {
    this.appContainer.innerHTML = '';

    const page = new MainPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderLoginPage(): void {
    this.appContainer.innerHTML = '';

    const page = new LoginPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderSignupPage(): void {
    this.appContainer.innerHTML = '';

    const page = new SignupPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderCustomerPage(): void {
    this.appContainer.innerHTML = '';

    const page = new CustomerPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderCatalogPage(): void {
    this.appContainer.innerHTML = '';

    const page = new CatalogPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderProductPage(params?: UrlParams): void {
    this.appContainer.innerHTML = '';

    const page = new ProductPage();
    if (params) {
      page.init(params.id);
    }
    this.appContainer.append(page.getHtmlElement());
  }

  private renderProductTypePage(params?: UrlParams): void {
    this.appContainer.innerHTML = '';

    if (!params) {
      return;
    }
    const page = new ProductTypePage({ typeId: params.id });
    this.appContainer.append(page.getHtmlElement());
  }

  private renderCategoryPage(params?: UrlParams): void {
    this.appContainer.innerHTML = '';

    if (!params) {
      return;
    }
    const page = new CategoryPage({ categoryId: params.id });
    this.appContainer.append(page.getHtmlElement());
  }

  private renderAboutPage(): void {
    this.appContainer.innerHTML = '';

    const page = new AboutUsPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderNotFoundPage(): void {
    this.appContainer.innerHTML = '';

    const page = new NotFoundPage();
    this.appContainer.append(page.getHtmlElement());
  }

  private renderCartPage(): void {
    this.appContainer.innerHTML = '';
    const page = new CartPage();
    this.appContainer.append(page.getHtmlElement());
  }
}
