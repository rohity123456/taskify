import SignUpForm from '@/components/form/SignUpForm';
import { signup } from '../action';

const SignupPage = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='bg-slate-200 p-10 rounded-sm w-full md:w-[500px]'>
        <SignUpForm handleSubmit={signup} />
      </div>
    </div>
  );
};

export default SignupPage;
