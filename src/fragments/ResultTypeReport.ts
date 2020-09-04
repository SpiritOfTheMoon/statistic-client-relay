import { graphql } from "react-relay";
import * as ResultTypeReportFragmentTypes from "./__generated__/ResultTypeReportFragment.graphql";
import * as ResultTypeReportRefetchableQueryTypes from "./__generated__/ResultTypeReportRefetchableQuery.graphql";
import { useRefetchableFragment } from "react-relay/hooks";

const fragment = graphql`
  fragment ResultTypeReportFragment on System 
  @refetchable(queryName: "ResultTypeReportRefetchableQuery")
  @argumentDefinitions(
    begin: {type: "DateTime!", defaultValue: "2020-08-11T07:34:41.560Z"}
    end: {type: "DateTime"}
  )
  {
  
    resultTypeReport(begin: $begin, end: $end) {
        name
        count
    }
  }
`;

export const useResultTypeReport = (
  tableLogsFragmentKey: ResultTypeReportFragmentTypes.ResultTypeReportFragment$key,
): typeof queryData => {
  const queryData = useRefetchableFragment<ResultTypeReportRefetchableQueryTypes.ResultTypeReportRefetchableQuery, ResultTypeReportFragmentTypes.ResultTypeReportFragment$key>(fragment, tableLogsFragmentKey);
  return queryData;
}

export * as ResultTypeReportFragmentTypes from "./__generated__/ResultTypeReportFragment.graphql";
export * as ResultTypeReportRefetchableQueryTypes from "./__generated__/ResultTypeReportRefetchableQuery.graphql";
