import { UniqueId } from './common';

type ProductPrice = {
  value: number;
  currency: string;
};

export type Product = {
  id: UniqueId;
  name: string;
  type: string;
  url: string;
  price: ProductPrice;
  image: string | null;
};
