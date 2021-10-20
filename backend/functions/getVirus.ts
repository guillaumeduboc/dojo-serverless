import { success } from '@libs/response';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { VirusProps } from 'types/virus';

const listOfViruses: Array<VirusProps> = [
  { id: 'lkznr', positionX: 1, positionY: 3, virusCategory: 1 },
  { id: 'ertyuio', positionX: 3, positionY: 2, virusCategory: 1 },
  { id: 'sdfghj', positionX: 5, positionY: 97, virusCategory: 4 },
  { id: 'xcvbn', positionX: 21, positionY: 36, virusCategory: 2 },
  { id: '34567', positionX: 45, positionY: 45, virusCategory: 6 },
];

export const main: APIGatewayProxyHandler = async ({
  queryStringParameters,
}) => {
  if (queryStringParameters === null) {
    return success({ listOfViruses });
  }
  const { id } = queryStringParameters;
  console.log({ id });
  console.log({ queryStringParameters });
  if (id != null) {
    const targettedVirus = listOfViruses.find(
      (virus: VirusProps) => virus.id == id,
    );
    return success({ targettedVirus });
  } else {
    return success({ listOfViruses });
  }
};
