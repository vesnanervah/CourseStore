import { Images } from '../../../types/product';
import { BaseView } from '../base-view';
import './product-popup.scss';
//  TODO: refactor copypast to separate class
export default class ProductPopup extends BaseView {
  private imgOne: HTMLElement;
  private imgTwo: HTMLElement;
  private btnOne: HTMLElement;
  private btnTwo: HTMLElement;
  private btns: HTMLElement;
  private content: HTMLElement;
  private images: HTMLElement;

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.hide();
    this.content = document.createElement('div');
    this.content.className = 'slider-content';
    this.images = document.createElement('div');
    this.imgOne = document.createElement('div');
    this.imgTwo = document.createElement('div');
    this.imgOne.className = 'product__image product__image-one';
    this.imgTwo.className = 'product__image product__image-two';
    this.images.append(this.imgOne, this.imgTwo);
    this.images.className = 'product__images';
    this.btns = document.createElement('div');
    this.btnOne = document.createElement('span');
    this.btnTwo = document.createElement('span');
    this.btnOne.className = 'product__sliderbtn product__sliderbtn-one inactive-btn';
    this.btnTwo.className = 'product__sliderbtn product__sliderbtn-two';
    this.btns.append(this.btnOne, this.btnTwo);
    this.btns.className = 'product__sliderbtns';
    this.content.append(this.images, this.btns);
    this.htmlElement.append(this.content);
    this.htmlElement.className = 'product__popup';
    this.btnOne.addEventListener('click', () => this.handleLeftClick());
    this.btnTwo.addEventListener('click', () => this.handleRightClick());
    this.images.addEventListener('click', () => this.hide());
  }

  private handleLeftClick() {
    if (this.btnOne.classList.contains('inactive-btn')) {
      return;
    }
    this.imgOne.style.order = '0';
    this.imgTwo.style.order = '1';
    this.btnOne.classList.add('inactive-btn');
    this.btnTwo.classList.remove('inactive-btn');
  }

  private handleRightClick() {
    if (this.btnTwo.classList.contains('inactive-btn')) {
      return;
    }
    this.imgOne.style.order = '2';
    this.imgTwo.style.order = '0';
    this.btnTwo.classList.add('inactive-btn');
    this.btnOne.classList.remove('inactive-btn');
  }

  public setImages(images: Images): void {
    this.imgOne.style.backgroundImage = `url(${images[0].url})`;
    if (images[1]) {
      this.imgTwo.style.backgroundImage = `url(${images[1].url})`;
    }
  }

  public show(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
    (this.htmlElement as HTMLElement).style.top = `${window.pageYOffset}px`;
    document.body.style.overflow = 'hidden';
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}
