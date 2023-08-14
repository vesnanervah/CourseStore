import { MainPage } from '../pages';

export class App {
  private rootElement: HTMLElement;

  constructor(root: HTMLElement) {
    this.rootElement = root;
  }

  public start(): void {
    this.renderMainPage();
  }

  private renderMainPage(): void {
    const page = new MainPage();

    this.rootElement.append(page.getHtmlElement());
  }
}
