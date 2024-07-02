// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const skip = (page - 1) * pageSize;

  try {
    const tasks = await prisma.task.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    });

    const count = await prisma.task.count();
    return NextResponse.json({ tasks, count });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTask: Task = await prisma.task.create({ data });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await request.json();
    const updatedTask: Task = await prisma.task.update({ where: { id }, data });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
