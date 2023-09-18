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
import {
  Attributes,
  Images,
  ProductPrice as Price,
  ProductName,
  AttributesCourse,
  AttributesProfession,
  AttributesDefined,
  VariantIncludes,
} from '../../types/product';
import { Button } from '../../features/ui';
import CartModel from '../../features/cart/cart-model';
import { routes } from '../../routes';
import { AppRouter } from '../../features/router';
import ProductPageLoad from '../../features/ui/product-page-load/product-page-load';

export default class ProductView extends BaseView {
  private content = document.createElement('div');
  private productTitle = new ProductTitle();
  private productPrice = new ProductPrice();
  private productSlider = new ProductSlider();
  private productCategories = new ProductCategories();
  private productDescr = new ProductDescr();
  private productIncludes = new ProductIncludes();
  private productRoadmap = new ProductRoadmap();
  private buyBtn = new Button({ text: 'Приобрести' });
  private pageLoad = new ProductPageLoad();
  constructor() {
    super();
    this.createView();
  }

  private createView() {
    const wrapper = document.createElement('div');
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
    productBottom.appendChild(this.buyBtn.getHtmlElement());
    productBottom.className = 'product__bottom';
    this.content.append(productHead, productMiddle, productBottom);
    this.content.className = 'product__content';
    this.pageLoad.hide();
    wrapper.append(this.content, this.pageLoad.getHtmlElement());
    wrapper.className = 'product__wrapper';
    this.htmlElement = wrapper;
  }

  public async updateProductPage(ID: string) {
    this.startLoad();
    try {
      const newData = await EcommerceClient.getProductById(ID);
      // TODO: refactor
      const [rawPrice] = newData.body.masterData.current.masterVariant.prices || [];
      const price: Price = { currency: '', defaultValue: 0, discountedValue: 0 };
      if (rawPrice) {
        price.currency = rawPrice.value.currencyCode === 'USD' ? '$' : '₽';
        price.defaultValue = rawPrice.value.centAmount / 100;
        price.discountedValue = (rawPrice.discounted?.value.centAmount || 0) / 100;
      }
      this.productPrice.setPrice(price);
      const attributes = this.defineAttributes(
        newData.body.masterData.current.masterVariant.attributes as Attributes,
      );
      this.productTitle.setTitle(newData.body.masterData.current.name as ProductName);
      this.productCategories.setCategories(newData.body.masterData.current.categories);
      this.productSlider.setImages(newData.body.masterData.current.masterVariant.images as Images);
      this.checkCartRelation(ID);
      if ((attributes as AttributesCourse)['Course-Name']) {
        this.setCourseAttributes(attributes as AttributesCourse);
      } else {
        this.setProfessionAttributes(attributes as AttributesProfession);
      }
      this.finishLoad();
    } catch {
      this.failLoad();
    }
  }

  private defineAttributes(arr: Attributes): AttributesDefined {
    const defined = {};
    arr.forEach((attr) => {
      Object.defineProperty(defined, `${attr.name}`, {
        value: attr.value,
        enumerable: true,
      });
    });
    return defined;
  }

  private setCourseAttributes(attributes: AttributesCourse): void {
    // this.productPrice.setPrice(attributes['Course-Price']);
    this.productDescr.setDescription(attributes['Course-Descr']);
    this.productRoadmap.setRoadmap(attributes['Course-Roadmap']);
    this.productRoadmap.reveal();
    this.productIncludes.hide();
  }

  private async setProfessionAttributes(attributes: AttributesProfession) {
    // this.productPrice.setPrice(attributes['Profession-Price']);
    this.productDescr.setDescription(attributes['Profession-Desc']);
    const includes: VariantIncludes[] = [];
    const includeKeys = [
      'Profession-Includes1',
      'Profession-Includes2',
      'Profession-Includes3',
      'Profession-Includes4',
    ];
    for (const attribute in attributes) {
      if (includeKeys.includes(attribute)) includes.push(attributes[attribute] as VariantIncludes);
    }
    await this.productIncludes.setIncludes(includes);
    this.productIncludes.reveal();
    this.productRoadmap.hide();
  }

  private async checkCartRelation(productId: string) {
    const status = await CartModel.checkProduct(productId);
    if (status) {
      this.blockBtn();
    } else {
      await this.unlockBtn(productId);
    }
  }

  private blockBtn() {
    this.buyBtn.changeBtnText('В КОРЗИНЕ');
    this.buyBtn.getHtmlElement().onclick = () => AppRouter.getInstance().navigate(routes.cart()); //TODO: Root click on cart page
    this.buyBtn.getHtmlElement().classList.add('disabled');
  }

  private async unlockBtn(productId: string) {
    this.buyBtn.changeBtnText('ПРИОБРЕСТИ');
    this.buyBtn.getHtmlElement().onclick = async () => {
      await CartModel.addProduct(productId);
      this.blockBtn();
    };
    this.buyBtn.getHtmlElement().classList.remove('disabled');
  }

  private async startLoad() {
    this.pageLoad.startLoad();
    this.pageLoad.reveal();
    this.content.classList.add('hidden');
  }

  private async finishLoad() {
    this.pageLoad.hide();
    this.content.classList.remove('hidden');
  }

  private async failLoad() {
    this.pageLoad.failLoad();
  }
}
