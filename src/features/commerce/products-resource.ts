import { Product as ApiProduct, Category } from '@commercetools/platform-sdk';

import { routes } from '../../routes';

import { ApiClient, ProductsResource, Product, ProductCategory } from '../../types';

const LOCALE = 'ru';

function normalizeCategories(categories: Category[]): ProductCategory[] {
  return categories.map(({ id, name, slug }) => ({
    id,
    name: name[LOCALE],
    slug: slug[LOCALE],
  }));
}

function normalizeApiProducts(typeName: string, apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map((p) => {
    const { images, prices } = p.masterData.current.masterVariant;

    let priceCurrency = '';
    let defaultPriceValue = 0;
    let discountedPriceValue = 0;
    if (prices) {
      const [price] = prices;
      if (price) {
        priceCurrency = price.value.currencyCode === 'USD' ? '$' : '₽';
        defaultPriceValue = price.value.centAmount / 100;
        discountedPriceValue = (price.discounted?.value.centAmount || 0) / 100;
      }
    }

    return {
      id: p.id,
      type: typeName,
      name: p.masterData.current.name[LOCALE],
      url: routes.product(p.id),
      image: images ? images[0].url : null,
      price: {
        currency: priceCurrency,
        defaultValue: defaultPriceValue,
        discountedValue: discountedPriceValue,
      },
    };
  });
}

// eslint-disable-next-line max-lines-per-function
export const getProductsResource = (client: ApiClient): ProductsResource => ({
  async getProducts() {
    return client
      .products()
      .get()
      .execute()
      .then(({ body }) => normalizeApiProducts('', body.results));
  },
  async getProductsByType({ id, typeName }, queryArgs) {
    const filter = queryArgs?.filter ? ` and ${queryArgs.filter}` : '';
    return client
      .products()
      .get({
        queryArgs: {
          where: `productType(id="${id}")${filter}`,
          limit: queryArgs?.limit || 100,
        },
      })
      .execute()
      .then(({ body }) => normalizeApiProducts(typeName, body.results));
  },
  async getProductsByCategory(id, queryArgs) {
    const filter = queryArgs?.filter ? ` and ${queryArgs.filter}` : '';
    return client
      .products()
      .get({
        queryArgs: {
          where: `masterData(current(categories(id="${id}")))${filter}`,
          limit: queryArgs?.limit || 100,
        },
      })
      .execute()
      .then(({ body }) => normalizeApiProducts('', body.results));
  },
  async getProductTypes() {
    return client
      .productTypes()
      .get()
      .execute()
      .then((data) => data.body.results);
  },
  async getProductType(id: string) {
    return client
      .productTypes()
      .get({
        queryArgs: {
          where: `id="${id}"`,
        },
      })
      .execute()
      .then((data) => data.body.results[0]);
  },
  async getCategories() {
    return client
      .categories()
      .get()
      .execute()
      .then(({ body }) => normalizeCategories(body.results));
  },
});
