import { RequestNewUser, ResponseNewUser } from '../../domain/interfaces/new-user.interface';
import { clientDynamoDB } from '../aws/aws-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryDynamo {
  async findById(id: string): Promise<ResponseNewUser | object> {
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

  async create(data: RequestNewUser): Promise<ResponseNewUser> {
    try {
      const id = uuidv4();
      const params = {
        TableName: 'usersTable',
        Item: { ...data, pk: id },
      };
      await clientDynamoDB.put(params).promise();
      return params.Item;
    } catch (error) {
      console.error('[UserRepositoryDynamo -> create]');
      console.error(error.message);
      throw error;
    }
  }
}