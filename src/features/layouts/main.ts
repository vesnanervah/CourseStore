import { AppHeader, BaseView } from '../ui';
import { SideNav } from '../ui/side-nav';

export class MainLayout extends BaseView {
  constructor(children: Node) {
    super();

    this.createElement(children);
  }

  private createElement(children: Node): void {
    const fragment = document.createDocumentFragment();

    const headerView = new AppHeader().getView();

    const main = document.createElement('main');
    main.classList.add('app-main');
    main.append(children);

    // TODO: implement footer
    const footer = document.createElement('footer');
    footer.classList.add('app-footer');

    const sideNav = new SideNav();
    sideNav.init();

    fragment.append(headerView.getHtmlElement());
    fragment.append(main);
    fragment.append(footer);
    fragment.append(sideNav.getHtmlElement());

    this.htmlElement = fragment;
  }
}
