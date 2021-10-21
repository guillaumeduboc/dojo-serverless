import { failure, success } from '@libs/response';
import { Item } from '@libs/types';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient();
interface Virus extends Item {
  partitionKey: 'Virus';
}

export const main: APIGatewayProxyHandler = async () => {
  try {
    const { Items = [] } = await documentClient
      .query({
        TableName: 'dojo-serverless-table',
        KeyConditionExpression: 'partitionKey = :partitionKey',
        ExpressionAttributeValues: { ':partitionKey': 'Virus' },
      })
      .promise();

    return success({
      loadedViruses: (Items as Virus[]).map(({ sortKey }) => ({ id: sortKey })),
    });
  } catch (e) {
    return failure({ e });
  }
};
