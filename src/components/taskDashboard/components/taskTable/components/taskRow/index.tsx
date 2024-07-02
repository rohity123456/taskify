'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Task } from '@prisma/client';

interface TaskRowProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
}

export function TaskRow({
  task,
  onDelete,
  onToggleComplete,
  onUpdate
}: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(task.id, { name: editedName });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedName(task.name);
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell className='font-medium'>{task.name}</TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          task.description
        )}
      </TableCell>
      <TableCell className=''>
        <Checkbox
          checked={task.status === 'complete'}
          onCheckedChange={() => onToggleComplete(task.id)}
        />
        {isEditing ? (
          <DropdownMenu>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => onUpdate(task.id, { status: 'incomplete' })}
              >
                Incomplete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdate(task.id, { status: 'complete' })}
              >
                Complete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          task.status
        )}
      </TableCell>
      <TableCell className=''>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Task</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
            {isEditing ? (
              <>
                <DropdownMenuItem onClick={handleSaveClick}>
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCancelClick}>
                  Cancel
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => onDelete(task.id)}>
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
