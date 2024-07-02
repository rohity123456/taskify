'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTaskActions } from '@/app/hooks/useTaskActions';
import { Task } from '@prisma/client';
import { TaskRow } from './components/taskRow';

interface TaskTableProps {
  tasks: Task[];
  taskCount: number;
  page?: number;
  itemsPerPage?: number;
}

export function TaskTable({
  tasks,
  taskCount,
  page = 1,
  itemsPerPage = 10
}: TaskTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(taskCount / itemsPerPage);

  const { deleteTask, toggleTaskComplete, updateTask } = useTaskActions();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    router.push(`/?${params}`);
  };

  const createPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <Link href={`/?page=${i}`} legacyBehavior>
            <PaginationLink
              className={
                page == i
                  ? 'bg-primary text-primary-foreground'
                  : 'cursor-pointer'
              }
            >
              {i}
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pageLinks.unshift(<PaginationEllipsis key='start-ellipsis' />);
    }
    if (endPage < totalPages - 1) {
      pageLinks.push(<PaginationEllipsis key='end-ellipsis' />);
    }

    return pageLinks;
  };

  return (
    <div>
      <Table>
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

      <Pagination className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          {createPageLinks()}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={
                page === totalPages
                  ? 'cursor-not-allowed bg-gray'
                  : 'cursor-pointer'
              }
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
