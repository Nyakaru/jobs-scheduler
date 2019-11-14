import HttpResponse from '../../helpers/responseHelper';
import AuthValidator from '../AuthValidator';
describe('AuthValidator', () => {
  let nextMock: any;
  let responseMock: any;
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  responseMock = mockResponse();
  nextMock = jest.fn();

  beforeEach(() => {
    nextMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should validate a token is provided', async () => {
    const req: any = { headers: {}  };
    const response = jest.spyOn(HttpResponse, 'sendResponse').mockImplementation();
    await AuthValidator.authenticateToken(req, responseMock, nextMock);
    expect(response).toHaveBeenCalledTimes(1);
  });

  it('should validate a token is provided', async () => {
    const req: any = { headers: { authorization: 'token'}  };
    const response = jest.spyOn(HttpResponse, 'sendResponse').mockImplementation();
    await AuthValidator.authenticateToken(req, responseMock, nextMock);
    expect(response).toHaveBeenCalledWith(
        responseMock, 401, false, 'Failed to authenticate token! Valid token required',
      );
  });
});
