import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as TargetEventsQueryTypes from './__generated__/TargetEventsQuery.graphql';

const query = graphql`
  query TargetEventsQuery($targetId: String!) {
    target(id: $targetId) {
      id
      name
      ...EventsFragment
    }
  }
`;

export const useTargetEventsQuery = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: TargetEventsQueryTypes.TargetEventsQueryVariables,
): TargetEventsQueryTypes.TargetEventsQueryResponse => {
  const queryData = useLazyLoadQuery<TargetEventsQueryTypes.TargetEventsQuery>(
    query,
    variables,
    options,
  );
  return queryData;
};

export * as TargetEventsQueryTypes from './__generated__/TargetEventsQuery.graphql';
