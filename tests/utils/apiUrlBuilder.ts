import apiPath from './apiPaths';
import baseAPIUrl from './environmentBaseUrl';

function bindUrl(endpoint: string, env: string, userId?: string, isbn?: string) {
  const parts = endpoint.replace(/\/.+$/, '').split('.');
  
  const endpointParts = parts.map((part) => {
    switch (part) {
      case 'api':
        return baseAPIUrl[env].api;
      default:
          return apiPath[part] ?? '/';
    }
  });
        
  if (endpoint === 'api.account/get') {
    endpointParts.push(userId);
  }
  if (endpoint === 'api.books/put') {
    endpointParts.push(isbn);
  }

  return endpointParts.join('/');
}

function searchParamsForUrl(page: string, userId?: string) {
  let queryParams;

  switch (page) {
    case 'api.books/delete':
      queryParams = { UserId: userId };;
      break;
    default:
      queryParams = {};
  }

  return new URLSearchParams(queryParams).toString();
}

export function buildUrl(endpoint: string, userId?: string, isbn?: string) {
  const env = process.env.ENV!;
  const url = [
    bindUrl(endpoint, env, userId, isbn),
    searchParamsForUrl(endpoint, userId),
  ]
  .filter(Boolean)
  .join('?');
  
  return url;
}