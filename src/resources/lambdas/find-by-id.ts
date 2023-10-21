import { ResponseNewUser } from '../../services/shared/interfaces/new-user.interface';
import { clientDynamoDB } from '../aws/aws-dynamodb';

export const findById = async(id: string): Promise<ResponseNewUser | object> => {
  try {
    const params = {
      TableName: 'usersTable',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': id },
    };

    const users = await clientDynamoDB.query(params).promise();
    return users.Items!.length > 0 ? users.Items![0] : {};
  } catch (error) {
    console.error('[UserRepositoryDynamo -> findById]');
    console.error(error.message);
    throw error;
  }
}