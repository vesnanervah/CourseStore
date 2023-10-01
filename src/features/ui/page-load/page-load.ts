import { BaseView } from '../base-view';
import './page-load.scss';

export default class PageLoad extends BaseView<HTMLElement> {
  constructor() {
    super();
    this.htmlElement = this.createElement();
  }

  private createElement() {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__load';
    return wrapper;
  }

  public reveal() {
    this.htmlElement?.classList.remove('hidden');
  }

  public hide() {
    this.htmlElement?.classList.add('hidden');
  }

  public startLoad() {
    (this.htmlElement as HTMLDivElement).textContent = 'Загрузка...';
  }

  public failLoad() {
    (this.htmlElement as HTMLDivElement).textContent = 'Продукт недоступен. Попробуйте позже';
  }
}
