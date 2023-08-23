import './wrapper.scss';
import { BaseView } from '../base-view';

export class Wrapper extends BaseView<HTMLElement> {
  constructor() {
    super();

    this.createElement();
  }

  private createElement(): void {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    this.htmlElement = wrapper;
  }
}
