import './text-field.scss';
import { BaseView } from '../base-view';

type TextFieldProps = {
  type: HTMLInputElement['type'];
  label: string;
  placeholder: string;
  icon: HTMLElement | null;
  onChange: (e: Event) => void;
};

const DEFAULT_PROPS: TextFieldProps = {
  type: 'text',
  label: '',
  placeholder: '',
  icon: null,
  onChange() {
    //
  },
};

export class TextField extends BaseView<HTMLElement> {
  constructor(props: Partial<TextFieldProps> = {}) {
    super();

    this.createElement({
      ...DEFAULT_PROPS,
      ...props,
    });
  }

  private createElement(props: TextFieldProps): void {
    const { type, label, placeholder, icon, onChange }: TextFieldProps = props;

    const container = document.createElement('div');
    container.classList.add('text-field');

    if (label) {
      const label = document.createElement('label');
      label.classList.add('text-field__label');
      container.append(label);
    }

    const input = document.createElement('input');
    input.classList.add('text-field__input', 'input');
    input.type = type;
    input.placeholder = placeholder;
    input.addEventListener('change', onChange);
    container.append(input);

    if (icon) {
      container.append(icon);
    }

    this.htmlElement = container;
  }
}
