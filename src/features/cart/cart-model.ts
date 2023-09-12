import EcommerceClient from '../commerce/BuildClient';
import BaseView from '../ui/base-view/base-view';
import { Cart, MyCartUpdate, MyCartAddLineItemAction } from '@commercetools/platform-sdk';

export default class CartModel extends BaseView {
  private static cart: Cart;

  constructor() {
    super();
  }

  public static async init() {
    try {
      this.cart = (await EcommerceClient.getRecentCart()).body;
    } catch {
      this.cart = (await EcommerceClient.createCart([])).body;
    }
  }

  public static getCart(): Cart {
    return this.cart;
  }

  public static async addProduct(productID: string) {
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
    }
  }

  public static async pullCart() {
    this.cart = (await EcommerceClient.getCartById(this.cart.id)).body;
  }
  //когда происходит логин или анлогин токен меняется и достать старую корзину уже невозможно.
  public static async reuseCart() {
    this.cart = (await EcommerceClient.createCart(this.cart.lineItems)).body;
  }
}
