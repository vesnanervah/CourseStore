import './style.scss';
import { App } from './app/app';
import LoginView from './pages/login/login';

const app: App = new App(document.body);
app.start();

const l = new LoginView();
const main = document.querySelector('.app-main');
if (main) {
  main.innerHTML = '';
  main.appendChild(l.getHtmlElement());
}
