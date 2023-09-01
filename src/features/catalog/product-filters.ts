import './product-filters.scss';
import { BaseView, SelectField } from '../ui';
import { State } from '../../state';

import { StateKeys, type ProductCategory } from '../../types';

export type Filter = {
  categories: string[];
  price: string;
};

type ProductFiltersProps = {
  onSubmit: (filter: Filter) => void;
};

export class ProductFilters extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private categories: ProductCategory[] = [];
  private handleSubmit: ProductFiltersProps['onSubmit'];
  private categoryFieldContainer: HTMLElement | null = null;
  private filter: Filter = {
    categories: [],
    price: '',
  };

  constructor(props: ProductFiltersProps) {
    super();

    this.handleSubmit = props.onSubmit;
    this.createElement();
    this.init();
    this.renderCategoryField();
  }

  private init(): void {
    this.categories = this.state.getValue(StateKeys.Categories);
    this.state.subscribe(StateKeys.Categories, (newCategories) => {
      this.categories = newCategories;
      this.renderCategoryField();
    });
  }

  private createElement(): void {
    const container = document.createElement('div');
    container.classList.add('product-filters');

    const form = document.createElement('form');
    form.classList.add('product-filters__form');
    container.append(form);

    // Направление
    const categoryFieldContainer = document.createElement('div');
    form.append(categoryFieldContainer);
    this.categoryFieldContainer = categoryFieldContainer;

    const categoryField = new SelectField({
      name: 'category',
      label: 'Направления',
      options: [],
      onChange: this.handleSelectChange.bind(this),
      multiselect: true,
    }).getHtmlElement();
    categoryFieldContainer.append(categoryField);

    // Уровень
    // TODO: add level filter

    // Стоимость
    // TODO: add price filter

    this.htmlElement = container;
  }

  private renderCategoryField(): void {
    const container = this.categoryFieldContainer;
    if (!container) {
      return;
    }

    container.innerHTML = '';

    // TODO: get initial option values from url params
    const categoryOptions = this.categories.map((c) => ({
      id: c.id,
      name: c.id,
      label: c.name,
      value: false,
    }));
    const categoryField = new SelectField({
      name: 'categories',
      label: 'Направления',
      options: categoryOptions,
      onChange: this.handleSelectChange.bind(this),
      multiselect: true,
    }).getHtmlElement();

    container.append(categoryField);
  }

  private handleSelectChange(name: string, options: string[]): void {
    if (name === 'categories') {
      this.filter.categories = options;
    }

    // TODO: update url params

    this.handleSubmit(this.filter);
  }
}
