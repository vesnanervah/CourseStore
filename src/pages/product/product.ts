import { BaseView } from '../../features/ui';
import EcommerceClient from '../../features/commerce/BuildClient';
import './product.scss';
import ProductTitle from '../../features/ui/product-title/product-title';
import ProductPrice from '../../features/ui/product-price/product-price';
import ProductSlider from '../../features/ui/product-slider/product-slider';
import ProductCategories from '../../features/ui/product-categories/product-categories';
import ProductDescr from '../../features/ui/product-descr/product-descr';
import ProductIncludes from '../../features/ui/product-includes/product-includes';
import ProductRoadmap from '../../features/ui/product-roadmap/product-roadmap';
import { Attributes, Images, ProductName, VariantIncludes } from '../../types/product';

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
    headRight.className = 'product__head-right';
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
    productMiddle.className = 'product__middle';
    productBottom.className = 'product__bottom';
    content.append(productHead, productMiddle, productBottom);
    content.className = 'product__content';
    wrapper.appendChild(content);
    wrapper.className = 'product__wrapper';
    this.htmlElement = wrapper;
  }

  public async updateProductPage(ID: string) {
    const newData = await EcommerceClient.getProductById(ID);
    const attr = newData.body.masterData.current.masterVariant.attributes as Attributes;
    this.productTitle.setTitle(newData.body.masterData.current.name as ProductName);
    this.productPrice.setPrice(attr[1]);
    this.productCategories.setCategories(newData.body.masterData.current.categories);
    this.productDescr.setDescription(attr[2].value);
    this.productSlider.setImages(newData.body.masterData.current.masterVariant.images as Images);
    if (typeof attr[3].value === 'string') {
      this.productRoadmap.setRoadmap(attr[3].value); //means this is course
      this.productRoadmap.reveal();
      this.productIncludes.hide();
    } else {
      //means this is profession
      await this.productIncludes.setIncludes(attr.slice(3) as VariantIncludes[]);
      this.productIncludes.reveal();
      this.productRoadmap.hide();
    }
  }
}
