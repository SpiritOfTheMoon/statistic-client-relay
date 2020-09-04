import {
  Environment,
  IEnvironment,
  RecordSource,
  Store,
  Network,
} from 'relay-runtime';
import getSubscribe from './subscribe';
import getFetchQueryFunction from "./fetch";

const source = new RecordSource();
const store = new Store(source);
const getRelayEnvironment = (
  socketUrl: string,
  apiUrl: string,
): IEnvironment => new Environment({
  network: Network.create(getFetchQueryFunction(apiUrl), getSubscribe(socketUrl)),
  store,
});

export default getRelayEnvironment;
