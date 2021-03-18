/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import type {
  Props as ProviderProps,
} from 'react-relay/relay-hooks/RelayEnvironmentProvider.react';
import getRelayEnvironment from './environment';

export type RelayEnvironmentProviderProps = {
  socketUrl: string;
  apiUrl: string;
} & Omit<ProviderProps, 'environment'>;

const _RelayEnvironmentProvider = (
  { children, socketUrl, apiUrl }: RelayEnvironmentProviderProps,
): JSX.Element => {
  const environment = getRelayEnvironment(socketUrl, apiUrl);
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};

export default _RelayEnvironmentProvider;
