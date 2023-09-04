import { BaseView, Wrapper } from '../../features/ui';
import { routes } from '../../routes';
import { AppRouter } from '../../features/router';
import EcommerceClient from '../../features/commerce/BuildClient';
import { AuthListener } from '../../types/auth';
import Auth from '../../features/auth/auth';
import { State } from '../../../src/state';
import BaseProfileBlock from '../../features/ui/profile__data_person/profile__data_person';
import BaseProfileAddress from '../../features/ui/profile__data_addresses/profile__data_address';
import BaseProfileBlockBye from '../../features/ui/profile__buy/profile__buy';
import RegView from '../registration/reg';
import './customer.scss';
import '../registration/reg.scss';
import {
  MyCustomerUpdate,
  MyCustomerChangePassword,
  BaseAddress,
} from '@commercetools/platform-sdk';

export default class Customer extends BaseView implements AuthListener {
  private editMode = false;
  private router = AppRouter.getInstance();
  private state = State.getInstance();
  profileLeftBlock = new BaseProfileBlock();
  profileRightBlock = new BaseProfileAddress();
  buyBlock = new BaseProfileBlockBye();
  id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  addresses: Array<BaseAddress> = [];
  defaultBilling: string | undefined = '';
  defaultShipping: string | undefined = '';
  billingAddressIds: string[] | undefined = [];
  shippingAddressIds: string[] | undefined = [];
  constructor() {
    super();
    this.id = '';
    this.init();
    Auth.subscribe(this);
  }
  private async init() {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'customer-page';
    const wrapper = new Wrapper();
    const wrapperElement = wrapper.getHtmlElement();
    wrapperElement.classList.add('profile__wrapper');
    const leftBlock = this.profileLeftBlock.getHtmlElement();
    const rightBlock = this.profileRightBlock.getHtmlElement();
    leftBlock.addEventListener('click', this.handleClick.bind(this));
    wrapperElement.append(leftBlock, rightBlock);
    const blokBuy = this.buyBlock.getHtmlElement();
    this.htmlElement.append(wrapperElement, blokBuy);
    await this.listenLogin().then(() => {
      this.addValueInput();
      this.addValueInputAddresses();
    });
    this.listenerInputWrite();
    this.handleClickButtonSave();
    this.handleClickButtonRemove();
    this.listenerButtonsModalWindowPassword();
    this.handleClickButtonAddAddress();
  }

  listenLogout(): void {
    this.router.navigate(routes.login());
  }

  //get info about customer from commersetools
  async listenLogin(): Promise<void> {
    EcommerceClient.tokenRootPrepare();
    await EcommerceClient.getCustomerByToken().then((res) => {
      this.addresses = res.body.addresses;
      this.defaultBilling = res.body.defaultBillingAddressId;
      this.defaultShipping = res.body.defaultShippingAddressId;
      this.billingAddressIds = res.body.billingAddressIds;
      this.shippingAddressIds = res.body.shippingAddressIds;
      this.id = res.body.id;
      this.firstName = res.body.firstName;
      this.lastName = res.body.lastName;
      this.middleName = res.body.middleName;
      this.dateOfBirth = res.body.dateOfBirth;
      this.email = res.body.email;
    });
  }
  //get full input fields of profile
  private addValueInput() {
    const inputs = this.getInputs();
    inputs?.forEach((item) => {
      if (item.getAttribute('data-set') == 'firstName') item.value = this.firstName || '';
      if (item.getAttribute('data-set') == 'lastName') item.value = this.lastName || '';
      if (item.getAttribute('data-set') == 'middleName') item.value = this.middleName || '';
      if (item.getAttribute('data-set') == 'dateOfBirth') item.value = this.dateOfBirth || '';
      if (item.getAttribute('data-set') == 'email') item.value = this.email || '';
    });
  }
  //get full input fields of addresses
  private addValueInputAddresses() {
    const div = document.querySelector('.form__address_prof');
    for (let i = 0; i < this.addresses.length; i++) {
      const id = this.addresses[i].id || '';
      const country = this.addresses[i].country || '';
      const city = this.addresses[i].city || '';
      const street = this.addresses[i].streetName || '';
      const house = this.addresses[i].building || '';
      const office = this.addresses[i].apartment || '';
      const postalcode = this.addresses[i].postalCode || '';
      if (this.shippingAddressIds?.includes(id)) {
        const div1 = new BaseProfileAddress().getBlockAddress('Адрес доставки');
        const inputs = this.getInputsAddress(div1);
        if (inputs) {
          inputs[0].closest('.addres__block_profile')?.setAttribute('data-id', id);
          inputs[0].closest('.addres__block_profile')?.setAttribute('data-type', 'shipping');
        }
        div?.append(div1);
        if (inputs) {
          this.addInfoAddresses(inputs, country, city, street, house, office, postalcode);
        }
      } else {
        const div2 = new BaseProfileAddress().getBlockAddress('Платежный адрес');
        const inputs = this.getInputsAddress(div2);
        if (inputs) {
          inputs[0].closest('.addres__block_profile')?.setAttribute('data-id', id);
          inputs[0].closest('.addres__block_profile')?.setAttribute('data-type', 'billing');
        }
        div?.append(div2);
        if (inputs) {
          this.addInfoAddresses(inputs, country, city, street, house, office, postalcode);
        }
      }
    }
    const divs = div?.querySelectorAll('.addres__block_profile') as NodeListOf<HTMLDivElement>;
    this.markDefaultAddresses(this.defaultShipping as string, this.defaultBilling as string, divs);
    div?.append(this.profileRightBlock.getButtonsAddAddresses());
  }

