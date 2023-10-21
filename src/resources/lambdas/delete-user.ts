import { clientDynamoDB } from '../aws/aws-dynamodb';

export const deleteUser = async(id: string) => {
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