import type { ProductType } from '@commercetools/platform-sdk';
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import type { Product } from './product';
import type { ProductCategory } from './product-category';

type QueryArgs = {
  limit?: number;
  filter?: string;
};

export type ApiClient = ByProjectKeyRequestBuilder;

export type ProductsResource = {
  getProductTypes: () => Promise<ProductType[]>;
  getProducts: () => Promise<Product[]>;
  getProductsByType: (
    { id, typeName }: { id: string; typeName: string },
    queryArgs?: QueryArgs,
  ) => Promise<Product[]>;
  getCategories: () => Promise<ProductCategory[]>;
};

export type DataProvider = {
  products: ProductsResource;
};
