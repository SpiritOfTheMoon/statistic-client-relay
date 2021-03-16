import { graphql } from "react-relay";
import * as QueriesReportFragmentTypes from "./__generated__/QueriesReportFragment.graphql";
import * as QueriesReportRefetchableQueryTypes from "./__generated__/QueriesReportRefetchableQuery.graphql";
import { useRefetchableFragment } from "react-relay/hooks";

const fragment = graphql`
  fragment QueriesReportFragment on System 
  @refetchable(queryName: "QueriesReportRefetchableQuery")
  @argumentDefinitions(
    begin: {type: "DateTime!", defaultValue: "2020-08-11T07:34:41.560Z"}
    end: {type: "DateTime"}
  )
  {
    queriesReport(begin: $begin, end: $end) {
        query
    }
  }
`;


export const useQueriesReport = (
  tableLogsFragmentKey: QueriesReportFragmentTypes.QueriesReportFragment$key,
): typeof queryData => {
  const queryData = useRefetchableFragment<QueriesReportRefetchableQueryTypes.QueriesReportRefetchableQuery, QueriesReportFragmentTypes.QueriesReportFragment$key>(fragment, tableLogsFragmentKey);
  return queryData;
}

export * as QueriesReportFragmentTypes from "./__generated__/QueriesReportFragment.graphql";
export * as QueriesReportRefetchableQueryTypes from "./__generated__/QueriesReportRefetchableQuery.graphql";
