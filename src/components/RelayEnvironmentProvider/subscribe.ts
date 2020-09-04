import { SubscribeFunction, Observable } from "relay-runtime";
import { SubscriptionClient } from 'subscriptions-transport-ws';

const getSubscribe = (url: string): SubscribeFunction => {
  const subscribeClient = new SubscriptionClient(url);
  subscribeClient.on("open", () => {
    console.log("WS Connected");
  });
  return (
    request,
    variables,
    cacheConfig,
    observer?,
  ) => {
    return Observable.create((sink) => {
      subscribeClient.request({
        operationName: request.name,
        query: request.text ?? '',
        variables,
      }).subscribe(sink as any);
    })
  }
};

export default getSubscribe;
