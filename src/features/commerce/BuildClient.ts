/* eslint-disable*/
import fetch from 'node-fetch';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
  Category,
  MyCustomerUpdate,
  MyCustomerChangePassword,
  _BaseAddress,
} from '@commercetools/platform-sdk';
import { CUSTOMER_API_CREDS } from '../../constants/customer-api-creds';
import { getProductsResource } from './products-resource';

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { RegisterBody } from '../../types';
import Auth from '../auth/auth';
import { AuthToken } from '../../types/auth';
import { DataProvider } from '../../types/data-provider';

type ExistingTokenMiddlewareOptions = {
  force?: boolean;
};

const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
  force: true,
};

export default class EcommerceClient {
  private static clientBuilder = new ClientBuilder();
  private static apiRoot: ApiRoot;
  private static authOptions: AuthMiddlewareOptions = {
    host: CUSTOMER_API_CREDS.Auth_Host,
    projectKey: CUSTOMER_API_CREDS.project_key,
    credentials: {
      clientId: CUSTOMER_API_CREDS.client_id,
      clientSecret: CUSTOMER_API_CREDS.secret,
    },
    scopes: CUSTOMER_API_CREDS.scope,
    fetch,
  };
  private static httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: CUSTOMER_API_CREDS.API_Host,
    fetch,
  };
  private static apiClient = EcommerceClient.getApiClient();

  public static stockRootPrepare() {
    const builder = this.clientBuilder
      .withClientCredentialsFlow(this.authOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    this.apiRoot = createApiBuilderFromCtpClient(builder);
  }

  public static tokenRootPrepare() {
    const accessToken = Auth.getAccessToken();

    const builded = this.clientBuilder
      .withExistingTokenFlow(`Bearer ${accessToken}`, existingTokenMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    this.apiRoot = createApiBuilderFromCtpClient(builded);
  }

  public static async getProducts() {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .products()
      .get()
      .execute();
  }

  public static async getProductsFromCategory(categoryId: string) {
    const prods = await EcommerceClient.getProducts();
    return prods.body.results.filter((prod) => {
      const prodCats = prod.masterData.current.categories.map((item) => item.id);
      return prodCats.includes(categoryId);
    });
  }

  public static async login(email: string, password: string) {
    const token: AuthToken = await Auth.loggin(email, password);
    const accessToken = `Bearer ${token.access_token}`;

    const client = this.clientBuilder
      .withExistingTokenFlow(accessToken, existingTokenMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(client);

    return apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .login()
      .post({
        body: { email, password },
      })
      .execute();
  }

  public static async registerUser(body: RegisterBody) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .signup()
      .post({
        body,
      })
      .execute();
  }

  public static async getCustomer() {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .get()
      .execute();
  }
  public static async getCustomerById(ID: string) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .customers()
      .withId({ ID })
      .get()
      .execute();
  }

  public static async getUsersEmail() {
    const Customers = () => {
      return this.apiRoot
        .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
        .customers()
        .get()
        .execute();
    };
    const customers = await Customers();
    const length = Number(customers.body.total);
    console.log('length' + length);
    const emails = (length: number) => {
      return this.apiRoot
        .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
        .customers()
        .get({
          queryArgs: {
            limit: length,
          },
        })
        .execute();
    };
    const arr: string[] = [];
    const data = await emails(length);
    const objectCustomers = data.body.results;
    console.log(objectCustomers);
    for (let customer of objectCustomers) {
      for (let key in customer) {
        if (key === 'email') {
          arr.push(customer[key]);
        }
      }
    }
    return arr;
  }

  public static async updateCustomer(data: MyCustomerUpdate) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .post({
        body: data,
      })
      .execute();
  }
  public static async addCustomerAddress(num: number, data: _BaseAddress) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .post({
        body: {
          version: num,
          actions: [
            {
              action: 'addAddress',
              address: data,
            },
          ],
        },
      })
      .execute();
  }
  public static async updateCustomerAddress(num: number, id: string, data: _BaseAddress) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .post({
        body: {
          version: num,
          actions: [
            {
              action: 'changeAddress',
              addressId: id,
              address: data,
            },
          ],
        },
      })
      .execute();
  }
  public static async addAddressgId(
    num: number,
    id: string,
    type: 'addBillingAddressId' | 'addShippingAddressId',
  ) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .post({
        body: {
          version: num,
          actions: [
            {
              action: type,
              addressId: id,
            },
          ],
        },
      })
      .execute();
  }
  public static async removeAddressg(num: number, id: string) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .post({
        body: {
          version: num,
          actions: [
            {
              action: 'removeAddress',
              addressId: id,
            },
          ],
        },
      })
      .execute();
  }
  public static async setDefaultAddress(
    num: number,
    id: string,
    type: 'setDefaultBillingAddress' | 'setDefaultShippingAddress',
  ) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .post({
        body: {
          version: num,
          actions: [
            {
              action: type,
              addressId: id,
            },
          ],
        },
      })
      .execute();
  }

  public static async updateCustomerPassword(data: MyCustomerChangePassword) {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .password()
      .post({
        body: data,
      })
      .execute();
  }

  public static async getCustomerByToken() {
    const token = window.localStorage.getItem('coursestore_token');
    let refresh_token: string = '';
    if (token) refresh_token += JSON.parse(token).refresh_token;
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .me()
      .get({
        headers: {
          Authorization: `Baerar ${refresh_token}`,
          'Content-Type': 'application/json',
        },
      })
      .execute();
  }

  private static getApiClient() {
    const builder = this.clientBuilder
      .withClientCredentialsFlow(this.authOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(builder).withProjectKey({
      projectKey: CUSTOMER_API_CREDS.project_key,
    });
  }

  public static getDataProvider(): DataProvider {
    const productsResource = getProductsResource(this.apiClient);

    return {
      products: productsResource,
    };
  }

  public static async getProductById(ID: string) {
    return this.getApiClient().products().withId({ ID }).get().execute();
  }

  public static async getCategoryById(ID: string) {
    return this.getApiClient().categories().withId({ ID }).get().execute();
  }
}
