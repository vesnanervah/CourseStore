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
      console.log('fetching old cart');
    } catch {
      //throws when recent cart cannot be found
      this.cart = (await EcommerceClient.creatCart()).body;
      console.log('creating new cart');
    } finally {
      console.log(this.cart);
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
      await EcommerceClient.addProductToCart(this.cart.id, update);
    } catch {
      //throws when versions of carts are not the same
      await this.pullCart();
      await EcommerceClient.addProductToCart(this.cart.id, update);
    } finally {
      await this.pullCart();
    }
  }

  public static async pullCart() {
    this.cart = (await EcommerceClient.getCartById(this.cart.id)).body;
    console.log(this.cart);
  }
}
