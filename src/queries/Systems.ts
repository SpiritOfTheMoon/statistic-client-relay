import { graphql } from "react-relay";
import * as SystemsQueryTypes from "./__generated__/SystemsQuery.graphql";
import { useLazyLoadQuery, } from "react-relay/hooks";

const query = graphql`
  query SystemsQuery {
    systems {
      id
      name
    }
  }
`;

export const useSystems = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: SystemsQueryTypes.SystemsQueryVariables,
): SystemsQueryTypes.SystemsQueryResponse => {
  const queryData = useLazyLoadQuery<SystemsQueryTypes.SystemsQuery>(
    query,
    variables,
    options
  );
  return queryData;
}

export * as SystemsQueryTypes from "./__generated__/SystemsQuery.graphql";
