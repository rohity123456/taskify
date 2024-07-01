// store/api/taskApi.ts
import { Task } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api' // Assuming your API routes are under /api
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Tasks'],
      transformResponse: (response: Task[]) =>
        response.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tasks']
    })
  })
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
