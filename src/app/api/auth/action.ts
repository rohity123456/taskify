'use server';

import { SignupFormValues } from '@/components/form/SignUpForm';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function signup(values: SignupFormValues): Promise<any> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email }
    });

    if (existingUser) {
      throw new Error('email address already in use');
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);

    await prisma.user.create({
      data: {
        username: values.username,
        email: values.email,
        password: hashedPassword
      }
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || 'Failed to sign up');
  }

  redirect('/signin');
}

export async function signin(): Promise<any> {
  return {
    name: 'Ryan',
    email: 'sYqg8@example.com'
  };
}
