import { baseApi } from '../../baseAPI';
import { IUser } from '@/types/user';

interface GETUSERS {
  users: IUser[];
  count: number;
}
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GETUSERS, void>({
      query: () => {
        return `/users`;
      },
      providesTags: ['Users']
    })
  })
});

export const { useGetUsersQuery } = userApi;
