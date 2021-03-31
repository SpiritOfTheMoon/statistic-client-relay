import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';
import * as TargetsFragmentTypes from './__generated__/TargetsFragment.graphql';

const fragment = graphql`
  fragment TargetsFragment on System 
  {
    targets {
        id
        name
        executionCount
        viewerCount
        ...EventsFragment
    }
  }
`;

export const useTargetsFragment = (
  targetFragmentKey: TargetsFragmentTypes.TargetsFragment$key,
): typeof queryData => {
  const queryData = useFragment<TargetsFragmentTypes.TargetsFragment$key>(fragment, targetFragmentKey);
  return queryData;
};

export * as TargetsFragmentTypes from './__generated__/TargetsFragment.graphql';
