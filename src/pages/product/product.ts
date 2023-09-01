import { BaseView } from '../../features/ui';
//import EcommerceClient from '../../features/commerce/BuildClient';
import './product.scss';
import ProductTitle from '../../features/ui/product-title/product-title';
import ProductPrice from '../../features/ui/product-price/product-price';
import ProductSlider from '../../features/ui/product-slider/product-slider';
import ProductCategories from '../../features/ui/product-categories/product-categories';
import ProductDescr from '../../features/ui/product-descr/product-descr';
import ProductIncludes from '../../features/ui/product-includes/product-includes';
import ProductRoadmap from '../../features/ui/product-roadmap/product-roadmap';

export default class ProductView extends BaseView {
  private productTitle = new ProductTitle();
  private productPrice = new ProductPrice();
  private productSlider = new ProductSlider();
  private productCategories = new ProductCategories();
  private productDescr = new ProductDescr();
  private productIncludes = new ProductIncludes();
  private productRoadmap = new ProductRoadmap();

  constructor() {
    super();
    this.createView();
  }

  private createView() {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const productHead = document.createElement('div');
    const productMiddle = document.createElement('div');
    const productBottom = document.createElement('div');
    const headLeft = document.createElement('div');
    const headRight = document.createElement('div');
    headLeft.className = 'product__head-left';
    headLeft.className = 'product__head-right';
    headLeft.append(this.productSlider.getHtmlElement());
    headRight.append(this.productTitle.getHtmlElement(), this.productPrice.getHtmlElement());
    productHead.className = 'product__head';
    productHead.append(headLeft, headRight);
    productMiddle.append(
      this.productCategories.getHtmlElement(),
      this.productDescr.getHtmlElement(),
      this.productIncludes.getHtmlElement(),
      this.productRoadmap.getHtmlElement(),
    );
    content.append(productHead, productMiddle, productBottom);
    this.htmlElement = wrapper;
  }

  /*public async updateProductPage(ID: string) {
    const newData = await EcommerceClient.getProductById(ID);
  }*/
}
