import './app.scss';
import { routes } from '../routes';
import { AppRouter } from '../features/router';
import { MainPage, LoginPage, NotFoundPage } from '../pages';

export class App {
  private appContainer: HTMLElement;
  private router: AppRouter = AppRouter.getInstance();

  constructor(root: HTMLElement) {
    this.appContainer = this.createAppContainer();

    root.append(this.appContainer);
  }

  public start(): void {
    this.renderMainPage();

    this.router.setRoutes(
      [
        { location: routes.main(), callback: this.renderMainPage.bind(this) },
        { location: routes.login(), callback: this.renderLoginPage.bind(this) },
      ],
      {
        location: routes.notFound(),
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

  private renderNotFoundPage(): void {
    this.appContainer.innerHTML = '';

    const page = new NotFoundPage();
    this.appContainer.append(page.getHtmlElement());
  }
}
