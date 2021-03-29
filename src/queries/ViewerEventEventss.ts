import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as ViewerEventEventssQueryTypes from './__generated__/ViewerEventEventssQuery.graphql';

const query = graphql`
  query ViewerEventEventssQuery {
    viewerEventEventss {
      id
      event {
        id
        name
      }
    }
  }
`;

export const useViewerEventEventssQuery = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: ViewerEventEventssQueryTypes.ViewerEventEventssQueryVariables,
): ViewerEventEventssQueryTypes.ViewerEventEventssQueryResponse => {
  const queryData = useLazyLoadQuery<ViewerEventEventssQueryTypes.ViewerEventEventssQuery>(
    query,
    variables,
    options,
  );
  return queryData;
};

export * as ViewerEventEventssQueryTypes from './__generated__/ViewerEventEventssQuery.graphql';
