# Serverless Framework: Node Con Typescript y HTTP API En AWS

Este template demuestra como hacer una simple HTTP API con Node.js y Typescript corriendo en una AWS Lambda y API Gateway usando el Serverless Framework v3.


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

**Invoke la función de forma local.**

```
sls invoke local --function hello
```

**Pruebe la función**

```
curl https://localhost:3000/
```
