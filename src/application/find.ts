import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../domain/services/user.service';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters) {
      throw new Error('pathParameters invalid');
    }

    if (!event.pathParameters.id) {
      throw new Error('id invalido');
    }

    const userId = event.pathParameters.id;
    console.info(`Buscando el usuario con identificador ${userId}`);
    const usersService = new UserService();
    const user = await usersService.findById(userId);
    
    console.info('El usuario fue encontrado satisfactoriamente');
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('[find]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};