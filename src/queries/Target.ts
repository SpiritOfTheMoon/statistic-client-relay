import { graphql } from "react-relay";
import * as TargetsQueryTypes from "./__generated__/TargetsQuery.graphql";
import { useLazyLoadQuery, } from "react-relay/hooks";

const query = graphql`
  query TargetsQuery {
    targets {
      id
      name
      system {
        id
      }
    }
  }
`;

export const useTargets = (
  options: Parameters<typeof useLazyLoadQuery>[2],
  variables: TargetsQueryTypes.TargetsQueryVariables,
): TargetsQueryTypes.TargetsQueryResponse => {
  const queryData = useLazyLoadQuery<TargetsQueryTypes.TargetsQuery>(
    query,
    variables,
    options
  );
  return queryData;
}

export * as TargetsQueryTypes from "./__generated__/TargetsQuery.graphql";

