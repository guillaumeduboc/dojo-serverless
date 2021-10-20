import { APIGatewayProxyHandler } from 'aws-lambda';
import { Virus } from 'types/virus';

const listOfViruses: Array<Virus> = [{id: 1, type: 1},{id: 2, type: 1},{id: 3, type: 3},{id: 4, type: 2},{id: 5, type: 1}]

export const main: APIGatewayProxyHandler = async event => {
  if (event.queryStringParameters != null && Object.keys(event.queryStringParameters).includes("id")){
    const targettedId: number = parseInt(event.queryStringParameters.id);
    const targettedVirus = listOfViruses.find((virus: Virus) => virus.id==targettedId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: targettedVirus,
        input: event,
      }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: listOfViruses,
        input: event,
      }),
    };
  }
}