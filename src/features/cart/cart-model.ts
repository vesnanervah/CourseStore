import EcommerceClient from '../commerce/BuildClient';
import BaseView from '../ui/base-view/base-view';
import {
  Cart,
  MyCartUpdate,
  MyCartAddLineItemAction,
  MyCartRemoveLineItemAction,
  MyCartChangeLineItemQuantityAction,
} from '@commercetools/platform-sdk';
import { State } from '../../state';
import { StateKeys } from '../../types';
import { CartSubscriber } from '../../types/cart-sub';

export default class CartModel extends BaseView {
  private static state: State = State.getInstance();
  private static cart: Cart;
  private static loadStatus = false;
  private static loadTimer: NodeJS.Timer;
  private static subscribers: CartSubscriber[] = [];

  constructor() {
    super();
  }

  public static async init() {
    try {
      this.cart = (await EcommerceClient.getRecentCart()).body;
    } catch {
      this.cart = (await EcommerceClient.createCart([])).body;
    } finally {
      this.state.setValue(
        StateKeys.CartItemIds,
        this.cart.lineItems.map((item) => item.productId),
      );
      this.loadStatus = true;
      this.notifySubs();
    }
  }

  public static getCart(): Cart {
    return this.cart;
  }

  public static async addProduct(productID: string, quantity = 1) {
    this.loadStatus = false;
    const action: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId: productID,
      variantId: 1,
      quantity,
    };
    const update: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    await this.pushUpdate(update);
  }

  public static async pullCart() {
    this.cart = (await EcommerceClient.getCartById(this.cart.id)).body;
  }
  //когда происходит логин или анлогин, токен меняется и достать старую корзину уже невозможно.
  public static async reuseCart() {
    this.cart = (await EcommerceClient.createCart(this.cart.lineItems)).body;
  }

  //страшно...очень страшно...мы не знаем что это...
  private static async makeCheckPromise(productId: string) {
    return new Promise((resolve) => {
      if (this.loadStatus) {
        resolve(this.checkIdInCart(productId));
      }
      this.loadTimer = setInterval(() => {
        if (this.loadStatus) {
          resolve(this.checkIdInCart(productId));
        }
      }, 200);
    });
  }

  public static async checkProduct(productId: string) {
    const p = await this.makeCheckPromise(productId);
    clearInterval(this.loadTimer);
    return p;
  }

  private static checkIdInCart(productId: string) {
    let status = false;
    this.cart.lineItems.forEach((item) => {
      if (item.productId === productId) {
        status = true;
      }
    });
    return status;
  }

  public static getLoadStatus() {
    return this.loadStatus;
  }

  public static subscribeToChanges(sub: CartSubscriber): void {
    this.subscribers.push(sub);
  }

  private static notifySubs(): void {
    this.subscribers.forEach((sub) => sub.listenUpdate());
  }

  public static async removeItemByLineId(lineItemId: string, quantity?: number) {
    this.loadStatus = false;
    const action: MyCartRemoveLineItemAction = {
      action: 'removeLineItem',
      lineItemId,
      quantity,
    };
    const update: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    await this.pushUpdate(update);
  }

  public static async removeItemsFromCart() {
    const actions: MyCartRemoveLineItemAction[] = [];
    this.cart.lineItems.forEach((item) => {
      const cartAction: MyCartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: item.id,
      };
      actions.push(cartAction);
    });
    const update: MyCartUpdate = {
      version: this.cart.version,
      actions: actions,
    };
    await this.pushUpdate(update);
  }

  private static async pushUpdate(update: MyCartUpdate, notify = true) {
    try {
      this.cart = (await EcommerceClient.updateCart(this.cart.id, update)).body;
    } catch {
      //throws when versions of carts are not the same
      await this.pullCart();
      this.cart = (await EcommerceClient.updateCart(this.cart.id, update)).body;
    } finally {
      this.state.setValue(
        StateKeys.CartItemIds,
        this.cart.lineItems.map((item) => item.productId),
      );
      this.loadStatus = true;
      if (notify) this.notifySubs();
    }
  }

  public static async changeItemQuantity(lineItemId: string, quantity: number, notify = true) {
    const action: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    };
    const update: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    await this.pushUpdate(update, notify);
  }
}
