import './select-field.scss';
import { BaseView } from '../base-view';
import { Button } from '../button';

type Option = {
  id: string;
  name: string;
  value: boolean;
  label: string;
};

type InputType = 'radio' | 'checkbox';

type SelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
  onChange: (key: string, values: string[]) => void;
  multiselect?: boolean;
};

export class SelectField extends BaseView<HTMLElement> {
  private open: boolean = false;
  private options: Option[] = [];
  private optionList: HTMLElement | null = null;

  constructor(props: SelectFieldProps) {
    super();

    this.options = props.options;
    this.createElement(props);
  }

  private createElement(props: SelectFieldProps): void {
    const { name, label, multiselect = false } = props;

    const container = document.createElement('div');
    container.classList.add('select-field');

    const btnIcon = document.createElement('span');
    btnIcon.classList.add('select-field__icon');

    const optionList = document.createElement('ul');
    optionList.classList.add('select-field__option-list');
    container.append(optionList);
    this.optionList = optionList;

    const btn = new Button({ text: label, variant: 'outlined', icon: btnIcon }).getHtmlElement();
    btn.classList.add('filter');
    btn.addEventListener('click', () => {
      this.setOptionsState(!this.open);
    });
    container.append(btn);

    const type = multiselect ? 'checkbox' : 'radio';
    this.options.forEach((option) => {
      const optionItem = document.createElement('li');
      optionItem.classList.add('select-field__option-item');

      const input = this.createInput(type, name, option, (e: Event) =>
        this.handleChange.call(this, e, props.onChange),
      );
      optionItem.append(input);

      optionList.append(optionItem);
    });

    this.htmlElement = container;
  }

  private createInput(
    type: InputType,
    name: string,
    option: Option,
    onChange: (e: Event) => void,
  ): HTMLElement {
    const label = document.createElement('label');
    label.classList.add('select-input');

    const input = document.createElement('input');
    input.classList.add('select-input__input', 'sr-only');
    input.type = type;
    input.name = name;
    input.value = option.name;
    input.checked = option.value;
    input.addEventListener('change', onChange);
    label.append(input);

    const inputIcon = this.createInputIcon(type);
    label.append(inputIcon);

    const labelText = document.createElement('span');
    labelText.classList.add('select-input__label-text', 'text-btn');
    labelText.textContent = option.label;
    label.append(labelText);

    return label;
  }

  private createInputIcon(type: InputType): HTMLElement {
    const icon = document.createElement('span');
    icon.classList.add('select-input__icon', `select-input__icon--type--${type}`);
    return icon;
  }

  private setOptionsState(open: boolean): void {
    if (!this.optionList) {
      return;
    }
    this.open = open;
    this.optionList.classList[open ? 'add' : 'remove']('select-field__option-list--open');
  }

  private handleChange(e: Event, onChange: SelectFieldProps['onChange']): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const { name, value, checked } = e.target;
    const option = this.options.find((o) => o.name === value);
    if (!option) {
      return;
    }

    option.value = checked;
    onChange(
      name,
      this.options.filter((o) => o.value).map((o) => o.name),
    );
  }
}
