import { graphql } from 'react-relay';
import { useSubscription } from 'react-relay/hooks';
import { ConnectionHandler, GraphQLSubscriptionConfig, SelectorStoreUpdater } from 'relay-runtime';
import * as ViewerGraphicsSubscriptionnTypes from './__generated__/viewergraphicsSubscription.graphql';

const subscription = graphql`
  subscription viewergraphicsSubscription{
    viewergraphicsSubscription{
      id
      identifier
      compInfo
      userInfo
    }
  }
`;
export * as ViewerGraphicsSubscriptionnTypes from './__generated__/viewergraphicsSubscription.graphql';

export const useViewerGraphicsSubscriptionSubscription = (
  config: Omit<GraphQLSubscriptionConfig<ViewerGraphicsSubscriptionnTypes.viewergraphicsSubscription>, 'subscription' | 'updater'>,
): void => {
  const updater: SelectorStoreUpdater<ViewerGraphicsSubscriptionnTypes.viewergraphicsSubscriptionResponse> = (
    store,
  ) => {
    const rootField = store.getRootField('viewergraphicsSubscription');
    const root = store.getRoot();
    const oldViewers = root.getLinkedRecords('viewers');
    const index = oldViewers?.findIndex((item) => item.getDataID() === rootField.getDataID());
    if (index === -1 && oldViewers) {
      root.setLinkedRecords([...oldViewers, rootField], 'viewers');
    }
  };
  useSubscription<ViewerGraphicsSubscriptionnTypes.viewergraphicsSubscription>({
    subscription,
    updater,
    ...config,
  });
};
