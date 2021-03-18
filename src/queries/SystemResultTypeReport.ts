import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import * as SystemResultTypeReportQueryTypes from './__generated__/SystemResultTypeReportQuery.graphql';

const query = graphql`
    query SystemResultTypeReportQuery($systemId: String!) {
        system(id: $systemId) {
        id
        name
        ...ResultTypeReportFragment
        }
    }
`;

export const useSystemResultTypeReport = (
    options: Parameters<typeof useLazyLoadQuery>[2],
    variables: SystemResultTypeReportQueryTypes.SystemResultTypeReportQueryVariables,
): SystemResultTypeReportQueryTypes.SystemResultTypeReportQueryResponse => {
    const queryData = useLazyLoadQuery<SystemResultTypeReportQueryTypes.SystemResultTypeReportQuery>(
        query,
        variables,
        options,
    );
    return queryData;
};

export * as SystemResultTypeReportQueryTypes from './__generated__/SystemResultTypeReportQuery.graphql';
