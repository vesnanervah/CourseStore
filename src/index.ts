import './style.scss';
import LoginView from './pages/login/login';

const lv = new LoginView();
document.body.appendChild(lv.getHtmlElement());
