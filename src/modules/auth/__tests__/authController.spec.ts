import redisCache from '../../../cache/redisCache';
import ResponseHandler from '../../../helpers/responseHelper';
import AuthController from '../AuthController';

describe('AuthController', () => {
  describe('Generate Secret Key', () => {
    let reqMock: any;
    let httpResponse: any;
    let resMock: any;
    const mockResponse = () => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    beforeAll(() => {
      reqMock = { headers: { client_id: 'tembea-client' } };
      httpResponse = jest.spyOn(ResponseHandler, 'sendResponse').mockImplementation();
      jest.spyOn(redisCache, 'fetchObject').mockResolvedValue({ clientId: 'tem', clientSecret: 'xmnxnxnxn' });
      resMock = mockResponse();
    });
    afterAll(() => {
      jest.resetAllMocks();
    });
    it('should crete a secret key', async (done) => {
      const addSecret = jest.spyOn(AuthController, 'addClient');
      await AuthController.generateSecretKey(reqMock, resMock);
      expect(addSecret).toHaveBeenCalledTimes(1);
      expect(httpResponse).toHaveBeenCalledTimes(1);
      done();
    });

    it('should return a secret key if it exist', async (done) => {
      const secretKey = await AuthController.addClient('tem', 'jbjdasbdfkb');
      expect(secretKey).toBe('xmnxnxnxn');
      done();
    });
  });
});
