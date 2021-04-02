import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';
import * as EventsFragmentTypes from './__generated__/EventsFragment.graphql';

const fragment = graphql`
  fragment EventsFragment on Target 
  {
    events {
        id
        name
        viewerIds
    }
  }
`;

export const useEventsFragment = (
  targetFragmentKey: EventsFragmentTypes.EventsFragment$key,
): typeof queryData => {
  const queryData = useFragment<EventsFragmentTypes.EventsFragment$key>(fragment, targetFragmentKey);
  return queryData;
};

export * as EventsFragmentTypes from './__generated__/EventsFragment.graphql';
