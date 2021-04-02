import { graphql } from 'react-relay';
import { useMutation, UseMutationConfig } from 'react-relay/hooks';
import * as CreateEventTypes from './__generated__/CreateEventMutation.graphql';

const mutation = graphql`
  mutation CreateEventMutation($name: String!, $targetID: String!) {
    createEvent(name: $name, targetID: $targetID) {
      id
      name
      viewerIds
    }
  }
`;

export const useCreateEventMutation = (
) => {
  const [commit, isInFlight] = useMutation<CreateEventTypes.CreateEventMutation>(
    mutation,
  );

  const returnedCommit = (
    config: Omit<UseMutationConfig<CreateEventTypes.CreateEventMutation>, 'updater'>,
    targetID: string,
  ) => {
      const mutationConfig: UseMutationConfig<CreateEventTypes.CreateEventMutation> = {
        ...config,
        updater: (store) => {
          const createdEvent = store.getRootField('createEvent');
          const eventsProxy = store.get(targetID);
          if (eventsProxy) {
            const oldEvents = eventsProxy.getLinkedRecords('events');
            if (createdEvent && oldEvents) {
              eventsProxy.setLinkedRecords([...oldEvents, createdEvent], 'events');
            }
          }
        },
      };
      commit(mutationConfig);
  };
  return [returnedCommit, isInFlight] as const;
};

export * as CreateEventTypes from './__generated__/CreateEventMutation.graphql';
