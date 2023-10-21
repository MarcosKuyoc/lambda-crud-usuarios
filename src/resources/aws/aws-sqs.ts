import * as AWS from 'aws-sdk';

const isOffline = process.env.IS_OFFLINE === 'true'
const offlineOptions = {
  credentials: {
    accessKeyId: 'doesnt_matter',
    secretAccessKey: 'doesnt_matter'
  },
  endpoint: 'http://localhost:9324'
}

const productionOptions = {}

const options = isOffline ? offlineOptions : productionOptions
export const clientSqs = new AWS.SQS(options);