import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../application/update';
import { UserService } from '../../domain/services/user.service';

describe('Unit test for update users', function () {

  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      httpMethod: 'PATCH',
      body: JSON.stringify({
        name: 'Juan Marcos',
        lastName: 'Kuyoc Escamilla'
      }),
      headers: {},
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: '/users/{id}',
      pathParameters: {
        id: '1'
      },
      queryStringParameters: {},
      requestContext: {
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        httpMethod: 'PATCH',
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
        path: '/users/{id}',
        protocol: 'HTTP/1.1',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        resourceId: '123456',
        resourcePath: '/users/{id}',
        stage: 'dev',
      },
      resource: '',
      stageVariables: {},
    };
    const expectedUser = {
      pk: '1',
      name: 'Juan Marcos',
      lastName: 'Kuyoc Escamilla'
    }
    const updateMock = jest
      .spyOn(UserService.prototype, 'update')
      .mockResolvedValueOnce(expectedUser);
    const result: APIGatewayProxyResult = await handler(event);

    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(expectedUser));
  });
});