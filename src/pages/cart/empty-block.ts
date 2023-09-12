import { BaseView } from '../../features/ui';

export default class EmptyBlock extends BaseView {
  private btn: HTMLButtonElement;

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    const header = document.createElement('div');
    const text = document.createElement('div');
    this.btn = document.createElement('button');
    header.textContent = 'Корзина';
    text.textContent = 'В вашей корзине пусто. Добавьте товары и они появятся здесь';
    this.btn.textContent = 'КАТАЛОГ';
    this.htmlElement.className = 'cart__empty-block cart__block';
    header.className = 'cart__header';
    text.className = 'cart__emptytext';
    this.btn.className = 'cart__accent-btn';
    this.htmlElement.append(header, text, this.btn);
  }

  public appear(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }

  public setBtnListener(f: () => void): void {
    this.btn.onclick = f;
  }
}
