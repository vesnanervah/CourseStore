import { BaseView } from '../../features/ui';
import { Cart } from '@commercetools/platform-sdk';
import { CartSubscriber } from '../../types/cart-sub';
import CartModel from '../../features/cart/cart-model';
import CartItem from './cart-item';

export default class ItemsBlock extends BaseView implements CartSubscriber {
  private clearBtn: HTMLButtonElement;
  private itemsContainer: HTMLDivElement;
  private cart: Cart;

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
    this.clearBtn.textContent = 'очистить';
    this.itemsContainer.className = 'cart__items';
    this.htmlElement.append(header, this.clearBtn, this.itemsContainer);
    this.clearBtn.addEventListener('click', () => this.clearItems());
    CartModel.subscribeToChanges(this);
    this.cart = CartModel.getCart();
  }

  public appear(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }

  public listenUpdate(): void {
    this.cart = CartModel.getCart();
    this.drawItems();
  }

  public drawItems(): void {
    this.clearItems();
    if (this.cart.lineItems.length === 0) {
      return;
    }
    this.cart.lineItems.forEach((item) =>
      this.itemsContainer.appendChild(new CartItem(item).getHtmlElement()),
    );
  }

  private clearItems(): void {
    this.itemsContainer.innerHTML = '';
  }
}
