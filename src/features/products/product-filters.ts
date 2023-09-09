import './product-filters.scss';
import { BaseView, SelectField } from '../ui';
import { State } from '../../state';

import { StateKeys, type ProductCategory } from '../../types';

export type Filter = {
  categories: string[];
  level: 'Beginner' | 'Experienced' | 'Any' | null;
  price: string;
};

type ActiveFilters = {
  categories: boolean;
  level: boolean;
  price: boolean;
};

type ProductFiltersProps = {
  activeFilters?: Partial<ActiveFilters>;
  onSubmit: (filter: Filter) => void;
};

const defaultFilters: ActiveFilters = {
  categories: true,
  level: true,
  price: true,
};

export class ProductFilters extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private categories: ProductCategory[] = [];
  private handleSubmit: ProductFiltersProps['onSubmit'];
  private categoryFieldContainer: HTMLElement | null = null;
  private activeFilters: ActiveFilters;
  private filter: Filter = {
    categories: [],
    level: null,
    price: '',
  };

  constructor(props: ProductFiltersProps) {
    super();

    this.handleSubmit = props.onSubmit;
    this.activeFilters = { ...defaultFilters, ...props.activeFilters };
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
    if (this.activeFilters.categories) {
      const categoryField = this.createCategoryField();
      form.append(categoryField);
    }

    // Уровень
    if (this.activeFilters.level) {
      const levelField = this.createLevelField();
      form.append(levelField);
    }

    // Стоимость
    // TODO: add price filter

    this.htmlElement = container;
  }

  private createCategoryField(): HTMLElement {
    const categoryFieldContainer = document.createElement('div');
    this.categoryFieldContainer = categoryFieldContainer;

    const categoryField = new SelectField({
      name: 'category',
      label: 'Направления',
      options: [],
      onChange: this.handleSelectChange.bind(this),
      multiselect: true,
    }).getHtmlElement();
    categoryFieldContainer.append(categoryField);

    return categoryFieldContainer;
  }

  private createLevelField(): HTMLElement {
    const levelFieldContainer = document.createElement('div');

    const levelField = new SelectField({
      name: 'level',
      label: 'Уровень',
      options: [
        { id: 'any', label: 'Любой', name: 'Any', value: true },
        { id: 'beginner', label: 'Для начинающих', name: 'Beginner', value: false },
        { id: 'experienced', label: 'С опытом', name: 'Experienced', value: false },
      ],
      onChange: this.handleSelectChange.bind(this),
    }).getHtmlElement();
    levelFieldContainer.append(levelField);

    return levelFieldContainer;
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
    if (name === 'level') {
      this.filter.level = options[0] as Filter['level'];
    }
    console.log(name, options);

    // TODO: update url params

    this.handleSubmit(this.filter);
  }
}
