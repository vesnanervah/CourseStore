import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import AboutUsView from './about_us';

export class AboutUsPage extends BaseView {
  private aboutUsView = new AboutUsView();

  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const layout = new MainLayout(this.aboutUsView.getHtmlElement());

    this.htmlElement = layout.getHtmlElement();
  }
}
