export const routes = {
  main: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  category: (slug: string) => `/categories/${slug}`,
  cart: () => '/cart',
  about: () => '/about',
  notFound: () => '/not-found',
  customer: () => '/customer',
};
