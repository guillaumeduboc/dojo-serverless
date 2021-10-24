import EventBridge from 'aws-sdk/clients/eventbridge';

const eventBridge = new EventBridge();

export const main = async (): Promise<void> => {
  await eventBridge
    .putEvents({
      Entries: [
        {
          Source: 'dojo-serverless',
          DetailType: 'VIRUS_CREATION_REQUESTED',
          Detail: JSON.stringify({}),
          EventBusName: 'dojo-serverless',
        },
      ],
    })
    .promise();
};
