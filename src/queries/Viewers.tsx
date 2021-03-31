import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as ViewersQueryTypes from './__generated__/ViewersQuery.graphql';

const query = graphql`
  query ViewersQuery {
    viewers {
      id
      identifier
      userInfo
      compInfo
    }
  }
`;

export const useViewersQuery = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: ViewersQueryTypes.ViewersQueryVariables,
): ViewersQueryTypes.ViewersQueryResponse => {
  const queryData = useLazyLoadQuery<ViewersQueryTypes.ViewersQuery>(
    query,
    variables,
    options,
  );
  return queryData;
};

export * as ViewerQueryTypes from './__generated__/ViewersQuery.graphql';
