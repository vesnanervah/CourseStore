import { EcommerceApiCreds } from '../types/ecommerce-api-creds';

const API_CREDS: EcommerceApiCreds = {
  project_key: 'coursestore',
  client_id: 'D0bUuRxaIvACo7pZuE9NGM8W',
  secret: '7upj-yTtMQdot8sbeDyRsPQLQD70fwmK',
  scope: [
    'manage_my_business_units:coursestore',
    'manage_my_orders:coursestore',
    'manage_my_profile:coursestore',
    'manage_my_payments:coursestore',
    'manage_my_quote_requests:coursestore',
    'create_anonymous_token:coursestore',
    'manage_my_shopping_lists:coursestore',
    'view_published_products:coursestore',
    'manage_categories:coursestore',
    'manage_my_quotes:coursestore',
  ],
  API_Host: 'https://api.us-central1.gcp.commercetools.com',
  Auth_Host: 'https://auth.us-central1.gcp.commercetools.com',
};

export { API_CREDS };
