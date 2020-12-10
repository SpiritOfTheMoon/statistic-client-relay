import { graphql } from "react-relay";
import * as BackendLogsSubscriptionTypes from "./__generated__/backendLogSubscription.graphql";
import { useSubscription } from "react-relay/hooks";
import { GraphQLSubscriptionConfig, SelectorStoreUpdater, ConnectionHandler } from "relay-runtime";
const subscription = graphql`
  subscription backendLogSubscription ($systemId: String!) {
      backendLogSubscription(systemId: $systemId){
      id
      query
      resultType
      date
      login
      args
      perfomance
    }
  }
`;
export * as BackendLogsSubscriptionTypes from './__generated__/backendLogSubscription.graphql';

export const useBackendLogSubscription = (
  config: Omit<GraphQLSubscriptionConfig<BackendLogsSubscriptionTypes.backendLogSubscription>, 'subscription' | 'updater'>,
): void => {
  const updater: SelectorStoreUpdater<BackendLogsSubscriptionTypes.backendLogSubscriptionResponse> = (
    store,
  ) => {
    const proxiedData = store.getRootField("backendLogSubscription");
    if (proxiedData) {
      const storeProxy = store.get(config.variables.systemId);
      if (storeProxy) {
        const logsConnection = ConnectionHandler.getConnection(storeProxy, 'TableLogsFragment_tableLogs', {
          orderField: "date",
          order: "DESC",
        });
        if (logsConnection) {
          const newEdge = ConnectionHandler.createEdge(store, logsConnection, proxiedData, 'Log');
          ConnectionHandler.insertEdgeBefore(logsConnection, newEdge);
        }
      }
    }
  };
  useSubscription<BackendLogsSubscriptionTypes.backendLogSubscription>({
    subscription,
    updater,
    ...config,
  });
}