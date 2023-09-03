import './style.scss';
import EcommerceClient from './features/commerce/BuildClient';
import ProductView from './pages/product/product';
/*import { App } from './app/app';

const app: App = new App(document.body);
app.start();*/
const pv = new ProductView();

async function getProd() {
  EcommerceClient.stockRootPrepare();
  const randomId = (await EcommerceClient.getProducts()).body.results[0].id;
  const view = pv.getHtmlElement();
  await pv.updateProductPage(randomId);
  document.body.appendChild(view);
}

getProd();
