// app/tasks/page.tsx
'use client';

import { useGetTasksQuery } from '@/lib/store/features/tasks/service';
import { TaskTable } from './components/taskTable';
import Loading from '../ui/loading';
import TaskControls from './components/taskControls';

export default function TasksDashboard() {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();

  return (
    <div className='container'>
      <div className='flex justify-between items-center'>
        <h1>Task Dashboard</h1>
        <TaskControls />
      </div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : isError ? (
        <div>Error loading tasks.</div>
      ) : (
        <TaskTable tasks={tasks || []} />
      )}
    </div>
  );
}
