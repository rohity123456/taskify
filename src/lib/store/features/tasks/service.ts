import { Task } from '@prisma/client';
import { baseApi } from '../../baseAPI';

export const taskApi = baseApi.injectEndpoints({
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
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `/tasks/${body.id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `/tasks/${body.id}`,
        method: 'DELETE',
        body
      }),
      invalidatesTags: ['Tasks']
    }),
    toggleTaskComplete: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `/tasks/${body.id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Tasks']
    })
  })
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
