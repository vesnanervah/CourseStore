import './style.scss';
import EcommerceClient from './features/commerce/BuildClient';

EcommerceClient.passwordAuth('c.zwerew2012@yandex.ru', 'wrongpassword');
async function getCat() {
  const cats = await EcommerceClient.getCategories();
  console.log(cats);
}

getCat();
