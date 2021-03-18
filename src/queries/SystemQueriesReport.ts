import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as SystemQueriesReportQueryTypes from './__generated__/SystemQueriesReportQuery.graphql';

const query = graphql`
    query SystemQueriesReportQuery($systemId: String!) {
        system(id: $systemId) {
        id
        name
        ...QueriesReportFragment
        }
    }
`;

export const useSystemQueriesReport = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: SystemQueriesReportQueryTypes.SystemQueriesReportQueryVariables,
): SystemQueriesReportQueryTypes.SystemQueriesReportQueryResponse => {
  const queryData = useLazyLoadQuery<SystemQueriesReportQueryTypes.SystemQueriesReportQuery>(
    query,
    variables,
    options,
  );
  return queryData;
};

export * as SystemQueriesReportQueryTypes from './__generated__/SystemQueriesReportQuery.graphql';
