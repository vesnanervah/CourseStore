export const routes = {
  main: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  category: (id: string) => `/categories/${id}`,
  cart: () => '/cart',
  about: () => '/about',
  notFound: () => '/not-found',
  customer: () => '/customer',
  catalog: () => '/catalog',
  product: (id: string = '') => `/products/${id}`,
  productType: (slug: string = '') => `/product-types/${slug}`,
};
