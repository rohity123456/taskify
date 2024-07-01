import SignUpForm from '@/components/form/SignUpForm';
import { signup } from '../../api/auth/action';

const SignupPage = () => {
  return (
    <div className='w-full'>
      <SignUpForm handleSubmit={signup} />
    </div>
  );
};

export default SignupPage;