  private addInfoAddresses(inputs: NodeListOf<HTMLInputElement>, ...arr: string[]) {
    for (let i = 0; i < 6; i++) {
      inputs[i].value = arr[i];
      inputs[i].disabled = true;
    }
  }
  private markDefaultAddresses(id1: string, id2: string, parents: NodeListOf<HTMLDivElement>) {
    parents.forEach((div) => {
      const addressid = div.getAttribute('data-id');
      if (addressid === id1 || addressid === id2) {
        div.classList.add('colored');
        const btn = div.querySelector('.radio_button') as HTMLInputElement;
        btn.checked = true;
        const btnDelete = div.querySelector('.button__delete');
        btnDelete?.classList.add('nopointer');
      }
    });
  }

  private removeDefaultAddresses(parents: NodeListOf<HTMLDivElement>) {
    parents.forEach((div) => {
      div.classList.remove('colored');
      const btn = div.querySelector('.radio_button') as HTMLInputElement;
      btn.checked = false;
      const btnDelete = div.querySelector('.button__delete');
      btnDelete?.classList.remove('nopointer');
    });
  }

  private validateInputText(e: Event): void {
    const target = e.target as HTMLElement;
    if (
      target.closest('input') &&
      (target.getAttribute('data-set') === 'firstName' ||
        target.getAttribute('data-set') === 'lastName' ||
        target.getAttribute('data-set') === 'middleName')
    ) {
      const value = (target as HTMLInputElement).value;
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      const text = value.toLowerCase();
      const specSymbol = /[$%^&!@#*()_+\-=[\]{};':"\\|,.<>/?]+/;
      if (/[0-9]/g.test(text) || specSymbol.test(text) || text.length == 0) {
        this.addErrorValue(parent);
        paragraph.textContent = 'Сведения не должны содержать специальных символов или цифр';
      } else {
        this.removeErrorValue(parent);
        paragraph.textContent = '';
      }
    }
  }

  private validateInputDate(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('input') && target.getAttribute('data-set') === 'dateOfBirth') {
      const value = (target as HTMLInputElement).value;
      console.log(value);
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      const userDate = +new Date(value);
      const age: number = (Date.now() - userDate) / 1000 / 3600 / 24 / 30 / 12;
      console.log(age + ' age');
      if (age > 100 || age < 7 || !isNaN(+value)) {
        this.addErrorValue(parent);
        paragraph.textContent = 'Допустимый возраст от 7 до 100 лет';
      } else {
        this.removeErrorValue(parent);
        paragraph.textContent = '';
      }
    }
  }

