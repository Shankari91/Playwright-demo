import { APIRequestContext } from '@playwright/test';
import { buildUrl } from '../../utils/apiUrlBuilder';
import { executeRequest } from '../../utils/apiRequestUtils';

async function deleteAllBooksByUser(apiContext: APIRequestContext, userId: string) {
  const method = 'delete';
  const requestOptions = {};
  const requestUrl = buildUrl('api.books/delete', userId);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}
export default { deleteAllBooksByUser };