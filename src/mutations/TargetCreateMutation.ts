import { graphql } from 'react-relay';
import { useMutation, UseMutationConfig } from 'react-relay/hooks';
import * as TargetQueryTypes from './__generated__/TargetCreateMutation.graphql';

const mutation = graphql`
  mutation TargetCreateMutation($name: String!, $systemID: String!) {
    createTarget(name: $name, systemID: $systemID) {
      id
      name
    }
  }
`;

export const useTargetCreateMutation = (
) => {
  const [commit, isInFlight] = useMutation<TargetQueryTypes.TargetCreateMutation>(
    mutation,
  );

  const returnedCommit = (
    config: Omit<UseMutationConfig<TargetQueryTypes.TargetCreateMutation>, 'updater'>,
    systemID: string,
  ) => {
      const mutationConfig: UseMutationConfig<TargetQueryTypes.TargetCreateMutation> = {
        ...config,
        updater: (store) => {
          const createdTarget = store.getRootField('createTarget');
          const targetsProxy = store.get(systemID);
          if (targetsProxy) {
            const oldTargets = targetsProxy.getLinkedRecords('targets');
            if (createdTarget && oldTargets) {
              targetsProxy.setLinkedRecords([...oldTargets, createdTarget], 'targets');
            }
          }
        },
      };
      commit(mutationConfig);
  };
  return [returnedCommit, isInFlight] as const;
};

export * as TargetQueryTypes from './__generated__/TargetCreateMutation.graphql';
