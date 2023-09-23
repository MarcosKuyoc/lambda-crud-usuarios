/* eslint-disable @typescript-eslint/no-explicit-any */
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

  async update(id: string, data: RequestNewUser): Promise<any> {
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

  async updateAll(id: string, data: RequestNewUser): Promise<any> {
    try {
      const ExpressionAttributeNames: any = {};
      const ExpressionAttributeValues: any = {};
      let UpdateExpression = 'SET ';

      Object.entries(data).forEach(
        ([attributeName, attributeValue]) => {
          const keyName = `#${attributeName}`;
          const valueName = `:${attributeValue}`;
          UpdateExpression += `${keyName} = ${valueName}, `;
          ExpressionAttributeNames[keyName] = attributeName;
          ExpressionAttributeValues[valueName] = attributeValue;
        }
      );

      // Remove the trailing comma and space from the UpdateExpression
      UpdateExpression = UpdateExpression.slice(0, -2);

      const params = {
        TableName: 'usersTable',
        Key: { pk: id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
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

  async delete(id: string) {
    try {
      const params = {
        TableName: 'usersTable',
        Key: { pk: id },
      };

      const result =  await clientDynamoDB.delete(params).promise();
      console.debug(result);
      return id;
    } catch (error) {
      console.error('[UserRepositoryDynamo -> delete]');
      console.error(error.message);
      throw error;
    }
  }
}