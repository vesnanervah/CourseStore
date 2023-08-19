import { BaseView } from '../features/ui';
import { MainLayout } from '../features/layouts';

export class NotFoundPage extends BaseView {
  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Not Found';
    fragment.append(pageTitle);

    const layout = new MainLayout(fragment);
    this.htmlElement = layout.getHtmlElement();
  }
}
