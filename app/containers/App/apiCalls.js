/**
 * All API calls exported from this file will be added
 * to the reducer, saga and props of index.js
 */
import createAPICall from 'utils/helperFunctions/createAPICall';

const container = 'app';

export const getConfigCall = createAPICall({
  name: 'getConfig',
  container,
  apiCallParams: payload => [[fetch], ``, payload],
});
