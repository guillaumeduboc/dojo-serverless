// @ts-nocheck
import { DynamoDBStreamEvent } from 'aws-lambda';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { getAllConnections } from '@libs/connections';
import { sendMessageToConnection } from '@libs/websocket';
import { Item } from '@libs/types';
import { Virus } from '../virus/types';

const sendMessageToEachConnection = async (message: any): Promise<void> => {
  // TODO use sendMessageToConnection for each connection
  const connections = await getAllConnections();
  await Promise.all(
    connections.map(async ({ connectionId, endpoint }): Promise<void> => {
      await sendMessageToConnection({ connectionId, endpoint, message });
    }),
  );
};

const isVirus = (item: Item): item is Virus => item.partitionKey === 'Virus';

export const main = async (event: DynamoDBStreamEvent): Promise<void> => {
  // TODO for each record, if it's an insertion of virus, sendMessageToEachConnection
  await Promise.all(
    event.Records.map(async (record): Promise<void> => {
      if (record.eventName === 'INSERT') {
        const image: Item = Converter.unmarshall(record.dynamodb.NewImage);
        if (isVirus(image)) {
          await sendMessageToEachConnection({
            action: 'add',
            virusId: image.sortKey,
          });
        }
      } else if (record.eventName === 'REMOVE') {
        const image: Item = Converter.unmarshall(record.dynamodb.OldImage);
        if (isVirus(image)) {
          await sendMessageToEachConnection({
            action: 'delete',
            virusId: image.sortKey,
          });
        }
      }
    }),
  );
};
