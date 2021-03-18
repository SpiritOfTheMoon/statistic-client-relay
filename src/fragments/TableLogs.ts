import { graphql } from 'react-relay';
import { usePaginationFragment } from 'react-relay/hooks';
import * as TableLogsFragmentTypes from './__generated__/TableLogsFragment.graphql';
import * as TableLogsRefetchableQueryTypes from './__generated__/TableLogsRefetchableQuery.graphql';

const fragment = graphql`
  fragment TableLogsFragment on System
    @refetchable(queryName: "TableLogsRefetchableQuery")
    @argumentDefinitions(
      count: {type: "Int", defaultValue: 10}
      cursor: {type: "String"}
      order:{type: "OrderType", defaultValue: DESC}
      orderField:{type: "String!", defaultValue: "date" }
      skip: {type: "Int", defaultValue: 0}
    )
    {
      tableLogs(
        after: $cursor,
        first: $count,
        order: $order, 
        orderField: $orderField,
        skip: $skip
      ) @connection(key: "TableLogs_tableLogs"){
        edges {
          cursor
          node {
            id
            query
            resultType
            date
            perfomance
            login
            args
          }
        }
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
  }
`;

export * as TableLogsFragmentTypes from './__generated__/TableLogsFragment.graphql';
export * as TableLogsRefetchableQueryTypes from './__generated__/TableLogsRefetchableQuery.graphql';
export const useTableLogs = (
  tableLogsFragmentRef: TableLogsFragmentTypes.TableLogsFragment$key,
): typeof data => {
  const data = usePaginationFragment<
    TableLogsRefetchableQueryTypes.TableLogsRefetchableQuery,
    TableLogsFragmentTypes.TableLogsFragment$key
  >(fragment, tableLogsFragmentRef);
  return data;
};
