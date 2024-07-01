import SignInForm from '@/components/form/SignInForm';
import { auth } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

const page = async () => {
  const { user } = (await auth()) || {};
  if (user) redirect('/');
  return (
    <div className='flex justify-center items-center'>
      <div className='bg-slate-200 p-10 rounded-sm w-full md:w-[500px]'>
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
