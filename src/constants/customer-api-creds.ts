import { EcommerceApiCreds } from '../types/ecommerce-api-creds';

const CUSTOMER_API_CREDS: EcommerceApiCreds = {
  project_key: 'coursestore',
  client_id: 'Q53bj2ohY8r6GnT_2ObtsHYE',
  secret: 'aRPWZhE_PkqrxjfmpYElTXidCjSlkT4i',
  scope: [
    'manage_my_business_units:coursestore',
    'view_product_selections:coursestore',
    'introspect_oauth_tokens:coursestore',
    'view_products:coursestore',
    'manage_my_orders:coursestore',
    'manage_my_payments:coursestore',
    'view_shopping_lists:coursestore',
    'view_quotes:coursestore',
    'manage_my_quote_requests:coursestore',
    'create_anonymous_token:coursestore',
    'manage_my_quotes:coursestore',
    'view_messages:coursestore',
    'view_payments:coursestore',
    'manage_my_profile:coursestore',
    'view_stores:coursestore',
    'view_types:coursestore',
    'view_orders:coursestore',
    'view_categories:coursestore',
    'manage_my_shopping_lists:coursestore',
    'view_published_products:coursestore',
    'view_customers:coursestore',
  ],
  API_Host: 'https://api.us-central1.gcp.commercetools.com',
  Auth_Host: 'https://auth.us-central1.gcp.commercetools.com',
};

export { CUSTOMER_API_CREDS };
