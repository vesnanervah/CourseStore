import './style.scss';
import { App } from './app/app';
import CartModel from './features/cart/cart-model';

const app: App = new App(document.body);
app.start();
CartModel.init();
