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
    console.info(`eliminando el usuario: ${userId}`);
    const usersService = new UserService();
    const user = await usersService.delete(userId);
    
    console.info('El usuario fue eliminado satisfactoriamente');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `El usuario ${user} fue eliminado correctamente`,
      })
    };
  } catch (error) {
    console.error('[delete]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};