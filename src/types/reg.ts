import { BaseAddress } from '@commercetools/platform-sdk';

type RegisterBody = {
  readonly email: string;

  readonly password: string;

  readonly firstName?: string;

  readonly lastName?: string;

  readonly middleName?: string;

  readonly dateOfBirth?: string;

  readonly addresses?: BaseAddress[];

  readonly defaultShippingAddress?: number;

  readonly defaultBillingAddress?: number;
};

export { RegisterBody };
