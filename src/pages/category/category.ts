import { BaseView } from '../../features/ui';
import { MainLayout } from '../../features/layouts';
import { ProductsByCategory } from '../../features/products';

type CategoryPageProps = {
  categoryId: string;
};

export class CategoryPage extends BaseView {
  constructor(props: CategoryPageProps) {
    super();
    this.createElement(props);
  }

  private createElement({ categoryId }: CategoryPageProps): void {
    const fragment = document.createDocumentFragment();

    const productsByType = new ProductsByCategory({ categoryId });
    fragment.append(productsByType.getHtmlElement());

    const layout = new MainLayout(fragment);

    this.htmlElement = layout.getHtmlElement();
  }
}
