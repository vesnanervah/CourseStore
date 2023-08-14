import { BaseView } from '../../base-view';
import { TextField } from '../../text-field';
import { Icon } from '../../icon';
import { IconButton } from '../../icon-button';
import searchIcon from '../../../../assets/images/icons/search.svg';

export class SearchField extends BaseView {
  constructor() {
    super();

    this.createElement();
  }

  private createElement(): void {
    const fragment = document.createDocumentFragment();

    const searchFieldIcon = new Icon({
      id: searchIcon.id,
      viewBox: searchIcon.viewBox,
    });
    const searchFieldIconElement = searchFieldIcon.getHtmlElement();
    searchFieldIconElement.classList.add('text-field__icon');

    const searchField = new TextField({
      placeholder: 'Поиск',
      icon: searchFieldIconElement,
    });
    const searchFieldElement = searchField.getHtmlElement();
    searchFieldElement.classList.add('app-header__search');
    fragment.append(searchFieldElement);

    const searchToggleIcon = new Icon({
      id: searchIcon.id,
      viewBox: searchIcon.viewBox,
    });

    const searchToggle = new IconButton({
      type: 'button',
      icon: searchToggleIcon.getHtmlElement() as HTMLElement,
    });
    const searchToggleElement = searchToggle.getHtmlElement();
    searchToggleElement.classList.add('app-header__search-toggle');
    fragment.append(searchToggleElement);

    this.htmlElement = fragment;
  }
}
