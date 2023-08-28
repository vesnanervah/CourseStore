import EcommerceClient from '../commerce/BuildClient';
import { CUSTOMER_API_CREDS } from '../../constants/customer-api-creds';

import { AuthToken, LocaleData, AuthListener } from '../../types/auth';

const LS_AUTH_TOKEN_KEY = 'coursestore_token';

export default class Auth {
  private static isLoggedIn: boolean;
  private static accessToken: string | null;
  private static subscribers: AuthListener[] = [];
  private constructor() {
    //
  }

  public static async init() {
    const storageData = Auth.getDataFromStorage();
    if (storageData.token) {
      Auth.isLoggedIn = true;
      Auth.notifyLogin();
      console.log('saved login found');
    } else {
      console.log('there is no saved login');
      Auth.loggout();
    }
  }

  public static async loggin(email: string, password: string): Promise<AuthToken> {
    try {
      const storageData = Auth.getDataFromStorage();
      const token: AuthToken = storageData.token ?? (await this.getToken({ email, password }));
      Auth.saveTokenToStorage(token);
      Auth.isLoggedIn = true;
      Auth.accessToken = token.access_token;
      Auth.notifyLogin();
      return token;
    } catch {
      Auth.loggout();
      throw new Error('User not found');
    }
  }

  public static loggout(): void {
    window.localStorage.removeItem(LS_AUTH_TOKEN_KEY);
    Auth.isLoggedIn = false;
    Auth.accessToken = null;
    Auth.notifyLogout();
    EcommerceClient.stockRootPrepare();
    console.log('logout');
  }

  public static checkLogin(): boolean {
    return Auth.isLoggedIn;
  }

  public static getDataFromStorage(): LocaleData {
    const stringifiedToken = window.localStorage.getItem(LS_AUTH_TOKEN_KEY);
    const parsedToken = stringifiedToken ? JSON.parse(stringifiedToken) : null;

    return { token: parsedToken };
  }

  public static getAccessToken(): string {
    const { token } = Auth.getDataFromStorage();
    if (!token) {
      throw new Error('Failed to get access token');
    }

    return token.access_token;
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

  private static saveTokenToStorage(token: AuthToken): void {
    window.localStorage.setItem(LS_AUTH_TOKEN_KEY, JSON.stringify(token));
  }

  private static async getToken({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthToken> {
    const reqBody = {
      grant_type: 'password',
      username: email,
      password: password,
      scope: CUSTOMER_API_CREDS.scope.join(' '),
    };
    return fetch(
      `${CUSTOMER_API_CREDS.Auth_Host}/oauth/${CUSTOMER_API_CREDS.project_key}/customers/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${CUSTOMER_API_CREDS.client_id}:${CUSTOMER_API_CREDS.secret}`,
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(reqBody),
      },
    ).then((resp) => resp.json() as unknown as AuthToken);
  }
}
