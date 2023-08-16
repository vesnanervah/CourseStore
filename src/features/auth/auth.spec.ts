/* eslint-disable max-lines-per-function */
import Auth from './auth';

describe('Auth model', () => {
  describe('Loggin when valid mail and password', () => {
    it('should return OK status', async () => {
      // Arrange
      const resp = await Auth.loggin('c.zwerew2012@yandex.ru', '1488');
      const status = resp.statusCode;
      // Assert
      expect(status).toBe(200);
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
  describe('Locale storage login data after success login', () => {
    it('should equal to provided data', async () => {
      await Auth.loggin('c.zwerew2012@yandex.ru', '1488');
      const data = Auth.getDataFromLocale();
      expect(data.isLoggedIn).toBe(true);
      expect(data.mail).toBe('c.zwerew2012@yandex.ru');
      expect(data.password).toBe('1488');
    });
  });
  describe('Locale storage login data after unsuccess login', () => {
    it('should be undefined', async () => {
      try {
        await Auth.loggin('c.zwerew2012@yandex.ru', 'wrongpassword');
      } catch {
        const data = Auth.getDataFromLocale();
        expect(data.isLoggedIn).toBe(false);
        expect(data.mail).toBe(undefined);
        expect(data.password).toBe(undefined);
      }
    });
  });
});
