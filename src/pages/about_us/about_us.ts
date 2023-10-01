import '../about_us/about_us.scss';
import { BaseView } from '../../features/ui';
import { AboutUsBlock } from '../../features/ui/about_us-block/about_us-block';

export default class AboutUsView extends BaseView {
  aboutUsBlock = new AboutUsBlock();

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    const wrapper = document.createElement('div');
    const block = this.aboutUsBlock.getHtmlElement();
    wrapper.className = 'about_us';
    wrapper.append(block);
    this.htmlElement = wrapper;
  }
}
