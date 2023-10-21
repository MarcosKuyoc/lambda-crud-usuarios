import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sendMessageSqs } from '../../resources/sqs/send-message-sqs';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
  try {
    if (!event.body) {
      throw new Error('body invalid');
    }
  
    let messageBody: string;
      
    if (typeof event.body === 'object') {
      messageBody = JSON.stringify(event.body);
    } else {
      messageBody = event.body
    }
  
    const { MessageId } = await sendMessageSqs(messageBody)
    console.log(`Mensaje enviado con éxito, ID: ${MessageId}`);
    return {
      statusCode: 200,
      body: JSON.stringify('Mensaje enviado a la cola SQS.'),
    };
  } catch (error) {
    console.log(error.mesage);
    return {
      statusCode: 400,
      body: JSON.stringify('Ocurrion un error'),
    };
  }
};
