import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany();
    const count = await prisma.user.count();
    return NextResponse.json({ users, count });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
