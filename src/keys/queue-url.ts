const offlineQueueUrl = 'http://localhost:9324/000000000000/my-like-queue';
export const QUEUE_URL = process.env.QUEUE_URL ?? offlineQueueUrl;