  private async validateInputEmail(e: Event): Promise<void> {
    const target = e.target as HTMLElement;
    if (target.closest('input') && target.getAttribute('data-set') === 'email') {
      const value = (target as HTMLInputElement).value;
      const parent = target.parentElement as HTMLDivElement;
      const paragraph = parent.nextElementSibling as HTMLParagraphElement;
      if (this.checkMail(value)) {
        this.removeErrorValue(parent);
        paragraph.textContent = '';
        const mailsOfCustomers = await this.checkUniqueMail();
        if (mailsOfCustomers.includes(value) && value !== this.email) {
          paragraph.textContent =
            'Укажите другой адрес электронной почты. Пользователь с данными сведениями уже зарегистрирован';
          this.addErrorValue(parent);
        }
      } else {
        this.addErrorValue(parent);
        paragraph.textContent =
          'Неправильный адрес электронной почты. Корректный формат: example@email.com';
      }
    }
  }
  private validateInputPassw(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('.new__password')) {
      const value = (target as HTMLInputElement).value;
      if (
        value.length > 7 &&
        /[0-9]/.test(value) &&
        /[A-ZА-Я]/.test(value) &&
        /[a-zа-я]/.test(value)
      ) {
        this.removeErrorValue(target);
        this.getPasswordMessage('Пароль корректный');
      } else {
        this.addErrorValue(target);
        this.getPasswordMessage(
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру',
        );
      }
    }
  }

  private async checkUniqueMail(): Promise<string[]> {
    const usersMails = await EcommerceClient.getUsersEmail();
    return usersMails;
  }
  private checkMail(value: string): boolean {
    if (
      /[a-zа-я0-9_-]+@[a-zA-Z0-9]+\.[a-z]{2,3}/.test(value) &&
      value.indexOf('@') != 0 &&
      value.trim().indexOf(' ') == -1 &&
      value.split('.')[1].length < 4
    ) {
      return true;
    } else return false;
  }

  private async getUpdatePassw(inputs: NodeListOf<HTMLInputElement>) {
    const currentPassword = inputs[0].value;
    const newPassword = inputs[1].value;
    try {
      const version = await this.getCustomerVersion();
      const data: MyCustomerChangePassword = {
        version: Number(version),
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      await EcommerceClient.updateCustomerPassword(data);
      Auth.clearToken();
      await Auth.loggin(this.email as string, newPassword);
      const modal = document.querySelector('.passw_block');
      modal?.classList.remove('fullscreen');
      const p = document?.querySelector('.profile_mes') as HTMLParagraphElement;
      p.textContent = 'Данные успешно обновлены';
      document.querySelector('.message_block')?.classList.add('fullscreen');
      this.removeCheck();
    } catch (err) {
      const modal = document.querySelector('.passw_block');
      modal?.classList.remove('fullscreen');
      const block = document.querySelector('.message_block');
      block?.classList.add('fullscreen');
      const p = document?.querySelector('.profile_mes') as HTMLParagraphElement;
      p.textContent = 'Данные не обновлены. Попробуйте позже.';
      this.removeCheck();
    }
  }

  //save updates of customer
  /* eslint-disable*/
  private async saveUpdate() {
    this.getDisabled();
    if (!this.editMode) return;
    else {
      const version = await this.getCustomerVersion();
      const nextVersion = Number(version);
      const data: MyCustomerUpdate = {
        version: nextVersion,
        actions: [],
      };
      this.editMode = false;
      const inputs = this.getInputs();
      inputs?.forEach((input) => {
        if (!this.checkValueInput(input)) {
          const property = input.getAttribute('data-set');
          if (property === 'email') {
            data.actions.push({
              action: 'changeEmail',
              email: input.value || '',
            });
          } else if (property === 'dateOfBirth') {
            data.actions.push({
              action: 'setDateOfBirth',
              dateOfBirth: input.value || '',
            });
          } else if (property === 'firstName') {
            data.actions.push({
              action: 'setFirstName',
              firstName: input.value || '',
            });
          } else if (property === 'lastName') {
            data.actions.push({
              action: 'setLastName',
              lastName: input.value || '',
            });
          } else if (property === 'middleName') {
            data.actions.push({
              action: 'setMiddleName',
              middleName: input.value || '',
            });
          }
        }
      });
      this.getUpdate(data);
    }
  }
  private async getUpdate(data: MyCustomerUpdate) {
    const message = document.querySelector('.message_block');
    const a = data;
    try {
      const res = await EcommerceClient.updateCustomer(a);
      const p = message?.querySelector('p') as HTMLParagraphElement;
      p.textContent = 'Данные успешно обновлены';
      message?.classList.add('fullscreen');
      await this.listenLogin(); //.then(() => this.addValueInput());
    } catch (err) {
      const p = message?.querySelector('p') as HTMLParagraphElement;
      p.textContent = 'Данные не обновлены. Попробуйте позже.';
      message?.classList.add('fullscreen');
    }
  }

  async getCustomerVersion(): Promise<string | number | undefined> {
    try {
      if (this.id) {
        return await EcommerceClient.getCustomerById(this.id).then((res) => res.body.version);
      }
    } catch (err) {
      throw new Error(`${err} customer error`);
    }
  }

  private async addAddress(inputs: NodeListOf<HTMLInputElement>) {
    const parent = inputs[0].closest('.addres__block_profile');
    const addressType =
      parent?.getAttribute('data-address') === 'shipping'
        ? 'addShippingAddressId'
        : 'addBillingAddressId';
    const version = await this.getCustomerVersion();
    const data = this.getDataAddress(inputs);
    await EcommerceClient.addCustomerAddress(Number(version), data)
      .then((res) => {
        const addresses = res.body.addresses;
        const id = addresses[addresses.length - 1].id;
        parent?.setAttribute('data-id', id as string);
        this.addIdAddresToBody(id as string, addressType);
        this.openMessageWindow('Данные успешно обновлены');
      })
      .catch(() => {
        this.openMessageWindow('Данные не обновлены, повторите позже');
      });
  }
  private async updateAddress(inputs: NodeListOf<HTMLInputElement>) {
    const parent = inputs[0].closest('.addres__block_profile');
    const version = await this.getCustomerVersion();
    const data = this.getDataAddress(inputs);
    const id = parent?.getAttribute('data-id');
    await EcommerceClient.updateCustomerAddress(Number(version), id as string, data)
      .then(() => this.openMessageWindow('Данные успешно обновлены'))
      .catch(() => this.openMessageWindow('Данные не обновлены, повторите позже'));
  }
  private async removeAddress(inputs: NodeListOf<HTMLInputElement>) {
    const parent = inputs[0].closest('.addres__block_profile');
    const id = parent?.getAttribute('data-id');
    const version = await this.getCustomerVersion();
    const addressType =
      parent?.getAttribute('data-address') === 'shipping'
        ? 'removeShippingAddressId'
        : 'removeBillingAddressId';
    await EcommerceClient.removeAddressg(Number(version), id as string)
      .then(() => {
        this.openMessageWindow('Данные успешно обновлены');
      })
      .catch(() => {
        this.openMessageWindow('Данные не обновены, повторите позже');
      });
  }

  async addIdAddresToBody(id: string, type: 'addBillingAddressId' | 'addShippingAddressId') {
    const version = await this.getCustomerVersion();
    await EcommerceClient.addAddressgId(Number(version), id, type);
  }

  private async changeDefaultAddress(
    id: string,
    type: 'setDefaultBillingAddress' | 'setDefaultShippingAddress',
  ) {
    const version = await this.getCustomerVersion();
    await EcommerceClient.setDefaultAddress(Number(version), id, type).then((res) => {
      const defaultBilling = res.body.defaultBillingAddressId as string;
      const defaultShipping = res.body.defaultShippingAddressId as string;
      const blockAddress = document.querySelector('.form__address_prof');
      const divs = blockAddress?.querySelectorAll(
        '.addres__block_profile',
      ) as NodeListOf<HTMLDivElement>;
      this.markDefaultAddresses(defaultBilling, defaultShipping, divs);
    });
  }

  getDataAddress(inputs: NodeListOf<HTMLInputElement>): BaseAddress {
    const value = inputs[0].value.toLowerCase();
    let country = '';
    switch (value) {
      case 'ru':
      case 'russia':
      case 'россия':
      case 'рус':
        country = 'RU';
        break;
      default:
        country = 'US';
    }
    const key = new RegView().getKeyAddress();
    const data = {
      key: key,
      country: country,
      city: inputs[1].value,
      streetName: inputs[2].value,
      building: inputs[3].value,
      apartment: inputs[4].value,
      postalCode: inputs[5].value,
    };
    return data;
  }
  //check info in fieldes - which was changed
  private checkValueInput(input: HTMLInputElement): boolean | undefined {
    if (input.getAttribute('data-set') == 'firstName') return input.value.trim() === this.firstName;
    else if (input.getAttribute('data-set') == 'lastName') {
      return input.value.trim() === this.lastName;
    } else if (input.getAttribute('data-set') == 'middleName') {
      return input.value.trim() === this.middleName;
    } else if (input.getAttribute('data-set') == 'dateOfBirth') {
      return input.value.trim() === this.dateOfBirth;
    } else if (input.getAttribute('data-set') == 'email') return input.value.trim() === this.email;
  }

  //listener to button remove of left block
  private handleClickButtonRemove() {
    const buttonReset = document.querySelector('#profile__reset');
    buttonReset?.addEventListener('click', () => {
      this.removeBorder();
      this.addValueInput();
      this.getDisabled();
    });
    const buttonResetModal = document.querySelector('.button__close');
    buttonResetModal?.addEventListener('click', () => {
      const modal = document.querySelector('.message_block');
      modal?.classList.remove('fullscreen');
    });
  }
  //listener to save button of left block
  private handleClickButtonSave(): void {
    const buttonSave = document.querySelector('#profile__save');
    buttonSave?.addEventListener('click', () => {
      const messages = document.querySelectorAll('.profil_field');
      let flag = true;
      messages.forEach((mes) => {
        if (mes.classList.contains('border__wrong')) {
          flag = false;
          return;
        }
      });
      if (!flag) {
        const message = document.querySelector('.message_block');
        const p = message?.querySelector('p') as HTMLParagraphElement;
        p.textContent = 'Введите корректные данные';
        message?.classList.add('fullscreen');
      }
      if (flag) {
        this.removeBorder();
        this.saveUpdate();
      }
    });
  }
  private handleClickButtonAddAddress(): void {
    const blockAddresses = document.querySelector('.form__address_prof');
    const blockButton = document.querySelector('.form__address_buttons');
    const buttonShippind = document.querySelector('#profile__address_ship');
    buttonShippind?.addEventListener('click', () => {
      const newBlock = this.profileRightBlock.getBlockAddress('Адрес доставки');
      newBlock.querySelector('.button__default')?.classList.add('remove');
      blockButton?.before(newBlock);
      blockButton?.previousElementSibling?.setAttribute('data-new', 'true');
      blockButton?.previousElementSibling?.setAttribute('data-address', 'shipping');
    });
    const buttonBilling = document.querySelector('#profile__address_bill');
    buttonBilling?.addEventListener('click', () => {
      const newBlock = this.profileRightBlock.getBlockAddress('Платежный адрес');
      newBlock.querySelector('.button__default')?.classList.add('remove');
      blockButton?.before(newBlock);
      blockButton?.previousElementSibling?.setAttribute('data-new', 'true');
      blockButton?.previousElementSibling?.setAttribute('data-address', 'billing');
    });
    blockAddresses?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLLinkElement;
      if (target?.closest('.button__delete')) {
        if (!(target.closest('.addres__block_profile')?.getAttribute('data-new') === 'true')) {
          const parent = target.closest('.addres__block_profile');
          const inputs = parent?.querySelectorAll('.field__input') as NodeListOf<HTMLInputElement>;
          this.removeAddress(inputs);
        }
        target.closest('.addres__block_profile')?.remove();
      } else if (target?.closest('.button__edit')) {
        const parent = target.closest('.addres__block_profile');
        const inputs = parent?.querySelectorAll('.field__input') as NodeListOf<HTMLInputElement>;
        inputs?.forEach((input) => {
          input.closest('.field')?.classList.add('border__active');
          input.disabled = false;
        });
      } else if (target?.closest('.button__save')) {
        const parent = target.closest('.addres__block_profile');
        const mes = parent?.querySelector('.profile__msg_address') as HTMLParagraphElement;
        const inputs = parent?.querySelectorAll('.field__input') as NodeListOf<HTMLInputElement>;
        if (this.profileRightBlock.validateInput(inputs, mes)) {
          inputs?.forEach((input) => {
            input.closest('.field')?.classList.remove('border__active');
            input.disabled = true;
          });
          if (parent?.getAttribute('data-new') === 'true') {
            this.addAddress(inputs);
            parent.removeAttribute('data-new');
            parent.querySelector('.button__default')?.classList.remove('remove');
          } else {
            this.updateAddress(inputs);
          }
        }
      }
    });
    const div = document.querySelector('.form__address_prof');
    div?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target?.closest('.radio_button')) {
        this.changeDefaultValue(target);
      }
    });
  }

  private changeDefaultValue(elem: HTMLInputElement) {
    if (elem.checked) {
      const answer = confirm('Изменить адрес по умолчанию?');
      if (answer) {
        const divs = document.querySelectorAll(
          '.addres__block_profile',
        ) as NodeListOf<HTMLDivElement>;
        this.removeDefaultAddresses(divs);
        const parent = elem.closest('.addres__block_profile');
        const id = parent?.getAttribute('data-id') as string;
        const type =
          parent?.getAttribute('data-type') === 'billing'
            ? 'setDefaultBillingAddress'
            : 'setDefaultShippingAddress';
        this.changeDefaultAddress(id, type);
      } else if (!answer) {
        elem.checked = false;
      }
    } else {
      elem.checked = true;
      return;
    }
  }

  //listener for edit buttons - get change info about customer in inputs
  private handleClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.closest('.profile__edit_button')) {
      (target.previousElementSibling as HTMLInputElement).disabled = false;
      target.parentElement?.classList.add('border__active');
      this.editMode = true;
    }
  }

  private listenerInputWrite() {
    const inputs = this.getInputs();
    inputs?.[3].addEventListener('blur', this.validateInputDate.bind(this));
    inputs?.[4].addEventListener('keyup', this.validateInputEmail.bind(this));
    inputs?.forEach((input: HTMLElement, index: number) => {
      if (index >= 0 && index <= 2) {
        input.addEventListener('keyup', this.validateInputText.bind(this));
      }
    });
    const checkbox = document.querySelector('#checkbox_passw') as HTMLInputElement;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const window = document.querySelector('.passw_block');
        const inputs = window?.querySelectorAll('input');
        inputs?.forEach((input) => {
          input.value = '';
        });
        this.openModalWindowPassword();
      }
    });
    const passwInput = document.querySelector('.new__password');
    passwInput?.addEventListener('keyup', this.validateInputPassw.bind(this));
  }

  private listenerButtonsModalWindowPassword() {
    const buttonReset = document.querySelector('.passw__reset');
    buttonReset?.addEventListener('click', () => {
      this.removeCheck();
      const passwInput = document.querySelector('.new__password');
      passwInput?.classList.remove('border__active');
      passwInput?.classList.remove('border__wrong');
      document.querySelector('.passw_block')?.classList.remove('fullscreen');
    });
    const buttonSave = document.querySelector('.passw__save');
    buttonSave?.addEventListener('click', () => {
      const inputs = document.querySelectorAll(
        'input[type=password]',
      ) as NodeListOf<HTMLInputElement>;
      if (inputs[0].value === inputs[1].value) {
        this.getPasswordMessage('Вы ввели одинаковые пароли');
      } else if (inputs[1].classList.contains('border__wrong')) {
        this.getPasswordMessage(
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру',
        );
      } else {
        this.getUpdatePassw(inputs);
      }
    });
  }

  private getInputs(): NodeListOf<HTMLInputElement> | undefined {
    const parent = document.querySelector('.profile__block_main');
    const inputs = parent?.querySelectorAll('input.profile__input') as NodeListOf<HTMLInputElement>;
    return inputs;
  }
  private getInputsAddress(parent: HTMLDivElement): NodeListOf<HTMLInputElement> | undefined {
    const inputs = parent?.querySelectorAll('input.field__input') as NodeListOf<HTMLInputElement>;
    return inputs;
  }
  private getPasswordMessage(text: string) {
    const p = document.querySelector('.passw_mes') as HTMLParagraphElement;
    p.textContent = text;
  }
  private removeCheck() {
    const check = document.querySelector('#checkbox_passw') as HTMLInputElement;
    check.checked = false;
  }
  private removeBorder() {
    const fields = document.querySelectorAll('.profil_field');
    fields.forEach((item) => {
      item.classList.remove('border__active');
      item.classList.remove('border__wrong');
    });
    const paragraphs = document.querySelectorAll('.profile__msg');
    paragraphs.forEach((p) => (p.textContent = ''));
  }

  private getDisabled() {
    const inputs = this.getInputs();
    inputs?.forEach((input) => {
      input.disabled = true;
    });
  }
  private openModalWindowPassword() {
    this.getPasswordMessage(
      'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру',
    );
    const modal = document.querySelector('.passw_block');
    modal?.classList.add('fullscreen');
  }
  private removeErrorValue(elem: HTMLElement) {
    elem?.classList.remove('border__wrong');
    elem?.classList.add('border__active');
  }
  private addErrorValue(elem: HTMLElement) {
    elem?.classList.add('border__wrong');
    elem?.classList.remove('border__active');
  }
  private openMessageWindow(text: string) {
    const message = document.querySelector('.message_block') as HTMLDivElement;
    const p = message?.querySelector('p') as HTMLParagraphElement;
    p.textContent = text;
    message?.classList.add('fullscreen');
  }
}
