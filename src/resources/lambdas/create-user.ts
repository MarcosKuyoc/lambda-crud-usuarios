import { RequestNewUser, ResponseNewUser } from '../../services/shared/interfaces/new-user.interface';
import { clientDynamoDB } from '../aws/aws-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async(data: RequestNewUser): Promise<ResponseNewUser> => {
  try {
    const id = uuidv4();
    const params = {
      TableName: 'usersTable',
      Item: { ...data, pk: id },
    };
    await clientDynamoDB.put(params).promise();
    return params.Item;
  } catch (error) {
    console.error('[lambdas -> create]');
    console.error(error.message);
    throw error;
  }
}