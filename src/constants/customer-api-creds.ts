import { EcommerceApiCreds } from '../types/ecommerce-api-creds';

const ENV_KEYS = [
  'API_HOST',
  'AUTH_HOST',
  'API_PROJECT_KEY',
  'API_CLIENT_ID',
  'API_SECRET',
] as const;

const API_HOST = process.env.API_HOST || '';
const AUTH_HOST = process.env.AUTH_HOST || '';
const API_PROJECT_KEY = process.env.API_PROJECT_KEY || '';
const API_CLIENT_ID = process.env.API_CLIENT_ID || '';
const API_SECRET = process.env.API_SECRET || '';

type EnvVars = { [key in (typeof ENV_KEYS)[number]]: string };

const SCOPE = [
  'manage_my_business_units',
  'view_product_selections',
  'introspect_oauth_tokens',
  'view_products',
  'manage_my_orders',
  'manage_my_payments',
  'view_shopping_lists',
  'view_quotes',
  'manage_my_quote_requests',
  'create_anonymous_token',
  'manage_my_quotes',
  'view_messages',
  'view_payments',
  'manage_my_profile',
  'view_stores',
  'view_types',
  'view_orders',
  'view_categories',
  'manage_my_shopping_lists',
  'view_published_products',
  'view_customers',
] as const;

const ENV_VARS: EnvVars = {
  API_HOST,
  AUTH_HOST,
  API_PROJECT_KEY,
  API_CLIENT_ID,
  API_SECRET,
};

const undefinedEnvVar = Object.entries(ENV_VARS).find(([, val]) => !val);
if (undefinedEnvVar) {
  throw new Error(`'${undefinedEnvVar[0]}' environment variable is undefined`);
}

const CUSTOMER_API_CREDS: EcommerceApiCreds = {
  project_key: ENV_VARS.API_PROJECT_KEY,
  client_id: ENV_VARS.API_CLIENT_ID,
  secret: ENV_VARS.API_SECRET,
  scope: SCOPE.map((scope) => `${scope}:${ENV_VARS.API_PROJECT_KEY}`),
  API_Host: ENV_VARS.API_HOST,
  Auth_Host: ENV_VARS.AUTH_HOST,
};

export { CUSTOMER_API_CREDS };
