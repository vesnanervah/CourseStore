import { AppHeader, BaseView } from '../ui';
import { AppFooter } from '../ui/app-footer/app-footer';
//import { SideNav } from '../ui/side-nav';

export class MainLayout extends BaseView {
  constructor(children: Node) {
    super();

    this.createElement(children);
  }

  private createElement(children: Node): void {
    const fragment = document.createDocumentFragment();

    const header = new AppHeader().getView();

    const main = document.createElement('main');
    main.classList.add('app-main');
    main.append(children);

    const footer = new AppFooter();

    //const sideNav = new SideNav();
    //sideNav.init();

    fragment.append(header.getHtmlElement());
    fragment.append(main);
    fragment.append(footer.getHtmlElement());
    //fragment.append(sideNav.getHtmlElement());

    this.htmlElement = fragment;
  }
}
