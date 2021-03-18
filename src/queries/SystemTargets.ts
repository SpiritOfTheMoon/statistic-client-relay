import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as SystemTargetsQueryTypes from './__generated__/SystemTargetsQuery.graphql';

const query = graphql`
  query SystemTargetsQuery($systemId: String!) {
    system(id: $systemId) {
      id
      name
      ...TargetsFragment
    }
  }
`;

export const useSystemTargetsQuery = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: SystemTargetsQueryTypes.SystemTargetsQueryVariables,
): SystemTargetsQueryTypes.SystemTargetsQueryResponse => {
  const queryData = useLazyLoadQuery<SystemTargetsQueryTypes.SystemTargetsQuery>(
    query,
    variables,
    options,
  );
  return queryData;
};

export * as SystemTargetsQueryTypes from './__generated__/SystemTargetsQuery.graphql';
