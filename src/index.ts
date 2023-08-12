import './style.scss';
import EcommerceClient from './features/commerce/BuildClient';

EcommerceClient.passwordAuth('c.zwerew2012@yandex.ru', '1488');
async function getCat() {
  const cats = await EcommerceClient.getCategories();
  const randomCat = cats.body.results[0].id;
  console.log(randomCat);
  const itemsFromRandomCat = await EcommerceClient.getProductsFromCategory(randomCat);
  console.log(itemsFromRandomCat);
}

getCat();
