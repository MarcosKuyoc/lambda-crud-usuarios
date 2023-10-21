// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const date = new Date();
//   const minutes = date.getMinutes();
//   const hour = date.getHours();
//   const token = `Bearer ${process.env.SECRET_API}-${hour}-${minutes}`;

//   if (event.headers?.Authorization !== token) {
//     return {
//       statusCode: 401,
//       body: JSON.stringify({ message: 'Unauthorized' }),
//     };
//   }

//   if (!event.requestContext || !event.requestContext.resourcePath) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ message: 'resourcePath not found in the event' }),
//     };
//   }

//   const methodArn = event.requestContext.resourcePath + '/' + event.httpMethod;

//   const authorizerResponse = {
//     principalId: 'anonymous',
//     policyDocument: {
//       Version: '2012-10-17',
//       Statement: [
//         {
//           Action: 'execute-api:Invoke',
//           Effect: 'Allow',
//           Resource: methodArn,
//         },
//       ],
//     },
//   };

//   // Almacena la información de autorización en el campo 'context'
//   event.requestContext.authorizer = authorizerResponse;

//   // Devuelve una respuesta con el código de estado 200
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'Authorized' }),
//   };
// };
