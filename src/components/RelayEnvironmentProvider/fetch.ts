/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  QueryResponseCache,
  FetchFunction,
} from 'relay-runtime';
import errorHandler from './errorHandler';

const cacheTimeMs = 60 * 1000;
const cache = new QueryResponseCache({ size: 250, ttl: cacheTimeMs });

const getFetchQueryFunction = (endpoint: string): FetchFunction => async (
  operation,
  variables,
  cacheConfig,
  uploadables,
) => {
  const queryID = operation.text;
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';
  const forceFetch = cacheConfig && cacheConfig.force;
  console.log('aaaa');
  console.log(cache);
  const fromCache = cache.get(queryID ?? '', variables);
  console.log('fromCache', fromCache);
  const requestConfig: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('params', isQuery, fromCache, forceFetch, cacheConfig);
  if (isQuery && (fromCache !== null) && !forceFetch) {
    return fromCache;
  }

  if (isMutation) {
    cache.clear();
  }

  if (uploadables) {
    if (!window.FormData) {
      throw new Error('Uploading files without `FormData` not supported.');
    }

    const formData = new FormData();
    if (operation.text) {
      formData.append('operations', JSON.stringify({
        query: operation.text,
        variables,
      }));

      formData.append(
        'map',
        JSON.stringify(
          Object.keys(uploadables)
            .reduce((prev, cur, index) => {
              prev[`${index}`] = [`variables.files.${index}`];
              return prev;
            }, {} as Record<string, Array<string>>),
),
      );
    }
    Object.keys(uploadables).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        formData.append(key, uploadables[key]);
      }
    });

    requestConfig.headers = {};
    requestConfig.body = formData;
  }

  const response = await fetch(endpoint, requestConfig);

  const json = await response.json();
  if (isQuery && json) {
    console.log(json);
    console.log(cache);
    cache.set(queryID ?? '', variables, json);
  }
  if (json.errors) {
    if (Array.isArray(json.errors)) {
      throw new Error(errorHandler(json.errors));
    }
  }

  console.log('data', json);
  console.log('cache', cache);

  switch (response.status) {
    case 401: {
      break;
    }
    default: break;
  }
  return json;
};

export default getFetchQueryFunction;
