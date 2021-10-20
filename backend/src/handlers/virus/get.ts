import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import { failure, success } from '@libs/response';

const documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async () => {
  return documentClient.query({TableName: "dojo-serverless-table"}, function(err, data) {
    if (err) {
      console.log("Error", err);
      return failure({ err });
    } else {
      const viruses = data;
      return success({ viruses });
    }
  });
};
