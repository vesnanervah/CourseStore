import { ProductType as ApiProductType } from '@commercetools/platform-sdk';
import { UniqueId } from './common';

type ProductPrice = {
  value: number;
  currency: string;
};

export type ProductType = ApiProductType;

export type Product = {
  id: UniqueId;
  name: string;
  type: string;
  url: string;
  price: ProductPrice;
  image: string | null;
};
