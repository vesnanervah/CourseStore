import { BaseView } from '../features/ui';
import { MainLayout } from '../features/layouts';

export class MainPage extends BaseView {
  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const categories = document.createElement('div');
    categories.classList.add('catalog-categories');
    categories.textContent = 'Categories';
    fragment.append(categories);

    const layout = new MainLayout(fragment);

    this.htmlElement = layout.getHtmlElement();
  }
}
