/* eslint-disable max-lines-per-function */
import EcommerceClient from '../../features/commerce/BuildClient';
import { describe, expect } from '@jest/globals';

import RegView from './reg';
import { RegisterBody } from '../../types/reg';

class DummyView extends RegView {
  constructor() {
    super();
  }

  async handleLoginClickTest(example: RegisterBody) {
    try {
      const clientBody: RegisterBody = example;
      EcommerceClient.stockRootPrepare();
      await EcommerceClient.registerUser(clientBody).then((res) => res.statusCode);
    } catch (e) {
      return 'error';
    }
  }
}

describe('Registartion model', () => {
  describe('already an existing customer with the provided email', () => {
    it('should return error status', async () => {
      const obj = {
        email: 'example@mil.ru',
        password: '11RRrrrr',
        firstName: 'test',
        lastName: 'test',
        middleName: '',
        dateOfBirth: '2000-06-01',
        addresses: [
          {
            key: '11GGgggg',
            country: 'RU',
            city: '',
            streetName: '',
            postalCode: '',
          },
          {
            key: '3344GGgggggggtt',
            country: 'RU',
            city: '',
            streetName: '',
            postalCode: '',
          },
        ],
        defaultShippingAddress: 1,
        defaultBillingAddress: 0,
      };
      const veiw = new DummyView();
      const resp = await veiw.handleLoginClickTest(obj);
      // Assert
      expect(resp).toBe('error');
    });
  });
});
