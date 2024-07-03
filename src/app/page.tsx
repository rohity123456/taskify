import TasksDashboard from '@/components/taskDashboard';
import { auth } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  throw new Error('test error');
  if (!session?.user) redirect('/signin');
  return <TasksDashboard />;
}
