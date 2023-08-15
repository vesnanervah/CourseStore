import '../login/login.scss';
import './reg.scss';
import { BaseView } from '../../features/ui';
import BaseRegLink from '../../features/ui/base-reg-link/base-reg-link';
import BaseLogBtn from '../../features/ui/base-log-btn/base-log-btn';
import BaseTxtInp from '../../features/ui/base-txt-inp/base-txt-inp';
import Auth from '../../features/auth/auth';

export default class RegView extends BaseView {
  mailField = new BaseTxtInp();
  nameField = new BaseTxtInp(); //
  passwordField = new BaseTxtInp();
  dateField = new BaseTxtInp(); //
  regBtn = new BaseLogBtn();
  backBtn = new BaseRegLink('#'); //TODO add link to page login

  validationMsg: HTMLElement = document.createElement('div');

  constructor() {
    super();
    this.init();
    this.mailValidation();
    this.passwordValidation();
    this.nameValidation();
  }

  private init(): void {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const stripe = document.createElement('div');
    const text = document.createElement('div');
    const linkFieldElem = this.backBtn.getHtmlElement();
    const mailFieldElem = this.mailField.getHtmlElement();
    const nameFieldElem = this.nameField.getHtmlElement(); //
    const passwordFieldElem = this.passwordField.getHtmlElement();
    const dateFieldElem = this.dateField.getHtmlElement();
    dateFieldElem.querySelector('input')?.setAttribute('type', 'date');
    (dateFieldElem.querySelector('input') as HTMLInputElement).value = '2000-06-01';
    const regBtnElem = this.regBtn.getHtmlElement();
    text.textContent = '* Поле обязательно для заполнения';
    text.classList.add('reg__text');
    this.validationMsg.className = 'reg__validmsg hidden';
    wrapper.className = 'login';
    content.className = 'login__content';
    (regBtnElem as HTMLElement).classList.add('login__btn-login');
    this.dateField.setClassnames('login');
    this.mailField.setLabel('Почта*:');
    this.nameField.setLabel('ФИО*:'); //
    this.passwordField.setLabel('Пароль*:');
    this.dateField.setLabel('Дата рождения*:'); //
    this.regBtn.setPlaceholder('ЗАРЕГИСТРИРОВАТЬСЯ');
    stripe.className = 'login__stripe';
    content.append(
      linkFieldElem,
      mailFieldElem,
      nameFieldElem,
      passwordFieldElem,
      dateFieldElem,
      regBtnElem,
      text,
      this.validationMsg,
    );
    //this.regBtn.getHtmlElement().addEventListener('click', async () => this.handleLoginClick());
    wrapper.append(stripe, content);
    this.htmlElement = wrapper;
  }

  private throwValidationError(): void {
    this.validationMsg.classList.remove('hidden');
  }

  private resetValidationError(): void {
    this.validationMsg.classList.add('hidden');
  }
  private throwValidationErrorNameField(): void {
    this.validationMsg.classList.remove('hidden');
    this.throwValidationError();
    this.nameField.failValidation();
  }

  private async handleLoginClick() {
    if (!this.checkValidStatus()) {
      return;
    }
    try {
      await Auth.loggin(this.mailField.getTypedValue(), this.passwordField.getTypedValue());
      this.resetValidationError();
      //  TODO: replace alert with real redirect
      alert('Successfully logged in');
    } catch {
      this.throwValidationError();
    }
  }

  private mailValidation(): void {
    this.mailField.validateInput((target) => {
      if (
        /[a-zа-я0-9_-]+@[a-zA-Z0-9]+\.[a-z]{2,3}/.test(target) &&
        target.indexOf('@') != 0 &&
        target.trim().indexOf(' ') == -1
      ) {
        this.resetValidationError();
        this.mailField.resetValidation();
        return true;
      } else {
        this.validationMsg.textContent =
          'Неправильный адрес электронной почты. Корректный формат: example@email.com';
        this.throwValidationError();
        this.mailField.failValidation();
        return false;
      }
    });
  }

  private passwordValidation(): void {
    this.passwordField.validateInput((target) => {
      if (
        target.length > 7 &&
        /[0-9]/.test(target) &&
        /[A-ZА-Я]/.test(target) &&
        /[a-zа-я]/.test(target)
      ) {
        this.validationMsg.textContent = '';
        this.resetValidationError();
        this.passwordField.resetValidation();
        return true;
      } else {
        this.validationMsg.textContent =
          'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную буква и 1 цифру';
        this.throwValidationError();
        this.passwordField.failValidation();
        return false;
      }
    });
  }

  private nameValidation(): void {
    this.nameField.validateInput((target) => {
      if (target.split(' ').length > 1) {
        for (const elem of target.split(' ')) {
          const text = elem.toLowerCase();
          if (/[0-9]/g.test(text) || /\W/.test(text)) {
            this.validationMsg.textContent =
              'Сведения не должны содержать специальных символов или цифр';
            this.throwValidationErrorNameField();
            return false;
          }
        }
        this.validationMsg.textContent = '';
        this.resetValidationError();
        this.nameField.resetValidation();
        return true;
      } else {
        this.validationMsg.textContent = 'Укажите фамилию и имя';
        this.throwValidationErrorNameField();
        return false;
      }
    });
  }

  private checkValidStatus(): boolean {
    return (
      this.mailField.checkValid() && this.passwordField.checkValid() && this.nameField.checkValid()
    );
  }
}
