import fetch from 'node-fetch';
import { createApiBuilderFromCtpClient, ApiRoot, Category } from '@commercetools/platform-sdk';

import { CUSTOMER_API_CREDS } from '../../constants/customer-api-creds';

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { RegisterBody, ProductCategory } from '../../types';
import Auth from '../auth/auth';
import { AuthToken } from '../../types/auth';

type ExistingTokenMiddlewareOptions = {
  force?: boolean;
};

const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
  force: true,
};

const LOCALE = 'ru';

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
      .withExistingTokenFlow(accessToken, existingTokenMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    this.apiRoot = createApiBuilderFromCtpClient(builded);
  }

  public static async getCategories(): Promise<ProductCategory[]> {
    return this.apiClient
      .categories()
      .get()
      .execute()
      .then((data) => EcommerceClient.normalizeCategories(data.body.results));
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

  private static normalizeCategories(categories: Category[]): ProductCategory[] {
    return categories.map(({ id, name, slug }) => ({
      id,
      name: name[LOCALE],
      slug: slug[LOCALE],
    }));
  }

  public static async getProductById(ID: string) {
    return this.getApiClient().products().withId({ ID }).get().execute();
  }
}
