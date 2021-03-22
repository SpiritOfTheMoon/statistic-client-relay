import { graphql } from 'react-relay';
import { useMutation, UseMutationConfig } from 'react-relay/hooks';
import * as TargetDeleteTypes from './__generated__/DeleteTargetMutation.graphql';

const mutation = graphql`
  mutation DeleteTargetMutation($id: String!) {
    deleteTarget(id: $id) {
      id
    }
  }
`;

export const useDeleteTargetMutation = (
  ) => {
  const [commit, isInFlight] = useMutation<TargetDeleteTypes.DeleteTargetMutation>(
    mutation,
  );
  const returnedCommit = (
    config: Omit<UseMutationConfig<TargetDeleteTypes.DeleteTargetMutation>, 'updater'>,
    systemId: string,
  ) => {
    const mutationConfig: UseMutationConfig<TargetDeleteTypes.DeleteTargetMutation> = {
      ...config,
      updater: (store) => {
        const deleteTarget = store.getRootField('deleteTarget');
        const targetProxy = store.get(systemId);
        if (targetProxy) {
          const oldTargets = targetProxy.getLinkedRecords('targets');
          if (deleteTarget && oldTargets) {
            targetProxy.setLinkedRecords(oldTargets.filter((element) => (
              element.getDataID() !== deleteTarget.getDataID()
            )), 'targets');
          }
        }
      },
    };
    commit(mutationConfig);
  };
  return [returnedCommit, isInFlight] as const;
};

export * as TargetDeleteTypes from './__generated__/DeleteTargetMutation.graphql';
