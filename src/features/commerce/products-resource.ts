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
    const { images, attributes } = p.masterData.current.masterVariant;

    let priceValue = 0;
    let priceCurrency = '';
    if (attributes) {
      const price = attributes.find((attr) => attr.name === 'Profession-Price');
      if (price) {
        priceValue = price.value.centAmount / 100;
        priceCurrency = price.value.currencyCode === 'USD' ? '$' : '₽';
      }
    }

    return {
      id: p.id,
      type: typeName,
      name: p.masterData.current.name[LOCALE],
      url: routes.product(p.id),
      image: images ? images[0].url : null,
      price: {
        value: priceValue,
        currency: priceCurrency,
      },
    };
  });
}

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
          limit: queryArgs?.limit,
        },
      })
      .execute()
      .then(({ body }) => normalizeApiProducts(typeName, body.results));
  },
  async getProductTypes() {
    return client
      .productTypes()
      .get()
      .execute()
      .then((data) => data.body.results);
  },
  async getCategories() {
    return client
      .categories()
      .get()
      .execute()
      .then(({ body }) => normalizeCategories(body.results));
  },
});
