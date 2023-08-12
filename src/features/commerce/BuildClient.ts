import fetch from 'node-fetch';
import { CUSTOMER_API_CREDS } from '../../constants/customer-api-creds';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

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
  public static stockAuth() {
    const builder = this.clientBuilder
      .withClientCredentialsFlow(this.authOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    this.apiRoot = createApiBuilderFromCtpClient(builder);
  }

  public static passwordAuth(email: string, password: string) {
    const passwordAuthOptions: PasswordAuthMiddlewareOptions = {
      ...this.authOptions,
      credentials: {
        ...this.authOptions.credentials,
        user: {
          username: email,
          password: password,
        },
      },
    };
    const builded = this.clientBuilder
      .withPasswordFlow(passwordAuthOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    this.apiRoot = createApiBuilderFromCtpClient(builded);
  }

  public static async getCategories() {
    return this.apiRoot
      .withProjectKey({ projectKey: CUSTOMER_API_CREDS.project_key })
      .categories()
      .get()
      .execute();
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
}
