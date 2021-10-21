/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { APIGatewayEventRequestContext } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { deleteConnection } from '@libs/connections';

interface WebSocketRequestContext<MessageRouteKey>
  extends APIGatewayEventRequestContext {
  connectionId: string;
  domainName: string;
  routeKey: MessageRouteKey;
}

export interface WebSocketConnectRequestEvent {
  requestContext: WebSocketRequestContext<'$connect'>;
}

export interface WebSocketDisconnectRequestEvent {
  requestContext: WebSocketRequestContext<'$disconnect'>;
}

export const extractEndpointFromEvent = (
  event: WebSocketConnectRequestEvent,
): string => `${event.requestContext.domainName}/${event.requestContext.stage}`;

export const sendMessageToConnection = async ({
  connectionId,
  endpoint,
  message,
}: {
  connectionId: string;
  endpoint: string;
  message: any;
}): Promise<void> => {
  // TODO init apiGateWay client with the correct endpoint
  const apiGatewayManagementApi = new ApiGatewayManagementApi({
    endpoint,
  });
  try {
    // TODO send a message to a connection
    await apiGatewayManagementApi
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(message),
      })
      .promise();
  } catch (error) {
    if (error.statusCode !== 410) {
      throw error;
    }
    console.log(`Found stale connection, deleting ${connectionId}`);
    await deleteConnection(connectionId);
  }
};
