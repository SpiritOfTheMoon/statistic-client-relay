import { graphql } from "react-relay";
import * as SystemFragmentTypes from "./__generated__/SystemFragment.graphql";
import { useFragment } from "react-relay/hooks";

const fragment = graphql`
  fragment SystemFragment on Target 
  {
    system {
        id
        name
    }
  }
`;


export const useSystem = (
  systemFragmentKey: SystemFragmentTypes.SystemFragment$key,
): typeof queryData => {
  const queryData = useFragment(fragment, systemFragmentKey);
  return queryData;
}

export * as SystemFragmentTypes from "./__generated__/SystemFragment.graphql";
