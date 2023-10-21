import boto3, json, os, logging
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)
client = boto3.resource('dynamodb')

IS_OFFLINE = os.getenv('IS_OFFLINE', True)

if IS_OFFLINE:
  client = boto3.resource('dynamodb',
            region_name='localhost',
            aws_access_key_id='123456',
            aws_secret_access_key='123456',
            endpoint_url='http://localhost:8000'
          )

def handler(event, context):
  try:
    logging.info('Eliminando usuario')
    userId = event['pathParameters']['id']
    table = client.Table('usersTable')
    result = table.delete_item(Key = {'pk': userId})
    
    body = json.dumps({ 'message': f"user {userId} deleted" })

    response = {
      'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
      'body': body
    }
    logging.info('usuario eliminado satisfactoriamente')
    return response
  except:
    logging.error('Ocurrion un error')
  finally:
    logging.log('Finalizando la tarea')