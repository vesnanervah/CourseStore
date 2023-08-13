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
        () => 'Customer account with the given credentials not found',
      );
      // Assert
      expect(resp).toBe('Customer account with the given credentials not found');
    });
  });
});
