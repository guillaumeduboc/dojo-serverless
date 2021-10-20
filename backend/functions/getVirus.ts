import { APIGatewayProxyHandler } from 'aws-lambda';
import { VirusProps } from 'types/virus';

const listOfViruses: Array<VirusProps> = [
  {id: "lkznr", positionX: 1, positionY: 3, virus_category: 1},
  {id: "ertyuio", positionX: 3, positionY: 2, virus_category: 1},
  {id: "sdfghj", positionX: 5, positionY: 97, virus_category: 4},
  {id: "xcvbn", positionX: 21, positionY: 36, virus_category: 2},
  {id: "34567", positionX: 45, positionY: 45, virus_category: 6},
]

export const main: APIGatewayProxyHandler = async event => {
  if (event.queryStringParameters != null && Object.keys(event.queryStringParameters).includes("id")){
    const targettedId: string = event.queryStringParameters.id;
    const targettedVirus = listOfViruses.find((virus: VirusProps) => virus.id==targettedId);
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