import { ProductProjection } from '@commercetools/platform-sdk';
import { BaseView } from '../../base-view';
import { AppRouter } from '../../../router';
import { routes } from '../../../../routes';
import './search-results.scss';

export default class SearchResults extends BaseView {
  private content = document.createElement('div');
  constructor() {
    super();
    this.createView();
    this.hide();
  }
  private createView() {
    const wrapper = document.createElement('div');
    wrapper.className = 'search-results';
    this.content.className = 'search-results__content';
    wrapper.appendChild(this.content);
    this.htmlElement = wrapper;
    this.htmlElement.addEventListener('click', () => console.log('click'));
  }

  public setContent(prods: ProductProjection[]) {
    this.content.innerHTML = '';
    if (prods.length === 0) {
      this.content.textContent = 'Ничего не найдено.';
      return;
    }
    prods.forEach((prod) => {
      const wrapper = document.createElement('div');
      wrapper.textContent = prod.name.ru;
      wrapper.className = 'search-results__result';
      wrapper.addEventListener('click', () => {
        AppRouter.getInstance().navigate(routes.product(prod.id));
      });
      this.content.appendChild(wrapper);
    });
  }

  public reveal(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }
}
