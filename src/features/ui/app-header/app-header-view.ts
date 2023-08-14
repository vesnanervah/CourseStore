import './app-header.scss';
import { BaseView } from '../base-view';

import { PageSlug } from '../../../types';

import { SideNavToggle } from './components/side-nav-toggle';
import { SearchField } from './components/search-field';
import { Wrapper } from '../wrapper/wrapper';

type NavClickHandler = (pageSlug: PageSlug) => void;

export class AppHeaderView extends BaseView {
  private navLinkClickHandler: NavClickHandler;

  constructor(navLinkClickHandler: NavClickHandler) {
    super();

    this.navLinkClickHandler = navLinkClickHandler;
    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const header = document.createElement('header');
    header.classList.add('app-header');

    const wrapper = new Wrapper().getHtmlElement();
    header.append(wrapper);

    const content = this.createAppHeaderContent();
    wrapper.append(content);

    const sideNavToggle = new SideNavToggle({ onClick: this.handleSideNavToggleClick.bind(this) });
    content.append(sideNavToggle.getHtmlElement());

    const userButtons = this.createUserButtons();
    content.append(userButtons);

    fragment.append(header);

    this.htmlElement = fragment;
  }

  private createAppHeaderContent(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('app-header__content');

    return container;
  }

  private createUserButtons(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('app-header__user-buttons');

    const search = this.createSearchField();
    container.append(search);

    // TODO: add cart button
    // TODO: add profile button

    return container;
  }

  private createSearchField(): HTMLElement {
    const searchField = new SearchField();

    return searchField.getHtmlElement() as HTMLElement;
  }

  private handleSideNavToggleClick(e: MouseEvent) {
    e.preventDefault();
    // TODO: handle event
    console.log(e);
  }
}
