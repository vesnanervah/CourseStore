export const routes = {
  main: () => '/#/',
  login: () => '/#/login',
  signup: () => '/#/signup',
  category: (slug: string) => `/#/categories/${slug}`,
  about: () => '/#/about',
};
