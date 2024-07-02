import { Task } from '@prisma/client';
import { baseApi } from '../../baseAPI';
import { ITask } from '@/types/task';

interface GETTASKS {
  tasks: ITask[];
  count: number;
}
type TaskQuery = {
  page: string;
  pageSize: string;
  q?: string;
};
export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GETTASKS, TaskQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        return `/tasks?${searchParams.toString()}`;
      },
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
      query: (body) => {
        const taskBody = { ...body };
        delete taskBody.id;
        return { url: `/tasks/${body.id}`, method: 'PATCH', body: taskBody };
      },
      invalidatesTags: ['Tasks']
    }),
    deleteTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => {
        return { url: `/tasks/${body.id}`, method: 'DELETE' };
      },
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
