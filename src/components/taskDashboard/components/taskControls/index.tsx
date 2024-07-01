import Modal from '@/components/common/Modal';
import AddTaskForm from '@/components/form/AddTask';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import React from 'react';

interface TaskControlsProps {}
const TaskControls: React.FC<TaskControlsProps> = ({}) => {
  return (
    <div className='flex'>
      <Input placeholder='Search tasks...' />
      <Modal
        trigger={
          <Button className='ml-2'>
            <Plus className='mr-2' />
            Add Task
          </Button>
        }
        title='Add Task'
      >
        <AddTaskForm />
      </Modal>
    </div>
  );
};

export default TaskControls;
