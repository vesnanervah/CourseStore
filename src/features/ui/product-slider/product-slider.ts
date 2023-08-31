import { BaseView } from '../base-view';
import './product-slider.scss';

export default class ProductSlider extends BaseView {
  private imageOne: HTMLElement;
  private imageTwo: HTMLElement;
  private btnOne: HTMLElement;
  private btnTwo: HTMLElement;
  private pos = 1;
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    const images = document.createElement('div');
    this.imageOne = document.createElement('div');
    this.imageTwo = document.createElement('div');
    this.imageOne.className = 'product__image-one';
    this.imageTwo.className = 'product__image-two';
    images.append(this.imageOne, this.imageTwo);
    images.className = 'product__images';
    const btns = document.createElement('div');
    this.btnOne = document.createElement('span');
    this.btnTwo = document.createElement('span');
    btns.append(this.btnOne, this.btnTwo);
    btns.className = 'product__sliderbtns';
    this.htmlElement.append(images, btns);
  }

  public setImages(urls: string[]): void {
    this.imageOne.style.backgroundImage = `url(${urls[0]})`;
    if (urls[1]) {
      this.imageTwo.style.backgroundImage = `url(${urls[0]})`;
    }
  }
}
