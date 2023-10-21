import { RequestNewUser } from '../../services/shared/interfaces/new-user.interface';
import { clientDynamoDB } from "../aws/aws-dynamodb";

export const updateUser = async(id: string, data: RequestNewUser): Promise<any> => {
  try {
    const params = {
      TableName: 'usersTable',
      Key: { pk: id },
      UpdateExpression: 'SET #name = :name, #lastName = :lastName',
      ExpressionAttributeNames : {'#name':'name', '#lastName': 'lastName'},
      ExpressionAttributeValues: { ':name': data.name, ':lastName': data.lastName },
      ReturnValues: 'ALL_NEW'
    };

    const result = await clientDynamoDB.update(params).promise();
    return result.Attributes;
  } catch (error) {
    console.error('[UserRepositoryDynamo -> update]');
    console.error(error.message);
    throw error;
  }
}