import { SQSEvent } from 'aws-lambda';
import { updateLikes } from '../../resources/lambdas/update-likes';

export const handler = async (event: SQSEvent): Promise<void> => {
  try {
    if (!event.Records || event.Records.length === 0) {
      console.log('No records in the SQS event.');
      return;
    }

    const record = event.Records[0];
    const body = JSON.parse(record.body);
    const userId = body.pk;

    const result = await updateLikes(userId);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
