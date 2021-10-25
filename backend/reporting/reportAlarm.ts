/* eslint-disable @typescript-eslint/require-await */
import { CloudWatchLogs } from 'aws-sdk';

const cloudWatchLogs = new CloudWatchLogs();

export const main = async (event: any): Promise<void> => {
  // console.log(event);
  const { logGroups } = await cloudWatchLogs.describeLogGroups().promise();
  const startTime = new Date(
    JSON.parse(event.detail.state.reasonData)['startDate'],
  ).getTime();
  const endTime = new Date(
    JSON.parse(event.detail.state.reasonData)['queryDate'],
  ).getTime();

  await Promise.all(
    (logGroups as CloudWatchLogs.LogGroup[]).map(async ({ logGroupName }) => {
      if (logGroupName !== undefined) {
        const { queryId } = await cloudWatchLogs
          .startQuery({
            queryString:
              "fields errorType, errorMessage, stack | filter @message like 'ERROR'",
            logGroupName,
            endTime,
            startTime,
          })
          .promise();
        console.log(queryId);
        if (queryId !== undefined) {
          const { results, status } = await cloudWatchLogs
            .getQueryResults({ queryId })
            .promise();

          // If the status is 'Scheduled' or 'Running' we have to try again
          // Not able to get any results yet

          console.log(status);
          console.log(results);
        }
      }
    }),
  );

  // Si on peut faire un StateMachine avec un map c'est encore mieux

  // await Promise.all(
  //   (logGroups as CloudWatchLogs.LogGroup[]).map(async ({ logGroupName }) => {
  //     if (logGroupName !== undefined) {
  //       const { events } = await cloudWatchLogs
  //         .filterLogEvents({
  //           logGroupName,
  //           filterPattern: 'ERROR',
  //           startTime,
  //         })
  //         .promise();
  //       if (events !== undefined) {
  //         events.forEach((e) => {
  //           if (e.message !== undefined) {
  //             const message = e.message;
  //             console.log({ logGroupName, message });
  //           }
  //         });
  //       }
  //     }
  //   }),
  // );
};
