import { clientDynamoDB } from '../aws/aws-dynamodb';

export const updateLikes = async(id: string) => {
  try {
    const params = {
      TableName: 'usersTable',
      Key: { pk: id },
      UpdateExpression: 'ADD likes :inc',
      ExpressionAttributeValues: {
        ':inc': 1,
      },
      ReturnValues: 'ALL_NEW',
    };      

    const result = await clientDynamoDB.update(params).promise();
    return result.Attributes;
  } catch (error) {
    console.error('[UserRepositoryDynamo -> updateLikes]');
    console.error(error.message);
    throw error;
  }
}