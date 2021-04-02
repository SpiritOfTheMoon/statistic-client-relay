import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as EventsQueryTypes from './__generated__/EventsQuery.graphql';

const query = graphql`
  query EventsQuery {
    events {
      id
      name
      viewerIds
    }
  }
`;

export const useEventsQuery = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: EventsQueryTypes.EventsQueryVariables,
): EventsQueryTypes.EventsQueryResponse => {
  const queryData = useLazyLoadQuery<EventsQueryTypes.EventsQuery>(
    query,
    variables,
    options,
  );
  return queryData;
};

export * as EventsQueryTypes from './__generated__/EventsQuery.graphql';
