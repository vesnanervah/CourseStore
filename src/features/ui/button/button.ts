import './button.scss';
import { BaseView } from '../base-view';

type ButtonProps = {
  text?: string;
  component?: 'button' | 'a';
  type?: HTMLButtonElement['type'];
  href?: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  iconOnly?: boolean;
  color?: 'primary' | 'error' | 'disabled';
  icon?: HTMLElement;
};

const defaultProps: ButtonProps = {
  text: '',
  component: 'button',
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  fullWidth: false,
  iconOnly: false,
};

export class Button extends BaseView<HTMLButtonElement | HTMLAnchorElement> {
  private btnText = document.createElement('span');

  constructor(props: ButtonProps) {
    super();
    this.createElement(props);
  }

  private createElement(props: ButtonProps = { text: '' }): void {
    const btnProps = { ...defaultProps, ...props } as Required<ButtonProps>;

    const btn = document.createElement(btnProps.component);
    if (btnProps.component === 'button') {
      (btn as HTMLButtonElement).type = btnProps.type || 'button';
    }
    if (btnProps.component === 'a') {
      (btn as HTMLAnchorElement).href = btnProps.href || '';
    }
    btn.classList.add(
      'btn',
      `btn--variant--${btnProps.variant}`,
      `btn--size--${btnProps.size}`,
      `btn--color--${btnProps.color}`,
    );
    if (btnProps.fullWidth) {
      btn.classList.add('btn--full-width');
    }
    if (btnProps.iconOnly) {
      btn.classList.add('btn--icon-only');
    }

    if (btnProps.text) {
      this.btnText.textContent = btnProps.text;
      this.btnText.classList.add('btn__text');
      btn.append(this.btnText);
    }

    if (btnProps.icon) {
      btnProps.icon.classList.add('btn__icon');
      btn.append(btnProps.icon);
    }

    this.htmlElement = btn;
  }

  public changeBtnText(text: string) {
    this.btnText.textContent = text;
  }
}
