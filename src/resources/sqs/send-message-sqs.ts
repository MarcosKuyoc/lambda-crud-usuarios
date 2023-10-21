import { QUEUE_URL } from '../../keys/queue-url';
import * as AWS from 'aws-sdk';
import { clientSqs } from '../aws/aws-sqs';

export const sendMessageSqs = async (message: string): Promise<AWS.SQS.Types.SendMessageResult> => {
  try {
    const params: AWS.SQS.Types.SendMessageRequest = {
      MessageBody: message,
      QueueUrl: QUEUE_URL,
    };
    const result: AWS.SQS.Types.SendMessageResult = await clientSqs.sendMessage(params).promise();
    return result;
  } catch (error) {
    console.error('Error: sendMessage');
    throw new Error(error.message);
  }
}