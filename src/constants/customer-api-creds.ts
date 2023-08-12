import { EcommerceApiCreds } from '../types/ecommerce-api-creds';

const CUSTOMER_API_CREDS: EcommerceApiCreds = {
  project_key: 'coursestore',
  client_id: 'vZlPZH5qSMH1dXkUBDbEVGYE',
  secret: 'nJCKmUaJwaZV9o_yQF4lZLiSj7u7L9c4',
  scope: [
    'manage_my_business_units:coursestore',
    'introspect_oauth_tokens:coursestore',
    'manage_my_orders:coursestore',
    'manage_my_profile:coursestore',
    'view_types:coursestore',
    'manage_my_payments:coursestore',
    'manage_my_quote_requests:coursestore',
    'create_anonymous_token:coursestore',
    'manage_my_quotes:coursestore',
    'view_categories:coursestore',
    'manage_my_shopping_lists:coursestore',
    'view_published_products:coursestore',
    'view_customers:coursestore',
  ],
  API_Host: 'https://api.us-central1.gcp.commercetools.com',
  Auth_Host: 'https://auth.us-central1.gcp.commercetools.com',
};

export { CUSTOMER_API_CREDS };
