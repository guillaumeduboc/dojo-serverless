import { failure, success } from '@libs/response';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async ({ pathParameters }) => {
  if (pathParameters == null) {
    return failure({});
  }
  const virusId = pathParameters.virusId;
  try {
    await documentClient
      .delete({
        TableName: 'dojo-serverless-table',
        Key: {
          partitionKey: 'Virus',
          sortKey: virusId,
        },
      })
      .promise();

    return success({});
  } catch (e) {
    return failure({ e });
  }
};
