import { UniqueId } from './common';

type EcommerceApiCreds = {
  project_key: string;
  client_id: UniqueId;
  secret: string;
  scope: string[];
  API_Host: string;
  Auth_Host: string;
};

export { EcommerceApiCreds };
