import { graphql } from 'react-relay';
import { useSubscription } from 'react-relay/hooks';
import { ConnectionHandler, GraphQLSubscriptionConfig, SelectorStoreUpdater } from 'relay-runtime';
import * as EventSubscriptionTypes from './__generated__/eventSubscription.graphql';

const subscription = graphql`
  subscription eventSubscription($targetID: String!) {
    eventSubscription(targetID: $targetID){
      id
      name
    }
  }
`;
export * as EventSubscriptionTypes from './__generated__/eventSubscription.graphql';

export const useEventSubscriptionSubscription = (
  config: Omit<GraphQLSubscriptionConfig<EventSubscriptionTypes.eventSubscription>, 'subscription' | 'updater'>,
): void => {
  const updater: SelectorStoreUpdater<EventSubscriptionTypes.eventSubscriptionResponse> = (
    store,
  ) => {
    const rootField = store.getRootField('eventSubscription');
    const storeProxy = store.get(config.variables.targetID);

    const targetEvents = storeProxy?.getLinkedRecords('events');
    if (targetEvents) {
      const index = targetEvents.findIndex((element) => element.getDataID() === rootField.getDataID());
      if (index !== -1) {
        const oldCount = targetEvents[index].getValue('executionCount') as number;
        targetEvents[index].setValue(oldCount + 1, 'executionCount');
      }
    }
  };
  useSubscription<EventSubscriptionTypes.eventSubscription>({
    subscription,
    updater,
    ...config,
  });
};
