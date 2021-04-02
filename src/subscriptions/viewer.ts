import { graphql } from 'react-relay';
import { useSubscription } from 'react-relay/hooks';
import { ConnectionHandler, GraphQLSubscriptionConfig, SelectorStoreUpdater } from 'relay-runtime';
import * as ViewerSubscriptionTypes from './__generated__/viewerSubscription.graphql';

const subscription = graphql`
  subscription viewerSubscription($systemID: String!){
    viewerSubscription(systemID: $systemID){
      id
      viewerID
      eventID
    }
  }
`;
export * as ViewerSubscriptionTypes from './__generated__/viewerSubscription.graphql';

export const useViewerSubscriptionSubscription = (
  config: Omit<GraphQLSubscriptionConfig<ViewerSubscriptionTypes.viewerSubscription>, 'subscription' | 'updater'>,
): void => {
  const updater: SelectorStoreUpdater<ViewerSubscriptionTypes.viewerSubscriptionResponse> = (
    store,
  ) => {
    const rootField = store.getRootField('viewerSubscription');
    const viewerID = rootField.getValue('viewerID');
    const storeProxy = store.get(config.variables.systemID);
    if (storeProxy) {
      const targets = storeProxy.getLinkedRecords('targets');

      const currentTarget = targets?.find(
        (target) => target.getLinkedRecords('events')?.findIndex(
          (event) => event.getDataID() === rootField.getValue('eventID')
            && event.getValue('deletedAt') === null,
        ),
      );

      let resultSet = new Set([viewerID]);
      const targetEvents = currentTarget?.getLinkedRecords('events');
      if (targetEvents) {
        targetEvents.forEach(
          (targetEvent) => {
            resultSet = new Set([...resultSet].filter(
              (x) => new Set(targetEvent.getValue('viewerIds') as string[]).has(x?.toString() || ''),
            ));
          },
        );
      }

      const targetViewers = currentTarget?.getValue('viewers') as string[];
      console.log(resultSet.size);
      if (currentTarget && targetViewers && viewerID && resultSet.size) {
        if (targetViewers.indexOf(viewerID?.toString()) === -1) {
          currentTarget.setValue([...targetViewers, viewerID] as string[], 'viewers');
        }
      }
    }
  };
  useSubscription<ViewerSubscriptionTypes.viewerSubscription>({
    subscription,
    updater,
    ...config,
  });
};
