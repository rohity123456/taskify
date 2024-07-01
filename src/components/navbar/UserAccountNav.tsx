'use client';
import { signOut } from 'next-auth/react';
import React, { useTransition } from 'react';
import { Button } from '../ui/button';

const UserAccountNav = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant='outline'
      className='w-full bg-primary text-primary-foreground'
      onClick={() =>
        startTransition(() => {
          signOut({
            callbackUrl: `${window.location.origin}/signin`,
            redirect: true
          });
        })
      }
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
};

export default UserAccountNav;
