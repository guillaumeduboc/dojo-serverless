/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { DynamoDB } from 'aws-sdk';
import { Item } from './types';

interface Connection extends Item {
  partitionKey: 'Connection';
  endpoint: string;
}

const documentClient = new DynamoDB.DocumentClient();

export const createConnection = async (
  connectionId: string,
  endpoint: string,
): Promise<void> => {
  // TODO insert a connection in the DynamoDB
  await documentClient
    .put({
      TableName: 'dojo-serverless-table',
      Item: {
        partitionKey: 'Connection',
        sortKey: connectionId,
        endpoint,
      },
    })
    .promise();
};

export const deleteConnection = async (connectionId: string): Promise<void> => {
  // TODO delete a connection from the DynamoDB
  await documentClient
    .delete({
      TableName: 'dojo-serverless-table',
      Key: {
        partitionKey: 'Connection',
        sortKey: connectionId,
      },
    })
    .promise();
};

export const getAllConnections = async (): Promise<
  { connectionId: string; endpoint: string }[]
> => {
  // TODO fetch every connections from the DynamoDB
  const { Items } = await documentClient
    .query({
      TableName: 'dojo-serverless-table',
      ExpressionAttributeValues: { ':partitionKey': 'Connection' },
      KeyConditionExpression: 'partitionKey = :partitionKey',
    })
    .promise();

  return (Items as Connection[]).map(({ sortKey, endpoint }) => ({
    connectionId: sortKey,
    endpoint,
  }));
};
