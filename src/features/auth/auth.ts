import EcommerceClient from '../commerce/BuildClient';
import { LocaleData, AuthListener } from '../../types/auth';

export default class Auth {
  private static isLoggedIn: boolean;
  private static password: string;
  private static mail: string;
  private static subscribers: AuthListener[] = [];
  private constructor() {
    //
  }

  public static async init() {
    const localeData = Auth.getDataFromLocale();
    if (localeData.isLoggedIn && localeData.mail && localeData.password) {
      await Auth.loggin(localeData.mail, localeData.password);
      console.log('saved login found');
    } else {
      console.log('there is no saved login');
      Auth.loggout();
    }
  }

  public static async loggin(mail: string, password: string) {
    EcommerceClient.passwordRootPrepare(mail, password);
    try {
      const resp = await EcommerceClient.login(mail, password);
      Auth.password = password;
      Auth.mail = mail;
      Auth.isLoggedIn = true;
      Auth.updateStorage();
      Auth.notifyLogin();
      console.log('successfully loged in');
      return resp;
    } catch {
      Auth.loggout();
      throw new Error('User not found');
    }
  }

  private static updateStorage(): void {
    if (Auth.isLoggedIn) {
      window.localStorage.setItem('coursestore_password', Auth.password);
      window.localStorage.setItem('coursestore_mail', Auth.mail);
      window.localStorage.setItem('logged_in', `${Auth.isLoggedIn}`);
    } else {
      window.localStorage.removeItem('coursestore_password');
      window.localStorage.removeItem('coursestore_mail');
      window.localStorage.removeItem('logged_in');
    }
  }

  public static loggout() {
    Auth.password = '';
    Auth.mail = '';
    Auth.isLoggedIn = false;
    Auth.updateStorage();
    Auth.notifyLogout();
    EcommerceClient.stockRootPrepare();
    console.log('logout');
  }

  public static checkLogin(): boolean {
    return Auth.isLoggedIn;
  }

  public static getDataFromLocale(): LocaleData {
    const isLoggedIn = !!window.localStorage.getItem('logged_in');
    return {
      isLoggedIn,
      mail: isLoggedIn ? window.localStorage.getItem('coursestore_mail') : undefined,
      password: isLoggedIn ? window.localStorage.getItem('coursestore_password') : undefined,
    };
  }

  public static subscribe(elem: AuthListener) {
    Auth.prepareToSubscribe(elem);
    Auth.subscribers.push(elem); // щас будет mediator на минималках
  }

  private static notifyLogout() {
    Auth.subscribers.forEach((listener) => {
      listener.listenLogout();
    });
  }

  private static notifyLogin() {
    Auth.subscribers.forEach((listener) => {
      listener.listenLogin();
    });
  }

  private static prepareToSubscribe(elem: AuthListener) {
    if (Auth.isLoggedIn) {
      elem.listenLogin();
    } else {
      elem.listenLogout();
    }
  }
}
