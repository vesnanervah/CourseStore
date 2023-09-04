import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import { ProductsByType } from '../../features/products';

type ProductTypePageProps = {
  typeId: string;
};

export class ProductTypePage extends BaseView {
  constructor(props: ProductTypePageProps) {
    super();
    this.createElement(props);
  }

  private createElement({ typeId }: ProductTypePageProps): void {
    const fragment = document.createDocumentFragment();

    const productsByType = new ProductsByType({ typeId });
    fragment.append(productsByType.getHtmlElement());

    const layout = new MainLayout(fragment);

    this.htmlElement = layout.getHtmlElement();
  }
}
