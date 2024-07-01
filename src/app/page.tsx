import TasksDashboard from '@/components/taskDashboard';
import { auth } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect('/signin');
  return <TasksDashboard />;
}
