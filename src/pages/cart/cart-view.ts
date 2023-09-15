import { BaseView } from '../../features/ui';
import './cart.scss';
import EmptyBlock from './empty-block';
import ItemsBlock from './items-block';
import PriceBlock from './price-block';

export default class CartView extends BaseView {
  private emptyBlock = new EmptyBlock();
  private itemsBlock = new ItemsBlock();
  private priceBlock = new PriceBlock();

  constructor() {
    super();
    this.createView();
  }

  private createView() {
    this.htmlElement = document.createElement('div');
    this.htmlElement.append(
      this.emptyBlock.getHtmlElement(),
      this.itemsBlock.getHtmlElement(),
      this.priceBlock.getHtmlElement(),
    );
    this.htmlElement.className = 'cart';
  }
}
