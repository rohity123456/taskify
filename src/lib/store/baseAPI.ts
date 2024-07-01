import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { getConstant } from '@/global/constants';

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  timeout: getConstant('apiTimeout') as number,
  prepareHeaders: async (headers, { getState }) => {
    const token = '';
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    if (timezone) {
      headers.set('Timezone', timezone);
    }
    return headers;
  }
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Media', 'RecentMedia'],
  endpoints: (builder) => ({})
});
