import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../domain/services/user.service';
import { ResponseNewUser } from '../domain/interfaces/new-user.interface';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters) {
      throw new Error('pathParameters invalid');
    }

    if (!event.pathParameters.id) {
      throw new Error('id invalido');
    }

    if (!event.body) {
      throw new Error('body invalid');
    }

    let bodyRequest: ResponseNewUser;
    
    if (typeof event.body === 'string') {
      bodyRequest = JSON.parse(event.body);
    } else {
      bodyRequest = event.body
    }
    
    console.info('Solicitando la actualización de un nuevo usario');
    const userId = event.pathParameters.id;
    const usersService = new UserService();
    const user = await usersService.update(userId, bodyRequest);
    
    console.info('Usuario actualizado satisfactoriamente');
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('[create]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};