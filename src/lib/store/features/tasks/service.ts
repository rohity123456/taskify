import { Task } from '@prisma/client';
import { baseApi } from '../../baseAPI';

interface GETTASKS {
  tasks: Task[];
  count: number;
}
type TaskQuery = Partial<Task> & {
  page: string;
  pageSize: string;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
};
export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GETTASKS, TaskQuery>({
      query: (params) => `/tasks?${new URLSearchParams(params)}`,
      providesTags: ['Tasks']
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (body: Partial<Task>) => ({
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
