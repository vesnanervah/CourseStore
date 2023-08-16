import './app.scss';
import { MainPage } from '../pages';

export class App {
  private appContainer: HTMLElement;

  constructor(root: HTMLElement) {
    this.appContainer = this.createAppContainer();

    root.append(this.appContainer);
  }

  public start(): void {
    this.renderMainPage();
  }

  private createAppContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('app');

    return container;
  }

  private renderMainPage(): void {
    const page = new MainPage();

    this.appContainer.append(page.getHtmlElement());
  }
}
