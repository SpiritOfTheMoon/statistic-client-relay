import { graphql } from 'react-relay';
import { useSubscription } from 'react-relay/hooks';
import { ConnectionHandler, GraphQLSubscriptionConfig, SelectorStoreUpdater } from 'relay-runtime';
import * as TargetExecutionCountSubscriptionTypes from './__generated__/targetExecutionCountSubscription.graphql';

const subscription = graphql`
  subscription targetExecutionCountSubscription($systemID: String!) {
    targetExecutionCountSubscription(systemID: $systemID){
      id
      name
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
            (event) => event.getValue('name') === rootField.getValue('name')
              && event.getValue('deletedAt') === null,
          ),
        );
        console.log(currentTarget?.getValue('name'));
        const targetEvents = currentTarget?.getLinkedRecords('events');
        if (currentTarget && targetEvents) {
          const counts = targetEvents.map((event) => event.getValue('executionCount')) as number[];
          const currentCount = currentTarget.getValue('executionCount');
          console.log(counts);
          console.log(currentTarget.getValue('executionCount'));
          currentTarget.setValue(counts.length ? Math.min(...counts) : 0, 'executionCount');
        }
      }
    };
  useSubscription<TargetExecutionCountSubscriptionTypes.targetExecutionCountSubscription>({
    subscription,
    updater,
    ...config,
  });
};
