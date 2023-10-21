# Serverless Framework: Microservicios con AWS
Se desarrolla una aplicación básica, basada en el uso de microservicios con Serverless Framework v3.

## Descripcion:
Realizar un CRUD de usuarios. Los datos que debe contener un usuario son: nombre, apellido y edad. Cada uno de los endpoints deberá tener una seguridad básica basada en API Key, excepto el endpoint para la creación de un nuevo usuario, el cual debe utilizar autenticación basada en JWT.

## Tecnologias usadas
- Node
- Typescript
- Aws Lambda
- Api Gateway
- DynamoDB
- SQS
- Api Key
- Custom Autorization

## Requerimientos
- Tener instalada la version v18.16.0 de Node
- Recomendamos usar NVM para poder manejar las versiones
- Tener instalado docker
- Descargar y correr Elasticmq para las colas en local


```shell
docker pull softwaremill/elasticmq

docker run --name Offline-SQS --rm -it -p 9324:9324 -p 9325:9325 softwaremill/elasticmq
```


## Iniciar la aplicación

```
nvm use
```

```
yarn install
```

## Uso en Local

**Deploy**

```
$ yarn run deploy:offline
```

**Pruebe los siguientes endpoints**

```
GET  http://localhost:3000/dev/users/{id}
POST http://localhost:3000/dev/users
PATCH http://localhost:3000/dev/users/{id}
DELETE  http://localhost:3000/dev/users/{id}
DELETE  http://localhost:3000/dev/users/py/{id}
POST http://localhost:3000/dev/like
```

### Seguridad API-KEY
Recuerda agregar en los headers 'x-api-key' con la clave proporcionada