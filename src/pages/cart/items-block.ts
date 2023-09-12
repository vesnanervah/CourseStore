import { BaseView } from '../../features/ui';
import { LineItem } from '@commercetools/platform-sdk';

export default class ItemsBlock extends BaseView {
  private clearBtn: HTMLButtonElement;
  private items: LineItem[] = [];
  private itemsContainer: HTMLDivElement;

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.clearBtn = document.createElement('button');
    this.itemsContainer = document.createElement('div');
    const header = document.createElement('div');
    header.textContent = 'Корзина';
    this.htmlElement.className = 'cart__items-block cart__block';
    header.className = 'cart__header';
    this.clearBtn.className = 'cart__clear-btn';
    this.itemsContainer.className = 'cart__items';
    this.htmlElement.append(header, this.clearBtn, this.itemsContainer);
  }

  public appear(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }
}
