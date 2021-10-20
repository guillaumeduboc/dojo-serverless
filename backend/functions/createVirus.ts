import { success } from '@libs/response';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const main: APIGatewayProxyHandler = async event => {
  console.log(event);
  return success({});
}