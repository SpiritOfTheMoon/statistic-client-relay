// eslint-disable-next-line spaced-comment
/// <reference types="@types/react-relay" />


declare module 'babel-plugin-relay/macro' {
  import type { GraphQLTaggedNode } from 'react-relay';

  function graphql(strings: unknown): GraphQLTaggedNode;
  export default graphql;
}
