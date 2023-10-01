import { BaseView } from '../../features/ui';
import './cart.scss';
import EmptyBlock from './empty-block';
import ItemsBlock from './items-block';
import PriceBlock from './price-block';
import CartModel from '../../features/cart/cart-model';
import { CartSubscriber } from '../../types/cart-sub';
import PageLoad from '../../features/ui/page-load/page-load';

export default class CartView extends BaseView<HTMLElement> implements CartSubscriber {
  private emptyBlock = new EmptyBlock();
  private itemsBlock = new ItemsBlock();
  private priceBlock = new PriceBlock();
  private pageLoad = new PageLoad();

  constructor() {
    super();
    this.htmlElement = this.createView();
    CartModel.subscribeToChanges(this);
    const cart = CartModel.getCart();
    if (cart) {
      this.itemsBlock.drawItems();
      this.setViewMod(cart.lineItems.length);
      this.priceBlock.setTotalPrice(CartModel.getCart().totalPrice.centAmount / 100);
    } else {
      //this.setViewMod(0); //Cart не инициализированна, следовательно айтемов внутри пока что нет, то есть 0
      this.startLoad();
    }
  }

  private createView() {
    const wrapper = document.createElement('div');
    wrapper.append(
      this.emptyBlock.getHtmlElement(),
      this.itemsBlock.getHtmlElement(),
      this.priceBlock.getHtmlElement(),
      this.pageLoad.getHtmlElement(),
    );
    wrapper.className = 'cart';
    return wrapper;
  }

  public listenUpdate(): void {
    this.finishLoad();
    this.setViewMod(CartModel.getCart().lineItems.length);
    this.priceBlock.setTotalPrice(CartModel.getCart().totalPrice.centAmount / 100);
  }

  private setViewMod(count: number) {
    if (count) {
      this.emptyBlock.hide();
      this.priceBlock.appear();
      this.itemsBlock.appear();
    } else {
      this.emptyBlock.appear();
      this.priceBlock.hide();
      this.itemsBlock.hide();
    }
  }

  private startLoad() {
    this.pageLoad.startLoad();
    this.pageLoad.reveal();
    this.priceBlock.hide();
    this.emptyBlock.hide();
    this.itemsBlock.hide();
  }

  private finishLoad() {
    this.pageLoad.hide();
  }
}
