import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { LucideGroup } from 'lucide-react';
import { auth } from '@/lib/auth/utils';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
  const session = await auth();
  return (
    <div className='bg-zinc-100 dark:bg-zinc-900 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='w-full px-2 flex items-center justify-between'>
        <Link href='/'>
          <LucideGroup />
        </Link>
        <div className='w-20'>{session?.user && <UserAccountNav />}</div>
      </div>
    </div>
  );
};

export default Navbar;
