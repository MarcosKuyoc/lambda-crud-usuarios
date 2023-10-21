/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestNewUser } from '../../services/shared/interfaces/new-user.interface';
import { clientDynamoDB } from '../aws/aws-dynamodb';

export const updateAll = async(id: string, data: RequestNewUser): Promise<any> => {
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
    console.error('[UserRepositoryDynamo -> updateAll]');
    console.error(error.message);
    throw error;
  }
}