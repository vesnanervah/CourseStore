import { BaseView } from '../../base-view';
import { State } from '../../../../state';
import { IconButton } from '../../icon-button';
import { Icon } from '../../icon';
import cartIcon from '../../../../assets/images/icons/cart.svg';

import { StateKeys } from '../../../../types';

export class CartButton extends BaseView<HTMLElement> {
  private state: State = State.getInstance();
  private counter: IconButton;

  constructor() {
    super();
    const icon = new Icon({ id: cartIcon.id, viewBox: cartIcon.viewBox });
    const button = new IconButton({ icon: icon.getHtmlElement() });
    this.counter = button;
    const itemsCount = this.state.getValue(StateKeys.CartItemIds).length;
    this.counter.setBadgeContent(String(itemsCount || ''));
    this.htmlElement = button.getHtmlElement();

    this.init();
  }

  private init(): void {
    this.state.subscribe(StateKeys.CartItemIds, this.updateCount.bind(this));
  }

  private updateCount(items: string[]): void {
    this.counter.setBadgeContent(String(items.length || ''));
  }
}
