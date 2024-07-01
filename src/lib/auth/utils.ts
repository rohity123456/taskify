import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from './options';

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthOptions);
}
