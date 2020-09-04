import { graphql } from "react-relay";
import * as DynamicTableLogsFragmentTypes from "./__generated__/DynamicTableLogsFragment.graphql";
import { useFragment, } from "react-relay/hooks";

const fragment = graphql`
  fragment DynamicTableLogsFragment on System {
    tableLogs(orderField: "date", order: DESC, first: 40)
    @connection(key:"TableLogsFragment_tableLogs", filters:["orderField", "order"]) {
      edges {
        node {
          id
          query
          date
          result
          resultType
          perfomance
        }
      }
    }
  }
`;

export const useDynamicTableLogs = (
  tableLogsFragmentKey: DynamicTableLogsFragmentTypes.DynamicTableLogsFragment$key,
): DynamicTableLogsFragmentTypes.DynamicTableLogsFragment => {
  const queryData = useFragment(fragment, tableLogsFragmentKey);
  return queryData;
}

export * as DynamicTableLogsFragmentTypes from "./__generated__/DynamicTableLogsFragment.graphql";
