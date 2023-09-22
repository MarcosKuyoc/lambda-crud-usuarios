import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../application/create';
import { UserService } from '../../domain/services/user.service';

describe('Unit test for find users', function () {

  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      httpMethod: 'get',
      body: JSON.stringify({
        name: 'Marcos',
        lastName: 'Kuyoc'
      }),
      headers: {},
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: '/hello',
      pathParameters: {},
      queryStringParameters: {},
      requestContext: {
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        httpMethod: 'get',
        identity: {
          accessKey: '',
          accountId: '',
          apiKey: '',
          apiKeyId: '',
          caller: '',
          clientCert: {
            clientCertPem: '',
            issuerDN: '',
            serialNumber: '',
            subjectDN: '',
            validity: { notAfter: '', notBefore: '' },
          },
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: '',
          cognitoIdentityPoolId: '',
          principalOrgId: '',
          sourceIp: '',
          user: '',
          userAgent: '',
          userArn: '',
        },
        path: '/hello',
        protocol: 'HTTP/1.1',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        resourceId: '123456',
        resourcePath: '/hello',
        stage: 'dev',
      },
      resource: '',
      stageVariables: {},
    };
    const expectedUser = {
      pk: '1',
      name: 'Marcos',
      lastName: 'Kuyoc'
    }
    const createMock = jest
      .spyOn(UserService.prototype, 'create')
      .mockResolvedValueOnce(expectedUser);
    const result: APIGatewayProxyResult = await handler(event);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(expectedUser));
  });
});