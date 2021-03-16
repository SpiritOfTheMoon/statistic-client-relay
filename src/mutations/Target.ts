import { graphql } from "react-relay";
import * as TargetQueryTypes from "./__generated__/TargetMutation.graphql";
import { useMutation, UseMutationConfig} from "react-relay/hooks";

const mutation = graphql`
  mutation TargetMutation($name: String!, $systemID: String!) {
    createTarget(name: $name, systemID: $systemID) {
      id
      name
      system {
        id
        name
      }
    }
  }
`;

export const useTargetCreate = (
) => {

  const [commit, isInflite] = useMutation<TargetQueryTypes.TargetMutation>(
    mutation,
  );

  const returnedCommit = (
    config: Omit<UseMutationConfig<TargetQueryTypes.TargetMutation>, "updater">
  ) => {
      const mutationConfig: UseMutationConfig<TargetQueryTypes.TargetMutation> = {
        ...config,
        updater: (store) => {
          const creatorTarget = store.getRootField('createTarget');
          const targetsProxy = store.getRoot();
          const oldTargets = targetsProxy.getLinkedRecords('targets');
          if (creatorTarget && oldTargets) {
            targetsProxy.setLinkedRecords([...oldTargets, creatorTarget], 'targets');
          }
        }
      }
      commit(mutationConfig);
  }
  return [returnedCommit, isInflite] as const;
}

export * as TargetQueryTypes from "./__generated__/TargetMutation.graphql";

