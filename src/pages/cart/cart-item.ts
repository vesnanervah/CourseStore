import { BaseView } from '../../features/ui';
import { ProductCard } from '../../features/products';
import { LineItem } from '@commercetools/platform-sdk';
import { routes } from '../../routes';
import { Product } from '../../types';

export default class CartItem extends BaseView {
  private countMinusBtn: HTMLButtonElement;
  private countPlusBtn: HTMLButtonElement;
  private countDisplay: HTMLDivElement;
  private priceDisplay: HTMLDivElement;
  private deleteBtn: HTMLButtonElement;
  private card: ProductCard;
  private count: number;
  private priceTotal: number;
  private priceTotal: number;

  constructor(item: LineItem) {
    super();
    this.card = this.createCard(item);
  }

  private createCard(item: LineItem): ProductCard {
    return new ProductCard({
      image: item.variant.images[0].url,
      id: item.productId,
      name: item.name.ru as string,
      type: item.productType,
      url: routes.product(item.productId),
      price: item.price,
    } as Product);
  }
}
