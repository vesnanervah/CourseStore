import './search-field.scss';
import { BaseView } from '../../base-view';
import { TextField } from '../../text-field';
import { Icon } from '../../icon';
import { IconButton } from '../../icon-button';
import searchIcon from '../../../../assets/images/icons/search.svg';
import EcommerceClient from '../../../commerce/BuildClient';
import SearchResults from './search-results';

export class SearchField extends BaseView<HTMLElement> {
  private searchResults = new SearchResults();

  constructor() {
    super();
    this.createElement();
    this.htmlElement?.appendChild(this.searchResults.getHtmlElement());
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
    const sfInput = searchField.getInputElem();
    sfInput.addEventListener('keyup', () => this.handleInput(searchField.getInputElem()));
    const searchFieldElement = searchField.getHtmlElement();
    searchFieldElement.classList.add('search-field__input');
    container.append(searchFieldElement);
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

  private handleInput(field: HTMLInputElement) {
    const typed = field.value;
    if (typed.length === 0) {
      this.searchResults.hide();
      return;
    }
    this.searchQuery(typed);
  }

  private async searchQuery(query: string) {
    const prods = await EcommerceClient.getProductByQuery(5, query);
    this.searchResults.setContent(prods);
    (this.searchResults.getHtmlElement() as HTMLElement).style.top = `${
      (this.htmlElement as HTMLElement).getBoundingClientRect().y + 40
    }px`;
    this.searchResults.reveal();
  }
}
