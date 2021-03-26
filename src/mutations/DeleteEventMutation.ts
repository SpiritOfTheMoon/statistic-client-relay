import { graphql } from 'react-relay';
import { useMutation, UseMutationConfig } from 'react-relay/hooks';
import * as DeleteEventTypes from './__generated__/DeleteEventMutation.graphql';

const mutation = graphql`
  mutation DeleteEventMutation($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export const useDeleteEventMutation = (
  ) => {
  const [commit, isInFlight] = useMutation<DeleteEventTypes.DeleteEventMutation>(
    mutation,
  );
  const returnedCommit = (
    config: Omit<UseMutationConfig<DeleteEventTypes.DeleteEventMutation>, 'updater'>,
    targetId: string,
  ) => {
    const mutationConfig: UseMutationConfig<DeleteEventTypes.DeleteEventMutation> = {
      ...config,
      updater: (store) => {
        const deletedEvent = store.getRootField('deleteEvent');
        const eventProxy = store.get(targetId);
        if (eventProxy) {
          const oldEvents = eventProxy.getLinkedRecords('events');
          if (deletedEvent && oldEvents) {
            eventProxy.setLinkedRecords(oldEvents.filter((element) => (
              element.getDataID() !== deletedEvent.getDataID()
            )), 'events');
          }
        }
      },
    };
    commit(mutationConfig);
  };
  return [returnedCommit, isInFlight] as const;
};

export * as DeleteEventTypes from './__generated__/DeleteEventMutation.graphql';
