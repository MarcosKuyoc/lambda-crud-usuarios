# Serverless Framework: Microservicios con AWS
Se desarrolla una aplicacion basica, basada en el uso de microservicio con Serverless Framework v3.

## Tecnologias usadas
- Node
- Typescript
- Aws Lambdas
- Api Gateway
- Sqs
- DynamoDB
- Custom Autorization
- Api Key

## Requerimientos
- Tener instalada la version v18.16.0 de Node
- Recomendamos usar NNM para poder manejar las versiones

## Setup

```
nvm use
```

```
yarn install
```

## Usage

**Deploy**

```
$ npm run deploy:offline
```

**Pruebe los siguientes endpoints**

```
GET https://localhost:3000/dev/users/{id}
POST https://localhost:3000/dev/users
```

### Para correr el api key
Recuerda agregar en los headers x-api-key con la clave proporcionada