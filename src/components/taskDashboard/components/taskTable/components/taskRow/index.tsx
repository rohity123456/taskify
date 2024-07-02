'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { ITask } from '@/types/task';
import { CircleX, Trash } from 'lucide-react';
// import { useUsersQuery } from '@/store/api/userApi';

interface TaskRowProps {
  task: ITask;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<ITask>) => void;
}

const users: any = [];

export function TaskRow({ task, onDelete, onUpdate }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  // const { data: users } = useUsersQuery();
  const rowRef = useRef<HTMLTableRowElement>(null);

  const handleBlur = () => {
    if (
      editedTask.name !== task.name ||
      editedTask.description !== task.description ||
      editedTask.status !== task.status ||
      editedTask.priority !== task.priority ||
      editedTask.assignedTo?.id !== task.assignedTo?.id
    ) {
      onUpdate(task.id, editedTask);
    }
    setIsEditing(false);
  };
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const formattedDate = format(task.createdAt as Date, 'MMM d, yyyy');
  const formattedUpdatedAt = task.updatedAt
    ? format(new Date(task.updatedAt), 'MMM d, yyyy')
    : null;

  return (
    <TableRow
      ref={rowRef}
      onDoubleClick={handleDoubleClick}
      className={isEditing ? 'bg-yellow-100 hover:bg-yellow-100' : ''}
    >
      <TableCell className='font-medium'>
        {formattedUpdatedAt || formattedDate}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <Input
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
          />
        ) : (
          task.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
        ) : (
          task.description
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <Select
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, status: value })
            }
            defaultValue={editedTask.status}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='inProgress'>In Progress</SelectItem>
              <SelectItem value='complete'>Complete</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          task.status
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, priority: value })
            }
            defaultValue={editedTask.priority}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='low'>Low</SelectItem>
              <SelectItem value='medium'>Medium</SelectItem>
              <SelectItem value='high'>High</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          task.priority
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            onValueChange={(value) =>
              setEditedTask({
                ...editedTask,
                assignedToId: value
              })
            }
            defaultValue={editedTask.assignedTo?.id || ''}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a user' />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user: any) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          task.assignedTo?.username || 'Unassigned'
        )}
      </TableCell>
      <TableCell className='flex justify-center gap-2 items-center'>
        {!isEditing && (
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-transparent'
            onClick={() => onDelete(task.id)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
        {isEditing && (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsEditing(false)}
            className='hover:bg-transparent'
          >
            <CircleX className='h-4 w-4' />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
