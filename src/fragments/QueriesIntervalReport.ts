import { graphql } from "react-relay";
import * as QueriesIntervalReportFragmentTypes from "./__generated__/QueriesIntervalReportFragment.graphql";
import * as QueriesIntervalReportRefetchableQueryTypes from "./__generated__/QueriesIntervalReportRefetchableQuery.graphql";
import { useRefetchableFragment } from "react-relay/hooks";

const fragment = graphql`
  fragment QueriesIntervalReportFragment on System 
  @refetchable(queryName: "QueriesIntervalReportRefetchableQuery")
  @argumentDefinitions(
    begin: {type: "DateTime!", defaultValue: "2020-08-11T07:34:41.560Z"}
    end: {type: "DateTime"}
    interval: {type: "Datepart!", defaultValue: day}
  )
  {
    queryIntervalReport(begin: $begin, end: $end, interval: $interval) {
        fromDate
        queries {
          query
          count
          average
        }
    }
  }
`;

export const useQueriesIntervalReport = (
  tableLogsFragmentKey: QueriesIntervalReportFragmentTypes.QueriesIntervalReportFragment$key,
): typeof queryData => {
  const queryData = useRefetchableFragment<QueriesIntervalReportRefetchableQueryTypes.QueriesIntervalReportRefetchableQuery, QueriesIntervalReportFragmentTypes.QueriesIntervalReportFragment$key>(fragment, tableLogsFragmentKey);
  return queryData;
}

export * as QueriesIntervalReportFragmentTypes from "./__generated__/QueriesIntervalReportFragment.graphql";
export * as QueriesIntervalReportRefetchableQueryTypes from "./__generated__/QueriesIntervalReportRefetchableQuery.graphql";
