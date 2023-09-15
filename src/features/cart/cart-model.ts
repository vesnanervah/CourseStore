import EcommerceClient from '../commerce/BuildClient';
import BaseView from '../ui/base-view/base-view';
import { Cart, MyCartUpdate, MyCartAddLineItemAction } from '@commercetools/platform-sdk';
import { State } from '../../state';
import { StateKeys } from '../../types';

export default class CartModel extends BaseView {
  private static state: State = State.getInstance();
  private static cart: Cart;
  private static loadStatus = false;
  private static loadTimer: NodeJS.Timer;

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
    }
  }

  public static getCart(): Cart {
    return this.cart;
  }

  public static async addProduct(productID: string) {
    this.loadStatus = false;
    const action: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId: productID,
      variantId: 1,
    };
    const update: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    try {
      this.cart = (await EcommerceClient.addProductToCart(this.cart.id, update)).body;
    } catch {
      //throws when versions of carts are not the same
      await this.pullCart();
      this.cart = (await EcommerceClient.addProductToCart(this.cart.id, update)).body;
    } finally {
      this.state.setValue(
        StateKeys.CartItemIds,
        this.cart.lineItems.map((item) => item.productId),
      );
      this.loadStatus = true;
    }
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
}
