# Serverless Framework: Crud de usuarios en Node con Typescript, Api Gateway y DynamoDb

Microservicio con Serverless Framework v3, usando Node.js, Typescript: crud de usuarios, corriendo en una AWS Lambda con API Gateway y almacenamiento en DynamoDB.

El servicio puede correr de manera offline.


## Setup

Corra este comando e inicialice el proyecto en su espacio de trabajo.

```
npm install
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
