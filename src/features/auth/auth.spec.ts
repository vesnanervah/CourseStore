/* eslint-disable max-lines-per-function */
import Auth from './auth';

describe('Auth model', () => {
  describe.skip('Loggin when valid mail and password', () => {
    it('should return access token', async () => {
      // Arrange
      const resp = await Auth.loggin('c.zwerew2012@yandex.ru', '12345678');
      const token = resp.access_token;
      // Assert
      expect(token).toBeDefined();
    });
  });
  describe('Loggin when invalid mail and password', () => {
    it('should return error status', async () => {
      // Arrange
      const resp = await Auth.loggin('c.zwerew2012@yandex.ru', 'wrongpassword').catch(
        () => 'User not found',
      );
      // Assert
      expect(resp).toBe('User not found');
    });
  });
  describe.skip('Locale storage login data after success login', () => {
    it('should equal to provided data', async () => {
      // Arrange
      const email = 'c.zwerew2012@yandex.ru';
      const password = '12345678';

      // Act
      await Auth.loggin(email, password);
      const data = Auth.getDataFromStorage();

      // Assert
      expect(data.token).toBeDefined();
    });
  });
  describe('Locale storage login data after unsuccess login', () => {
    it('should be undefined', async () => {
      try {
        await Auth.loggin('c.zwerew2012@yandex.ru', 'wrongpassword');
      } catch {
        const data = Auth.getDataFromStorage();
        expect(data.token).toBe(null);
      }
    });
  });
});
