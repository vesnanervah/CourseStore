import { BaseView } from '../../features/ui';

export default class PriceBlock extends BaseView {
  private btn: HTMLButtonElement;
  private promoInp: HTMLInputElement;
  private totalCostDispl: HTMLDivElement;

  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.promoInp = document.createElement('input');
    this.totalCostDispl = document.createElement('div');
    this.btn = document.createElement('button');
    const header = document.createElement('div');
    header.textContent = 'Цена';
    this.htmlElement.className = 'cart__empty-block cart__block';
    header.className = 'cart__header';
    this.promoInp.className = 'cart__promocode';
    this.totalCostDispl.className = 'cart__totalprice';
    this.totalCostDispl.textContent = 'Стоимость заказа:...';
    this.btn.className = 'cart__accent-btn';
    this.promoInp.setAttribute('type', 'text');
    this.promoInp.setAttribute('placeholder', 'Ввести промокод');
    this.btn.textContent = 'ПЕРЕЙТИ К ОПЛАТЕ';
    this.htmlElement.append(header, this.promoInp, this.totalCostDispl, this.btn);
  }

  public appear(): void {
    (this.htmlElement as HTMLElement).classList.remove('hidden');
  }

  public hide(): void {
    (this.htmlElement as HTMLElement).classList.add('hidden');
  }

  public setBtnListener(f: () => void): void {
    this.btn.onclick = f;
  }

  public setTotalPrice(price: number) {
    this.totalCostDispl.textContent = `Итоговая цена: ${price}USD`;
  }
}
