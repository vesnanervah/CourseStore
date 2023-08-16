import './search-field.scss';
import { BaseView } from '../../base-view';
import { TextField } from '../../text-field';
import { Icon } from '../../icon';
import { IconButton } from '../../icon-button';
import searchIcon from '../../../../assets/images/icons/search.svg';

export class SearchField extends BaseView<HTMLElement> {
  constructor() {
    super();

    this.createElement();
  }

  private createElement(): void {
    const container = document.createElement('div');
    container.classList.add('search-field');

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
    searchFieldElement.classList.add('search-field__input');
    container.append(searchFieldElement);

    // TODO: replace with IconButton and handle click
    const searchToggleIcon = new Icon({
      id: searchIcon.id,
      viewBox: searchIcon.viewBox,
    });

    const searchToggle = new IconButton({
      type: 'button',
      icon: searchToggleIcon.getHtmlElement() as HTMLElement,
    });
    const searchToggleElement = searchToggle.getHtmlElement();
    searchToggleElement.classList.add('search-field__toggle');
    container.append(searchToggleElement);

    this.htmlElement = container;
  }
}
