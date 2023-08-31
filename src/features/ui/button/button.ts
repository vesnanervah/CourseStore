import './button.scss';
import { BaseView } from '../base-view';

type ButtonProps = {
  text: string;
  component?: 'button' | 'a';
  type?: HTMLButtonElement['type'];
  href?: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
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
};

export class Button extends BaseView<HTMLButtonElement | HTMLAnchorElement> {
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

    const btnText = document.createElement('span');
    btnText.textContent = btnProps.text;
    btnText.classList.add('btn__text');
    btn.append(btnText);

    this.htmlElement = btn;
  }
}
