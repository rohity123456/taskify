// components/TaskTable.tsx
'use client';

import { useTaskActions } from '@/app/hooks/useTaskActions';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Task } from '@prisma/client';
import { TaskRow } from './components/taskRow';

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  const { deleteTask, toggleTaskComplete, updateTask } = useTaskActions(); // Use the custom hook for actions

  return (
    <Table>
      <TableCaption>A list of your tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Task</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={toggleTaskComplete}
            onUpdate={updateTask}
          />
        ))}
      </TableBody>
    </Table>
  );
}

// ... TaskRow component (similar to Shadcn's example, with action buttons)
