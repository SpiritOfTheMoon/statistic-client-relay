import { graphql } from 'react-relay';
import { useSubscription } from 'react-relay/hooks';
import { ConnectionHandler, GraphQLSubscriptionConfig, SelectorStoreUpdater } from 'relay-runtime';
import * as TargetExecutionCountSubscriptionTypes from './__generated__/targetExecutionCountSubscription.graphql';

const subscription = graphql`
  subscription targetExecutionCountSubscription($systemID: String!) {
    targetExecutionCountSubscription(systemID: $systemID){
      id
      eventID
      viewerID
    }
  }
`;
export * as TargetExecutionCountSubscriptionTypes from './__generated__/targetExecutionCountSubscription.graphql';

export const useTargetExecutionCountSubscription = (
  config: Omit<GraphQLSubscriptionConfig<TargetExecutionCountSubscriptionTypes.targetExecutionCountSubscription>, 'subscription' | 'updater'>,
): void => {
  const updater: SelectorStoreUpdater<
    TargetExecutionCountSubscriptionTypes.targetExecutionCountSubscriptionResponse
  > = (
    store,
    ) => {
      const rootField = store.getRootField('targetExecutionCountSubscription');

      const storeProxy = store.get(config.variables.systemID);
      if (storeProxy) {
        const targets = storeProxy.getLinkedRecords('targets');
        const currentTarget = targets?.find(
          (target) => target.getLinkedRecords('events')?.findIndex(
            (event) => event.getDataID() === rootField.getValue('eventID')
              && event.getValue('deletedAt') === null,
          ),
        );
        const targetEvents = currentTarget?.getLinkedRecords('events');
        if (currentTarget && targetEvents) {
          const viewerIds = currentTarget.getValue('viewers') as string[];

          let result = 0;
          viewerIds.forEach((targetViewer) => {
            let counter = Infinity;
            targetEvents.forEach((event) => {
              const eventViewers = event.getValue('viewerIds') as string[];
              counter = Math.min(counter, eventViewers.filter((id) => id === targetViewer).length);
            });
            if (counter === Infinity) counter = 0;
            result += counter;
          });
          console.log(result);
          currentTarget.setValue(result, 'executionCount');
        }
      }
    };
  useSubscription<TargetExecutionCountSubscriptionTypes.targetExecutionCountSubscription>({
    subscription,
    updater,
    ...config,
  });
};
