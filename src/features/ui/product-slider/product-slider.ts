import { Images } from '../../../types/product';
import { BaseView } from '../base-view';
import ProductPopup from '../product-popup/product-popup';
import './product-slider.scss';

export default class ProductSlider extends BaseView {
  private imageOne: HTMLElement;
  private imageTwo: HTMLElement;
  private btnOne: HTMLElement;
  private btnTwo: HTMLElement;
  private images: HTMLElement;
  private btns: HTMLElement;
  private content: HTMLElement;
  private popup = new ProductPopup();

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.content = document.createElement('div');
    this.content.className = 'slider-content';
    this.images = document.createElement('div');
    this.imageOne = document.createElement('div');
    this.imageTwo = document.createElement('div');
    this.imageOne.className = 'product__image product__image-one';
    this.imageTwo.className = 'product__image product__image-two';
    this.images.append(this.imageOne, this.imageTwo);
    this.images.className = 'product__images';
    this.btns = document.createElement('div');
    this.btnOne = document.createElement('span');
    this.btnTwo = document.createElement('span');
    this.btnOne.className = 'product__sliderbtn product__sliderbtn-one inactive-btn';
    this.btnTwo.className = 'product__sliderbtn product__sliderbtn-two';
    this.btns.append(this.btnOne, this.btnTwo);
    this.btns.className = 'product__sliderbtns';
    this.content.append(this.images, this.btns);
    this.popup.hide();
    this.htmlElement.append(this.content, this.popup.getHtmlElement());
    this.htmlElement.className = 'product__slider';
    this.btnOne.addEventListener('click', () => this.handleLeftClick());
    this.btnTwo.addEventListener('click', () => this.handleRightClick());
    this.images.addEventListener('click', () => this.showPopup());
  }

  public setImages(images: Images): void {
    this.imageOne.style.backgroundImage = `url(${images[0].url})`;
    if (images[1]) {
      this.imageTwo.style.backgroundImage = `url(${images[1].url})`;
    }
    this.popup.setImages(images);
  }

  private handleLeftClick() {
    if (this.btnOne.classList.contains('inactive-btn')) {
      return;
    }
    this.imageOne.style.order = '0';
    this.imageTwo.style.order = '1';
    this.btnOne.classList.add('inactive-btn');
    this.btnTwo.classList.remove('inactive-btn');
  }

  private handleRightClick() {
    if (this.btnTwo.classList.contains('inactive-btn')) {
      return;
    }
    this.imageOne.style.order = '2';
    this.imageTwo.style.order = '0';
    this.btnTwo.classList.add('inactive-btn');
    this.btnOne.classList.remove('inactive-btn');
  }

  private showPopup(): void {
    this.popup.show();
  }
}
