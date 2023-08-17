import { BaseView } from '../base-view';
import { BaseAddress } from '@commercetools/platform-sdk';

export default class BaseRegAddress extends BaseView {
  private select: HTMLSelectElement;
  private option: HTMLOptionElement;
  private option1: HTMLOptionElement;
  private label: HTMLLabelElement;
  private label1: HTMLLabelElement;
  private label2: HTMLLabelElement;
  private span: HTMLSpanElement;
  private span1: HTMLSpanElement;
  private span2: HTMLSpanElement;
  private input: HTMLInputElement;
  private input1: HTMLInputElement;
  private input2: HTMLInputElement;
  constructor() {
    super();
    this.htmlElement = document.createElement('div');
    this.select = document.createElement('select');
    this.option = document.createElement('option');
    this.option1 = document.createElement('option');
    this.label = document.createElement('label');
    this.label1 = document.createElement('label');
    this.label2 = document.createElement('label');
    this.span = document.createElement('span');
    this.span1 = document.createElement('span');
    this.span2 = document.createElement('span');
    this.input = document.createElement('input');
    this.input1 = document.createElement('input');
    this.input2 = document.createElement('input');
    this.htmlElement.className = 'form__address';
    this.select.className = 'select__form';
    this.label.className = 'field';
    this.label1.className = 'field';
    this.label2.className = 'field';
    this.span.className = 'fiels__span';
    this.span1.className = 'fiels__span';
    this.span2.className = 'fiels__span';
    this.input.className = 'field__input';
    this.input1.className = 'field__input';
    this.input2.className = 'field__input';
    this.span.textContent = 'CITY';
    this.span1.textContent = 'STREET NAME';
    this.span2.textContent = 'POSTAL CODE';
    this.option.value = 'RUSSIA';
    this.option1.value = 'USA';
    this.select.append(this.option, this.option1);
    this.label.append(this.span, this.input);
    this.label1.append(this.span1, this.input1);
    this.label2.append(this.span2, this.input2);
    this.htmlElement.append(this.select, this.label, this.label1, this.label2);
  }

  private getBaseAddressBody(key: 'keyBilling' | 'keyShipping'): BaseAddress {
    return {
      key: key,
      country: '',
      city: '',
      streetName: '',
      postalCode: '',
    };
  }
}
