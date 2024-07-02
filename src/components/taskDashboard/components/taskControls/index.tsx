import Modal from '@/components/common/Modal';
import AddTaskForm, { AddTaskFormValues } from '@/components/form/AddTask';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAddTaskMutation } from '@/lib/store/features/tasks/service';
import { Task } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface TaskControlsProps {}
const TaskControls: React.FC<TaskControlsProps> = ({}) => {
  const { toast } = useToast();
  const [addTask, { isLoading, isSuccess, isError }] = useAddTaskMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const session = useSession();
  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
    if (isError) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  }, [isSuccess, isError, toast]);
  const handleAddTask = async (values: AddTaskFormValues) => {
    try {
      const task: Partial<Task> = {
        ...values,
        modifiedById: session.data?.user.id as string,
        assignedToId: session.data?.user.id as string
      };
      addTask(task);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  };
  return (
    <div className='flex'>
      <Input placeholder='Search tasks...' />
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        trigger={
          <Button className='ml-2' onClick={() => setModalOpen(true)}>
            <Plus className='mr-2' />
            Add Task
          </Button>
        }
        title='Add Task'
      >
        <AddTaskForm handleAddTask={handleAddTask} isLoading={isLoading} />
      </Modal>
    </div>
  );
};

export default TaskControls;
