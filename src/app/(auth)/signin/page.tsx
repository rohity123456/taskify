import SignInForm from '@/components/form/SignInForm';
import { auth } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

const page = async () => {
  const { user } = (await auth()) || {};
  if (user) redirect('/');
  return (
    <div className='w-full'>
      <SignInForm />
    </div>
  );
};

export default page;
